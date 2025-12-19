import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // SAFETY CHECK: Load user data without crashing
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If data is bad, clear it to fix white screen
        console.error("Corrupted data found. Clearing...");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    // Optional: Force reload to clear any stuck state
    window.location.reload();
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

          {/* Center: Menu Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">HOME</Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">ABOUT US</Link>
            <Link to="/campaigns" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">CAMPAIGNS</Link>
            <Link to="/contact" className="text-gray-600 hover:text-emerald-600 font-medium transition duration-150">CONTACT</Link>
          </div>

          {/* Right Side: Auth Status */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // LOGGED IN
              <>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-700 font-medium bg-gray-50 px-3 py-2 rounded-full border border-gray-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer"
                >
                  <div className="bg-emerald-100 p-1 rounded-full">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span>{user.name}</span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600 font-medium transition ml-4"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </>
            ) : (
              // NOT LOGGED IN
              <>
                <Link 
                  to="/login" 
                  state={{ from: location }}
                  className="text-gray-600 bg-gray-100 hover:text-emerald-600 font-medium px-3 py-2 rounded-md transition duration-200"
                >
                  SIGN IN
                </Link>
                <Link 
                  to="/register" 
                  state={{ from: location }}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-md font-medium transition duration-200"
                >
                  REGISTER / DONATE
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">HOME</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">ABOUT US</Link>
            <Link to="/campaigns" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">CAMPAIGNS</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">CONTACT</Link>
            
            <div className="border-t border-gray-200 my-2"></div>
            
            {user ? (
               <>
                 <Link to="/profile" className="px-3 py-2 text-emerald-600 font-bold flex items-center hover:bg-gray-50 rounded-md">
                   <User className="h-5 w-5 mr-2" />
                   My Profile ({user.name})
                 </Link>
                 <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                   LOGOUT
                 </button>
               </>
            ) : (
               <>
                 <Link to="/login" state={{ from: location }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-50">
                   SIGN IN
                 </Link>
                 <Link to="/register" state={{ from: location }} className="block w-full text-center mt-2 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-600">
                   REGISTER / DONATE
                 </Link>
               </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;