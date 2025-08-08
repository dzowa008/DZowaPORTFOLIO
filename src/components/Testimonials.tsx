import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechStart',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Lorem ipsum dolor sit amet consectetur. In enim cursus odio accumsan. Id lorem tellus aliquam odio ac mattis tempor sagittis.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at InnovateCorp',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Exceptional work quality and attention to detail. The project was delivered on time and exceeded our expectations.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director at GrowthLab',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
      content: 'Outstanding technical skills combined with excellent communication. Would definitely recommend and work with again.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus
            netus in. Aliquet donec morbi convallis pretium.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 relative">
            <div className="flex items-center mb-6">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="text-xl font-bold">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                <div className="flex mt-2">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              "{testimonials[currentIndex].content}"
            </p>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;