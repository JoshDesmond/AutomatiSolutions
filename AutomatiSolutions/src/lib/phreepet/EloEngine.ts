import type { AppName, SurveyQuestion } from './types'

/** K-factor: higher early mobility for a small name pool. */
export const ELO_K = 32

export const DEFAULT_ELO = 1200

/**
 * Expected score for player A vs B (standard Elo).
 * E_A = 1 / (1 + 10^((R_B - R_A) / 400))
 */
export function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400))
}

/**
 * Updates both ratings after one match. `scoreA` is 1 if A won, 0 if A lost, 0.5 draw (unused here).
 */
export function updateRatings(
  ratingA: number,
  ratingB: number,
  scoreA: number,
): { newRatingA: number; newRatingB: number } {
  const eA = expectedScore(ratingA, ratingB)
  const eB = 1 - eA
  const scoreB = 1 - scoreA
  const newRatingA = ratingA + ELO_K * (scoreA - eA)
  const newRatingB = ratingB + ELO_K * (scoreB - eB)
  return { newRatingA, newRatingB }
}

function anchorWeight(elo: number): number {
  return Math.pow(Math.max(elo, 1) / 1200, 1.5)
}

function challengerWeight(eloA: number, eloB: number): number {
  const similarity = 1000 / (Math.abs(eloA - eloB) + 50)
  const quality = Math.max(eloB, 1) / 1200
  return similarity * quality
}

export function pickWeightedIndex(weights: number[]): number {
  const sum = weights.reduce((a, b) => a + b, 0)
  if (sum <= 0) {
    return Math.floor(Math.random() * weights.length)
  }
  let r = Math.random() * sum
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i]
    if (r <= 0) return i
  }
  return weights.length - 1
}

/**
 * Picks name A (anchor) then name B (challenger) from `pool` without replacement.
 */
export function pickWeightedPair(pool: AppName[]): { a: AppName; b: AppName } {
  if (pool.length < 2) {
    throw new Error('pickWeightedPair requires at least two names')
  }
  const idxA = pickWeightedIndex(pool.map((n) => anchorWeight(n.currentElo)))
  const a = pool[idxA]
  const rest = pool.filter((_, i) => i !== idxA)
  const idxB = pickWeightedIndex(
    rest.map((n) => challengerWeight(a.currentElo, n.currentElo)),
  )
  const b = rest[idxB]
  return { a, b }
}

export function matchupDedupeKey(
  questionId: string,
  idA: string,
  idB: string,
): string {
  const [x, y] = idA < idB ? [idA, idB] : [idB, idA]
  return `${questionId}:${x}:${y}`
}

const MAX_MATCHUP_ATTEMPTS = 400

/**
 * Samples anchor + challenger + a question such that the (sorted pair, question) key is not in `usedKeys`.
 */
export function sampleMatchup(
  names: AppName[],
  questions: SurveyQuestion[],
  usedKeys: ReadonlySet<string>,
): { a: AppName; b: AppName; question: SurveyQuestion } | null {
  if (names.length < 2 || questions.length === 0) return null

  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5)

  for (let attempt = 0; attempt < MAX_MATCHUP_ATTEMPTS; attempt++) {
    const { a, b } = pickWeightedPair(names)
    for (const q of shuffledQuestions) {
      const key = matchupDedupeKey(q.id, a.id, b.id)
      if (!usedKeys.has(key)) {
        return { a, b, question: q }
      }
    }
  }

  return null
}
