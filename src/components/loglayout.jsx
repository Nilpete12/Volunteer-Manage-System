import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, quote, author, image }) => {
  return (
    <div className="min-h-screen flex bg-white">
      
      {/* --- Left Side: Reusable Visual Wrapper --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <img 
          src={image || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"}
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-emerald-900/90 to-transparent"></div>
        
        {/* Content over Image */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12 text-white">
          <Link to="/" className="flex items-center w-fit hover:opacity-80 transition-opacity">
             <span className="text-2xl font-bold tracking-tight"></span>
          </Link>
          
          <div className="mb-10">
            <blockquote className="text-3xl font-medium leading-tight mb-4">
              "{quote || "The smallest act of kindness is worth more than the grandest intention."}"
            </blockquote>
            <cite className="text-emerald-300 font-semibold not-italic">- {author || "Oscar Wilde"}</cite>
          </div>
        </div>
      </div>

      {/* --- Right Side: Content Wrapper --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          </div>
          
          {/* This is where the specific Form (Login or Register) will be injected */}
          {children}
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;