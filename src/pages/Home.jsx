import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Flame, Trophy, Users, ShieldCheck, Award, ArrowRight, ChevronRight, User, CheckCircle2, Zap, MapPin, Clock, Navigation, Phone } from 'lucide-react';

export default function Home() {
  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(true);

  // Background Hero Foto Taekwondo
  const heroBgImage = "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1920&q=80";

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    setLoadingCoaches(true);
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, role')
      .eq('role', 'COACH')
      .order('created_at', { ascending: true });

    setCoaches(data || []);
    setLoadingCoaches(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 font-sans space-y-16 max-w-6xl mx-auto">
      
      {/* 1. HERO BANNER DENGAN PHOTO OVERLAY & GLASSMORPHISM */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 min-h-[480px] sm:min-h-[520px] flex items-center group transition-all duration-500">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${heroBgImage}')` }}
        />

        {/* Overlay Gelap Transparan */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/30" />

        <div className="relative z-10 w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-5 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black tracking-widest text-white uppercase bg-red-600/90 px-4 py-1.5 rounded-full border border-red-400/50 shadow-md">
              <Flame size={14} className="text-amber-300 animate-pulse" /> STAR TAEKWONDO CLUB
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading uppercase tracking-tight leading-tight drop-shadow-md">
              Melatih Disiplin, <br />
              <span className="text-red-500">Mengukir Prestasi</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-lg drop-shadow-sm">
              Wadah pembentukan karakter, mental, dan fisik atlet Taekwondo berprestasi dari tingkat pemula hingga kejuaraan nasional.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center md:justify-start">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                Daftar Sekarang <ArrowRight size={16} />
              </Link>
              <Link
                to="/schedule"
                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Lihat Jadwal Latihan
              </Link>
            </div>
          </div>

          {/* Widget Kaca Kanan Hero */}
          <div className="w-full md:w-80 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl text-white space-y-4 hover:border-red-500/30 transition-all duration-500">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-black flex-shrink-0">
                <Trophy size={20} />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-white">Pusat Latihan Resmi</div>
                <div className="text-[10px] text-red-400 font-bold">Pengcab Taekwondo Indonesia</div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                <span>Program Kyorugi & Poomsae</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                <span>Pelatih Bersetifikat Kukkiwon</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                <span>Sistem Rekam Jejak Digital</span>
              </div>
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
          <div
            key={idx}
            className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs text-center space-y-1 hover:border-red-500/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <stat.icon size={22} className={`mx-auto ${stat.color} mb-1`} />
            <div className="text-2xl font-black text-slate-900 font-heading">{stat.count}</div>
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* 3. SABEUM / HEAD COACH (CENTERED) */}
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

        <div className="flex flex-wrap justify-center items-center gap-6">
          {loadingCoaches ? (
            <div className="py-8 text-xs font-bold text-slate-400">Memuat data pelatih...</div>
          ) : coaches.length > 0 ? (
            coaches.map((c) => (
              <div
                key={c.id}
                className="w-full sm:w-80 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-red-500/30 hover:-translate-y-1.5 transition-all duration-500 text-center space-y-3"
              >
                {c.avatar_url ? (
                  <img
                    src={c.avatar_url}
                    alt={c.full_name}
                    className="w-20 h-20 mx-auto rounded-2xl object-cover border-2 border-red-100 shadow-sm transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shadow-sm">
                    <User size={36} />
                  </div>
                )}

                <div>
                  <span className="inline-block px-3 py-1 bg-red-100/80 text-red-700 text-[10px] font-black uppercase rounded-full tracking-wider border border-red-200">
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
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-6 text-center space-y-2 shadow-sm">
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
      <section className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
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
          <div className="p-5 bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-red-500/30 rounded-2xl space-y-2 transition-all duration-300 hover:shadow-sm">
            <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-lg">KYORUGI</span>
            <h3 className="text-sm font-black text-slate-900 uppercase">Kategori Pertarungan (Sparring)</h3>
            <p className="text-xs text-slate-500 font-medium">Fokus pada teknik tendangan, kecepatan, taktik bertarung, dan fisik kejuaraan.</p>
          </div>

          <div className="p-5 bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-slate-800/30 rounded-2xl space-y-2 transition-all duration-300 hover:shadow-sm">
            <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-black uppercase rounded-lg">POOMSAE</span>
            <h3 className="text-sm font-black text-slate-900 uppercase">Kategori Jurus (Seni)</h3>
            <p className="text-xs text-slate-500 font-medium">Fokus pada ketepatan gerakan, keseimbangan, dan estetika tendangan.</p>
          </div>
        </div>
      </section>

      {/* 5. SEKSI LOKASI DOJANG / GOOGLE MAPS */}
      <section className="space-y-6">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
            LOCATION & DOJANG
          </span>
          <h2 className="text-2xl font-black text-slate-900 font-heading uppercase mt-2">
            Lokasi Latihan STC
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kunjungi Dojang kami dan rasakan atmosfer latihan Taekwondo yang profesional.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Info Alamat & Kontak */}
            <div className="space-y-4 lg:col-span-1 p-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-black flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Dojang Utama STC</h3>
                  <p className="text-[11px] text-red-600 font-bold">Star Taekwondo Club</p>
                </div>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-600">
                <p className="leading-relaxed text-slate-500">
                  Kabupaten Tangerang, Banten (SMAN 31 Kab. Tangerang / GOR Dojang STC).
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Clock size={14} className="text-red-600" />
                    <span>Sabtu & Minggu (Sesuai Jadwal)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Phone size={14} className="text-emerald-600" />
                    <span>Informasi Pendaftaran: Official STC</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=SMAN+31+Kabupaten+Tangerang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
              >
                <Navigation size={15} className="text-red-500" /> Buka Di Google Maps
              </a>
            </div>

            {/* Peta Google Maps Interaktif Embed */}
            <div className="lg:col-span-2 h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner relative group">
              <iframe
                title="Dojang Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126932.61058728956!2d106.5132225!3d-6.1783056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fe01460c5a31%3A0xb36412e2f694a1d3!2sKabupaten%20Tangerang%2C%20Banten!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (PENUTUP) */}
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
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex-shrink-0 relative z-10"
        >
          Daftar Akun Sekarang
        </Link>
      </section>

    </div>
  );
}