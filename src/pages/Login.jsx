import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Mail, Lock, LogIn, Flame, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Email atau password salah. Silakan periksa kembali.');
    } else {
      navigate('/member');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-md">
        
        <div className="bg-gradient-to-b from-red-50/40 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200">
              <Flame size={12} className="text-red-600" /> PORTAL MASUK
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-3">
              Masuk Akun <span className="text-red-600">STC</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Masukkan email dan password terdaftar kamu.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Email Atlet / Admin
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@gmail.com"
                  className="w-full bg-white border border-slate-200/80 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200/80 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 mt-2"
            >
              <LogIn size={16} />
              {loading ? 'Memproses...' : 'Masuk Ke Akun'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
            Belum punya akun?{' '}
            <Link to="/register" className="font-extrabold text-red-600 hover:underline uppercase tracking-wider">
              Daftar Sekarang
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}