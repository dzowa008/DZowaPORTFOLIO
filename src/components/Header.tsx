import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Me' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass border-b border-white/10 py-2' 
        : 'bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 py-4'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold animate-slideInLeft">
            <span className="gradient-text">TAK</span>
            <span className="text-white">UNDA</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 animate-slideInRight">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-gray-300 hover:text-orange-500 transition-all duration-300 group ${
                  activeSection === item.href.substring(1) ? 'text-orange-500' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full ${
                  activeSection === item.href.substring(1) ? 'w-full' : ''
                }`}></span>
              </button>
            ))}
            <button className="btn-primary flex items-center gap-2 group">
              <Download size={18} className="group-hover:animate-bounce" />
              Download CV
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
              }`}>
                <Menu size={24} />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
              }`}>
                <X size={24} />
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-4 glass rounded-lg p-4">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-left text-gray-300 hover:text-orange-500 transition-all duration-300 p-2 rounded-lg hover:bg-white/5 ${
                  activeSection === item.href.substring(1) ? 'text-orange-500 bg-white/5' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}
            <button className="btn-primary flex items-center gap-2 justify-center w-full mt-4">
              <Download size={18} />
              Download CV
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;