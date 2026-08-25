import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flame, LogOut, User, Shield, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/20 group-hover:scale-105 transition-transform">
            <Flame size={22} className="fill-white" />
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-slate-950 font-heading uppercase">
              Star Taekwondo <span className="text-red-600">Club</span>
            </div>
            <div className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">
              Official Dojang Website
            </div>
          </div>
        </Link>

        {/* Nav Links Desktop */}
        <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-wider text-slate-600">
          <Link to="/" className="hover:text-red-600 transition-colors">Beranda</Link>
          <Link to="/schedule" className="hover:text-red-600 transition-colors">Jadwal</Link>
          <Link to="/achievements" className="hover:text-red-600 transition-colors">Prestasi</Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {profile?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 text-xs font-black uppercase tracking-wider rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Shield size={14} /> Admin
                </Link>
              )}

              <Link
                to="/member"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <User size={14} className="text-red-600" />
                )}
                <span>{profile?.full_name?.split(' ')[0] || 'Anggota'}</span>
              </Link>

              <button
                onClick={handleLogout}
                title="Keluar Akun"
                className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-red-600 transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-slate-950 hover:bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-red-600"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 font-sans">
          <div className="flex flex-col space-y-3 text-xs font-black uppercase tracking-wider text-slate-700">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600">Beranda</Link>
            <Link to="/schedule" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600">Jadwal</Link>
            <Link to="/achievements" onClick={() => setMobileMenuOpen(false)} className="hover:text-red-600">Prestasi</Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            {user ? (
              <>
                {profile?.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 bg-red-50 text-red-600 text-center text-xs font-black uppercase rounded-xl border border-red-100"
                  >
                    Dashboard Admin
                  </Link>
                )}
                <Link
                  to="/member"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-slate-100 text-slate-900 text-center text-xs font-black uppercase rounded-xl"
                >
                  Profil Anggota ({profile?.full_name?.split(' ')[0] || 'Anggota'})
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="w-full py-2.5 bg-rose-50 text-rose-600 text-center text-xs font-black uppercase rounded-xl"
                >
                  Keluar Akun
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center bg-slate-100 text-slate-900 text-xs font-black uppercase rounded-xl"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 text-center bg-slate-950 text-white text-xs font-black uppercase rounded-xl"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}