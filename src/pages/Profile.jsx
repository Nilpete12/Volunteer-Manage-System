import React, { useState, useEffect } from 'react';
import { User, Mail, Save, Edit2, Camera } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Load user data SAFELY
  useEffect(() => {
    const storedString = localStorage.getItem('user');
    if (storedString) {
      try {
        const storedUser = JSON.parse(storedString);
        setUser(storedUser);
        setFormData({ name: storedUser.name, email: storedUser.email });
      } catch (e) {
        console.error("Profile load error", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile Updated Successfully!");
    
    // Refresh to update Navbar
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-emerald-600 h-32 relative">
             <div className="absolute -bottom-12 left-8">
                <div className="h-24 w-24 bg-white rounded-full p-1 shadow-md">
                   <div className="h-full w-full bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <User className="h-12 w-12" />
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name || 'User'}</h2>
                  <span className="inline-block mt-1 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wide">
                    {user.role || 'Volunteer'}
                  </span>
               </div>
               
               <button 
                 onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                   isEditing 
                   ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200' 
                   : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                 }`}
               >
                 {isEditing ? (
                   <><Save className="h-4 w-4 mr-2" /> Save Changes</>
                 ) : (
                   <><Edit2 className="h-4 w-4 mr-2" /> Edit Profile</>
                 )}
               </button>
            </div>

            <div className="space-y-6 max-w-xl">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <User className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     type="text"
                     name="name"
                     disabled={!isEditing}
                     value={formData.name}
                     onChange={handleChange}
                     className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500 ${
                       isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200 text-gray-500'
                     }`}
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Mail className="h-5 w-5 text-gray-400" />
                   </div>
                   <input
                     type="email"
                     name="email"
                     disabled={!isEditing}
                     value={formData.email}
                     onChange={handleChange}
                     className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-emerald-500 focus:border-emerald-500 ${
                       isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200 text-gray-500'
                     }`}
                   />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;