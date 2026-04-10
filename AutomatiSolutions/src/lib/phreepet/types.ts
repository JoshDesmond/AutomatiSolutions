export interface AppName {
  id: string
  shortName: string
  extendedName: string
  currentElo: number
  totalMatches: number
}

export interface SurveyQuestion {
  id: string
  text: string
}

/** One head-to-head round shown to the participant. */
export interface SurveyPrompt {
  question: SurveyQuestion
  nameA: AppName
  nameB: AppName
}

export interface ComparisonResult {
  questionId: string
  /** Contestant shown as option A (order matters for Elo replay). */
  contestantAId: string
  /** Contestant shown as option B. */
  contestantBId: string
  /** When true, the round was skipped; omit winner/Elo fields in storage. */
  isSkip?: boolean
  winnerId?: string
  loserId?: string
  initialEloA?: number
  initialEloB?: number
  finalEloA?: number
  finalEloB?: number
}

export interface SurveySession {
  sessionId: string
  startTime: number
  results: ComparisonResult[]
  suggestions: string[]
}

/** One row from `NameSurveyStore.getLeaderboard()` with Elo-vs-leader metrics. */
export interface LeaderboardRow {
  rank: number
  id: string
  shortName: string
  extendedName: string
  currentElo: number
  /** Expected score for this name vs #1 in one game (0–1). */
  winProbabilityVsLeader: number
  /** Visual bar width 0–100; #1 uses 2× normalization → 100%. */
  barWidthPercent: number
}
