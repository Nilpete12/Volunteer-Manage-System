import React from 'react';
import AboutHero from '../components/Abouthero';
import AboutMission from '../components/Aboutmission';
import AboutTeam from '../components/Aboutteam';


const About = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <main>
        <AboutHero />
        <AboutMission />
        <AboutTeam />
      </main>

    </div>
  );
};

export default About;