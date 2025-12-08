import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Heart, Users } from 'lucide-react';
import LogLayout from '../components/loglayout';
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'volunteer', // Default role
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Register Payload:', formData);
    // TODO: Send to Backend API
  };

  return (
    <LogLayout
      title="Join the Movement"
      subtitle={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
            Sign in instead
          </Link>
        </>
      }
      quote="Service to others is the rent you pay for your room here on earth."
      author="Muhammad Ali"
      image="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" // Different image for Register
    >
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              name="fullName" type="text" required
              value={formData.fullName} onChange={handleChange}
              className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              name="email" type="email" required
              value={formData.email} onChange={handleChange}
              className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Role Selection (Custom Toggle) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">I would like to..</label>
          <div className="grid grid-cols-2 gap-4">
            {/* Volunteer Option */}
            <button
              type="button"
              onClick={() => handleRoleChange('volunteer')}
              className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                formData.role === 'volunteer'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className={`mr-2 h-5 w-5 ${formData.role === 'volunteer' ? 'text-emerald-600' : 'text-gray-400'}`} />
              Volunteer
            </button>

            {/* Donor Option */}
            <button
              type="button"
              onClick={() => handleRoleChange('donor')}
              className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                formData.role === 'donor'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`mr-2 h-5 w-5 ${formData.role === 'donor' ? 'text-emerald-600' : 'text-gray-400'}`} />
              Donate
            </button>
          </div>
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password" type="password" required
                value={formData.password} onChange={handleChange}
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="confirmPassword" type="password" required
                value={formData.confirmPassword} onChange={handleChange}
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Create Account
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-gray-500">
          By registering, you agree to our{' '}
          <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">Privacy Policy</a>.
        </p>

      </form>
    </LogLayout>
  );
};

export default Register;