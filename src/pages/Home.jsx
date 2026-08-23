import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Flame, Trophy, Users, ShieldCheck, Award, ArrowRight, ChevronRight, User, CheckCircle2, Zap } from 'lucide-react';

export default function Home() {
  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(true);

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    setLoadingCoaches(true);
    // Hanya ambil user yang telah kamu set sebagai 'COACH' dari dashboard Admin
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, role')
      .eq('role', 'COACH')
      .order('created_at', { ascending: true });

    setCoaches(data || []);
    setLoadingCoaches(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 font-sans space-y-16 max-w-6xl mx-auto">
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-red-50/60 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl space-y-5 text-center md:text-left relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-widest text-red-600 uppercase bg-red-100/80 px-4 py-1.5 rounded-full border border-red-200">
            <Flame size={14} className="text-red-600" /> STAR TAEKWONDO CLUB
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading uppercase tracking-tight leading-tight">
            Melatih Disiplin, <br />
            <span className="text-red-600">Mengukir Prestasi</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-lg">
            Wadah pembentukan karakter, mental, dan fisik atlet Taekwondo berprestasi dari tingkat pemula hingga kejuaraan nasional.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center md:justify-start">
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-500/25 transition flex items-center justify-center gap-2 active:scale-95"
            >
              Daftar Sekarang <ArrowRight size={16} />
            </Link>
            <Link
              to="/schedule"
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-black text-xs uppercase tracking-wider rounded-2xl transition shadow-xs flex items-center justify-center gap-2"
            >
              Lihat Jadwal Latihan
            </Link>
          </div>
        </div>

        <div className="w-full md:w-80 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-md space-y-4 relative z-10">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-black">
              <Trophy size={20} />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 uppercase">Pusat Latihan Resmi</div>
              <div className="text-[10px] text-red-600 font-bold">Pengcab Taekwondo Indonesia</div>
            </div>
          </div>

          <div className="space-y-2 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              <span>Program Kyorugi & Poomsae</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              <span>Pelatih Bersetifikat Kukkiwon</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              <span>Sistem Rekam Jejak Digital</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTIK STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ATLET AKTIF', count: '100+', icon: Users, color: 'text-red-600' },
          { label: 'MEDALI DIRAIH', count: '50+', icon: Trophy, color: 'text-amber-500' },
          { label: 'DOJANG LATIHAN', count: '2 Area', icon: Zap, color: 'text-blue-600' },
          { label: 'PELATIH RESMI', count: '100%', icon: ShieldCheck, color: 'text-emerald-600' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs text-center space-y-1">
            <stat.icon size={22} className={`mx-auto ${stat.color} mb-1`} />
            <div className="text-2xl font-black text-slate-900 font-heading">{stat.count}</div>
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* 3. SEKSI SABEUM / HEAD COACH (CENTER LAYOUT DENGAN DATA ASLI) */}
      <section className="space-y-6">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            HEAD COACH & INSTRUCTORS
          </span>
          <h2 className="text-2xl font-black text-slate-900 font-heading uppercase mt-2">
            Pelatih Utama STC
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dibimbing langsung oleh Sabeum bersertifikasi resmi dan berpengalaman.
          </p>
        </div>

        {/* Container Kartu Ditengah (Flex Center) */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          {loadingCoaches ? (
            <div className="py-8 text-xs font-bold text-slate-400">Memuat data pelatih...</div>
          ) : coaches.length > 0 ? (
            coaches.map((c) => (
              <div
                key={c.id}
                className="w-full sm:w-80 bg-gradient-to-b from-red-50/40 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-6 shadow-sm hover:shadow-md transition text-center space-y-3"
              >
                {c.avatar_url ? (
                  <img
                    src={c.avatar_url}
                    alt={c.full_name}
                    className="w-20 h-20 mx-auto rounded-2xl object-cover border-2 border-red-100 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shadow-sm">
                    <User size={36} />
                  </div>
                )}

                <div>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase rounded-full tracking-wider border border-red-200">
                    SABEUM / HEAD COACH
                  </span>
                  <h3 className="text-lg font-black text-slate-900 uppercase font-heading tracking-wide mt-2">
                    {c.full_name || 'Sabeum STC'}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">
                    Star Taekwondo Dojang
                  </p>
                </div>
              </div>
            ))
          ) : (
            /* Kotak Pemberitahuan Jika Belum Ada Akun Yang Dijadikan Sabeum */
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-6 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <User size={24} />
              </div>
              <h3 className="text-xs font-black uppercase text-slate-800">Belum Ada Sabeum Ditunjuk</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Admin dapat memilih akun anggota dan mengubah aksesknya menjadi <strong>SABEUM (COACH)</strong> melalui halaman Admin Dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. PROGRAM PEMBINAAN */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 font-heading uppercase">Program Pembinaan Atlet</h2>
            <p className="text-xs text-slate-500 mt-0.5">Kategori kelas sesuai minat dan potensi atlet.</p>
          </div>
          <Link to="/schedule" className="text-xs font-black text-red-600 hover:underline uppercase tracking-wider flex items-center gap-1">
            Cek Jadwal <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-lg">KYORUGI</span>
            <h3 className="text-sm font-black text-slate-900 uppercase">Kategori Pertarungan (Sparring)</h3>
            <p className="text-xs text-slate-500 font-medium">Fokus pada teknik tendangan, kecepatan, taktik bertarung, dan fisik kejuaraan.</p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-black uppercase rounded-lg">POOMSAE</span>
            <h3 className="text-sm font-black text-slate-900 uppercase">Kategori Jurus (Seni)</h3>
            <p className="text-xs text-slate-500 font-medium">Fokus pada ketepatan gerakan, keseimbangan, dan estetika tendangan.</p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <span className="text-[10px] font-black text-red-500 tracking-widest uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            JOIN STAR TAEKWONDO
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase">Siap Menjadi Atlet Berprestasi?</h2>
          <p className="text-xs text-slate-400 font-medium max-w-md">Daftarkan dirimu sekarang dan mulai perjalanan latihanmu bersama STC.</p>
        </div>

        <Link
          to="/register"
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 transition active:scale-95 flex-shrink-0 relative z-10"
        >
          Daftar Akun Sekarang
        </Link>
      </section>

    </div>
  );
}