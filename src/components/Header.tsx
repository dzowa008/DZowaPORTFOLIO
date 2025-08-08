import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Me' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-orange-500">DEV</span>
            <span className="text-white">FOLIO</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-orange-500 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg transition-colors duration-300">
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg transition-colors duration-300 w-fit">
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;