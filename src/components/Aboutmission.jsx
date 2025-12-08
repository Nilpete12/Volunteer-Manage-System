import React from 'react';
import { Target, Shield, Users, Globe } from 'lucide-react';

const AboutMission = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        
        {/* Text Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Problem with Traditional Giving
          </h2>
          <div className="prose text-gray-600 text-lg space-y-4">
            <p>
              Millions of people want to help, but they often hesitate. Why? 
              <strong> Lack of trust.</strong> When you donate to a traditional charity, 
              it often feels like dropping a coin into a black hole. You rarely see 
              exactly where that specific dollar went.
            </p>
            <p>
              We built <strong>VolunTrack</strong> to change that. We believe that 
              every donor deserves to see the destination of their contribution, and 
              every volunteer deserves to see the tangible results of their hard work.
            </p>
          </div>
          
          {/* Core Values List */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-emerald-600" />
              <span className="font-semibold text-gray-800">100% Transparency</span>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6 text-emerald-600" />
              <span className="font-semibold text-gray-800">Direct Impact</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-emerald-600" />
              <span className="font-semibold text-gray-800">Community First</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-6 w-6 text-emerald-600" />
              <span className="font-semibold text-gray-800">Global Reach</span>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="mt-10 lg:mt-0 relative">
           <div className="absolute inset-0 bg-emerald-200 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
           <img 
             src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
             alt="Team planning session" 
             className="rounded-3xl shadow-xl w-full object-cover"
           />
        </div>
      </div>
    </section>
  );
};

export default AboutMission;