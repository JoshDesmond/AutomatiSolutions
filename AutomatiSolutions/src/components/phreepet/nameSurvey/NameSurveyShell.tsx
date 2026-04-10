import { cn } from '@/lib/utils'

export interface NameSurveyShellProps {
  children: React.ReactNode
  className?: string
}

/** Standalone chrome for the experiment (no site header). */
const NameSurveyShell: React.FC<NameSurveyShellProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-gradient-to-b from-muted/40 to-background', className)}>
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <header className="border-b border-border/60 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Name Survey</h1>
        </header>
        <div className="pt-8 sm:pt-10">{children}</div>
      </main>
    </div>
  )
}

export default NameSurveyShell
