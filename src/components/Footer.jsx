import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-8 text-slate-500 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} STC Taekwondo Club. All rights reserved.</p>
        <div className="flex gap-6 font-bold text-slate-700">
          <Link to="/" className="hover:text-stc-red transition">Beranda</Link>
          <Link to="/achievements" className="hover:text-stc-red transition">Prestasi</Link>
          <Link to="/login" className="hover:text-stc-red transition">Masuk</Link>
        </div>
      </div>
    </footer>
  );
}