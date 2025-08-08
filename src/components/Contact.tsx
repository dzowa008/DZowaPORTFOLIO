import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Let's Develop Together</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm open to freelance projects, collaborations, or
             full-time opportunities. Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Email</h3>
                  <p className="text-gray-400">takundadzowa3@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Phone</h3>
                  <p className="text-gray-400">+263 78 763 2090</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Location</h3>
                  <p className="text-gray-400">Zimbabwe, Mufaose 14 Murungu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none transition-colors duration-300"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg text-white font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;