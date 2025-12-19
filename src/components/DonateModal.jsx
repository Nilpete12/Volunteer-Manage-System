import React, { useState } from 'react';
import { X, DollarSign, Package, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DonateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const [donationType, setDonationType] = useState('financial');
  const [amount, setAmount] = useState('25');
  const [campaign, setCampaign] = useState('general');

  const handleDonate = () => {
    // FIX: Check LocalStorage DIRECTLY right now. 
    // This ensures we don't rely on potentially slow state updates.
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      // IF NO USER FOUND:
      const confirmRegister = window.confirm("You need an account to track your donation impact. Proceed to Register?");
      if (confirmRegister) {
        navigate('/register');
        onClose();
      }
    } else {
      // IF USER FOUND:
      const user = JSON.parse(storedUser);
      alert(`Thank you, ${user.name}! Your ${donationType} donation of $${amount} has been recorded.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-emerald-900 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center text-white space-x-2">
            <Heart className="h-5 w-5 text-emerald-400 fill-emerald-400" />
            <span className="font-bold text-lg">Make a Difference</span>
          </div>
          <button onClick={onClose} className="text-emerald-100 hover:text-white transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Toggle Type */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
             <button 
               onClick={() => setDonationType('financial')}
               className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                 donationType === 'financial' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
               }`}
             >
               <DollarSign className="h-4 w-4 mr-1" /> Financial
             </button>
             <button 
               onClick={() => setDonationType('material')}
               className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                 donationType === 'material' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
               }`}
             >
               <Package className="h-4 w-4 mr-1" /> Material/Goods
             </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (USD)</label>
            <div className="relative">
               <span className="absolute left-3 top-3 text-gray-500 font-bold">$</span>
               <input 
                 type="number" 
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bold text-gray-800"
               />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleDonate}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:scale-[1.02]"
          >
            Proceed to Donate
          </button>

        </div>
      </div>
    </div>
  );
};

export default DonateModal;