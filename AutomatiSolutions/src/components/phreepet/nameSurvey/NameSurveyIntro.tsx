import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { NUM_QUESTIONS } from './constants'
import NameSuggestionEntry from './NameSuggestionEntry'

export interface NameSurveyIntroProps {
  suggestionText: string
  onSuggestionChange: (value: string) => void
  onStart: () => void
  disabled?: boolean
  isStarting?: boolean
  className?: string
}

const NameSurveyIntro: React.FC<NameSurveyIntroProps> = ({
  suggestionText,
  onSuggestionChange,
  onStart,
  disabled,
  isStarting,
  className,
}) => {
  return (
    <div className={cn('space-y-8', className)}>
      <div className="space-y-4 text-base leading-relaxed text-foreground">
        <p>
          Hello! The following is a quick survey to gather feedback on app names for the
          productivity pet simulator I&apos;ve built. It shouldn&apos;t take long!
        </p>
        <p className="font-medium text-foreground">Before starting, are there any names you would like to suggest?</p>
        <NameSuggestionEntry
          value={suggestionText}
          onChange={onSuggestionChange}
          disabled={disabled || isStarting}
        />
        <p className="text-muted-foreground">
          Great! I am going to show two names on screen, as well as an associated question
          evaluating which name is a better choice. There will be {NUM_QUESTIONS} questions in
          total.
        </p>
      </div>

      <Button
        type="button"
        size="lg"
        className="w-full sm:w-auto min-w-[200px]"
        onClick={onStart}
        disabled={disabled || isStarting}
      >
        {isStarting ? 'Starting…' : 'Start survey'}
      </Button>
    </div>
  )
}

export default NameSurveyIntro
