import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Menu, X, Heart, User, LogOut, Shield, Mail } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  // 1. SAFE CHECK USER LOGIN
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser)); 
      }
    } catch (error) {
      console.error("Corrupted user data found, clearing...", error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []);

  // 2. LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    setUser(null); 
    setIsOpen(false); 
    window.location.href = '/login'; // Hard refresh to clear data
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Left Side: Logo */}
          <div className="shrink-0 flex items-center cursor-pointer">
            <Heart className="h-8 w-8 text-emerald-600 mr-2 fill-emerald-600" />
            <span className="font-bold text-xl text-gray-800 tracking-tight">
              <Link to="/">
                Volun<span className="text-emerald-600">Track</span>
              </Link>
            </span>
          </div>

          {/* Center: Desktop Menu */}
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
            
            {/* --- RESTORED CONTACT US OPTION --- */}
            <Link to="/contact" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">
              CONTACT US
            </Link>
            
            {/* --- ADMIN BUTTON (Only shows if role is 'admin') --- */}
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-red-600 hover:text-red-800 font-bold flex items-center transition duration-150 border border-red-200 bg-red-50 px-3 py-1 rounded-full text-xs">
                <Shield className="w-4 h-4 mr-1" />
                ADMIN PANEL
              </Link>
            )}
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center text-gray-700 font-medium">
                  <User className="h-5 w-5 mr-2 text-emerald-600" />
                  <span>Hello, {user.name}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center text-gray-600 hover:text-red-500 font-medium px-3 py-2 transition duration-200"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 bg-gray-100 hover:text-emerald-600 font-medium px-3 py-2 rounded-md transition duration-200 text-sm">
                  SIGN IN
                </Link>
                <Link to="/register" className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-md font-medium transition duration-200 text-sm">
                  REGISTER
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600">
              HOME
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600">
              ABOUT US
            </Link>
            <Link to="/campaigns" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600">
              CAMPAIGNS
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-gray-700 hover:text-emerald-600">
              CONTACT US
            </Link>
            
            {user && user.role === 'admin' && (
               <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 text-base font-bold text-red-600 bg-red-50 rounded px-2">
                 ADMIN DASHBOARD
               </Link>
            )}

            <div className="border-t border-gray-100 my-2"></div>

            {user ? (
               <div className="space-y-2">
                 <div className="px-2 py-2 text-sm font-bold text-emerald-600 flex items-center">
                   <User className="w-4 h-4 mr-2" /> {user.name}
                 </div>
                 <button 
                   onClick={handleLogout}
                   className="block w-full text-left px-2 py-2 text-base font-medium text-red-500"
                 >
                   Logout
                 </button>
               </div>
            ) : (
               <div className="grid grid-cols-2 gap-4 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center py-2 bg-gray-100 rounded-md font-medium text-gray-700">
                  SIGN IN
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="text-center py-2 bg-emerald-600 text-white rounded-md font-medium">
                  REGISTER
                </Link>
               </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;