import React, { useState } from 'react';
import CampaignCard from '../components/Campaigncard'; 
import { Search, Filter } from 'lucide-react';

const AllCampaigns = () => {
  const allCampaigns = [
    {
      id: 1,
      title: "Clean Water for Rural Villages",
      description: "Help us install solar-powered water pumps in drought-affected regions. Every drop counts.",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 8500,
      goal: 12000,
      daysLeft: 12,
      supporters: 142,
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
      supporters: 320,
      category: "Disaster Relief",
      isUrgent: true
    },
    {
      id: 3,
      title: "Community Education Center",
      description: "We need 50 volunteers to help paint and set up the new library for underprivileged kids.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 1200,
      goal: 3000,
      daysLeft: 20,
      supporters: 45,
      category: "Education",
      isUrgent: false
    },
    {
      id: 4,
      title: "Save the stray dogs",
      description: "Medical supplies and shelter renovation for the local animal sanctuary.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 800,
      goal: 5000,
      daysLeft: 15,
      supporters: 28,
      category: "Animal Welfare",
      isUrgent: true
    },
    {
      id: 5,
      title: "Tech for Teens",
      description: "Donating laptops and providing coding workshops for high school students.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 15000,
      goal: 20000,
      daysLeft: 45,
      supporters: 210,
      category: "Education",
      isUrgent: false
    },
    {
      id: 6,
      title: "Beach Cleanup Drive",
      description: "Join 200 volunteers this weekend to clean up the coastlines.",
      image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      raised: 500,
      goal: 2000,
      daysLeft: 5,
      supporters: 89,
      category: "Environment",
      isUrgent: false
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Unique categories for the buttons
  const categories = ["All", "Environment", "Disaster Relief", "Education", "Animal Welfare"];

  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="bg-emerald-900 py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Find a Cause</h1>
        <p className="mt-2 text-emerald-100">Discover projects that need your help today.</p>
      </div>

      {/* Controls Section (Search & Filter) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
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

            {/* Category Filter Buttons */}
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
        {filteredCampaigns.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No campaigns found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategory("All")}}
              className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCampaigns;