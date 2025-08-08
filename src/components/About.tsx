import React from 'react';

const About = () => {
  const skills = [
    { name: 'Frontend Development', percentage: 90 },
    { name: 'Backend Development', percentage: 85 },
    { name: 'Database Design', percentage: 60 },
    { name: 'DevOps & Deployment', percentage: 80 },
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 p-1 mx-auto">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <img
                    src="src\components\Sharp Dressed Youth in Navy Suit.png"
                    alt="About Developer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I work with modern technologies like React, Supabase, Python, and Node.js to create user-friendly solutions. My projects include AI-powered note-taking apps, YouTube downloaders, automation bots, and e-commerce platforms. I focus on clean code, performance, and great user experience across all devices. Let's build something impactful.
            </p>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-orange-500">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;