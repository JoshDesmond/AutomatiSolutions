import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

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
        placeholder="Type any names you’d like us to consider…"
        rows={4}
        className="resize-y min-h-[100px] bg-background"
      />
    </div>
  )
}

export default NameSuggestionEntry
