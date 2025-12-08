import React from 'react';

const AboutHero = () => {
  return (
    <div className="bg-emerald-900 py-20 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
        About <span className="text-emerald-400">VolunTrack</span>
      </h1>
      <p className="mt-4 text-xl text-emerald-100 max-w-2xl mx-auto">
        We are bridging the gap between intention and impact through technology and radical transparency.
      </p>
    </div>
  );
};

export default AboutHero;