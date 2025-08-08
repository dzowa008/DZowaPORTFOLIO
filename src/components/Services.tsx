import React from 'react';
import { Code, Palette, Smartphone, Database } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code size={40} />,
      title: 'Full Stack Development',
      description: 'End-to-end web development with modern technologies and best practices.',
    },
    {
      icon: <Palette size={40} />,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces with great user experience.',
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
    },
    {
      icon: <Database size={40} />,
      title: 'Database Design',
      description: 'Efficient database architecture and optimization for better performance.',
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Services</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I offer full-stack web development, AI integration, automation solutions, and custom app creation. Helping businesses and individuals build smart, efficient, and user-friendly digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-lg hover:bg-gray-750 transition-colors duration-300 text-center group"
            >
              <div className="text-orange-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;