

import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Key, Loader, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Firebase Auth Check
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Success -> Redirect to Dashboard
      console.log("Logged in as:", user.email);
      navigate('/admin/dashboard');

    } catch (err) {
      console.error(err);
      setError("Invalid Credentials. Access Denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 relative overflow-hidden">

      {/* Background decoration - CHROME THEME */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-chrome-700/20 rounded-full blur-[120px] animate-blob -z-10"></div>
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-chrome-900/40 rounded-full blur-[120px] animate-blob animation-delay-2000 -z-10"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-chrome-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000 -z-10"></div>

      {/* Login Card */}
      <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-glass w-full max-w-md border border-white/10 relative z-10">

        <Link to="/" className="absolute top-6 left-6 text-chrome-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-chrome-900/50 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-white/10">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Admin Panel</h2>
          <p className="text-xs font-bold text-chrome-300 uppercase tracking-[0.2em] mt-2">
            Secure Entry Point
          </p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/20 text-red-500 text-xs font-bold p-3 rounded-xl text-center mb-6 animate-pulse uppercase tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-chrome-400 group-focus-within:text-white transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white focus:bg-white/10 focus:border-chrome-400 focus:outline-none transition-all placeholder-white/20"
                required
              />
            </div>
          </div>

          <div className="group">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-chrome-400 group-focus-within:text-white transition-colors">
                <Key size={18} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white focus:bg-white/10 focus:border-chrome-400 focus:outline-none transition-all placeholder-white/20"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-chrome-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-chrome-500 transition-all active:scale-95 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : "Authenticate"}
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-chrome-500 font-bold uppercase tracking-widest">
            Protected by Firebase Security
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;