import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import CampaignCard from '../components/Campaigncard'; 
import { Search, Filter, PlusCircle, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllCampaigns = () => {
  // 1. STATE FOR DATA
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Environment", "Disaster Relief", "Education", "Animal Welfare", "Healthcare", "Other"];

  // 2. FETCH DATA FROM SERVER
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/campaigns');
        
        // Transform Backend Data
        const formattedData = res.data.map(item => ({
          ...item,
          id: item._id, 
          raised: item.raisedAmount || 0,
          goal: item.goalAmount,
          supporters: item.volunteersRegistered || 0,
          daysLeft: calculateDaysLeft(item.deadline),
          isUrgent: calculateDaysLeft(item.deadline) < 5 
        }));

        setCampaigns(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns. Please try again later.");
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Helper: Calculate Days Left
  const calculateDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0; 
  };

  // 3. FILTER LOGIC (UPDATED WITH SECURITY CHECK)
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || campaign.category === selectedCategory;
    
    // --- THIS IS THE CRITICAL FIX ---
    // Only show campaigns that are explicitly 'active' (approved)
    const isActive = campaign.status === 'active'; 

    return matchesSearch && matchesCategory && isActive;
  });

  // 4. LOADING STATE VIEW
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading causes...</p>
        </div>
      </div>
    );
  }

  // 5. MAIN RENDER
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="bg-emerald-900 py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
           <div className="absolute left-0 bottom-0 w-64 h-64 bg-emerald-400 rounded-full mix-blend-overlay blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Find a Cause</h1>
          <p className="mt-2 text-emerald-100 max-w-2xl mx-auto">
            Discover projects that need your help today. Or, if you have a vision for change, start your own initiative.
          </p>
          
          {/* Create Button */}
          <div className="mt-8">
            <Link 
              to="/create-campaign" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-emerald-900 bg-emerald-100 hover:bg-white transition-all shadow-lg hover:shadow-emerald-900/50 transform hover:-translate-y-1"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Start a Campaign
            </Link>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 z-10 relative">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        {filteredCampaigns.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          !loading && (
            // Empty State
            <div className="text-center py-20">
              <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No active campaigns found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
                className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Clear all filters
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllCampaigns;