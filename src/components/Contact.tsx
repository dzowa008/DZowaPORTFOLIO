import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:takundadzowa3@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink, '_self');
      
      // Show success state
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after success message
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitted(false);
        }, 3000);
      }, 500);
      
    } catch (error) {
      console.error('Error opening email client:', error);
      setIsSubmitting(false);
      alert('Please check that you have an email client configured, or contact me directly at takundadzowa3@gmail.com');
    }
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'takundadzowa3@gmail.com',
      description: 'Send me an email anytime',
      action: 'mailto:takundadzowa3@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '+263 78 763 2090',
      description: 'Call me for urgent matters',
      action: 'tel:+263787632090'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Zimbabwe, Mufaose 14 Murungu',
      description: 'Available for remote work',
      action: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="text-orange-500" size={24} />
            <span className="text-orange-500 font-semibold">Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? I'm available for freelance projects, 
            collaborations, and full-time opportunities. Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold group-hover:text-orange-500 transition-colors duration-300">
                        {method.title}
                      </h4>
                      <p className="text-white font-medium">{method.value}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass p-6 rounded-2xl">
              <h4 className="font-semibold mb-4 text-center">Quick Response</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-500">&lt; 24h</div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">100%</div>
                  <div className="text-sm text-gray-400">Project Success</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-900/50 rounded-xl border border-gray-700/50 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-900/50 rounded-xl border border-gray-700/50 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-900/50 rounded-xl border border-gray-700/50 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-500"
                  required
                />
                
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-900/50 rounded-xl border border-gray-700/50 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 placeholder-gray-500 resize-none"
                  required
                ></textarea>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <Calendar className="text-orange-500 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Schedule a Call</h3>
            <p className="text-gray-400 mb-4">
              Prefer to talk? Let's schedule a quick call to discuss your project.
            </p>
            <a 
              href="mailto:takundadzowa3@gmail.com?subject=Schedule a Meeting&body=Hi Takunda, I'd like to schedule a call to discuss my project."
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Calendar size={16} />
              Book a Meeting
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;