import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { AppName, SurveyPrompt } from '@/lib/phreepet/types'

import NameSurveyProgress from './NameSurveyProgress'

export interface NameSurveyQuestionViewProps {
  prompt: SurveyPrompt
  selectedWinnerId: string | null
  onSelectWinner: (id: string) => void
  onNext: () => void
  onSkip: () => void
  nextDisabled: boolean
  nextLabel?: string
  /** 1-based index shown in the progress bar (e.g. completed + 1 while a round is active). */
  progressStep: number
  total: number
  /** Omit on the first question and on the final question. */
  onUndo?: () => void
  className?: string
}

function NameCard({
  name,
  sideLabel,
  selected,
  onSelect,
}: {
  name: AppName
  sideLabel: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex flex-1 flex-col items-stretch rounded-xl border-2 bg-card p-5 text-left shadow-sm transition-all',
        'hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected
          ? 'border-primary ring-2 ring-primary/20 shadow-md'
          : 'border-border',
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {sideLabel}
      </span>
      <span className="mt-2 text-xl font-semibold tracking-tight text-card-foreground">
        {name.shortName}
      </span>
      <span className="mt-1 text-sm leading-snug text-muted-foreground">{name.extendedName}</span>
    </button>
  )
}

const NameSurveyQuestionView: React.FC<NameSurveyQuestionViewProps> = ({
  prompt,
  selectedWinnerId,
  onSelectWinner,
  onNext,
  onSkip,
  nextDisabled,
  nextLabel = 'Next',
  progressStep,
  total,
  onUndo,
  className,
}) => {
  const { question, nameA, nameB } = prompt

  return (
    <div className={cn('space-y-8', className)}>
      <div className="flex items-start justify-between gap-4">
        <p className="min-w-0 flex-1 text-lg font-medium leading-snug text-foreground md:text-xl">
          {question.text}
        </p>
        {onUndo ? (
          <button
            type="button"
            onClick={onUndo}
            className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Undo
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <NameCard
          name={nameA}
          sideLabel="Name A"
          selected={selectedWinnerId === nameA.id}
          onSelect={() => onSelectWinner(nameA.id)}
        />
        <NameCard
          name={nameB}
          sideLabel="Name B"
          selected={selectedWinnerId === nameB.id}
          onSelect={() => onSelectWinner(nameB.id)}
        />
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3 order-2 sm:order-1">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[120px]"
            onClick={onSkip}
          >
            Skip
          </Button>
          <Button
            type="button"
            size="lg"
            className="w-full sm:w-auto min-w-[160px]"
            onClick={onNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </Button>
        </div>
        <NameSurveyProgress
          currentStep={progressStep}
          total={total}
          className="w-full sm:max-w-xs order-1 sm:order-2"
        />
      </div>
    </div>
  )
}

export default NameSurveyQuestionView
