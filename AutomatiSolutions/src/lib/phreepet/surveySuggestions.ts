/** Total characters accepted in the suggestion textarea (abuse / document size). */
export const NAME_SURVEY_SUGGESTION_RAW_MAX = 2000

/** Max length per line after trim (individual name ideas). */
export const NAME_SURVEY_SUGGESTION_LINE_MAX = 100

/** Max number of non-empty lines stored. */
export const NAME_SURVEY_SUGGESTION_MAX_LINES = 40

function clipLines(lines: string[]): string[] {
  return lines
    .map((s) => s.trim().slice(0, NAME_SURVEY_SUGGESTION_LINE_MAX))
    .filter(Boolean)
    .slice(0, NAME_SURVEY_SUGGESTION_MAX_LINES)
}

/**
 * Normalizes user suggestion text for storage: caps raw size, line length, and line count.
 */
export function parseSuggestionLines(raw: string): string[] {
  const clipped = raw.slice(0, NAME_SURVEY_SUGGESTION_RAW_MAX)
  return clipLines(clipped.split(/\r?\n/))
}

/**
 * Defensive clamp when suggestions are passed as an array (e.g. before Firestore write).
 */
export function sanitizeSuggestionList(suggestions: string[]): string[] {
  return clipLines(suggestions)
}
