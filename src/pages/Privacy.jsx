import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, Eye } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-gray-500">Last updated: December 8, 2025</p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 border border-gray-100 prose prose-emerald max-w-none">
          
          <p className="lead text-lg text-gray-600 mb-8">
            At <strong>VolunTrack</strong>, accessible from voluntrack.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by VolunTrack and how we use it.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-emerald-600" /> Information We Collect
          </h3>
          <p className="text-gray-600 mb-4">
            We collect information you provide directly to us when you create an account, donate, or sign up for a volunteer shift. This includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
            <li>Personal identification (Name, Email address, Phone number)</li>
            <li>Payment information (processed securely via third-party gateways)</li>
            <li>Volunteer history and impact statistics</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-emerald-600" /> How We Use Your Information
          </h3>
          <p className="text-gray-600 mb-4">
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6 ml-4">
            <li>Provide, operate, and maintain our website</li>
            <li>Process your donations and issue tax receipts</li>
            <li>Verify volunteer hours and generate certificates</li>
            <li>Send you emails regarding campaign updates (only if opted in)</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-emerald-600" /> Data Security
          </h3>
          <p className="text-gray-600 mb-4">
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mt-8">
            <p className="text-emerald-800 text-sm font-medium">
              Note for Developers: In a real production app, you would also need to include sections on Cookies, GDPR (if in Europe), and CCPA (if in California).
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Privacy;