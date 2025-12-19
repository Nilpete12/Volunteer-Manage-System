import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonationModal from '../components/DonationModal';
import { 
  Heart, Users, Clock, MapPin, Share2, Shield, Calendar, ArrowLeft 
} from 'lucide-react';
// import NotFound from '../components/NotFound'; // Keeping this commented out for now

const Campdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to move between pages
  const [activeTab, setActiveTab] = useState('about');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  
  // Data State
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch Data
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/campaigns/${id}`);
        if (!response.ok) throw new Error('Campaign not found');
        const data = await response.json();
        setCampaign(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  // --- NEW: Handle Donate Click ---
  const handleDonateClick = () => {
    // 1. Check if the user has a "token" in local storage
    const token = localStorage.getItem('token'); 
    
    // 2. If no token, they are not logged in
    if (!token) {
      alert("You must be logged in to make a donation.");
      navigate('/login'); // Redirect to login page
      return;
    }

    // 3. If logged in, open the modal
    setIsDonationModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Navbar />
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800">Campaign Not Found</h2>
            <Link to="/campaigns" className="text-emerald-600 hover:underline mt-4 block">Back to Campaigns</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const donationProgress = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const volunteerProgress = Math.min((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100, 100);
  const spotsLeft = campaign.volunteersNeeded - campaign.volunteersRegistered;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)}
        initialCampaignId={campaign._id}
        campaignTitle={campaign.title}
      />

      {/* Breadcrumb */}
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
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8 relative group">
              <img src={campaign.image} alt={campaign.title} className="w-full h-96 object-cover" />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">Verified NGO</div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{campaign.title}</h1>
              <div className="flex items-center text-gray-600 text-sm flex-wrap gap-2">
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400" /> <span className="mr-4">{campaign.location}</span></div>
                <span className="font-medium text-emerald-700">Organized by {campaign.organizer}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {['about', 'budget', 'shifts'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 px-6 text-sm font-medium ${activeTab === tab ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600' : 'text-gray-500'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
                ))}
              </div>
              <div className="p-6 sm:p-8">
                {activeTab === 'about' && <p className="text-lg leading-relaxed text-gray-600">{campaign.description}</p>}
                {activeTab === 'budget' && (
                  <div className="space-y-3">
                    {campaign.budget.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{item.item}</span>
                        <span className="font-mono font-bold text-emerald-700">${item.cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'shifts' && (
                  <div className="space-y-4">
                    {campaign.shifts.map((shift, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-center">
                        <div>
                           <p className="font-bold text-gray-900">{shift.task}</p>
                           <div className="flex items-center text-sm text-gray-500 mt-1"><Calendar className="w-4 h-4 mr-1" /> {shift.date} • <Clock className="w-4 h-4 ml-2 mr-1" /> {shift.time}</div>
                        </div>
                        <button className="text-xs font-bold bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full uppercase">{shift.slotsAvailable} Spots</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="mb-8">
                  <div className="flex items-baseline mb-2 flex-wrap">
                     <span className="text-3xl font-extrabold text-gray-900 mr-2">${campaign.raised.toLocaleString()}</span>
                     <span className="text-gray-500">raised of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 mb-2"><div className="bg-emerald-500 h-3 rounded-full" style={{ width: `${donationProgress}%` }}></div></div>
                </div>
                <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center mb-2"><span className="text-sm font-bold text-blue-900">Volunteers Needed</span><span className="text-sm font-bold text-blue-600">{campaign.volunteersRegistered} / {campaign.volunteersNeeded}</span></div>
                  <div className="w-full bg-white rounded-full h-2 mb-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${volunteerProgress}%` }}></div></div>
                </div>
                
                {/* --- UPDATED BUTTONS --- */}
                <div className="space-y-3">
                  <button 
                    onClick={handleDonateClick} // Using the new function!
                    className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-emerald-700 flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 mr-2" /> Donate Now
                  </button>
                  
                  <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center">
                    <Users className="w-5 h-5 mr-2" /> Register as Volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Campdetails;