import React from 'react'
import { DEFAULT_CALENDLY_URL, useCalendly } from './useCalendly'

export type CalendlyCTAProps = {
  calendlyUrl?: string
  title?: string
  subtitle?: string
  buttonLabel?: string
  contactEmail?: string
  className?: string
}

const DEFAULT_EMAIL = 'jdesmond@automatisolutions.com'

export const CalendlyCTA: React.FC<CalendlyCTAProps> = ({
  calendlyUrl = DEFAULT_CALENDLY_URL,
  title = 'Book Your Free Consultation',
  subtitle = '30-60 minutes • No obligation • Personalized recommendations',
  buttonLabel = 'Schedule Now →',
  contactEmail = DEFAULT_EMAIL,
  className = '',
}) => {
  const { openPopup, isReady } = useCalendly({ url: calendlyUrl })

  return (
    <div className={`bg-white rounded-lg p-8 max-w-md mx-auto ${className}`.trim()}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{subtitle}</p>

      <button
        type="button"
        disabled={!isReady}
        onClick={openPopup}
        className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {buttonLabel}
      </button>

      <p className="mt-4 text-sm text-gray-500">
        or email{' '}
        <a
          href={`mailto:${contactEmail}`}
          className="text-indigo-600 hover:text-indigo-700"
        >
          {contactEmail}
        </a>
      </p>
    </div>
  )
}

export default CalendlyCTA
