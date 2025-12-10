import { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, Calendar, Code } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  const filters = ['All', 'React', 'Node.js', 'Full Stack', 'Mobile'];

  const projects = [
    {
      title: 'AI Note-Taking App',
      category: 'Full Stack',
      image: 'https://smarta-note-wizard.vercel.app/assets/hero-robot-DXOKFqAw.png',
      description: 'AI-powered note-taking app with voice recording, transcription, and GPT-based summaries. Capture ideas fast, convert speech to text, and get smart summaries in seconds.',
      technologies: ['React', 'Node.js', 'Superbase', 'OpenAI'],
      liveUrl: 'https://takunda-smarta.vercel.app/',
      githubUrl: 'https://github.com/dzowa008/DZOWAFINARI.git',
      featured: true,
      year: '2025',
      status: 'Live'
    },
    {
      title: 'Farm',
      category: 'React',
      image: '',
      description: 'Smart note-taking application with AI-powered features. Organize thoughts, create structured notes, and boost productivity with intelligent suggestions and seamless organization.',
      technologies: ['React', 'TypeScript', 'AI Integration', 'Note Management'],
      liveUrl: 'https://farm-silk.vercel.app/',
      githubUrl: 'https://github.com/dzowa008/farm',
      featured: false,
      year: '2025',
      status: 'Live'
    },
    {
      title: 'SmartaFinance AI',
      category: 'React',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'SmartFinance AI is a web app that provides a sign-in–gated finance dashboard, suggesting it is a platform where registered users can access personalized financial tools or insights after logging in.​',
      technologies: ['React', 'Tailwind CSS', 'Responsive Design'],
      liveUrl: 'https://smarta-finance-ai.vercel.app/',
      githubUrl: 'https://github.com/dzowa008/SmartaFinance-AI',
      featured: false,
      year: '2025',
      status: 'Live'
    },
    {
      title: 'Berries',
      category: 'React',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Berries is a money transfer service for Zimbabwean parents to send pocket money to their children studying in the UK and South Africa. It focuses on fast, near-instant transfers, bank-level security, and competitive exchange rates for GBP and ZAR, specifically tailored to family support needs',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://sendmoneyberries.vercel.app/',
      githubUrl: 'https://github.com/dzowa008/',
      featured: true,
      year: '2025',
      status: 'Live'
    },
    {
      title: 'Mubatsiri',
      category: 'Mobile',
      image: 'https://picsum.photos/seed/sekuru/100',
      description: 'Mubatsiri is a local task marketplace for Harare that connects people who need help with everyday tasks to vetted helpers who can do the work for pay.',
      technologies: ['React'],
      liveUrl: 'https://mubastiri-jhkd.vercel.app/',
      githubUrl: 'https://github.com/dzowa008',
      featured: true,
      year: '2025',
      status: 'Live'
    },
    {
      title: 'C-Resume',
      category: 'Full Stack',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Construction company platform for managing residential, commercial, and renovation projects with client portals and project tracking.',
      technologies: ['Next.js', 'Tailwind CSS', 'CMS'],
      liveUrl: 'https://ultimate-project-izoa.vercel.app/',
      githubUrl: 'https://github.com/dzowa008',
      featured: false,
      year: '2025',
      status: 'Live'
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    // Animate projects on filter change
    setVisibleProjects([]);
    const timer = setTimeout(() => {
      const indices = Array.from({ length: filteredProjects.length }, (_, i) => i);
      setVisibleProjects(indices);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeFilter, filteredProjects.length]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-500';
      case 'In Development': return 'bg-yellow-500';
      case 'Coming Soon': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="text-orange-500" size={24} />
            <span className="text-orange-500 font-semibold">Portfolio</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover my latest work featuring AI-powered applications, full-stack solutions, 
            and modern web tools. Each project demonstrates clean code, innovative features, 
            and exceptional user experience.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'glass text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {filter}
                {filter !== 'All' && (
                  <span className="ml-2 text-xs opacity-75">
                    ({projects.filter(p => p.category === filter).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${activeFilter}`}
              className={`group relative transition-all duration-700 ${
                visibleProjects.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="glass rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500 rounded-full text-xs font-medium text-black">
                        <Star size={12} fill="currentColor" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 group/btn"
                        aria-label="View Live Project"
                      >
                        <ExternalLink size={20} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group/btn"
                        aria-label="View Source Code"
                      >
                        <Github size={20} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Calendar size={14} />
                      {project.year}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-medium hover:bg-orange-500/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <div className="text-center mt-16">
          <a 
            href="https://github.com/dzowa008"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group inline-flex items-center"
          >
            <Github className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={18} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
