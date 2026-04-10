import { cn } from '@/lib/utils'

export interface NameSurveyProgressProps {
  /** 1-based step for display (e.g. question 1 of N). */
  currentStep: number
  total: number
  className?: string
}

const NameSurveyProgress: React.FC<NameSurveyProgressProps> = ({
  currentStep,
  total,
  className,
}) => {
  const pct = total > 0 ? Math.min(100, (currentStep / total) * 100) : 0

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Progress</span>
        <span className="tabular-nums font-medium text-foreground">
          {currentStep} / {total}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default NameSurveyProgress
