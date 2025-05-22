import React, { useState, useEffect } from 'react';
import textureBg from '../../../assets/Texture.jpg';

export const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = textureBg;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <section className="relative py-16 md:py-24">
      {/* Background image container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 transition-opacity duration-300"
        style={{
          backgroundImage: `url(${textureBg})`,
          opacity: isLoaded ? 0.15 : 0,
          filter: isLoaded ? 'none' : 'blur(20px)'
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 z-0" />
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left z-20">
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