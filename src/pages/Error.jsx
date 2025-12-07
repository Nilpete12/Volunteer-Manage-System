import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="relative text-center font-['Open_Sans'] h-screen bg-amber-100 flex flex-col justify-center items-center">
      
      {/* --- Wall Container Wrapper --- */}
      <div className="flex justify-center flex-wrap gap-8">
        
        {/* Wall 1 (Number 4) */}
        <div className="relative w-[150px] h-[200px] bg-[url('http://i66.tinypic.com/jl1lsn.png')] inline-block">
          <p className="absolute top-1/4 left-1/4 text-[#5D1E19] text-[5em] font-['Press_Start_2P'] z-0">
            4
          </p>
          <div className="door inline-block w-[150px] h-[210px] bg-[url('http://i63.tinypic.com/2dhh206.png')] bg-cover bg-center bg-no-repeat origin-left transition-all duration-1000 ease-in-out hover:transform-[[scale(0.2,1)_skew(0deg,20deg)] z-10 relative"></div>
        </div>

        {/* Wall 2 (Number 0) */}
        <div className="relative w-[150px] h-[200px] bg-[url('http://i66.tinypic.com/jl1lsn.png')] inline-block">
          <p className="absolute top-1/4 left-1/4 text-[#5D1E19] text-[5em] font-['Press_Start_2P'] z-0">
            0
          </p>
          <div className="door inline-block w-[150px] h-[210px] bg-[url('http://i63.tinypic.com/2dhh206.png')] bg-cover bg-center bg-no-repeat origin-left transition-all duration-1000 ease-in-out hover:transform-[scale(0.2,1)_skew(0deg,20deg)] z-10 relative"></div>
        </div>

        {/* Wall 3 (Number 4) */}
        <div className="relative w-[150px] h-[200px] bg-[url('http://i66.tinypic.com/jl1lsn.png')] inline-block">
          <p className="absolute top-1/4 left-1/4 text-[#5D1E19] text-[5em] font-['Press_Start_2P'] z-0">
            4
          </p>
          <div className="door inline-block w-[150px] h-[210px] bg-[url('http://i63.tinypic.com/2dhh206.png')] bg-cover bg-center bg-no-repeat origin-left transition-all duration-1000 ease-in-out hover:transform-[scale(0.2,1)_skew(0deg,20deg)] z-10 relative"></div>
        </div>
      </div>

      {/* --- Text & Button Section --- */}
      <div className="mt-8 mb-8 text-center">
        <h2 className="text-4xl uppercase font-['Press_Start_2P'] mb-4 text-gray-800">
          Getting Lost is bad
        </h2>
        <p className="mb-8 text-gray-600">
          But don't worry, just click the button below and you'll be redirected to the homepage.
        </p>
        
        <Link 
          to="/" 
          className="inline-block px-12 py-4 text-base font-bold text-[#797979] uppercase border-[3px] border-amber-400 hover:bg-amber-400 hover:text-white transition-colors duration-300 font-['Open_Sans']"
        >
          Return to the Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;