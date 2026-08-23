import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
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

    // 1. Buat user Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setErrorMsg(signUpError.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      // 2. Buat profil default bertipe ACTIVE
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
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-md">
        
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-stc-red/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-stc-red uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
              <Flame size={12} className="text-stc-red" /> GABUNG ANGGOTA
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-3">
              Daftar Atlet <span className="text-stc-red">STC</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">Buat akun untuk mencatat rekam jejak prestasimu.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Sesuai KTP / KK"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red focus:ring-2 focus:ring-stc-red/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Email Aktif
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red focus:ring-2 focus:ring-stc-red/10"
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
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red focus:ring-2 focus:ring-stc-red/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-stc-red hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 mt-2"
            >
              <UserPlus size={16} />
              {loading ? 'Mendaftarkan...' : 'Buat Akun Sekarang'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-extrabold text-stc-red hover:underline uppercase tracking-wider">
              Masuk Saja
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}