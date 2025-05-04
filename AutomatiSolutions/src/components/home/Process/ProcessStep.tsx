import React from 'react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description }) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
        <span className="text-lg font-bold">{number}</span>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default ProcessStep; 