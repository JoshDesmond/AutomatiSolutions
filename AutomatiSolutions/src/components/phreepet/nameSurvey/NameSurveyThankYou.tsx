import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface NameSurveyThankYouProps {
  className?: string
}

const NameSurveyThankYou: React.FC<NameSurveyThankYouProps> = ({ className }) => {
  return (
    <div className={cn('space-y-4 text-center sm:text-left', className)}>
      <p className="text-2xl font-semibold text-foreground">Thank you!</p>
      <p className="text-base leading-relaxed text-muted-foreground">
        I appreciate your input! This will be very helpful.
      </p>
      <p className="text-base font-medium text-foreground">Would you like to:</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // TODO: answer 30 more questions
            console.log('TODO: answer 30 more questions')
          }}
        >
          Answer 30 more questions
        </Button>
        <Button variant="default" asChild>
          <Link to="/products/phreepet/name-results">See current results</Link>
        </Button>
      </div>
    </div>
  )
}

export default NameSurveyThankYou
