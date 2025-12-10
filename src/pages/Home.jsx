import React from 'react';
import Hero from '../components/Hero';
import FeaturedCampaigns from '../components/Featuredcampaign';
import HowItWorks from '../components/HIW';
import Impact from '../components/Impact';

const Home = () => {
  return (
    <div className>
      <Hero /> 
      <FeaturedCampaigns />
      <HowItWorks />
      <Impact />
      
    </div>
  );
}

export default Home;
