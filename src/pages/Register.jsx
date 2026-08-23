import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const { error } = await register(email, password, fullName);
      if (error) throw error;
      setSuccessMsg('Pendaftaran berhasil! Akun Anda sedang menunggu verifikasi admin.');
    } catch (err) {
      setErrorMsg(err.message || 'Pendaftaran gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pt-32 pb-20 flex items-center justify-center px-6 font-sans">
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <span className="text-[10px] font-black tracking-widest text-stc-red uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
            PENDAFTARAN ANGGOTA
          </span>
          <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-3">GABUNG STC CLUB</h1>
          <p className="text-xs text-slate-500 mt-1">Buat akun resmi anggota STC Taekwondo</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-stc-red text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium leading-relaxed">
            {successMsg}
          </div>
        )}

        {!successMsg && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5 uppercase">Nama Lengkap</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-stc-red focus:bg-white transition"
                placeholder="Nama Lengkap"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-stc-red focus:bg-white transition"
                placeholder="nama@domain.com"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5 uppercase">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-stc-red focus:bg-white transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-stc-red hover:bg-red-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition shadow-lg shadow-red-500/20 mt-2"
            >
              {loading ? 'MEMPROSES...' : 'DAFTAR AKUN SEKARANG'}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-xs text-slate-500">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-stc-red font-black hover:underline">
            MASUK
          </Link>
        </p>
      </div>
    </div>
  );
}