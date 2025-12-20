import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Users, FileText, CheckCircle, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('campaigns');
  
  // Initialize as empty arrays to prevent .length or .map() crashes
  const [campaigns, setCampaigns] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        // Verify admin role found in your navbar state
        if (!user || user.role !== 'admin') {
          alert("⛔ Access Denied: Admins Only");
          navigate('/');
        } else {
          fetchData();
        }
      } catch (err) {
        console.error("Auth Error:", err);
        navigate('/login');
      }
    };
    checkAdmin();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetching both datasets simultaneously
      const [campRes, userRes] = await Promise.all([
        axios.get('http://localhost:5000/api/campaigns'),
        axios.get('http://localhost:5000/api/auth/users')
      ]);
      
      // Use fallback empty arrays if data is missing
      setCampaigns(Array.isArray(campRes.data) ? campRes.data : []);
      setUsers(Array.isArray(userRes.data) ? userRes.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Database connection failed. Please ensure MongoDB is connected.");
      setLoading(false);
    }
  };

  const handleApproveCampaign = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/campaigns/${id}/approve`);
      setCampaigns(prev => prev.map(c => c._id === id ? { ...c, status: 'active' } : c));
      alert("Approved! ✅");
    } catch (err) { alert("Approval failed."); }
  };

  const handleDeleteCampaign = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`);
      setCampaigns(prev => prev.filter(c => c._id !== id));
    } catch (err) { alert("Delete failed."); }
  };

  // Safe calculation to prevent math errors during loading
  const totalImpact = (campaigns || []).reduce((acc, curr) => acc + (Number(curr.raisedAmount) || 0), 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-emerald-600 font-bold">
      Fetching Admin Records...
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
      <p className="text-gray-700 font-medium mb-4">{error}</p>
      <button onClick={fetchData} className="bg-emerald-600 text-white px-4 py-2 rounded shadow">Retry Connection</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link to="/" className="text-gray-500 hover:text-emerald-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <FileText className="text-emerald-500 mb-2" />
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Campaigns</div>
            <div className="text-2xl font-black">{campaigns.length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <Users className="text-blue-500 mb-2" />
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Users</div>
            <div className="text-2xl font-black">{users.length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <CheckCircle className="text-amber-500 mb-2" />
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Impact</div>
            <div className="text-2xl font-black">${totalImpact.toLocaleString()}</div>
          </div>
        </div>

        {/* Tab Logic */}
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'campaigns' ? 'bg-emerald-600 text-white shadow' : 'bg-white text-gray-500 border'}`}
          >
            Manage Campaigns
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'users' ? 'bg-emerald-600 text-white shadow' : 'bg-white text-gray-500 border'}`}
          >
            User Database
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {activeTab === 'campaigns' ? (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                <tr><th className="px-6 py-4">Status</th><th className="px-6 py-4">Title</th><th className="px-6 py-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {campaigns.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {c.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{c.title}</td>
                    <td className="px-6 py-4 text-right">
                      {c.status !== 'active' && (
                        <button onClick={() => handleApproveCampaign(c._id)} className="text-emerald-600 hover:underline mr-4 font-bold">Approve</button>
                      )}
                      <button onClick={() => handleDeleteCampaign(c._id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4 inline"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Role</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-800">{u.name}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 font-bold text-purple-600 uppercase text-xs">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;