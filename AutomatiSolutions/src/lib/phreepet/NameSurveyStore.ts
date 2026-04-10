import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  type Firestore,
} from 'firebase/firestore'

import { getFirestoreDb } from '@/lib/firebase'
import { sanitizeSuggestionList } from '@/lib/phreepet/surveySuggestions'
import { updateRatings } from './EloEngine'
import { NAME_SURVEY_DECK_SIZE, QuestionManager } from './QuestionManager'
import type {
  AppName,
  ComparisonResult,
  LeaderboardRow,
  SurveyPrompt,
  SurveyQuestion,
  SurveySession,
} from './types'

/** Elo expected score for `itemElo` vs `leaderElo` (same logistic as reference `winProb`). */
export function eloWinProbabilityVsLeader(leaderElo: number, itemElo: number): number {
  return 1 / (1 + Math.pow(10, (leaderElo - itemElo) / 400))
}

/** Bar width 0–100: leader’s 0.5 expected → 100%; others scale by `winProb * 2 * 100`. */
export function eloBarWidthPercentVsLeader(leaderElo: number, itemElo: number): number {
  return eloWinProbabilityVsLeader(leaderElo, itemElo) * 2 * 100
}

/** Top-level collection: `Surveys/{NameSurvey}/…`. */
export const SURVEYS_COLLECTION = 'Surveys'

/** Document under `Surveys` that holds name-survey subcollections. */
export const NAME_SURVEY_DOC_ID = 'NameSurvey'

export const NAME_SURVEY_SUBCOL_NAMES = 'Names'
export const NAME_SURVEY_SUBCOL_QUESTIONS = 'Questions'
export const NAME_SURVEY_SUBCOL_SESSIONS = 'Sessions'

function sessionDocId(sessionId: string): string {
  return `session_${sessionId}`
}

/** Match rows only; skips do not increment stored `totalMatches`. */
function countAppearances(id: string, results: ComparisonResult[]): number {
  let n = 0
  for (const r of results) {
    if (r.isSkip === true) continue
    if (r.contestantAId === id || r.contestantBId === id) n += 1
  }
  return n
}

function isValidSessionResult(r: ComparisonResult): boolean {
  if (!r.questionId || !r.contestantAId || !r.contestantBId) return false
  if (r.contestantAId === r.contestantBId) return false
  if (r.isSkip === true) return true

  const {
    winnerId,
    loserId,
    initialEloA,
    initialEloB,
    finalEloA,
    finalEloB,
  } = r
  if (
    winnerId === undefined ||
    loserId === undefined ||
    initialEloA === undefined ||
    initialEloB === undefined ||
    finalEloA === undefined ||
    finalEloB === undefined
  ) {
    return false
  }
  if (winnerId === loserId) return false
  const ids = new Set([r.contestantAId, r.contestantBId])
  return ids.has(winnerId) && ids.has(loserId)
}

/** Payload shape for Firestore: skips omit winner/Elo fields entirely. */
function resultForFirestore(r: ComparisonResult): Record<string, unknown> {
  if (r.isSkip === true) {
    return {
      questionId: r.questionId,
      contestantAId: r.contestantAId,
      contestantBId: r.contestantBId,
      isSkip: true,
    }
  }
  return {
    questionId: r.questionId,
    contestantAId: r.contestantAId,
    contestantBId: r.contestantBId,
    winnerId: r.winnerId,
    loserId: r.loserId,
    initialEloA: r.initialEloA,
    initialEloB: r.initialEloB,
    finalEloA: r.finalEloA,
    finalEloB: r.finalEloB,
  }
}

export class NameSurveyStore {
  private db: Firestore

  private registryNames: AppName[] = []

  private registryQuestions: SurveyQuestion[] = []

  /** Working copy for the active session (Elo / matches mutate during the deck). */
  private sessionNames: AppName[] = []

  private questionManager: QuestionManager | null = null

  private session: SurveySession | null = null

  private currentPrompt: SurveyPrompt | null = null

  private initialized = false

  constructor(db?: Firestore) {
    this.db = db ?? getFirestoreDb()
  }

  private namesCollection() {
    return collection(
      this.db,
      SURVEYS_COLLECTION,
      NAME_SURVEY_DOC_ID,
      NAME_SURVEY_SUBCOL_NAMES,
    )
  }

  private questionsCollection() {
    return collection(
      this.db,
      SURVEYS_COLLECTION,
      NAME_SURVEY_DOC_ID,
      NAME_SURVEY_SUBCOL_QUESTIONS,
    )
  }

  /**
   * Loads all names ordered by `currentElo` descending and attaches win-probability vs #1
   * plus normalized bar widths (see `eloBarWidthPercentVsLeader`).
   */
  async getLeaderboard(): Promise<LeaderboardRow[]> {
    const q = query(this.namesCollection(), orderBy('currentElo', 'desc'))
    const snap = await getDocs(q)
    if (snap.empty) return []

    const ordered = snap.docs.map((d) => {
      const data = d.data() as {
        shortName: string
        extendedName?: string
        currentElo: number
      }
      return {
        id: d.id,
        shortName: data.shortName,
        extendedName: data.extendedName ?? '',
        currentElo: data.currentElo,
      }
    })

    const leaderElo = ordered[0]!.currentElo

    return ordered.map((n, index) => ({
      rank: index + 1,
      id: n.id,
      shortName: n.shortName,
      extendedName: n.extendedName,
      currentElo: n.currentElo,
      winProbabilityVsLeader: eloWinProbabilityVsLeader(leaderElo, n.currentElo),
      barWidthPercent: eloBarWidthPercentVsLeader(leaderElo, n.currentElo),
    }))
  }

  get isInitialized(): boolean {
    return this.initialized
  }

  get names(): readonly AppName[] {
    return this.registryNames
  }

  get questions(): readonly SurveyQuestion[] {
    return this.registryQuestions
  }

  /**
   * Loads and caches registry data from Firestore.
   */
  async init(): Promise<void> {
    const [nameSnap, questionSnap] = await Promise.all([
      getDocs(this.namesCollection()),
      getDocs(this.questionsCollection()),
    ])

    this.registryNames = nameSnap.docs
      .map((d) => {
        const data = d.data() as {
          shortName: string
          extendedName: string
          currentElo: number
          totalMatches: number
        }
        return {
          id: d.id,
          shortName: data.shortName,
          extendedName: data.extendedName,
          currentElo: data.currentElo,
          totalMatches: data.totalMatches,
        } satisfies AppName
      })
      .sort((a, b) => a.id.localeCompare(b.id))

    this.registryQuestions = questionSnap.docs
      .map((d) => {
        const data = d.data() as { text: string }
        return { id: d.id, text: data.text } satisfies SurveyQuestion
      })
      .sort((a, b) => a.id.localeCompare(b.id))

    this.initialized = true
  }

  /**
   * Starts a new in-memory session (does not write to Firestore until `submitSession`).
   */
  startSession(): void {
    if (!this.initialized) {
      throw new Error('NameSurveyStore.init() must be called before startSession()')
    }
    if (this.registryNames.length < 2) {
      throw new Error('Need at least two names in the registry to run a survey')
    }
    if (this.registryQuestions.length === 0) {
      throw new Error('Need at least one survey question in the registry')
    }

    this.sessionNames = this.registryNames.map((n) => ({ ...n }))
    this.questionManager = new QuestionManager(
      this.sessionNames,
      this.registryQuestions,
      NAME_SURVEY_DECK_SIZE,
    )
    this.session = {
      sessionId: crypto.randomUUID(),
      startTime: Date.now(),
      results: [],
      suggestions: [],
    }
    this.currentPrompt = null
  }

  get activeSession(): SurveySession | null {
    return this.session
  }

  /**
   * Completed comparisons in the current session.
   */
  get currentProgress(): { completed: number; total: number } {
    const total = NAME_SURVEY_DECK_SIZE
    const completed = this.session?.results.length ?? 0
    return { completed, total }
  }

  /**
   * Returns the current unanswered prompt, or draws the next one. Idempotent until the participant answers.
   */
  nextQuestion(): SurveyPrompt | null {
    if (!this.session || !this.questionManager) {
      throw new Error('Call startSession() before nextQuestion()')
    }
    if (this.currentPrompt) {
      return this.currentPrompt
    }
    if (this.session.results.length >= NAME_SURVEY_DECK_SIZE) {
      return null
    }
    const prompt = this.questionManager.nextPrompt(this.session.results.length)
    this.currentPrompt = prompt
    return prompt
  }

  /**
   * Records the choice for the current prompt and clears it so the next `nextQuestion()` advances.
   */
  answerCurrentQuestion(winnerId: string): void {
    if (!this.session || !this.currentPrompt) {
      throw new Error('No active prompt; call nextQuestion() first')
    }
    const { nameA, nameB, question } = this.currentPrompt
    if (winnerId !== nameA.id && winnerId !== nameB.id) {
      throw new Error('winnerId must match one of the two contestants')
    }
    const loserId = winnerId === nameA.id ? nameB.id : nameA.id
    const initialEloA = nameA.currentElo
    const initialEloB = nameB.currentElo
    const scoreA = winnerId === nameA.id ? 1 : 0
    const { newRatingA, newRatingB } = updateRatings(initialEloA, initialEloB, scoreA)

    nameA.currentElo = newRatingA
    nameB.currentElo = newRatingB
    nameA.totalMatches += 1
    nameB.totalMatches += 1

    const result: ComparisonResult = {
      questionId: question.id,
      contestantAId: nameA.id,
      contestantBId: nameB.id,
      winnerId,
      loserId,
      initialEloA,
      initialEloB,
      finalEloA: newRatingA,
      finalEloB: newRatingB,
    }
    this.session.results.push(result)
    this.currentPrompt = null
  }

  /**
   * Records a skip for the current prompt (no Elo change). Same stack semantics as answering.
   */
  skipCurrentQuestion(): void {
    if (!this.session || !this.currentPrompt) {
      throw new Error('No active prompt; call nextQuestion() first')
    }
    const { nameA, nameB, question } = this.currentPrompt
    const result: ComparisonResult = {
      questionId: question.id,
      contestantAId: nameA.id,
      contestantBId: nameB.id,
      isSkip: true,
    }
    this.session.results.push(result)
    this.currentPrompt = null
  }

  /**
   * Drops the current unanswered prompt (if any), reverts the last recorded answer and Elo deltas,
   * and restores the previous prompt so the participant can choose again.
   */
  undoLastAnswer(): void {
    if (!this.session || !this.questionManager) {
      throw new Error('No active session')
    }
    if (this.session.results.length === 0) {
      throw new Error('Nothing to undo')
    }

    if (this.currentPrompt) {
      this.questionManager.forgetPrompt(this.currentPrompt)
      this.currentPrompt = null
    }

    const last = this.session.results.pop()!
    const nameA = this.sessionNames.find((n) => n.id === last.contestantAId)
    const nameB = this.sessionNames.find((n) => n.id === last.contestantBId)
    if (!nameA || !nameB) {
      throw new Error('Contestants missing from session state')
    }
    if (last.isSkip !== true) {
      nameA.currentElo = last.initialEloA!
      nameB.currentElo = last.initialEloB!
      nameA.totalMatches -= 1
      nameB.totalMatches -= 1
    }

    const question = this.registryQuestions.find((q) => q.id === last.questionId)
    if (!question) {
      throw new Error('Question missing from registry')
    }
    this.currentPrompt = { question, nameA, nameB }
  }

  /**
   * Persists Elo / match counts and the session document in a single Firestore transaction.
   */
  async submitSession(suggestions: string[] = []): Promise<void> {
    if (!this.session) {
      throw new Error('No session to submit')
    }
    if (this.session.results.length !== NAME_SURVEY_DECK_SIZE) {
      throw new Error(
        `Session must have ${NAME_SURVEY_DECK_SIZE} results before submit (has ${this.session.results.length})`,
      )
    }
    if (this.currentPrompt !== null) {
      throw new Error('Answer the current question before submitting')
    }

    for (const r of this.session.results) {
      if (!isValidSessionResult(r)) {
        throw new Error('Invalid comparison result in session payload')
      }
    }

    const sessionPayload: SurveySession = {
      ...this.session,
      suggestions: sanitizeSuggestionList(
        suggestions.length ? [...suggestions] : this.session.suggestions,
      ),
    }

    const nameIds = new Set<string>()
    for (const r of sessionPayload.results) {
      nameIds.add(r.contestantAId)
      nameIds.add(r.contestantBId)
    }

    const namesCol = this.namesCollection()
    const sessionRef = doc(
      this.db,
      SURVEYS_COLLECTION,
      NAME_SURVEY_DOC_ID,
      NAME_SURVEY_SUBCOL_SESSIONS,
      sessionDocId(sessionPayload.sessionId),
    )

    await runTransaction(this.db, async (transaction) => {
      const initial: Map<string, { elo: number; totalMatches: number }> = new Map()

      for (const id of nameIds) {
        const ref = doc(namesCol, id)
        const snap = await transaction.get(ref)
        if (!snap.exists()) {
          throw new Error(`Name document missing: ${id}`)
        }
        const data = snap.data() as {
          currentElo: number
          totalMatches: number
        }
        initial.set(id, { elo: data.currentElo, totalMatches: data.totalMatches })
      }

      const elo = new Map<string, number>()
      for (const [id, v] of initial) {
        elo.set(id, v.elo)
      }

      for (const r of sessionPayload.results) {
        if (r.isSkip === true) continue
        const ra = elo.get(r.contestantAId)
        const rb = elo.get(r.contestantBId)
        if (ra === undefined || rb === undefined) {
          throw new Error('Elo state missing for contestant')
        }
        const scoreA = r.winnerId === r.contestantAId ? 1 : 0
        const { newRatingA, newRatingB } = updateRatings(ra, rb, scoreA)
        elo.set(r.contestantAId, newRatingA)
        elo.set(r.contestantBId, newRatingB)
      }

      for (const id of nameIds) {
        const ref = doc(namesCol, id)
        const base = initial.get(id)!
        const added = countAppearances(id, sessionPayload.results)
        transaction.update(ref, {
          currentElo: elo.get(id),
          totalMatches: base.totalMatches + added,
        })
      }

      transaction.set(sessionRef, {
        sessionId: sessionPayload.sessionId,
        startTime: sessionPayload.startTime,
        results: sessionPayload.results.map(resultForFirestore),
        suggestions: sessionPayload.suggestions,
        submittedAt: Date.now(),
      })
    })
  }
}
