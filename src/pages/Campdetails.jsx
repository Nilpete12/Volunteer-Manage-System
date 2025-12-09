import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, Users, Clock, MapPin, CheckCircle, 
  Share2, Shield, Calendar, ArrowLeft 
} from 'lucide-react';
import Error from '../pages/Error';



const CampaignDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  // --- THE "DATABASE" (Array of all 6 Campaigns) ---
  const campaignsData = [
    {
      id: 1,
      title: "Clean Water for Rural Villages",
      organizer: "EcoLife Foundation",
      location: "Kalahandi, Odisha",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      raised: 8500,
      goal: 12000,
      volunteersRegistered: 12,
      volunteersNeeded: 20,
      daysLeft: 12,
      description: "Access to clean water is a fundamental human right. In the remote villages of Kalahandi, families walk over 5km daily to fetch water that is often unsafe. This campaign aims to install 3 solar-powered borewells.",
      budget: [
        { item: "Solar Pumps (3 units)", cost: 4500 },
        { item: "Drilling & Installation", cost: 3000 },
        { item: "Water Storage Tanks", cost: 1500 },
        { item: "Maintenance Fund", cost: 1000 },
      ],
      shifts: [
        { id: 1, date: "Oct 12, 2025", time: "09:00 AM - 01:00 PM", task: "Site Preparation" },
        { id: 2, date: "Oct 15, 2025", time: "10:00 AM - 04:00 PM", task: "Installation Assistance" },
      ]
    },
    {
      id: 2,
      title: "Emergency Food Relief",
      organizer: "Global Aid Network",
      location: "Assam, India",
      category: "Disaster Relief",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      raised: 4500,
      goal: 5000,
      volunteersRegistered: 45,
      volunteersNeeded: 50,
      daysLeft: 3,
      description: "Recent floods have displaced thousands of families. We are setting up community kitchens to provide hot meals and distributing dry ration kits to those stranded in remote areas.",
      budget: [
        { item: "Rice & Grains (5000kg)", cost: 2500 },
        { item: "Cooking Oil & Spices", cost: 1000 },
        { item: "Transport Logistics", cost: 1000 },
        { item: "Packaging Materials", cost: 500 },
      ],
      shifts: [
        { id: 1, date: "Tomorrow", time: "06:00 AM - 10:00 AM", task: "Food Preparation" },
        { id: 2, date: "Tomorrow", time: "10:00 AM - 02:00 PM", task: "Distribution Drive" },
      ]
    },
    {
      id: 3,
      title: "Community Education Center",
      organizer: "TeachForTomorrow",
      location: "Detroit, Michigan",
      category: "Education",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      raised: 1200,
      goal: 3000,
      volunteersRegistered: 5,
      volunteersNeeded: 15,
      daysLeft: 20,
      description: "We are renovating an abandoned warehouse into a safe learning space for underprivileged kids. We need help painting walls, assembling furniture, and setting up a small computer lab.",
      budget: [
        { item: "Paint & Brushes", cost: 500 },
        { item: "Furniture (Desks/Chairs)", cost: 1500 },
        { item: "Lighting Fixtures", cost: 500 },
        { item: "Books & Stationaries", cost: 500 },
      ],
      shifts: [
        { id: 1, date: "Nov 5, 2025", time: "10:00 AM - 04:00 PM", task: "Painting & Cleaning" },
        { id: 2, date: "Nov 6, 2025", time: "10:00 AM - 02:00 PM", task: "Furniture Assembly" },
      ]
    },
    {
      id: 4,
      title: "Save the stray dogs",
      organizer: "Paw Patrol Rescue",
      location: "Bangalore, India",
      category: "Animal Welfare",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      raised: 800,
      goal: 5000,
      volunteersRegistered: 2,
      volunteersNeeded: 10,
      daysLeft: 15,
      description: "Our local shelter is overcrowded and running out of medical supplies. This campaign funds vaccinations, sterilization, and food for over 80 stray dogs currently in our care.",
      budget: [
        { item: "Vaccinations (80 units)", cost: 2000 },
        { item: "Dog Food (3 months)", cost: 1500 },
        { item: "Vet Bills", cost: 1000 },
        { item: "Shelter Repairs", cost: 500 },
      ],
      shifts: [
        { id: 1, date: "Sat, Oct 20", time: "08:00 AM - 12:00 PM", task: "Dog Walking & Grooming" },
        { id: 2, date: "Sun, Oct 21", time: "09:00 AM - 01:00 PM", task: "Kennel Cleaning" },
      ]
    },
    {
      id: 5,
      title: "Tech for Teens",
      organizer: "CodeFuture Inc.",
      location: "Online / Remote",
      category: "Education",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      raised: 15000,
      goal: 20000,
      volunteersRegistered: 100,
      volunteersNeeded: 120,
      daysLeft: 45,
      description: "Bridging the digital divide by providing laptops and coding mentorship to high school students in low-income districts. We need mentors proficient in Python and JS.",
      budget: [
        { item: "Refurbished Laptops (50)", cost: 15000 },
        { item: "Software Licenses", cost: 2000 },
        { item: "Wi-Fi Dongles", cost: 3000 },
      ],
      shifts: [
        { id: 1, date: "Every Saturday", time: "06:00 PM - 08:00 PM", task: "Python Mentorship (Zoom)" },
      ]
    },
    {
      id: 6,
      title: "Beach Cleanup Drive",
      organizer: "OceanBlue Initiative",
      location: "Miami, Florida",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      raised: 500,
      goal: 2000,
      volunteersRegistered: 180,
      volunteersNeeded: 200,
      daysLeft: 5,
      description: "Join us for a massive cleanup drive at South Beach. We aim to collect 500kg of plastic waste before the tide comes in. Gloves and bags provided.",
      budget: [
        { item: "Biodegradable Bags", cost: 500 },
        { item: "Gloves & Safety Gear", cost: 500 },
        { item: "Refreshments for Volunteers", cost: 500 },
        { item: "Waste Disposal Fees", cost: 500 },
      ],
      shifts: [
        { id: 1, date: "This Sunday", time: "07:00 AM - 11:00 AM", task: "General Cleanup" },
      ]
    }
  ];

  // --- LOGIC TO FIND THE CORRECT CAMPAIGN ---
  // The 'id' from params is a string, so we parse it to Int
  const campaign = campaignsData.find(c => c.id === parseInt(id));

  // If someone types an ID that doesn't exist (e.g. /campaigns/999)
  if (!campaign) {
    return <Error />;
  }

  // --- CALCULATIONS ---
  const donationProgress = Math.min((campaign.raised / campaign.goal) * 100, 100);
  const volunteerProgress = Math.min((campaign.volunteersRegistered / campaign.volunteersNeeded) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-gray-500 truncate">
            Campaigns / {campaign.category} / <span className="text-gray-900 font-medium">{campaign.title}</span>
          </p>
          <Link to="/campaigns" className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to list
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2">
            
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

            {/* TABS */}
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
                    <p className="text-lg leading-relaxed">{campaign.description}</p>
                    <p className="mt-4">Your contributions will directly fund the necessary resources and labor required to make this impact reality.</p>
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Where the money goes</h3>
                    <div className="space-y-3">
                      {campaign.budget.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{item.item}</span>
                          <span className="font-mono font-bold text-emerald-700">${item.cost.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center p-3 border-t-2 border-gray-200 mt-2">
                        <span className="font-bold text-gray-900">Total Goal</span>
                        <span className="font-bold text-xl text-gray-900">${campaign.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'shifts' && (
                  <div>
                     <h3 className="font-bold text-gray-900 mb-4">Upcoming Opportunities</h3>
                     <div className="space-y-4">
                        {campaign.shifts.map((shift) => (
                          <div key={shift.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors cursor-pointer bg-gray-50 hover:bg-white">
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
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Sticky) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Action Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-400 to-teal-500"></div>
                
                {/* Financial Stats */}
                <div className="mb-8">
                  <div className="flex items-baseline mb-2 flex-wrap">
                     <span className="text-3xl font-extrabold text-gray-900 mr-2">${campaign.raised.toLocaleString()}</span>
                     <span className="text-gray-500">raised of ${campaign.goal.toLocaleString()}</span>
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
                     <span className="text-sm font-bold text-blue-600">{campaign.volunteersRegistered} / {campaign.volunteersNeeded}</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${volunteerProgress}%` }}></div>
                  </div>
                  <p className="text-xs text-blue-700">
                    {campaign.volunteersNeeded - campaign.volunteersRegistered > 0 
                      ? `${campaign.volunteersNeeded - campaign.volunteersRegistered} spots remaining!` 
                      : "Volunteers Full!"}
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-emerald-200 hover:shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center transform active:scale-95">
                    <Heart className="w-5 h-5 mr-2" /> Donate Now
                  </button>
                  <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center transform active:scale-95">
                    <Users className="w-5 h-5 mr-2" /> Register as Volunteer
                  </button>
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