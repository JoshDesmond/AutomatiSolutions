import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Automati Solutions</h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#services" className="text-gray-600 hover:text-indigo-600">Services</a></li>
            <li><a href="#process" className="text-gray-600 hover:text-indigo-600">Process</a></li>
            <li><a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a></li>
          </ul>
        </nav>
        <button className="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 