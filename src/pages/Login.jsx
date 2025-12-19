import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  // 1. "GUEST GUARD": If user is already logged in, send them Home immediately
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert("Login Successful!");
      
      // 2. FORCE REDIRECT TO HOME PAGE
      navigate('/'); 
      
      // Force a reload so the Navbar updates instantly (Optional but helpful)
      window.location.reload(); 

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[75vh] bg-gray-50">
      
      {/* LEFT SIDE: IMAGE */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
           alt="Charity work" 
           className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

         <div className="relative z-10 px-12 flex flex-col justify-center items-center h-full text-white text-center">
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Welcome Back!
            </h1>
            <p className="text-emerald-200 text-lg max-w-md mx-auto">
              Continue your journey of making a difference today.
            </p>
         </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 py-12 lg:px-24 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8 text-center lg:text-left">
             
             <div className="flex justify-center lg:justify-start">
               <Link to="/" title="Go back to Home">
                 <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 hover:bg-emerald-200 transition-colors cursor-pointer">
                    <LogIn className="h-6 w-6" />
                 </div>
               </Link>
             </div>
             
             <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
             <p className="text-gray-600 mt-2">
               New to our community?{' '}
               <Link to="/register" className="text-emerald-600 font-bold hover:underline">
                 Create an account
               </Link>
             </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
               <label className="flex items-center text-gray-600 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded text-emerald-600 focus:ring-emerald-500"/>
                  Remember me
               </label>
               <a href="#" className="text-emerald-600 font-medium hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-200"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;