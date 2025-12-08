import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight } from 'lucide-react';

const CampaignCard = ({ campaign }) => {
  // Calculate percentage for progress bar
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group">
      
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
            <span>{campaign.supporters} Supporters</span>
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
};

export default CampaignCard;