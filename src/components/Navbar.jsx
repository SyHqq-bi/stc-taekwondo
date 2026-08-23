import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="STC Logo" className="h-10 w-auto" />
          <span className="font-black text-slate-900 font-heading tracking-wider uppercase hidden sm:block text-base">
            STAR <span className="text-stc-red">TAEKWONDO</span>
          </span>
        </Link>

        {/* Menu Navigasi */}
        <div className="flex items-center gap-5 text-xs font-extrabold uppercase tracking-wider text-slate-600">
          <Link to="/" className="hover:text-stc-red transition">Beranda</Link>
          <Link to="/schedule" className="hover:text-stc-red transition">Jadwal</Link>
          <Link to="/achievements" className="hover:text-stc-red transition">Prestasi</Link>

          {/* Bagian Akun Kanan Atas */}
          {!user ? (
            <div className="flex items-center gap-2 ml-2">
              <Link
                to="/login"
                className="px-4 py-2 text-slate-700 hover:text-slate-900 transition"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-stc-red text-white rounded-xl shadow-md shadow-red-500/20 hover:bg-red-700 transition"
              >
                Daftar
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              {/* Shortcut Khusus Admin */}
              {profile?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className="px-3 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition text-[11px]"
                  title="Dashboard Admin"
                >
                  <LayoutDashboard size={14} /> Admin
                </Link>
              )}

              {/* Tombol Nama/Foto Profil Kanan Atas -> Langsung ke Complete Profile */}
              <Link
                to="/complete-profile"
                className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl border border-slate-200/80 transition"
                title="Lengkapi Data Profil"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Foto Profil"
                    className="w-5 h-5 rounded-full object-cover border border-stc-red"
                  />
                ) : (
                  <User size={15} className="text-stc-red" />
                )}
                <span className="font-extrabold text-xs">
                  {profile?.full_name ? profile.full_name.split(' ')[0] : 'Profil'}
                </span>
              </Link>

              {/* Tombol Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-stc-red transition rounded-xl"
                title="Keluar"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}