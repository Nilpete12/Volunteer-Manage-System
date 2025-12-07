import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Clock, Users, ArrowRight, Heart } from 'lucide-react';

const FeaturedCampaigns = () => {
  // --- Mock Data (Replace with API data later) ---
  const campaigns = [
    {
      id: 1,
      title: "Clean Water for Rural Villages",
      description: "Help us install solar-powered water pumps in drought-affected regions. Every drop counts.",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 8500,
      goal: 12000,
      daysLeft: 12,
      category: "Environment",
      isUrgent: false
    },
    {
      id: 2,
      title: "Emergency Food Relief",
      description: "Providing hot meals and essential supplies to families displaced by recent floods.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 4500,
      goal: 5000,
      daysLeft: 3,
      category: "Disaster Relief",
      isUrgent: true // This triggers the red badge
    },
    {
      id: 3,
      title: "Community Education Center",
      description: "We need 50 volunteers to help paint and set up the new library for underprivileged kids.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 1200,
      goal: 3000,
      daysLeft: 20,
      category: "Education",
      isUrgent: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured <span className="text-emerald-600">Campaigns</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Causes that need your immediate attention. contribute today and track the impact.
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => {
            // Calculate percentage for progress bar
            const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);
            
            return (
              <div key={campaign.id} className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group">
                
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                    src={campaign.image} 
                    alt={campaign.title} 
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm uppercase tracking-wide">
                    {campaign.category}
                  </div>
                  {/* Urgent Badge */}
                  {campaign.isUrgent && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">
                      URGENT
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-emerald-700">${campaign.raised.toLocaleString()} Raised</span>
                        <span className="text-gray-400">of ${campaign.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-emerald-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Meta Details */}
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-emerald-500" />
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-emerald-500" />
                      <span>{Math.floor(Math.random() * 50) + 10} Supporters</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    to={`/campaigns/${campaign.id}`}
                    className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-emerald-600 focus:outline-none transition-colors duration-200"
                  >
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link to="/campaigns" className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-700">
            View all causes <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCampaigns;