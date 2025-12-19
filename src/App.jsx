import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Components
import Navbar from './components/Navbar';

// 2. Pages
import Home from './pages/Home';
import About from './pages/About';
import Campaigns from './pages/Campaigns';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CampaignDetails from './pages/CampaignDetails';
import CreateCampaign from './pages/CreateCampaign'; 
import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
    <> 
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/campaigns" element={<Campaigns />} />
        
        {/* Campaign Details Route */}
        <Route path="/campaigns/:id" element={<CampaignDetails />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* 4. ADD THE ROUTE FOR START CAMPAIGN */}
        <Route path="/create-campaign" element={<CreateCampaign />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
    
  );
};

export default App;