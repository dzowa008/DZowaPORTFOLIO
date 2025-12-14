import { useState, useEffect, useRef } from 'react';
import { Code, Palette, Smartphone, Database, Wrench, Layers, Zap, CheckCircle } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    {
      icon: <Code size={40} />,
      title: 'Full Stack Development',
      description: 'End-to-end web development with modern technologies and best practices.',
      color: 'from-blue-500 to-cyan-500',
      features: ['React & Next.js', 'Node.js & Python', 'RESTful APIs', 'Real-time Apps']
    },
    {
      icon: <Palette size={40} />,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user interfaces with great user experience.',
      color: 'from-pink-500 to-rose-500',
      features: ['Responsive Design', 'User Research', 'Prototyping', 'Design Systems']
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      color: 'from-green-500 to-emerald-500',
      features: ['React Native', 'iOS & Android', 'App Optimization', 'Push Notifications']
    },
    {
      icon: <Database size={40} />,
      title: 'Database Design',
      description: 'Efficient database architecture and optimization for better performance.',
      color: 'from-orange-500 to-red-500',
      features: ['SQL & NoSQL', 'Data Modeling', 'Performance Tuning', 'Cloud Databases']
    },
    {
      icon: <Zap size={40} />,
      title: 'AI Integration',
      description: 'Implementing intelligent features using modern AI and machine learning.',
      color: 'from-purple-500 to-pink-500',
      features: ['ChatGPT Integration', 'Smart Features', 'Automation', 'Data Analysis']
    },
    {
      icon: <Layers size={40} />,
      title: 'API Development',
      description: 'Building robust and scalable APIs for seamless data exchange.',
      color: 'from-indigo-500 to-blue-500',
      features: ['REST APIs', 'GraphQL', 'Microservices', 'Documentation']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wrench className="text-orange-500" size={24} />
            <span className="text-orange-500 font-semibold">What I Offer</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Full-stack web development, AI integration, automation solutions, and custom app creation. Building smart, efficient, and user-friendly digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-500 cursor-pointer card-hover hover-lift ${
                isVisible ? 'animate-bounceIn' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mb-4 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {service.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-orange-500 flex-shrink-0" />
                    <span className="text-xs text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>

              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        <div className="text-center glass p-8 rounded-3xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help bring your ideas to life with cutting-edge technology and exceptional design.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;