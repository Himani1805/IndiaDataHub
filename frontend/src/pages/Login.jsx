import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Loader2, Lock } from 'lucide-react';
import Header from './Header';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or server is down.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SCROLLBAR REMOVAL: 
          Added a style tag to ensure the body doesn't show a scrollbar 
          specifically when the Login component is mounted.
      */}
      <style>{`
        body {
          overflow: hidden !important;
          height: 100vh;
        }
      `}</style>

      <Header />

      {/* HIGHLIGHTED AREA: Added 'overflow-hidden' and 'h-[calc(100vh-64px)]' */}
      <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gray-50 font-sans px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white py-10 px-6 sm:px-10 shadow-xl rounded-2xl border border-gray-100 transition-all duration-300">

            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-12 h-12 rounded-full bg-[#000040] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-200 mb-2 transition-transform hover:scale-105">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Sign in
              </h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-4 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#000040] sm:text-sm transition-all"
                  placeholder="Email address *"
                />
              </div>

              <div className="space-y-1">
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-4 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#000040] sm:text-sm transition-all"
                  placeholder="Password *"
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#000040] hover:bg-[#1c2159] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000040] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign in"}
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 justify-center text-center mt-4">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-gray-400 font-medium cursor-pointer hover:text-[#000040]">
                Forgot password?
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="text-sm text-gray-400 font-medium cursor-pointer hover:text-[#000040]"
              >
                Get new, an account? Deny it
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;