import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  FileText, 
  FolderOpen, 
  Upload, 
  MessageSquare, 
  Search, 
  Cloud, 
  Share2,
  Bot,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Star,
  Users,
  Shield,
  Zap,
  Globe,
  Smartphone,
  CheckCircle,
  Play,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Award,
  TrendingUp,
  Clock,
  Target,
  Lightbulb,
  Database,
  Lock,
  Headphones
} from 'lucide-react';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'how-it-works', 'testimonials', 'pricing', 'about', 'contact'];
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Transcription",
      description: "Convert audio recordings to text with 99% accuracy. Supports 50+ languages and speaker detection for seamless note-taking.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Summarization",
      description: "Transform lengthy documents into concise summaries. AI identifies key points and creates digestible content automatically.",
      color: "from-blue-400 to-purple-400"
    },
    {
      icon: <FolderOpen className="w-8 h-8" />,
      title: "Auto Organization",
      description: "Intelligent categorization by topic, date, and relevance. Your notes organize themselves without manual effort.",
      color: "from-green-400 to-blue-400"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Multi-Format Upload",
      description: "Support for PDFs, DOCX, PowerPoint, audio, video, and text files. Instant processing and conversion to searchable notes.",
      color: "from-orange-400 to-red-400"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Q&A Assistant",
      description: "Ask questions about your notes and receive intelligent answers. Your personal knowledge assistant powered by GPT-4.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Semantic Search",
      description: "Find information using natural language queries. Search by meaning, not just keywords, for precise results.",
      color: "from-teal-400 to-green-400"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Synchronization",
      description: "Access your notes anywhere with real-time sync. Changes reflect instantly across all your devices.",
      color: "from-blue-400 to-indigo-400"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Export & Collaborate",
      description: "Share notes via links, export to multiple formats, or collaborate with team members in real-time.",
      color: "from-pink-400 to-purple-400"
    }
  ];

  const steps = [
    {
      icon: <Upload className="w-12 h-12" />,
      title: "Upload Your Content",
      description: "Drop your files, record audio, or paste text directly into the platform for instant processing."
    },
    {
      icon: <Bot className="w-12 h-12" />,
      title: "AI Processing",
      description: "Our advanced AI transcribes, summarizes, and organizes your content automatically and intelligently."
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "Smart Discovery",
      description: "Use powerful search capabilities to find any information across your entire knowledge base instantly."
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Interactive Q&A",
      description: "Chat with your notes using natural language. Get answers, insights, and connections you never noticed."
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: "Seamless Sync",
      description: "Your knowledge follows you everywhere with real-time synchronization across all your devices."
    },
    {
      icon: <Share2 className="w-12 h-12" />,
      title: "Share & Export",
      description: "Collaborate with others and export your insights in multiple formats for maximum utility."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Research Scientist",
      company: "Stanford University",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "SmaRta has revolutionized how I manage my research notes. The AI summarization saves me hours every week, and the search functionality is incredibly powerful.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      company: "Tech Innovations Inc.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The voice transcription feature is a game-changer for our team meetings. We can focus on the discussion while SmaRta captures everything perfectly.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Medical Professional",
      company: "City General Hospital",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "As a busy doctor, SmaRta helps me organize patient notes and research efficiently. The AI Q&A feature helps me find critical information instantly.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 100 notes per month",
        "Basic AI summarization",
        "5GB cloud storage",
        "Email support",
        "Mobile app access"
      ],
      popular: false,
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Ideal for professionals and power users",
      features: [
        "Unlimited notes",
        "Advanced AI features",
        "100GB cloud storage",
        "Priority support",
        "Team collaboration",
        "Custom integrations",
        "Advanced analytics"
      ],
      popular: true,
      color: "from-purple-400 to-pink-400"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Advanced security",
        "Custom AI training",
        "24/7 phone support",
        "On-premise deployment",
        "Custom branding",
        "API access"
      ],
      popular: false,
      color: "from-blue-400 to-indigo-400"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the AI transcription?",
      answer: "Our AI transcription achieves 99% accuracy for clear audio in supported languages. The accuracy may vary based on audio quality, background noise, and speaker clarity."
    },
    {
      question: "Can I use SmaRta offline?",
      answer: "Yes! SmaRta offers offline functionality for viewing and editing your notes. AI features require an internet connection, but your notes sync automatically when you're back online."
    },
    {
      question: "What file formats are supported?",
      answer: "SmaRta supports PDF, DOCX, PPTX, TXT, MP3, MP4, WAV, and many other common file formats. We're constantly adding support for new formats based on user feedback."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption, secure cloud storage, and comply with GDPR and SOC 2 standards. Your data is never shared with third parties without your explicit consent."
    },
    {
      question: "Can I export my notes?",
      answer: "Yes, you can export your notes in multiple formats including PDF, Word, Markdown, and plain text. You also have full control over your data and can download everything at any time."
    },
    {
      question: "Do you offer team collaboration features?",
      answer: "Yes! Pro and Enterprise plans include real-time collaboration, shared workspaces, commenting, and permission management for seamless team productivity."
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "10M+", label: "Notes Processed", icon: <FileText className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> },
    { number: "50+", label: "Languages", icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-60 right-40 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl mx-4 mt-8 overflow-hidden">
          {/* Robot Header */}
          <div className="flex justify-center -mt-16 mb-8 relative z-20">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Bot className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Navigation */}
          <header className="px-8 py-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SmaRta
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'features', label: 'Features' },
                  { id: 'how-it-works', label: 'How it Works' },
                  { id: 'testimonials', label: 'Reviews' },
                  { id: 'pricing', label: 'Pricing' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                <Link 
                  to="/signin"
                  className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  Sign In
                </Link>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-800">
                <nav className="flex flex-col space-y-2">
                  {[
                    { id: 'home', label: 'Home' },
                    { id: 'features', label: 'Features' },
                    { id: 'how-it-works', label: 'How it Works' },
                    { id: 'testimonials', label: 'Reviews' },
                    { id: 'pricing', label: 'Pricing' },
                    { id: 'about', label: 'About' },
                    { id: 'contact', label: 'Contact' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
                <Link 
                  to="/signin"
                  className="block w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 text-center"
                >
                  Sign In
                </Link>
              </div>
            )}
          </header>

          {/* Hero Section */}
          <section id="home" className="px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className="text-2xl font-bold text-gray-300">SmaRta</span>
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black leading-tight">
                    AI <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Notes</span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                    Turn your notes <span className="text-purple-400 font-semibold">into knowledge</span>. 
                    Upload your files, ask AI questions, get summaries, and never forget what matters again.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/signin"
                    className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="group border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:border-purple-400 flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2 text-purple-400">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
                    <Bot className="w-32 h-32 text-purple-300 animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Features Section */}
        <section id="features" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the future of note-taking with AI-powered tools designed to enhance your productivity
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                Explore All Features
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  How It Works
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Simple steps to transform your notes into an intelligent knowledge base
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="group text-center p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="text-purple-400 mb-6 flex justify-center group-hover:text-pink-400 transition-colors duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of satisfied users who have transformed their note-taking experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-purple-400">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Start free and upgrade as you grow. All plans include our core AI features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-gray-900/50 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${
                    plan.popular
                      ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20'
                      : 'border-gray-800 hover:border-purple-500/30'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.price !== 'Free' && <span className="text-gray-400 ml-2">{plan.period}</span>}
                    </div>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/signin"
                    className={`block w-full py-3 rounded-full font-semibold transition-all duration-200 text-center ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105'
                        : 'border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400'
                    }`}
                  >
                    {plan.price === 'Free' ? 'Get Started' : 'Start Free Trial'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to know about SmaRta AI Notes
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-purple-400 transition-transform ${
                        faqOpen === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {faqOpen === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    About SmaRta
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    Founded in 2023, SmaRta was born from the vision of making knowledge accessible and actionable. 
                    Our team of AI researchers and product experts are passionate about transforming how people 
                    capture, organize, and interact with information.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">50+</div>
                      <div className="text-sm text-gray-400">Awards Won</div>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">200%</div>
                      <div className="text-sm text-gray-400">Growth Rate</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 text-center">
                    <Lightbulb className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-white mb-2">Innovation</h3>
                    <p className="text-sm text-gray-400">Cutting-edge AI technology</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 text-center">
                    <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-white mb-2">Security</h3>
                    <p className="text-sm text-gray-400">Enterprise-grade protection</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-6 text-center">
                    <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-white mb-2">Focus</h3>
                    <p className="text-sm text-gray-400">User-centric design</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 text-center">
                    <Headphones className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-white mb-2">Support</h3>
                    <p className="text-sm text-gray-400">24/7 customer care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get the latest updates, tips, and exclusive features delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-4 text-green-400 font-semibold">Thank you for subscribing!</p>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-400">hello@smarta.ai</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Office</h3>
                    <p className="text-gray-400">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Transform Your Notes?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have revolutionized their note-taking experience with SmaRta AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signin"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
                >
                  Get Started Free
                </Link>
                <button className="border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:border-purple-400">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    SmaRta
                  </h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Transform your notes into knowledge with AI-powered intelligence.
                </p>
                <div className="flex space-x-4">
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors" />
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Integrations</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 SmaRta AI Notes. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;