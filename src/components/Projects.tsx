import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React', 'Node.js', 'Full Stack', 'Mobile'];

  const projects = [
    {
      title: 'AI Note-Taking App',
      category: 'Full Stack',
      image: 'https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete e-commerce solution with payment integrationAI-powered note-taking app with voice recording, transcription, and GPT-based summaries. Capture ideas fast, convert speech to text, and get smart summaries in seconds.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://dzowafinari.vercel.app/',
      githubUrl: 'https://github.com/dzowa008/DZOWAFINARI.git',
    },
    {
      title: 'Student Report generator',
      category: 'React',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Generate student reports instantly with AI. Input grades and comments to create clear, personalized, and professional progress reports in seconds. Fast, accurate, and easy to use.',
      technologies: ['React', 'Socket.io', 'Express'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Resume and Portfolio creator',
      category: 'React',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Create professional resumes and portfolios in minutes. Customize templates, add projects, and export clean, job-ready documents effortlessly. Perfect for students and professionals.',
      technologies: ['React', 'API Integration', 'Charts'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'My Portfolio',
      category: 'react',
      
      description: 'Responsive portfolio with admin panel',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      technologies: ['Node.js', 'Express', 'PostgreSQL'],
      liveUrl: 'https://d-zowa-portfolio.vercel.app/',
      githubUrl: 'https://github.com/dzowa008/DZowaPORTFOLIO.git',
    },
    {
      title: 'AI notes',
      category: 'Mobile',
      image: 'https://smarta-note-wizard.vercel.app/assets/hero-robot-DXOKFqAw.png',
      description: 'AI Notes is a smart note-taking app that lets users record voice, transcribe speech into text, and generate instant summaries using GPT. Built for speed and clarity, it helps students, professionals, and creators capture ideas effortlessly and organize them intelligently.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      liveUrl: 'https://smarta-note-wizard.vercel.app/',
      githubUrl: 'https://github.com/dzowa008/smarta-note-wizard.git',
    },
    {
      title: 'Buildinglink',
      category: 'Full Stack',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Our construction company specializes in residential, commercial, and renovation projects. From foundations to finishes, we deliver high-quality workmanship, on time and on budget.Whether you are planning a new home, office space, or remodeling an existing structure — we bring your vision to life with expert craftsmanship and professional service.',
      technologies: ['Next.js', 'Tailwind', 'Sanity CMS'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            I build full-stack apps featuring AI-powered note-taking, automation bots, and web tools like YouTube downloaders. Each project focuses on clean code, usability, and real-world problem solving.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  activeFilter === filter
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.liveUrl}
                    className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;