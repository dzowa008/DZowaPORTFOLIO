import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <p className="text-orange-500 text-lg mb-4">Hi I am</p>
            <p className="text-orange-500 text-xl mb-2">Takunda Dzowa</p>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Full Stack
              <br />
              <span className="text-orange-500">Developer</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
I work with modern technologies like React, Supabase, Python, and Node.js to create user-friendly solutions. My projects include AI-powered note-taking apps, YouTube downloaders, automation bots, and e-commerce platforms. I focus on clean code, performance, and great user experience across all devices. Let's build something impactful.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg text-white font-medium transition-colors duration-300">
              Hire Me
            </button>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <img
                    src="src\components\Sharp-Dressed-Youth-in-Navy-Suit.webp"
                    alt="Developer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute bottom-8 right-8 flex space-x-4">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;