import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Nilesh Sen",
      role: "Frontend Lead",
      desc: "Designed the user interface and interactive components using React & Tailwind.",
      seed: "Saul" ,
      Gitlink: "https://github.com/Nilpete12",
      linkedin: "https://www.linkedin.com/in/nilesh-sen-123456789/"
    },
    {
      name: "Shreyash Mishra",
      role: "Backend Architect",
      desc: "Built the robust API and authentication systems to ensure data security.",
      seed: "jacob",
      Gitlink: "https://github.com/ShreyashMishra10",
      linkedin: "https://www.linkedin.com/in/shreyash-mishra-940815297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      name: "Divya Rajpurohit",
      role: "Database Engineer",
      desc: "Optimized the database schema for real-time tracking and reporting.",
      seed: "Jack",
      Gitlink: "https://github.com/I-divya-I",
      linkedin: "https://www.linkedin.com/in/i-divya-i/"

    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Meet the Developers</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          The engineering students behind this project. We are passionate about using code to solve real-world social problems.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}`} alt="Avatar" className="w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-500 text-sm mb-4">
                {member.desc}
              </p>
              <div className="flex justify-center space-x-4">
                {/* Use <a> tag for external links */}
                    <a 
                      href={member.Gitlink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-gray-800"
                    >
                      <Github className="w-5 h-5"/>
                    </a>

                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Linkedin className="w-5 h-5"/>
                    </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;