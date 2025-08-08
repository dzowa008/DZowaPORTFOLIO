import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles,
  Bot,
  CheckCircle,
  Github,
  Chrome
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';

function SignInPage() {
  const navigate = useNavigate();
  const { signIn, signUp, error: authError } = useAuthContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, {
          full_name: `${formData.firstName} ${formData.lastName}`
        });
        if (error) throw new Error(error);
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw new Error(error);
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Authentication error:', error.message);
    }
    
    setIsLoading(false);
  };

  const benefits = [
    "Unlimited AI-powered note processing",
    "Advanced transcription with 99% accuracy",
    "Smart organization and categorization",
    "Semantic search across all notes",
    "Real-time collaboration features",
    "Export to multiple formats",
    "24/7 customer support",
    "Mobile and desktop sync"
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            {/* Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SmaRta
                </h1>
                <p className="text-sm text-gray-400">AI Notes Platform</p>
              </div>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-gray-400">
                {isSignUp 
                  ? 'Start your free trial and transform your note-taking experience' 
                  : 'Sign in to access your AI-powered notes'
                }
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-lg py-3 px-4 transition-all duration-200">
                <Chrome className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-lg py-3 px-4 transition-all duration-200">
                <Github className="w-5 h-5" />
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="John"
                      required={isSignUp}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="Doe"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      placeholder="••••••••"
                      required={isSignUp}
                    />
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {isSignUp && (
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                    required={isSignUp}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || (isSignUp && !formData.agreeToTerms)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? 'Start Free Trial' : 'Sign In'}</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Start Free Trial'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-l border-gray-800 items-center justify-center p-8">
          <div className="max-w-md">
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Transform Your Note-Taking Experience
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Join thousands of professionals who have revolutionized their productivity with SmaRta AI Notes.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">Sarah Chen</h4>
                  <p className="text-sm text-gray-400">Research Scientist</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "SmaRta has completely transformed how I manage my research notes. The AI features are incredible!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;