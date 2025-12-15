import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, ArrowRight, HandHeart } from 'lucide-react';
import Donateform from './Donateform';

const Hero = () => {
  // State to control the modal
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      
      {/* --- Include the Modal Component here --- */}
      <Donateform
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />

      {/* Background Image (Same as before) */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1547496614-54ff387d650a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Volunteers working"
        />
        <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/80 to-emerald-900/50 mix-blend-multiply"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="md:w-2/3 lg:w-1/2">
          {/* Badge */}
          <Link to="/Campaigns">
          <div className="inline-flex items-center text-emerald-400 bg-emerald-900/30 rounded-full p-1 pr-4 sm:text-base lg:text-sm xl:text-base font-medium mb-5 ring-1 ring-emerald-400/20">
            <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-emerald-600 rounded-full">New</span>
            <span className="ml-4 text-sm">Emergency Relief Campaign Active</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
          </Link>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Empowerhu Change. <br />
            <span className="block text-emerald-400">Track Real Impact.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300 leading-relaxed">
            Join a movement dedicated to transparency. Whether you give your time or your treasure, see exactly how your contribution transforms lives.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            
            {/* --- UPDATED DONATE BUTTON --- */}
            {/* Instead of a Link, this is now a button that opens the modal */}
            <button
              onClick={() => setIsDonationModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-md text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer"
            >
              <Heart className="w-5 h-5 mr-2 fill-current" />
              Make a Donation
            </button>
            
            {/* Volunteer Button (Still a Link) */}
            <Link 
              to="/register"
              className="inline-flex items-center justify-center px-8 border-2 border-gray-300 text-base font-bold rounded-md text-white hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300 bg-white/10 backdrop-blur-sm"
            >
              <Users className="w-5 h-5 mr-2" />
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar (Same as before) */}
      <div className="relative bg-emerald-800/80 backdrop-blur-md border-t border-emerald-600/30">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-3 text-white text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
               <HandHeart className="h-8 w-8 text-emerald-300 mr-3" />
               <div>
                 <p className="text-2xl font-bold">50+</p>
                 <p className="text-sm text-emerald-200">Active Causes</p>
               </div>
            </div>
             <div className="flex items-center justify-center sm:justify-start border-t sm:border-t-0 sm:border-l border-emerald-600/50 pt-4 sm:pt-0 sm:pl-6">
               <Users className="h-8 w-8 text-emerald-300 mr-3" />
               <div>
                 <p className="text-2xl font-bold">1200+</p>
                 <p className="text-sm text-emerald-200">Volunteers Registered</p>
               </div>
            </div>
             <div className="flex items-center justify-center sm:justify-start border-t sm:border-t-0 sm:border-l border-emerald-600/50 pt-4 sm:pt-0 sm:pl-6">
               <Heart className="h-8 w-8 text-emerald-300 mr-3" />
               <div>
                 <p className="text-2xl font-bold">$672K</p>
                 <p className="text-sm text-emerald-200">Raised Directly</p>
               </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;