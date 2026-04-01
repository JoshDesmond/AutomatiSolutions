import React from 'react';
import ProcessStep from './ProcessStep';

export const Process: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Free Consultation",
      description: "Book a 30–60 minute call so I can learn about your business, understand what's slowing you down, and see if I can help."
    },
    {
      number: 2,
      title: "Proposal & Recommendations",
      description: "I'll research your situation and come back with honest recommendations — whether that's custom development, an existing tool, or a combination of both."
    },
    {
      number: 3,
      title: "Implementation",
      description: "If custom work is the right fit, I'll deliver a clear project plan with fixed pricing and build the solution from start to finish."
    }
  ];

  return (
    <section id="process" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Working Together</h2>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
            A simple, transparent process
          </p>
        </div>
        <div className="mt-12">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className={index > 0 ? "mt-10 lg:mt-0" : ""}>
                <ProcessStep
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process; 