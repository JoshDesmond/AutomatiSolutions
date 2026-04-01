import React from 'react';
import { useCalendly } from '@/components/calendly/useCalendly';

const CONTACT_EMAIL = 'jdesmond@automatisolutions.com';

export const Contact: React.FC = () => {
  const { openPopup, isReady } = useCalendly();

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Let's talk about your project
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Book a free 30–60 minute consultation. I'll learn about your
            business, understand what's slowing you down, and share honest
            recommendations on the best path forward.
          </p>

          <button
            type="button"
            disabled={!isReady}
            onClick={openPopup}
            className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book a Free Consultation
          </button>

          <p className="mt-4 text-sm text-gray-500">
            Prefer email?{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-indigo-600 hover:text-indigo-700 underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
