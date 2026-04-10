import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import {
  NAME_SURVEY_SUGGESTION_LINE_MAX,
  NAME_SURVEY_SUGGESTION_MAX_LINES,
  NAME_SURVEY_SUGGESTION_RAW_MAX,
} from './parseSuggestionLines'

export interface NameSuggestionEntryProps {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

const NameSuggestionEntry: React.FC<NameSuggestionEntryProps> = ({
  id = 'name-survey-suggestions',
  value,
  onChange,
  disabled,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id} className="text-base font-normal text-muted-foreground">
        Optional — one name per line is fine.
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={NAME_SURVEY_SUGGESTION_RAW_MAX}
        placeholder="Type any names you’d like us to consider…"
        rows={4}
        className="resize-y min-h-[100px] bg-background"
        aria-describedby={`${id}-hint`}
      />
      <p id={`${id}-hint`} className="text-xs text-muted-foreground">
        Up to {NAME_SURVEY_SUGGESTION_RAW_MAX.toLocaleString()} characters; each line is saved
        as one idea (max {NAME_SURVEY_SUGGESTION_LINE_MAX} characters,{' '}
        {NAME_SURVEY_SUGGESTION_MAX_LINES} lines).
      </p>
    </div>
  )
}

export default NameSuggestionEntry
