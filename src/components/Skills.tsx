import React from 'react';
import { Code2, Database, Globe, Palette, Server, Smartphone } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Globe size={32} />,
      skills: [
        { name: 'JavaScript', level: 95, color: 'bg-yellow-500' },
        { name: 'React', level: 90, color: 'bg-blue-500' },
        { name: 'Next.js', level: 85, color: 'bg-gray-600' },
        { name: 'HTML', level: 98, color: 'bg-orange-600' },
        { name: 'CSS', level: 92, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 88, color: 'bg-cyan-500' },
      ]
    },
    {
      title: 'Backend Development',
      icon: <Server size={32} />,
      skills: [
        { name: 'Python', level: 90, color: 'bg-green-500' },
        { name: 'Node.js', level: 87, color: 'bg-green-600' },
      ]
    },
    {
      title: 'Database',
      icon: <Database size={32} />,
      skills: [
        { name: 'MySQL', level: 85, color: 'bg-blue-700' },
      ]
    }
  ];

  const allSkills = [
    { name: 'Python', icon: '🐍', level: 90 },
    { name: 'JavaScript', icon: '⚡', level: 95 },
    { name: 'React', icon: '⚛️', level: 90 },
    { name: 'Node.js', icon: '🟢', level: 87 },
    { name: 'Next.js', icon: '▲', level: 85 },
    { name: 'HTML', icon: '🌐', level: 98 },
    { name: 'CSS', icon: '🎨', level: 92 },
    { name: 'Tailwind', icon: '💨', level: 88 },
    { name: 'MySQL', icon: '🗄️', level: 85 },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Proficient in full-stack development with React, Node.js, and Supabase. Experienced in AI integrations using OpenAI and Python automation. Focused on clean, responsive, and efficient web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {allSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-750 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="text-orange-500 text-sm font-medium">{skill.level}%</span>
            </div>
          ))}
        </div>

        {/* Detailed Skills by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-800 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="text-orange-500 mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-orange-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Full Stack Expertise</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              With expertise spanning both frontend and backend technologies, I create 
              comprehensive web solutions. From crafting responsive user interfaces with 
              React and Next.js to building robust server-side applications with Python 
              and Node.js, I deliver end-to-end development services.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-full text-sm">
                Frontend Development
              </span>
              <span className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-full text-sm">
                Backend Development
              </span>
              <span className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-full text-sm">
                Database Design
              </span>
              <span className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-full text-sm">
                Full Stack Solutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;