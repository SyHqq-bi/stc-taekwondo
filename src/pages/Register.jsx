import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Flame, AlertCircle } from 'lucide-react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setErrorMsg(signUpError.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: data.user.id,
          full_name: fullName,
          role: 'MEMBER',
          status: 'ACTIVE',
        },
      ]);

      if (profileError) {
        setErrorMsg('Gagal membuat profil: ' + profileError.message);
      } else {
        alert('Pendaftaran berhasil! Silakan login.');
        navigate('/login');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 font-sans flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              <Flame size={12} className="text-red-600 fill-red-600 animate-pulse" /> GABUNG ANGGOTA
            </span>
            <h1 className="text-2xl font-black text-slate-950 font-heading uppercase mt-3 tracking-tight">
              Daftar Atlet <span className="text-red-600">STC</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Buat akun untuk mencatat rekam jejak prestasimu.</p>
          </div>

          {errorMsg && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
              {errorMsg}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Sesuai KTP / KK"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-950 focus:bg-white focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Email Aktif
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-950 focus:bg-white focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-950 focus:bg-white focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-950 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-slate-950/10 transition-colors duration-300 flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus size={16} />
              {loading ? 'Mendaftarkan...' : 'Buat Akun Sekarang'}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-extrabold text-red-600 hover:underline uppercase tracking-wider">
              Masuk Saja
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}