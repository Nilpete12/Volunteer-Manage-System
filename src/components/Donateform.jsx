import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, DollarSign, Package, Heart, Lock } from 'lucide-react';

const Donateform = ({ isOpen, onClose, initialCampaignId = '', campaignTitle = '' }) => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Mock Auth State

  const [donationType, setDonationType] = useState('money');
  const [amount, setAmount] = useState('');
  const [campaign, setCampaign] = useState('');

  // --- FIX: Lock Body Scroll ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // If a specific campaign ID was passed, set it immediately
      if (initialCampaignId) setCampaign(initialCampaignId);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialCampaignId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCampaignName = campaignTitle || "General/Selected Campaign"; // For alert/logic
    
    if (isLoggedIn) {
      alert(`Thank you! Your donation of ${donationType === 'money' ? '$' + amount : 'supplies'} to "${finalCampaignName}" has been recorded.`);
      onClose();
    } else {
      const confirmRegister = window.confirm("You need an account to track your donation impact. Proceed to Register?");
      if (confirmRegister) {
        navigate('/register', { state: { donationAttempt: { type: donationType, amount, campaign: initialCampaignId || campaign } } });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-emerald-900 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Heart className="w-5 h-5 mr-2 text-emerald-400 fill-emerald-400" /> 
            Make a Difference
          </h3>
          <button onClick={onClose} className="text-emerald-200 hover:text-white transition-colors">
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Donation Type */}
            <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setDonationType('money')}
                className={`flex items-center justify-center py-2 text-sm font-bold rounded-md transition-all ${
                  donationType === 'money' ? 'bg-white shadow text-emerald-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <DollarSign className="w-4 h-4 mr-1" /> Financial
              </button>
              <button
                type="button"
                onClick={() => setDonationType('items')}
                className={`flex items-center justify-center py-2 text-sm font-bold rounded-md transition-all ${
                  donationType === 'items' ? 'bg-white shadow text-emerald-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package className="w-4 h-4 mr-1" /> Material/Goods
              </button>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {donationType === 'money' ? 'Donation Amount (USD)' : 'Description of Items'}
              </label>
              {donationType === 'money' ? (
                <div className="relative">
                  <div className="absolute py-3 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold">$</span>
                  </div>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onWheel={(e) => e.target.blur()} 
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="50.00"
                  />
                  <div className="flex gap-2 mt-2">
                    {['10', '25', '50', '100'].map((val) => (
                      <button key={val} type="button" onClick={() => setAmount(val)} className="px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 border border-emerald-200">${val}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <textarea required rows="2" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none" placeholder="E.g., 20 Blankets..." value={amount} onChange={(e) => setAmount(e.target.value)}></textarea>
              )}
            </div>

            {/* Campaign Selection (CONDITIONAL RENDERING) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Campaign</label>
              
              {/* IF a specific title is passed, show it as Locked. ELSE show the dropdown. */}
              {campaignTitle ? (
                <div className="w-full px-4 py-3 border border-emerald-200 bg-emerald-50 rounded-lg text-emerald-800 font-medium flex items-center justify-between">
                  <span>{campaignTitle}</span>
                  <Lock className="w-4 h-4 text-emerald-600 opacity-50" />
                </div>
              ) : (
                <select 
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="">General Donation (Where needed most)</option>
                  <option value="1">Clean Water Project</option>
                  <option value="2">Emergency Food Relief</option>
                  <option value="4">Animal Shelter Support</option>
                </select>
              )}
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 transform active:scale-95">
              Proceed to Donate
            </button>
            
            {!isLoggedIn && (
              <p className="text-xs text-center text-gray-500 mt-2">
                * You will be asked to register to track this donation.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donateform;