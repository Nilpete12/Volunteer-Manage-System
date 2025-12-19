import React, { useState } from 'react';
import { X, Heart, CreditCard } from 'lucide-react';

const DonationModal = ({ isOpen, onClose, campaignTitle }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDonate = (e) => {
    e.preventDefault();
    // Here we would normally connect to Stripe/Razorpay
    // For now, we simulate a successful donation
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative animate-in fade-in zoom-in duration-300">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-emerald-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your donation to <span className="font-bold text-gray-800">{campaignTitle}</span> has been received. You are making a real difference!
          </p>
          <button 
            onClick={onClose}
            className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-emerald-50 p-6 border-b border-emerald-100 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-bold text-emerald-900">Make a Donation</h3>
          <p className="text-sm text-emerald-700 mt-1 truncate">
            Supporting: {campaignTitle}
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleDonate} className="p-6 space-y-6">
          
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Select Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[10, 50, 100].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`py-2 px-4 rounded-lg border-2 font-bold transition-all ${
                    amount === amt 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                    : 'border-gray-200 hover:border-emerald-200 text-gray-600'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
              <input 
                type="number" 
                placeholder="Other amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
                min="1"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
            <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 bg-gray-50">
               <CreditCard className="w-5 h-5 text-gray-500" />
               <span className="text-sm font-medium text-gray-700">Card Payment (Secure)</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transform hover:scale-[1.02] transition-all shadow-lg shadow-emerald-200"
          >
            Donate ${amount || '0'}
          </button>
          
          <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Secure SSL Transaction
          </p>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;