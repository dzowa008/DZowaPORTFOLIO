import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechStart',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Takunda delivered an exceptional web application that transformed our business operations. His attention to detail, combined with innovative problem-solving, made the entire development process seamless.',
      rating: 5,
      company: 'TechStart'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at InnovateCorp',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Exceptional work quality and attention to detail. The project was delivered on time and exceeded our expectations in every aspect. Highly recommended for any serious development project.',
      rating: 5,
      company: 'InnovateCorp'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director at GrowthLab',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Outstanding technical skills combined with excellent communication. Would definitely recommend and work with again. The solution was creative, scalable, and user-friendly.',
      rating: 5,
      company: 'GrowthLab'
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Quote className="text-orange-500" size={24} />
            <span className="text-orange-500 font-semibold">Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What <span className="gradient-text">People Say</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Feedback from satisfied clients and collaborators who have experienced my work firsthand.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Testimonial */}
          <div className={`relative group ${isVisible ? 'animate-scaleIn' : 'opacity-0'}`}>
            <div className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              {/* Decorative Quote */}
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote size={120} className="text-orange-500" />
              </div>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 relative z-10">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-orange-500/20 group-hover:ring-orange-500/40 transition-all duration-300"
                />
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {testimonials[currentIndex].name}
                  </h4>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-200 text-lg leading-relaxed mb-6 relative z-10">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 relative z-10">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-orange-500 w-8'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className={`glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 ${
              isVisible ? 'animate-bounceIn' : 'opacity-0'
            }`} style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
              <div className="text-gray-300 font-semibold">Client Satisfaction</div>
            </div>
            <div className={`glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 ${
              isVisible ? 'animate-bounceIn' : 'opacity-0'
            }`} style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-300 font-semibold">Happy Clients</div>
            </div>
            <div className={`glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 ${
              isVisible ? 'animate-bounceIn' : 'opacity-0'
            }`} style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-orange-500 mb-2">99%</div>
              <div className="text-gray-300 font-semibold">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;