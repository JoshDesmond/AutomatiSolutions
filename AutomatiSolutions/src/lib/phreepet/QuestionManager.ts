import { sampleMatchup, matchupDedupeKey } from './EloEngine'
import type { AppName, SurveyPrompt, SurveyQuestion } from './types'

export const NAME_SURVEY_DECK_SIZE = 30

/**
 * Builds a 30-question deck with deduplicated (name pair ∪ question) keys per session.
 * Uses the shared sampling helpers in EloEngine.
 */
export class QuestionManager {
  private readonly usedKeys = new Set<string>()

  constructor(
    private readonly names: AppName[],
    private readonly questions: SurveyQuestion[],
    private readonly deckSize: number = NAME_SURVEY_DECK_SIZE,
  ) {}

  get usedMatchupCount(): number {
    return this.usedKeys.size
  }

  hasKeyFor(questionId: string, idA: string, idB: string): boolean {
    return this.usedKeys.has(matchupDedupeKey(questionId, idA, idB))
  }

  rememberPrompt(prompt: SurveyPrompt): void {
    this.usedKeys.add(matchupDedupeKey(prompt.question.id, prompt.nameA.id, prompt.nameB.id))
  }

  /** Removes a drawn (but not yet answered) matchup so the deck can sample again after undo. */
  forgetPrompt(prompt: SurveyPrompt): void {
    this.usedKeys.delete(matchupDedupeKey(prompt.question.id, prompt.nameA.id, prompt.nameB.id))
  }

  /**
   * Next prompt or `null` if the deck is full or sampling failed.
   */
  nextPrompt(completedCount: number): SurveyPrompt | null {
    if (completedCount >= this.deckSize) return null
    const sampled = sampleMatchup(this.names, this.questions, this.usedKeys)
    if (!sampled) return null
    const prompt: SurveyPrompt = {
      question: sampled.question,
      nameA: sampled.a,
      nameB: sampled.b,
    }
    this.rememberPrompt(prompt)
    return prompt
  }
}
