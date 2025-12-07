import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-white mb-4">
              <Heart className="h-6 w-6 text-emerald-500 mr-2 fill-emerald-500" />
              <span className="font-bold text-xl">VolunTrack</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Connecting passionate volunteers with the causes that need them most. Transparent, efficient, and impactful.
            </p>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link></li>
              <li><Link to="/campaigns" className="hover:text-emerald-500 transition-colors">Browse Causes</Link></li>
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal/Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/admin" className="hover:text-emerald-500 transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-emerald-500" />
                <span>support@voluntrack.org</span>
              </li>
              <li className="mt-2">
                123 Charity Lane, <br />
                New York, NY 10012
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} VolunTrack System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;