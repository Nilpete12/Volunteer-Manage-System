import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="relative text-center font-sans min-h-screen bg-green-50 flex flex-col justify-center items-center p-4">
      
      {/* --- Wall Container Wrapper --- */}
      <div className="flex justify-center flex-wrap gap-8 mb-12">
        {[4, 0, 4].map((num, index) => (
          <div key={index} className="relative w-[150px] h-[200px] bg-gray-200 border-4 border-gray-300 rounded shadow-inner overflow-hidden group">
            <p className="absolute inset-0 flex items-center justify-center text-[#5D1E19] text-7xl font-bold z-0">
              {num}
            </p>
            {/* Door animation on hover */}
            <div className="door absolute inset-0 bg-emerald-700 border-l-4 border-emerald-900 origin-left transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(-110deg)] z-10"></div>
          </div>
        ))}
      </div>

      {/* --- Text & Button Section --- */}
      <div className="text-center max-w-lg">
        <h2 className="text-3xl font-bold uppercase mb-4 text-gray-800">
          Something went wrong
        </h2>
        <p className="mb-8 text-gray-600">
          We encountered an unexpected error. But don't worry, Thor is on the case! Click below to return home.
        </p>
        
        <Link 
          to="/" 
          className="inline-block px-12 py-4 text-sm font-bold text-emerald-600 uppercase border-[3px] border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300"
        >
          Return to the Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;