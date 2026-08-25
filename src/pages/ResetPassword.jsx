import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import { Lock, Save, Flame, AlertCircle } from 'lucide-react';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      setLoading(false);
      return;
    }

    // Perbarui password user di Supabase
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert('Password berhasil diperbarui! Silakan login dengan password barumu.');
      navigate('/login');
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
              <Flame size={12} className="text-red-600 fill-red-600 animate-pulse" /> PERBARUI KATA SANDI
            </span>
            <h1 className="text-2xl font-black text-slate-950 font-heading uppercase mt-3 tracking-tight">
              Buat <span className="text-red-600">Kata Sandi Baru</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Masukkan kata sandi baru untuk akun kamu.</p>
          </div>

          {errorMsg && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
              {errorMsg}
            </motion.div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-950 focus:bg-white focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-950 focus:bg-white focus:outline-none focus:border-red-600 transition"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-950 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-slate-950/10 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {loading ? 'Menyimpan...' : 'Simpan Kata Sandi Baru'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}