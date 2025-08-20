// File: frontend/src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { Eye, EyeOff, LogIn, Shield, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, error } = useAdminAuth();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Redirect will happen automatically via auth context
      console.log('Login successful!');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@teendom.co.ke',
      password: 'TeendomAdmin2024!'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-700 to-blue-600 flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 
            className="text-4xl font-black text-white mb-2"
            style={{fontFamily: 'Playfair Display, serif'}}
          >
            Teendom Admin
          </h1>
          <p className="text-white/80 font-medium">
            Content Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-100 font-medium text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
              <p className="text-blue-100 font-medium text-sm mb-2">Demo Credentials:</p>
              <p className="text-blue-200 text-xs mb-1">Email: admin@teendom.co.ke</p>
              <p className="text-blue-200 text-xs mb-3">Password: TeendomAdmin2024!</p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-blue-200 hover:text-white text-xs underline"
              >
                Click to use demo credentials
              </button>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all"
                placeholder="Enter your admin email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/30 transition-all pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-red-600 py-3 px-6 rounded-lg font-black text-lg tracking-wide hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-white/60 text-sm">
              Teendom Africa Admin Portal
            </p>
            <p className="text-white/40 text-xs mt-1">
              For authorized personnel only
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Need access? Contact the system administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;