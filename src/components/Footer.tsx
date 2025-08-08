import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <span className="text-orange-500">DEV</span>
            <span className="text-white">FOLIO</span>
          </div>

          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a href="#home" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Home
            </a>
            <a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              About Me
            </a>
            <a href="#services" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Services
            </a>
            <a href="#projects" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Projects
            </a>
            <a href="#skills" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Skills
            </a>
            <a href="#skills" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Skills
            </a>
            <a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400">
            © {currentYear} DevFolio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;