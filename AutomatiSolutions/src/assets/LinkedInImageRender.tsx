import React from 'react';
import { Cpu } from 'lucide-react';
import textureBg from './assets/Texture.jpg';

// LinkedIn Image Component
const LinkedInImage: React.FC = () => {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Web & Mobile Apps",
      description: "Custom applications built with React, React Native, and modern frameworks",
      features: ["Client portals", "Inventory systems", "Mobile apps"]
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: "Data Modernization",
      description: "Transform spreadsheet chaos into organized databases",
      features: ["KPI dashboards", "PostgreSQL", "Data migration"]
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Process Automation",
      description: "Eliminate repetitive tasks with custom scripts and integrations",
      features: ["Data entry automation", "API integrations", "Automated reporting"]
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI Integration",
      description: "Leverage AI power with custom implementations for your workflows",
      features: ["LLM workflows", "Predictive analytics", "AI-assisted processing"]
    }
  ];

  return (
    <div className="w-[1200px] h-[1200px] relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600">
      {/* Background texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${textureBg})` }}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-white mb-3">Automati Solutions</h1>
          <p className="text-3xl text-indigo-100">Custom development without the enterprise price tag</p>
          <div className="w-32 h-1 bg-white/30 mx-auto mt-6"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-10 flex-grow">
          {services.map((service, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center h-24 w-24 rounded-lg bg-white/20 text-white mr-5">
                  {service.icon}
                </div>
                <h3 className="text-4xl font-bold text-white">{service.title}</h3>
              </div>
              <p className="text-2xl text-indigo-100 mb-8">{service.description}</p>
              <ul className="space-y-4 text-indigo-100">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-2xl">
                    <svg className="h-8 w-8 text-white mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <LinkedInImage />
    </div>
  );
}

export default App;