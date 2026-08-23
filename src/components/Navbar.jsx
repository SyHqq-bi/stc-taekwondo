import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';

// Import aset gambar langsung via Vite
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'BERANDA', path: '/' },
    { title: 'PRESTASI', path: '/achievements' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#F8F9FA]/90 backdrop-blur-md py-3.5 shadow-sm border-b border-slate-200/80' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
       {/* LOGO BRAND */}
<Link to="/" className="flex items-center gap-2.5">
  <img 
    src={logoImg} 
    alt="Star Taekwondo Club Logo" 
    className="w-10 h-10 object-contain"
  />
  <span className="font-heading font-black text-lg tracking-tight text-slate-900">
    <span className="text-stc-red">STAR</span> TAEKWONDO CLUB
  </span>
</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.path}
              className={`text-xs font-bold tracking-wider transition-colors ${
                location.pathname === link.path ? 'text-stc-red' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={profile?.role === 'ADMIN' ? '/admin' : '/member'}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 hover:border-stc-red transition flex items-center gap-2 shadow-sm"
              >
                <User size={14} className="text-stc-red" />
                {profile?.full_name?.split(' ')[0] || 'Dashboard'}
              </Link>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-stc-red transition" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-xs font-bold tracking-wider text-slate-700 hover:text-slate-900 transition px-3 py-2">
                MASUK
              </Link>
              <Link to="/register" className="text-xs font-extrabold tracking-wider text-white bg-stc-red hover:bg-red-700 px-5 py-2.5 rounded-xl transition shadow-lg shadow-red-500/20">
                GABUNG STC
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-800">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.title} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-700 hover:text-stc-red py-1">
              {link.title}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <Link to={profile?.role === 'ADMIN' ? '/admin' : '/member'} onClick={() => setMobileMenuOpen(false)} className="text-center py-2.5 bg-stc-red rounded-xl text-xs font-bold text-white">
                DASHBOARD
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800">
                  MASUK
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-2.5 bg-stc-red rounded-xl text-xs font-bold text-white">
                  GABUNG STC
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}