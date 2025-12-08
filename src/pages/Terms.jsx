import React from 'react';
import { ScrollText, AlertTriangle, HeartHandshake, Infinity } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Terms of Service</h1>
          <p className="mt-4 text-gray-500">Last updated: December 8, 2025</p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 border border-gray-100 prose prose-emerald max-w-none">
          
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <ScrollText className="w-5 h-5 mr-2 text-emerald-600" /> 1. Acceptance of Terms
          </h3>
          <p className="text-gray-600 mb-6">
            By accessing this website we assume you accept these terms and conditions. Do not continue to use VolunTrack if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <HeartHandshake className="w-5 h-5 mr-2 text-emerald-600" /> 2. Volunteer Conduct
          </h3>
          <p className="text-gray-600 mb-4">
            As a registered volunteer on VolunTrack, you agree to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
            <li>Provide accurate information regarding your skills and availability.</li>
            <li>Attend committed shifts or provide at least 24-hours notice for cancellation.</li>
            <li>Respect the privacy and dignity of the communities we serve.</li>
            <li>Not falsify volunteer hours or impact data.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-emerald-600" /> 3. Donation Policy
          </h3>
          <p className="text-gray-600 mb-6">
            All donations made through VolunTrack are final and non-refundable, except in cases of technical error or fraudulent use of your payment method. We ensure that 100% of your donation (minus standard payment processing fees) goes directly to the selected campaign.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Infinity className="w-5 h-5 mr-2 text-emerald-600"/> 4. Limitation of Liability
            </h3>
          <p className="text-gray-600 mb-6">
            VolunTrack shall not be held responsible for any injuries or damages occurring during volunteer activities. Volunteers participate at their own risk and are encouraged to ensure the safety standards of the host organization.
          </p>

        </div>
      </div>

    </div>
  );
};

export default Terms;