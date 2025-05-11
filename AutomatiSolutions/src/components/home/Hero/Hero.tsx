import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="md:max-w-2xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            <span className="block">Tech Solutions</span>
            <span className="block">For Small Businesses</span>
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            I build custom web apps, automate workflows, and implement AI solutions that make your small business more efficient and competitive. 
          </p>
          <div className="mt-8 flex flex-col md:flex-row md:space-x-4">
            <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
              Book Free Consultation
            </a>
            <a href="#services" className="mt-3 md:mt-0 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 