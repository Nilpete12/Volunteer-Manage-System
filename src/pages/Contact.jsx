import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', formData);
    alert("Thanks for reaching out! We will get back to you shortly.");
    // TODO: Connect to Email API (e.g., EmailJS or Backend)
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* --- Page Header --- */}
      <div className="bg-emerald-900 pt-20 pb-32 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-xl text-emerald-100 max-w-2xl mx-auto">
          Have a question about a campaign? Want to partner with us? We'd love to hear from you.
        </p>
      </div>

      {/* --- Main Content Section --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Col: Contact Info (Takes up 1 column) */}
          <div className="bg-emerald-800 text-white rounded-2xl p-8 shadow-2xl h-fit">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-emerald-100 mb-8 leading-relaxed">
              Fill up the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-emerald-400 mr-4 mt-1" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-emerald-100">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-emerald-400 mr-4 mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-emerald-100">support@voluntrack.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-emerald-400 mr-4 mt-1" />
                <div>
                  <p className="font-semibold">Office</p>
                  <p className="text-emerald-100">
                    3828 Piermont Dr NE, Albuquerque,<br />
                New Mexico, 87111
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Circles (CSS Art) */}
            <div className="relative mt-12 h-24 overflow-hidden rounded-xl bg-emerald-700/50">
               <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-emerald-600 rounded-full opacity-50"></div>
               <div className="absolute bottom-4 right-8 w-12 h-12 bg-emerald-500 rounded-full opacity-50"></div>
            </div>
          </div>

          {/* Right Col: The Form (Takes up 2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                >
                  <option value="">Select a topic</option>
                  <option value="volunteer">I want to volunteer</option>
                  <option value="donation">Donation inquiry</option>
                  <option value="partnership">Partnership proposal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center"
              >
                Send Message <Send className="ml-2 w-5 h-5" />
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* --- Simple FAQ Section --- */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 mr-2 text-emerald-600" /> Frequently Asked Questions
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">How do I get a tax receipt?</h4>
            <p className="text-gray-600 text-sm">Receipts are automatically emailed to you immediately after a successful donation. You can also download them from your dashboard.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">Can I volunteer remotely?</h4>
            <p className="text-gray-600 text-sm">Yes! Many of our campaigns, specifically "Education" and "Tech Support," allow for remote volunteering opportunities.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;