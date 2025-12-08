import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { Menu, X, Heart } from 'lucide-react'; // Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle for mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Left Side: Logo & Brand */}
          <div className="shrink-0 flex items-center cursor-pointer">
            {/* Using a Heart icon for the donation/volunteer theme */}
            <Heart className="h-8 w-8 text-emerald-600 mr-2 fill-emerald-600" />
            <span className="font-bold text-xl text-gray-800 tracking-tight">
              <Link to="/">
              Volun<span className="text-emerald-600">Track</span>
              </Link>
            </span>
          </div>

          {/* Center: Desktop Menu Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">
              HOME
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">
              ABOUT US
            </Link>
            <Link to="/campaigns" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">
              CAMPAIGNS
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">
              CONTACT
            </Link>
          </div>

          {/* Right Side: Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 bg-gray-100 hover:text-emerald-600 font-medium px-3 py-2 rounded-md transition duration-200">
              SIGN IN
            </Link>
            <Link to="/register" className="bg-emerald-600 text-white hover:bg-emerald-600 px-4 py-2 rounded-md font-medium transition duration-200">
              REGISTER / DONATE
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
              HOME
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
              ABOUT US
            </Link>
            <Link to="/campaigns" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
              CAMPAIGNS
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
              CONTACT
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
              SIGN IN
            </Link>
            <Link to="/register" className="block w-full text-center mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-600">
              REGISTER / DONATE
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;