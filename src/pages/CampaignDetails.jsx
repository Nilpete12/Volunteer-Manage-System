import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, ArrowLeft, CheckCircle, Loader } from 'lucide-react';

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // New States for the Button Logic
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/campaigns/${id}`);
        if (!response.ok) throw new Error("Campaign not found");
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  // --- NEW FUNCTION: Handle the button click ---
  const handleRegister = async () => {
    if (!user) return;
    
    setRegistering(true);

    try {
      // TODO: Connect this to your real backend later
      // const res = await fetch(`http://localhost:5000/api/campaigns/${id}/register`, { method: 'POST' ... });
      
      // For now, we simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Fake 1 second load
      
      alert(`Successfully registered for ${campaign.title}!`);
      setIsRegistered(true); // Change button state
      
    } catch (error) {
      alert("Failed to register. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!campaign) return <div className="min-h-screen flex items-center justify-center">Campaign not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <Link to="/campaigns" className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition">
           <ArrowLeft className="h-5 w-5 mr-2" /> Back to Campaigns
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="h-64 sm:h-80 w-full relative bg-gray-200">
             <img 
               src={campaign.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80"} 
               alt={campaign.title}
               className="w-full h-full object-cover"
             />
             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-emerald-700 font-bold text-sm uppercase tracking-wide shadow-sm">
                {campaign.category || "General"}
             </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
               <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-emerald-500" />
                  <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
               </div>
               <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-emerald-500" />
                  <span>{campaign.location || "Remote / Various Locations"}</span>
               </div>
               <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-emerald-500" />
                  <span>Organizer: {campaign.organizer || "VolunTrack Community"}</span>
               </div>
            </div>

            <hr className="border-gray-100 mb-8" />

            <div className="prose max-w-none text-gray-700 mb-10">
               <h3 className="text-xl font-bold text-gray-900 mb-3">About this Campaign</h3>
               <p className="leading-relaxed whitespace-pre-line">{campaign.description}</p>
            </div>

            {/* Action Area */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                  <h4 className="text-lg font-bold text-emerald-900">Ready to make an impact?</h4>
                  <p className="text-emerald-700 text-sm">Join {campaign.volunteersCount || 0} other volunteers today.</p>
               </div>
               
               {user ? (
                 // --- LOGIC FOR BUTTON ---
                 <button 
                   onClick={handleRegister}
                   disabled={registering || isRegistered}
                   className={`px-8 py-3 font-bold rounded-lg transition shadow-lg flex items-center ${
                     isRegistered 
                       ? 'bg-gray-400 text-white cursor-not-allowed shadow-none' // Style when Registered
                       : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200' // Style when Active
                   }`}
                 >
                    {registering ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" /> Signing up...
                      </>
                    ) : isRegistered ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" /> Registered
                      </>
                    ) : (
                      <>
                         Sign Up Now
                      </>
                    )}
                 </button>
               ) : (
                 <Link to="/login" className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
                    Login to Volunteer
                 </Link>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;