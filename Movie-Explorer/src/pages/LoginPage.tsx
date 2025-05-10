import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Popcorn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

// Import local images (adjust paths as needed)
import bg1 from '../assets/movie-bg1.jpg';
import bg2 from '../assets/movie-bg2.jpg';
import bg3 from '../assets/movie-bg3.jpg';
import bg4 from '../assets/movie-bg4.jpg';

const backgroundImages = [bg1, bg2, bg3, bg4];

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      setIsSubmitting(false);
      return;
    }
    
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Slideshow with local images */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={img} 
              alt={`Background ${index + 1}`} 
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.4) blur(1px)' }}
            />
          </div>
        ))}
      </div>
      
      {/* Login Form - Opaque version */}
      <div className="w-full max-w-md z-10">
        <div className="bg-gray-800/95 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="p-6 flex justify-center bg-gradient-to-r from-yellow-600 to-yellow-700">
            <div className="flex items-center">
              <Popcorn size={36} className="text-white" />
              <h1 className="text-2xl font-bold text-white ml-2">MovieExplorer</h1>
            </div>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Welcome Back
            </h2>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-gray-300 mb-2 text-sm font-medium">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-2 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                  isLoading={isSubmitting}
                >
                  <span className="flex items-center justify-center">
                    Login <ArrowRight size={18} className="ml-2" />
                  </span>
                </Button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-gray-400 text-sm">
              Any username with a password of at least 4 characters will work.
            </p>
          </div>
        </div>
      </div>
      
      {/* Slideshow indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBgIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentBgIndex ? 'bg-yellow-500 w-6' : 'bg-white/30'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoginPage;