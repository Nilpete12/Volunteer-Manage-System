import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertTriangle } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  
  // Prevent logged-in users from seeing this again
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // --- 1. SPECIAL "MASTER KEY" FOR TESTING ---
      // This allows you to log in as admin immediately without changing your database
      if (formData.email === "admin@voluntrack.com" && formData.password === "admin") {
        
        const adminUser = {
          name: "System Admin",
          email: "admin@voluntrack.com",
          role: "admin", // <--- THE KEY: This unlocks the Admin Dashboard
          token: "mock-admin-token"
        };

        // Save to browser
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('token', adminUser.token);
        
        alert("Welcome, Administrator.");
        window.location.href = "/admin-dashboard"; // Force redirect
        return;
      }

      // --- 2. REAL BACKEND LOGIN (If you have it set up) ---
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      // Security Check: Is this user actually an admin?
      if (data.user.role !== 'admin') {
        throw new Error("Access Denied: You do not have administrator privileges.");
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      window.location.href = "/admin-dashboard";

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-900 p-8 text-center border-b border-gray-700">
           <div className="mx-auto h-16 w-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
             <ShieldCheck className="h-8 w-8 text-red-500" />
           </div>
           <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
           <p className="text-gray-400 mt-2 text-sm">Restricted Access Only</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg flex items-center text-sm">
                <AlertTriangle className="h-4 w-4 mr-2" /> {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <input 
                  type="email" 
                  className="w-full bg-gray-900 border border-gray-600 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" 
                  placeholder="admin@voluntrack.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <input 
                  type="password" 
                  className="w-full bg-gray-900 border border-gray-600 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transition transform hover:scale-[1.02]"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-900 p-4 text-center">
           <a href="/login" className="text-sm text-gray-500 hover:text-gray-300">Not an admin? Go to User Login</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;