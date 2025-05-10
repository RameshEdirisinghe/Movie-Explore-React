import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Popcorn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    // Simple validation
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
    
    // Simulate API call delay
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-yellow-500 p-6 flex justify-center">
            <div className="flex items-center">
              <Popcorn size={36} className="text-black" />
              <h1 className="text-2xl font-bold text-black ml-2">MovieExplorer</h1>
            </div>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Login to Your Account
            </h2>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-gray-300 mb-2">
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
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-2">
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
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full"
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
    </div>
  );
};

export default LoginPage;