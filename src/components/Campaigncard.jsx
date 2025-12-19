import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users } from 'lucide-react';

const CampaignCard = ({ campaign }) => {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 group">
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
          {campaign.category}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{campaign.title}</h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 text-emerald-600" />
          <span className="truncate">{campaign.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2 grow">
          {campaign.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-emerald-700">${campaign.raised.toLocaleString()}</span>
            <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-5 pt-4 border-t border-gray-100">
          <div className="flex items-center">
             <Clock className="w-3 h-3 mr-1" />
             <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
             <Users className="w-3 h-3 mr-1" />
             <span>{campaign.volunteersNeeded} vols needed</span>
          </div>
        </div>
        
        <Link 
          to={`/campaigns/${campaign._id}`} 
          className="w-full block text-center bg-emerald-600 text-white font-bold py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;