import React from 'react';
import { UserPlus, Search, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <UserPlus className="w-8 h-8 text-white" />,
      title: "Create an Account",
      description: "Sign up as a volunteer or a donor. It takes less than 2 minutes to join our community of changemakers."
    },
    {
      id: 2,
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Find Your Cause",
      description: "Browse active campaigns. Filter by 'Volunteers Needed' or 'Donations Needed' to see where you fit in."
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Track the Impact",
      description: "Transparency is key. Watch the progress bars fill up and receive updates on how your contribution was used."
    }
  ];

  return (
    <section className="py-20 bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-emerald-200 text-lg">
            Making a difference shouldn't be complicated.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              
              {/* Icon Circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600 shadow-lg shadow-emerald-600/50 mb-6 z-10 relative">
                {step.icon}
              </div>

              {/* Connector Line (Hidden on mobile, visible on desktop) */}
              {step.id !== 3 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-emerald-700 z-0"></div>
              )}

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-emerald-200 max-w-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;