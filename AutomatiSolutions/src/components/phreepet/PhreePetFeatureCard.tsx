import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const bandClass =
  'hidden md:block md:flex-1 min-w-0 min-h-0 bg-gray-950/55 self-stretch'

export type PhreePetFeatureCardProps = {
  imageSrc: string
  imageAlt: string
  captionTitle: string
  captionBody: string
  className?: string
  style?: React.CSSProperties
}

const PhreePetFeatureCard = forwardRef<HTMLDivElement, PhreePetFeatureCardProps>(
  function PhreePetFeatureCard(
    { imageSrc, imageAlt, captionTitle, captionBody, className, style },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'h-full max-h-full min-h-0 rounded-2xl bg-gray-800/70 backdrop-blur-md border border-gray-700/80 shadow-lg shadow-black/20 overflow-hidden flex flex-col md:flex-row md:items-stretch p-0',
          className
        )}
        style={style}
      >
        <div
          className={cn(
            'flex w-full min-h-0 flex-[4] flex-row items-stretch overflow-hidden bg-gray-950/55',
            'md:flex-[0_0_auto] md:h-full md:max-h-full md:w-auto md:max-w-[min(50%,28rem)] md:self-stretch md:shrink-0'
          )}
        >
          <div className={bandClass} aria-hidden />
          <div className="flex h-full min-h-0 min-w-0 flex-1 md:shrink-0 md:flex-none md:w-auto items-center justify-center self-stretch">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="block h-full max-h-full w-auto max-w-full object-contain"
            />
          </div>
          <div className={bandClass} aria-hidden />
        </div>
        <div className="px-4 sm:px-5 pt-3 pb-3 sm:pb-4 md:py-5 md:pl-7 md:pr-5 flex flex-[3] min-h-0 min-w-0 flex-col justify-center text-center md:text-left overflow-y-auto md:flex-1 md:min-w-0">
          <p className="text-base sm:text-lg font-semibold text-white leading-snug">
            {captionTitle}
          </p>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-400 leading-relaxed">
            {captionBody}
          </p>
        </div>
      </div>
    )
  }
)

export default PhreePetFeatureCard
