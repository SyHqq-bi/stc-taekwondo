import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Flame, Trophy, ShieldCheck, Award, ArrowRight, ChevronRight, User, CheckCircle2, Zap, Sparkles, MapPin, Navigation } from 'lucide-react';

export default function Home() {
  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Hero Image Showcase
  const heroShowcaseImg = "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80";

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

  const programs = [
    {
      id: 'kyorugi',
      tag: 'KYORUGI',
      title: 'Kategori Pertarungan (Sparring)',
      desc: 'Spesialisasi teknik tendangan cepat, taktik bertarung, dan fisik kejuaraan tanding resmi.',
      category: 'TANDING',
      img: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'poomsae',
      tag: 'POOMSAE',
      title: 'Kategori Jurus (Seni)',
      desc: 'Penguasaan keindahan jurus, ketepatan posisi, keseimbangan, dan estetika tendangan.',
      category: 'SENI',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'reguler',
      tag: 'PEMULA',
      title: 'Kelas Reguler & Basic',
      desc: 'Program pengenalan teknik dasar, pembentukan kedisiplinan, dan kenaikan tingkat sabuk.',
      category: 'BASIC',
      img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredPrograms = activeCategory === 'ALL' 
    ? programs 
    : programs.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 font-sans space-y-24 max-w-6xl mx-auto">
      
      {/* 1. HERO SECTION (LAYOUT MINIMALIS ELEGAN ALA ULTIMATE UI) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Teks Sisi Kiri */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-xs">
            <Flame size={13} className="text-red-600 fill-red-600" /> STAR TAEKWONDO CLUB
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 font-heading tracking-tight leading-[1.08]">
            Pusat Pembinaan <br />
            <span className="text-red-600">Atlet Taekwondo</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
            Wadah pembentukan karakter, kedisiplinan, dan fisik atlet profesional dari tingkat pemula hingga kejuaraan daerah & nasional.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95"
            >
              Daftar Anggota <ArrowRight size={16} />
            </Link>
            <Link
              to="/schedule"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80 font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-xs flex items-center justify-center gap-2"
            >
              Jadwal Latihan
            </Link>
          </div>
        </div>

        {/* Showcase Visual Sisi Kanan (Kartu Minimalis Foto + Badge Gold) */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-2xl group transition-all duration-500">
            <img
              src={heroShowcaseImg}
              alt="STC Taekwondo Athlete"
              className="w-full h-[380px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            {/* Badge Terapung Emas / Medal Showcase */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-lg flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 flex-shrink-0">
                <Trophy size={20} />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 uppercase">Do-Jang Resmi Pengcab TI</div>
                <div className="text-[10px] text-red-600 font-extrabold uppercase tracking-wider">Terverifikasi & Bersetifikat</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP LOGO / FEDERASI SUPPORT */}
      <section className="pt-4 border-t border-slate-200/60">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <span>PENGCAB TAEKWONDO</span>
          <span className="hidden sm:inline">•</span>
          <span>KUKKIWON CERTIFIED</span>
          <span className="hidden sm:inline">•</span>
          <span>SISTEM DIGITAL REKAM JEJAK</span>
          <span className="hidden sm:inline">•</span>
          <span>STAR DOJANG BANTEN</span>
        </div>
      </section>

      {/* 2. PROGRAM & KATEGORI LATIHAN (SHOWCASE DENGAN FILTER PILLS SEPERTI DI VIDEO) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            PROGRAM PEMBINAAN
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Kategori Spesialisasi
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Program latihan dirancang khusus untuk memenuhi bakat dan potensi setiap atlet.
          </p>
        </div>

        {/* Filter Pills Kapsul ala Minimalist App UI */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'ALL', label: 'Semua Program' },
            { id: 'TANDING', label: 'Kyorugi (Tanding)' },
            { id: 'SENI', label: 'Poomsae (Seni)' },
            { id: 'BASIC', label: 'Reguler Pemula' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-slate-950 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Kartu Program Minimalis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={prog.img}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                    {prog.tag}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-base font-black text-slate-950 font-heading uppercase">{prog.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{prog.desc}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-2 text-xs font-black text-red-600 hover:text-red-700 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >
                  Lihat Sesi Latihan <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. KEY FEATURES / KEUNGGULAN CLUB (4 KARTU SEPERTI 00:06 DI VIDEO) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            KEY ADVANTAGES
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Mengapa Memilih STC?
          </h2>
          <p className="text-xs text-slate-500 font-medium"> Standar pelatihan modern untuk membentuk atlet tangguh & berprestasi. </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Pelatih Bersetifikat',
              desc: 'Dibina langsung oleh Sabeum berlisensi resmi Kukkiwon & Pengcab TI.',
              icon: ShieldCheck,
              iconBg: 'bg-red-50 text-red-600 border-red-100'
            },
            {
              title: 'Jalur Kejuaraan',
              desc: 'Peluang mengikuti kejuaraan tingkat daerah, provinsi, hingga nasional.',
              icon: Trophy,
              iconBg: 'bg-amber-50 text-amber-500 border-amber-100'
            },
            {
              title: 'Rekam Jejak Digital',
              desc: 'Data keanggotaan dan koleksi medali tercatat sistem secara online.',
              icon: Sparkles,
              iconBg: 'bg-red-50 text-red-600 border-red-100'
            },
            {
              title: 'Mental Disiplin',
              desc: 'Menanamkan nilai rasa hormat, ketaatan, dan ketahanan fisik juara.',
              icon: Award,
              iconBg: 'bg-amber-50 text-amber-500 border-amber-100'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} border flex items-center justify-center font-black`}>
                <item.icon size={22} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-slate-950 uppercase font-heading">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HEAD COACH SPOTLIGHT (LAYOUT DITENGAH / CENTER) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            HEAD COACH & INSTRUCTORS
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Pelatih Utama STC
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Dibimbing langsung oleh Sabeum berdedikasi tinggi dan berpengalaman.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {loadingCoaches ? (
            <div className="py-8 text-xs font-bold text-slate-400">Memuat data pelatih...</div>
          ) : coaches.length > 0 ? (
            coaches.map((c) => (
              <div
                key={c.id}
                className="w-full sm:w-80 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center space-y-3"
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
                  <span className="inline-block px-3 py-1 bg-red-100/80 text-red-700 text-[10px] font-black uppercase rounded-full tracking-wider border border-red-200">
                    SABEUM / HEAD COACH
                  </span>
                  <h3 className="text-lg font-black text-slate-950 uppercase font-heading tracking-wide mt-2">
                    {c.full_name || 'Sabeum STC'}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase mt-0.5">
                    Star Taekwondo Dojang
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-6 text-center space-y-2 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <User size={24} />
              </div>
              <h3 className="text-xs font-black uppercase text-slate-800">Belum Ada Sabeum Ditunjuk</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Admin dapat memilih akun anggota dan mengubah aksesnya menjadi <strong>SABEUM (COACH)</strong> melalui halaman Admin Dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. LOKASI DOJANG / GOOGLE MAPS */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-500 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-4 lg:col-span-1">
            <span className="text-[10px] font-black tracking-[0.2em] text-red-600 uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
              OFFICIAL LOCATION
            </span>
            <h2 className="text-2xl font-black text-slate-950 font-heading uppercase">
              Lokasi Dojang STC
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Kabupaten Tangerang, Banten (SMAN 31 Kab. Tangerang / Area Dojang STC).
            </p>
            
            <a
              href="https://maps.google.com/?q=SMAN+31+Kabupaten+Tangerang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 active:scale-95 shadow-sm"
            >
              <Navigation size={15} className="text-red-500" /> Petunjuk Google Maps
            </a>
          </div>

          <div className="lg:col-span-2 h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200/80 relative">
            <iframe
              title="Dojang Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126932.61058728956!2d106.5132225!3d-6.1783056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fe01460c5a31%3A0xb36412e2f694a1d3!2sKabupaten%20Tangerang%2C%20Banten!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full grayscale-[20%]"
            />
          </div>
        </div>
      </section>

      {/* 6. DARK CTA BANNER (SEPERTI WADAH GELAP DI 00:09 PADA VIDEO) */}
      <section className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="space-y-3 relative z-10 max-w-lg">
          <span className="text-[10px] font-black text-amber-400 tracking-[0.25em] uppercase bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
            START YOUR JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase tracking-tight leading-tight">
            Mulai Perjalanan Prestasimu Hari Ini
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Gabung bersama Star Taekwondo Club dan kembangkan potensi diri bersama para pelatih profesional.
          </p>
        </div>

        <Link
          to="/register"
          className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 relative z-10"
        >
          Daftar Akun Sekarang
        </Link>
      </section>

    </div>
  );
}