import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Heart, Users } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  // 1. "GUEST GUARD": If user is already logged in, send them Home immediately
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const [role, setRole] = useState('volunteer');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // 2. FORCE REDIRECT TO HOME PAGE
      navigate('/'); 

      // Force a reload so Navbar updates
      window.location.reload();

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* LEFT SIDE: IMAGE & QUOTE */}
      <div className="relative w-full lg:w-1/2 bg-gray-900 overflow-hidden min-h-[300px] lg:min-h-full">
         <img 
           src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
           alt="Volunteers working" 
           className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>

         <div className="relative z-10 p-12 h-full flex flex-col justify-end text-white">
            <div className="mb-4">
              <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
                "Service to others is the rent you pay for your room here on earth."
              </h1>
              <p className="text-emerald-400 font-medium text-lg border-l-4 border-emerald-500 pl-4">
                - Muhammad Ali
              </p>
            </div>
         </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 py-12 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Movement</h2>
          <p className="text-gray-600 mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 font-bold hover:underline">
              Sign in instead
            </Link>
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

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

            {/* Role Selection Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I would like to...</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button" 
                  onClick={() => setRole('volunteer')}
                  className={`flex items-center justify-center py-3 border-2 rounded-xl transition-all ${
                    role === 'volunteer' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm' 
                      : 'border-gray-200 text-gray-500 font-medium hover:bg-gray-50'
                  }`}
                >
                  <Users className={`w-5 h-5 mr-2 ${role === 'volunteer' ? 'text-emerald-600' : 'text-gray-400'}`} /> 
                  Volunteer
                </button>
                
                <button 
                  type="button" 
                  onClick={() => setRole('donor')}
                  className={`flex items-center justify-center py-3 border-2 rounded-xl transition-all ${
                    role === 'donor' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-sm' 
                      : 'border-gray-200 text-gray-500 font-medium hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 mr-2 ${role === 'donor' ? 'text-emerald-600' : 'text-gray-400'}`} /> 
                  Donate
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg shadow-emerald-200"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              By registering, you agree to our <span className="text-emerald-600 cursor-pointer">Terms of Service</span> and <span className="text-emerald-600 cursor-pointer">Privacy Policy</span>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;