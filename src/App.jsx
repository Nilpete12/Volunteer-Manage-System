import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Campaigns from './pages/Campaigns';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CampaignDetails from './pages/Campdetails';
import Createcamp from './pages/Createcamp';
import Admin from './pages/Admin';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar />

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/CreateCamp" element={<Createcamp />} />
          <Route path="/admin" element={<Admin />} />

          
          
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
export default App;