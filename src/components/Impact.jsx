import React, { useState } from 'react';
import { CheckCircle, TrendingUp, Clock, Users } from 'lucide-react';

const ImpactSection = () => {
  // State to control the position of the slider (0 to 100%)
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  // Stat card component for reusability
  const StatCard = ({ icon, number, label, delay }) => (
    <div 
      className={`flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-fade-in-up`}
      style={{ animationDelay: delay }} // Staggered entrance animation
    >
      <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{number}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Left Side: Text & Stats --- */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              See the <span className="text-emerald-600">Difference</span> You Make
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Transparency is our core principle. We don't just collect donations; we track them to completion. See the tangible results of collective volunteer hours and funding.
            </p>

            {/* Stats Grid with subtle animations */}
            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard icon={<CheckCircle className="w-6 h-6" />} number="1,420+" label="Projects Completed" delay="0ms" />
              <StatCard icon={<Users className="w-6 h-6" />} number="85,000" label="Lives Impacted" delay="100ms" />
              <StatCard icon={<Clock className="w-6 h-6" />} number="320k+" label="Volunteer Hours" delay="200ms" />
              <StatCard icon={<TrendingUp className="w-6 h-6" />} number="94%" label="Fund Efficiency Rate" delay="300ms" />
            </div>
          </div>

          {/* --- Right Side: Interactive Before/After Slider --- */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            
            {/* The "Before" Image (Background) - Messy Beach */}
            <img 
              src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
              alt="Before cleanup" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Label for Before */}
            <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-bold z-20 backdrop-blur-sm">BEFORE</span>

            {/* The "After" Image (Foreground) - Clean Beach */}
            {/* We clip this image based on slider state */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80"
                alt="After cleanup" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            {/* Label for After */}
            <span className="absolute top-4 right-4 bg-emerald-600/80 text-white px-3 py-1 rounded text-sm font-bold z-20 backdrop-blur-sm">AFTER YOUR HELP</span>
            </div>

            {/* The Slider Mechanism & Handle */}
            <div className="absolute inset-0 w-full h-full group">
               {/* The invisible range input that captures user drag */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Compare before and after images"
              />
              
              {/* The visible vertical line handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)] transition-all group-hover:bg-emerald-400"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* The circle knob on the handle */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;