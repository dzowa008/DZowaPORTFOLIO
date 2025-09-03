import { useState, useEffect, useRef } from 'react';
import { Code2, Database, Globe, Server, Zap, Brain, Layers, Target } from 'lucide-react';

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const [animatedBars, setAnimatedBars] = useState<boolean>(false);
  const skillsRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Globe size={32} />,
      description: 'Creating responsive, interactive user interfaces',
      skills: [
        { name: 'JavaScript', level: 95, color: 'bg-yellow-500' },
        { name: 'React', level: 90, color: 'bg-blue-500' },
        { name: 'Next.js', level: 85, color: 'bg-gray-700' },
        { name: 'HTML', level: 98, color: 'bg-orange-600' },
        { name: 'CSS', level: 92, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 88, color: 'bg-cyan-500' },
      ]
    },
    {
      title: 'Backend Development',
      icon: <Server size={32} />,
      description: 'Building scalable server-side applications',
      skills: [
        { name: 'Python', level: 90, color: 'bg-green-600' },
        { name: 'Node.js', level: 87, color: 'bg-green-500' },
        { name: 'API Design', level: 85, color: 'bg-purple-600' },
      ]
    },
    {
      title: 'Database & Tools',
      icon: <Database size={32} />,
      description: 'Data management and development tools',
      skills: [
        { name: 'MySQL', level: 85, color: 'bg-blue-700' },
        { name: 'Supabase', level: 80, color: 'bg-emerald-600' },
        { name: 'Git', level: 92, color: 'bg-orange-500' },
      ]
    }
  ];

  const allSkills = [
    { name: 'Python', icon: '🐍', level: 90, category: 'Backend' },
    { name: 'JavaScript', icon: '⚡', level: 95, category: 'Frontend' },
    { name: 'React', icon: '⚛️', level: 90, category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', level: 87, category: 'Backend' },
    { name: 'Next.js', icon: '▲', level: 85, category: 'Frontend' },
    { name: 'HTML', icon: '🌐', level: 98, category: 'Frontend' },
    { name: 'CSS', icon: '🎨', level: 92, category: 'Frontend' },
    { name: 'Tailwind', icon: '💨', level: 88, category: 'Frontend' },
    { name: 'MySQL', icon: '🗄️', level: 85, category: 'Database' },
    { name: 'AI/ML', icon: '🤖', level: 75, category: 'Emerging' },
  ];

  const specializations = [
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: 'Performance Optimization',
      description: 'Fast loading, efficient code'
    },
    {
      icon: <Brain className="text-purple-500" size={24} />,
      title: 'AI Integration',
      description: 'OpenAI, machine learning APIs'
    },
    {
      icon: <Layers className="text-blue-500" size={24} />,
      title: 'Full Stack Architecture',
      description: 'End-to-end solution design'
    },
    {
      icon: <Target className="text-green-500" size={24} />,
      title: 'User Experience',
      description: 'Intuitive, accessible interfaces'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedBars) {
            setAnimatedBars(true);
            // Animate skills one by one
            allSkills.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSkills(prev => [...prev, index]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [animatedBars]);

  return (
    <section ref={skillsRef} id="skills" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="text-orange-500" size={24} />
            <span className="text-orange-500 font-semibold">Expertise</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Proficient in modern full-stack development with expertise in React, Node.js, and AI integrations. 
            I focus on building scalable, performant applications with exceptional user experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {allSkills.map((skill, index) => (
            <div
              key={index}
              className={`glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-105 group cursor-pointer ${
                visibleSkills.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 animate-float">
                {skill.icon}
              </div>
              <h3 className="text-white font-semibold mb-3 group-hover:text-orange-500 transition-colors duration-300">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: animatedBars ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 0.1 + 0.5}s`
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 text-sm font-medium">{skill.level}%</span>
                <span className="text-xs text-gray-400">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Specializations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="gradient-text">Specializations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {spec.icon}
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {spec.title}
                </h4>
                <p className="text-gray-400 text-sm">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Skills by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="glass p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 group"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="text-orange-500 mr-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-orange-500 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: animatedBars ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIndex * 3 + skillIndex) * 0.1 + 1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="text-center">
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Full Stack Expertise</span>
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              With expertise spanning both frontend and backend technologies, I create 
              comprehensive web solutions. From crafting responsive user interfaces with 
              React and Next.js to building robust server-side applications with Python 
              and Node.js, I deliver end-to-end development services.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Frontend Development', 'Backend Development', 'Database Design', 'AI Integration', 'Performance Optimization'].map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-sm font-medium hover:bg-orange-500/20 transition-colors duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;