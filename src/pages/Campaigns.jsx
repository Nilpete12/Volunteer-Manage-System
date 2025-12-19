import React, { useState, useEffect } from 'react';
import CampaignCard from '../components/Campaigncard';
// 1. ADDED 'Plus' to imports
import { Search, Filter, Plus } from 'lucide-react';
// 2. ADDED 'Link' for navigation
import { Link } from 'react-router-dom';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/campaigns');
      const data = await response.json();
      setCampaigns(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || campaign.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Environment", "Education", "Healthcare", "Animal Welfare", "Disaster Relief"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative"> 
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Active Campaigns</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover causes that need your help right now. Join thousands of volunteers making a difference.
          </p>

          {/* --- 3. NEW BUTTON ADDED HERE --- */}
          <div className="mt-6 md:absolute md:right-0 md:top-0 md:mt-0">
             <Link 
               to="/create-campaign" 
               className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
             >
               <Plus className="h-5 w-5 mr-2" />
               Start Campaign
             </Link>
          </div>
          {/* ------------------------------- */}
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
               <Filter className="h-full w-full" />
             </div>
             <h3 className="text-lg font-medium text-gray-900">No campaigns found</h3>
             <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
             <button 
               onClick={() => {setSearchTerm(""); setCategoryFilter("All");}}
               className="mt-6 text-emerald-600 font-medium hover:underline"
             >
               Clear all filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;