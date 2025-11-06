import { useState, useEffect, useRef } from 'react';
import { Github, Twitter, Mail, Facebook, ArrowDown, Sparkles, Code, Zap, Star, Download, ExternalLink, Rocket } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const roles = [
    { text: 'Full Stack Developer', icon: <Code size={20} />, color: 'from-blue-500 to-cyan-500' },
    { text: 'React Expert', icon: <Rocket size={20} />, color: 'from-green-500 to-emerald-500' },
  ];

  useEffect(() => {
    setIsVisible(true);

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeRole = () => {
      const currentRoleText = roles[roleIndex].text;

      if (!isDeleting) {
        setTypedText(currentRoleText.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentRoleText.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        }
      } else {
        setTypedText(currentRoleText.slice(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setCurrentRole(roleIndex);
        }
      }
    };

    const timer = setInterval(typeRole, isDeleting ? 50 : 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/dzowa008', label: 'GitHub', color: 'hover:bg-gray-800' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-blue-500' },
    { icon: Mail, href: 'mailto:takunda@example.com', label: 'Email', color: 'hover:bg-red-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  ];

  const stats = [
    { number: '50+', label: 'Projects', icon: <Code size={18} /> },
    { number: '1+', label: 'Years Exp', icon: <Zap size={18} /> },
    { number: '100%', label: 'Success Rate', icon: <Star size={18} /> },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {[...Array(96)].map((_, i) => (
              <div key={i} className="border border-orange-500/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 h-full flex items-center py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 ${
              isVisible ? 'animate-slideInLeft opacity-100' : 'opacity-0'
            }`}
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full backdrop-blur-xl border border-white/10 shadow-lg">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium text-gray-200">Available for new projects</span>
              <Sparkles className="text-orange-500 animate-pulse" size={16} />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <p className="text-gray-400 text-sm uppercase">Hello, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold leading-none">
                <span className="text-white block">Takunda</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400">
                  Dzowa
                </span>
              </h1>

              {/* Role Typing */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-gradient-to-r ${roles[currentRole].color} bg-opacity-20`}>
                  {roles[currentRole].icon}
                </div>
                <h2
                  className={`text-xl lg:text-2xl font-semibold bg-gradient-to-r ${roles[currentRole].color} bg-clip-text text-transparent`}
                >
                  {typedText}
                  <span className="animate-pulse text-orange-500 ml-1">|</span>
                </h2>
              </div>

              {/* Role Indicators */}
              <div className="flex gap-2">
                {roles.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === currentRole ? 'w-8 bg-orange-500' : 'w-2 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              I craft modern web solutions using technologies like{' '}
              <span className="text-orange-500 font-semibold">React</span>,{' '}
              <span className="text-orange-500 font-semibold">Supabase</span>,{' '}
              <span className="text-orange-500 font-semibold">Python</span>, and{' '}
              <span className="text-orange-500 font-semibold">Node.js</span>. I build applications
              that prioritize clean code, performance, and user experience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="glass p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                    <div className="text-orange-500 mb-1 flex justify-center">{stat.icon}</div>
                    <div className="text-xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:scale-105 hover:-translate-y-1 transition-all duration-500"
              >
                <span className="flex items-center gap-2 text-sm">
                  Let's Work Together
                  <Rocket size={16} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </button>

              <a
                href="/Takunda Dzowa Cv.pdf"
                download="Takunda_Dzowa_CV.pdf"
                className="group relative px-6 py-3 glass text-white font-semibold rounded-full border border-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-500"
              >
                <span className="flex items-center gap-2 text-sm">
                  Download CV
                  <Download size={16} className="group-hover:rotate-180 transition-transform" />
                </span>
              </a>

              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-500"
              >
                <span className="flex items-center gap-2 text-sm">
                  View My Work
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-gray-400 text-xs font-medium">Connect with me:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 glass rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon size={16} className="hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Hidden on Mobile */}
          <div
            className={`hidden lg:flex lg:col-span-5 justify-center transition-all duration-1000 delay-300 ${
              isVisible ? 'animate-slideInRight opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-full p-1 animate-glow">
                  <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                    <img
                      src="/images/Sharp-Dressed-Youth-in-Navy-Suit.webp"
                      alt="Takunda Dzowa - Full Stack Developer"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                      }}
                    />
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce delay-500 flex items-center justify-center">
                  <Code size={20} className="text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce delay-700 flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <div className="absolute top-1/4 -left-10 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse delay-1000 flex items-center justify-center">
                  <Star size={12} className="text-white" />
                </div>
              </div>

              {/* Experience Badge */}
              <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-white font-medium">1+ Years Exp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-orange-500 transition-all duration-300 animate-bounce hover:scale-110 group"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Scroll to explore
          </span>
          <ArrowDown size={20} />
        </div>
      </button>
    </section>
  );
};

export default Hero;
