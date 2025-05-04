import React from 'react';
import ProcessStep from './ProcessStep';

export const Process: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Free Consultation",
      description: "We start with a 30-minute call to discuss your needs and determine if we're a good fit for each other."
    },
    {
      number: 2,
      title: "Paid Discovery",
      description: "A fixed-price assessment ($500-1000) that provides a detailed analysis of your needs and potential solutions."
    },
    {
      number: 3,
      title: "Implementation",
      description: "Based on the discovery findings, we'll present a clear proposal with fixed pricing and begin implementation."
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