import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/supabase';
import { Flame, Trophy, ShieldCheck, Award, ArrowRight, ChevronRight, User, Sparkles, Navigation } from 'lucide-react';

export default function Home() {
  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Foto PNG Transparan Atlet Cutout
  const heroAthletePng = "https://pngimg.com/uploads/taekwondo/taekwondo_PNG18.png";

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
      desc: 'Spesialisasi teknik tendangan cepat, taktik bertarung, reaksi tanding, dan pembentukan fisik kejuaraan resmi.',
      category: 'KYORUGI',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'poomsae',
      tag: 'POOMSAE',
      title: 'Kategori Jurus (Seni)',
      desc: 'Penguasaan keindahan jurus, ketepatan posisi kuda-kuda, keseimbangan, serta estetika gerakan Taekwondo.',
      category: 'POOMSAE',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredPrograms = activeCategory === 'ALL' 
    ? programs 
    : programs.filter(p => p.category === activeCategory);

  // Variabel Animasi Figma-Style
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 font-sans space-y-24 max-w-6xl mx-auto overflow-hidden">
      
      {/* 1. HERO SECTION (FADE & SLIDE UP SPRING ANIMATION) */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[440px]"
      >
        {/* Teks Sisi Kiri */}
        <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-4 py-1.5 rounded-full border border-red-100 shadow-xs">
            <Flame size={13} className="text-red-600 fill-red-600 animate-pulse" /> STAR TAEKWONDO CLUB
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 font-heading tracking-tight leading-[1.08]">
            Pusat Pembinaan <br />
            <span className="text-red-600">Atlet Taekwondo</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
            Wadah pembentukan karakter, kedisiplinan, dan fisik atlet profesional dari tingkat pemula hingga kejuaraan daerah & nasional.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-slate-950/10 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Daftar Anggota <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/schedule"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xs transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Jadwal Latihan
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Atlet Cutout Kanan */}
        <motion.div variants={fadeInUp} className="lg:col-span-5 relative flex items-center justify-center py-6">
          <div className="absolute w-[320px] h-[320px] bg-gradient-to-tr from-red-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full flex flex-col items-center">
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.03 }}
              src={heroAthletePng}
              alt="STC Taekwondo Athlete Cutout"
              className="w-auto h-[320px] sm:h-[380px] object-contain drop-shadow-2xl cursor-pointer"
            />

            <motion.div 
              whileHover={{ y: -4 }}
              className="mt-4 bg-white/90 backdrop-blur-md border border-slate-200/80 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                <Trophy size={18} />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900 uppercase font-heading">Dojang Resmi Pengcab TI</div>
                <div className="text-[10px] text-red-600 font-extrabold uppercase tracking-wider">Terverifikasi & Bersetifikat</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* 2. STRIP TEXT FEDERASI */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pt-4 border-t border-slate-200/60"
      >
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
          <span className="hover:text-red-600 transition-colors">PENGCAB TAEKWONDO</span>
          <span className="hidden sm:inline">•</span>
          <span className="hover:text-red-600 transition-colors">KUKKIWON CERTIFIED</span>
          <span className="hidden sm:inline">•</span>
          <span className="hover:text-red-600 transition-colors">SISTEM DIGITAL REKAM JEJAK</span>
          <span className="hidden sm:inline">•</span>
          <span className="hover:text-red-600 transition-colors">STAR DOJANG BANTEN</span>
        </div>
      </motion.section>

      {/* 3. PROGRAM PEMBINAAN (SCROLL REVEAL & SMOOTH TAB ANIMATION) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            PROGRAM PEMBINAAN
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Kategori Spesialisasi
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Program latihan difokuskan pada dua kategori utama kejuaraan resmi Taekwondo.
          </p>
        </motion.div>

        {/* Filter Pills Kapsul */}
        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'ALL', label: 'Semua Program' },
            { id: 'KYORUGI', label: 'Kyorugi (Tanding)' },
            { id: 'POOMSAE', label: 'Poomsae (Seni)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 relative ${
                activeCategory === tab.id
                  ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Grid Kartu Program (Smooth Layout Animation) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredPrograms.map((prog) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                key={prog.id}
                className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-shadow duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 overflow-hidden relative bg-slate-100">
                    <img
                      src={prog.img}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                      {prog.tag}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-slate-950 font-heading uppercase">{prog.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{prog.desc}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to="/schedule"
                    className="inline-flex items-center gap-2 text-xs font-black text-red-600 hover:text-red-700 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300"
                  >
                    Lihat Sesi Latihan <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* 4. KEY ADVANTAGES (STAGGERED CARD ANIMATION) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            KEY ADVANTAGES
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Mengapa Memilih STC?
          </h2>
          <p className="text-xs text-slate-500 font-medium">Standar pelatihan modern untuk membentuk atlet tangguh & berprestasi.</p>
        </motion.div>

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
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-shadow duration-500 space-y-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.iconBg} border flex items-center justify-center font-black`}>
                <item.icon size={22} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-black text-slate-950 uppercase font-heading">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. HEAD COACH SPOTLIGHT (CENTERED WITH SPRING ANIMATION) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            HEAD COACH & INSTRUCTORS
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Pelatih Utama STC
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Dibimbing langsung oleh Sabeum berdedikasi tinggi dan berpengalaman.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {loadingCoaches ? (
            <div className="py-8 text-xs font-bold text-slate-400">Memuat data pelatih...</div>
          ) : coaches.length > 0 ? (
            coaches.map((c) => (
              <motion.div
                key={c.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="w-full sm:w-80 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-shadow duration-500 text-center space-y-3"
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
              </motion.div>
            ))
          ) : (
            <motion.div variants={fadeInUp} className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-6 text-center space-y-2 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <User size={24} />
              </div>
              <h3 className="text-xs font-black uppercase text-slate-800">Belum Ada Sabeum Ditunjuk</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Admin dapat memilih akun anggota dan mengubah aksesnya menjadi <strong>SABEUM (COACH)</strong> melalui halaman Admin Dashboard.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* 6. LOKASI DOJANG / GOOGLE MAPS */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-500 space-y-6"
      >
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
      </motion.section>

      {/* 7. DARK CTA BANNER */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden"
      >
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

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10 flex-shrink-0">
          <Link
            to="/register"
            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 transition-colors duration-300 block"
          >
            Daftar Akun Sekarang
          </Link>
        </motion.div>
      </motion.section>

    </div>
  );
}