import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Activity, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Verify user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchMyCampaigns(parsedUser.name);
  }, [navigate]);

  const fetchMyCampaigns = async () => {
    try {
      // Retrieve the token saved during login
      const token = localStorage.getItem('token');
      
      // Hit the new optimized endpoint, passing the secure token
      const res = await axios.get('http://localhost:5000/api/campaigns/my-campaigns/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // The server already filtered the data, so we just set it directly
      setMyCampaigns(res.data);
      setLoading(false);
      
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Could not load your campaigns at this time.");
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-emerald-600">Loading your profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="bg-emerald-100 p-6 rounded-full text-emerald-600">
            <User className="w-16 h-16" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-gray-800">{user?.name}</h1>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm mb-4">{user?.role} Account</p>
            <div className="flex flex-col md:flex-row gap-4 text-gray-600">
              <span className="flex items-center justify-center md:justify-start bg-gray-50 px-3 py-1.5 rounded-lg border">
                <Mail className="w-4 h-4 mr-2 text-emerald-500" /> {user?.email}
              </span>
            </div>
          </div>
          <Link to="/create-campaign" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition shadow-sm">
            + New Campaign
          </Link>
        </div>

        {/* User's Campaigns Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-emerald-600" /> My Campaigns
          </h2>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center mb-6 border border-red-100">
              <AlertCircle className="w-5 h-5 mr-2" /> {error}
            </div>
          )}

          {myCampaigns.length === 0 && !error ? (
            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4 text-lg">You haven't created any campaigns yet.</p>
              <Link to="/create-campaign" className="text-emerald-600 font-bold hover:underline">Start your first campaign today!</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCampaigns.map(camp => (
                <div key={camp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{camp.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${camp.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {camp.status || 'pending'}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <p className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400"/> Created: {new Date(camp.createdAt).toLocaleDateString()}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min((camp.raisedAmount / camp.goalAmount) * 100, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between font-medium text-xs">
                      <span>${camp.raisedAmount || 0} raised</span>
                      <span>Goal: ${camp.goalAmount}</span>
                    </div>
                  </div>
                  
                  <Link to={`/campaigns/${camp._id}`} className="block w-full text-center border border-emerald-600 text-emerald-600 font-bold py-2 rounded-lg hover:bg-emerald-50 transition">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;