import React from 'react';
import Hero from '../components/Hero';
import FeaturedCampaigns from '../components/Featuredcampaign';
import HowItWorks from '../components/HIW';
import ImpactSection from '../components/Impact';

const Home = () => {
  return (
    <div className>
      <Hero /> 
      <FeaturedCampaigns />
      <HowItWorks />
      <ImpactSection />
      
    </div>
  );
}

export default Home;
