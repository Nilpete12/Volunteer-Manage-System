import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // <--- Import Axios
import Donateform from '../components/Donateform'; 
import { 
  Heart, Users, Clock, MapPin, CheckCircle, 
  Share2, Shield, Calendar, ArrowLeft, Loader
} from 'lucide-react';
import Error from './Error';

const CampaignDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  
  // --- STATE FOR DATA & UI ---
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // --- STATE FOR MODAL ---
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  // --- FETCH DATA FROM SERVER ---
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        // fetch by ID from your backend
        const res = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
        setCampaign(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !campaign) {
    return <Error />;
  }

  // --- CALCULATIONS (Using Backend Field Names) ---
  // Backend uses 'raisedAmount' and 'goalAmount'
  const raised = campaign.raisedAmount || 0;
  const goal = campaign.goalAmount || 1; // Avoid divide by zero
  const volRegistered = campaign.volunteersRegistered || 0;
  const volNeeded = campaign.volunteersNeeded || 10; // Default if missing

  const donationProgress = Math.min((raised / goal) * 100, 100);
  const volunteerProgress = Math.min((volRegistered / volNeeded) * 100, 100);

  // Helper for Date display
  const daysLeft = Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* --- ADD MODAL COMPONENT --- */}
      <Donateform 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)}
        initialCampaignId={campaign._id} // MongoDB uses _id
        campaignTitle={campaign.title}
      />

      {/* Breadcrumb / Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-gray-500 truncate hidden sm:block">
            Campaigns / {campaign.category} / <span className="text-gray-900 font-medium">{campaign.title}</span>
          </p>
          <Link to="/campaigns" className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to list
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          
          {/* --- LEFT COLUMN (Story, Image, Details) --- */}
          <div className="lg:col-span-2">
            
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8 relative group">
              <img 
                src={campaign.image} 
                alt={campaign.title} 
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                Verified NGO
              </div>
            </div>

            {/* Title & Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{campaign.title}</h1>
              <div className="flex items-center text-gray-600 text-sm flex-wrap gap-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" /> 
                  <span className="mr-4">{campaign.location}</span>
                </div>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="font-medium text-emerald-700">Organized by {campaign.organizer}</span>
              </div>
            </div>

            {/* TABS SYSTEM */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {['about', 'budget', 'shifts'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-sm font-medium text-center transition-colors whitespace-nowrap ${
                      activeTab === tab 
                      ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'about' && (
                  <div className="prose text-gray-600 max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-line">{campaign.description}</p>
                    <p className="mt-4 font-medium text-emerald-800 bg-emerald-50 p-4 rounded-lg">
                      Your contributions will directly fund the necessary resources and labor required to make this impact reality.
                    </p>
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Where the money goes</h3>
                    {campaign.budget && campaign.budget.length > 0 ? (
                      <div className="space-y-3">
                        {campaign.budget.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">{item.item}</span>
                            <span className="font-mono font-bold text-emerald-700">${item.cost.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center p-3 border-t-2 border-gray-200 mt-2">
                          <span className="font-bold text-gray-900">Total Goal</span>
                          <span className="font-bold text-xl text-gray-900">${goal.toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No budget details provided yet.</p>
                    )}
                  </div>
                )}

                {activeTab === 'shifts' && (
                  <div>
                     <h3 className="font-bold text-gray-900 mb-4">Upcoming Opportunities</h3>
                     {/* NOTE: We haven't added Shifts to the Backend Model yet, so this will be empty for now */}
                     {campaign.shifts && campaign.shifts.length > 0 ? (
                       <div className="space-y-4">
                         {campaign.shifts.map((shift) => (
                           <div key={shift.id || Math.random()} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors cursor-pointer bg-gray-50 hover:bg-white">
                              <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                                 <div>
                                    <p className="font-bold text-gray-900">{shift.task}</p>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                       <Calendar className="w-4 h-4 mr-1" /> {shift.date}
                                       <span className="mx-2 hidden sm:inline">•</span>
                                       <Clock className="w-4 h-4 mr-1 ml-0 sm:ml-0" /> {shift.time}
                                    </div>
                                 </div>
                                 <button className="text-xs font-bold bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full uppercase hover:bg-emerald-200 transition-colors w-full sm:w-auto">
                                   Apply
                                 </button>
                              </div>
                           </div>
                         ))}
                       </div>
                     ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                          <Calendar className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-500">No volunteer shifts scheduled yet.</p>
                          <button className="mt-2 text-emerald-600 font-medium text-sm hover:underline">Contact Organizer</button>
                        </div>
                     )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Sticky Action Card) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Action Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                
                {/* Financial Stats */}
                <div className="mb-8">
                  <div className="flex items-baseline mb-2 flex-wrap">
                      <span className="text-3xl font-extrabold text-gray-900 mr-2">${raised.toLocaleString()}</span>
                      <span className="text-gray-500">raised of ${goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                    <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${donationProgress}%` }}></div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" /> Verified Payment Gateway
                  </div>
                </div>

                {/* Volunteer Stats */}
                <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-blue-900">Volunteers Needed</span>
                      <span className="text-sm font-bold text-blue-600">{volRegistered} / {volNeeded}</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${volunteerProgress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-blue-700 mt-2">
                     <span>{daysLeft > 0 ? `${daysLeft} Days Left` : 'Campaign Ended'}</span>
                     <span>{volNeeded - volRegistered > 0 ? 'Spots Open' : 'Full'}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button 
                    onClick={() => setIsDonationModalOpen(true)}
                    className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-emerald-200 hover:shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center transform active:scale-95"
                  >
                    <Heart className="w-5 h-5 mr-2" /> Donate Now
                  </button>
                  
                  <Link to="/register">
                    <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center transform active:scale-95">
                      <Users className="w-5 h-5 mr-2" /> Register as Volunteer
                    </button>
                  </Link>
                </div>

                <div className="mt-6 text-center">
                  <button className="text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center w-full transition-colors">
                    <Share2 className="w-4 h-4 mr-2" /> Share this cause
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white rounded-xl shadow-sm p-4 flex items-start border border-gray-50">
                  <Shield className="w-8 h-8 text-emerald-500 mr-3 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">100% Transparency Guaranteed</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Every donation is tracked. You will receive a notification when your funds are utilized.
                    </p>
                  </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default CampaignDetails;