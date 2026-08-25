import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/supabase';
import { 
  Flame, Trophy, ShieldCheck, Award, ArrowRight, ChevronRight, User, 
  Sparkles, Navigation, CheckCircle2, HelpCircle, ChevronDown, 
  MessageSquare, Star, Zap, Calendar, MapPin, Users
} from 'lucide-react';

export default function Home() {
  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [openFaq, setOpenFaq] = useState(null);

  // Foto PNG Cutout Atlet
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
      tag: 'KYORUGI / TANDING',
      title: 'Kategori Pertarungan (Sparring)',
      desc: 'Spesialisasi teknik tendangan cepat, taktik bertarung, reaksi tanding, dan pembentukan fisik kejuaraan resmi.',
      category: 'KYORUGI',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      highlights: ['Simulasi Sensor Body Protector Digital', 'Drill Kecepatan Kick Target', 'Penguatan Fisik & Ketahanan Tanding']
    },
    {
      id: 'poomsae',
      tag: 'POOMSAE / SENI',
      title: 'Kategori Jurus (Seni)',
      desc: 'Penguasaan keindahan jurus, ketepatan posisi kuda-kuda, keseimbangan, serta estetika gerakan Taekwondo.',
      category: 'POOMSAE',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
      highlights: ['Kerapihan & Akurasi Gerakan Jurus', 'Keseimbangan Kuda-Kuda Tinggi', 'Persiapan Kejuaraan Seni Resmi']
    }
  ];

  const filteredPrograms = activeCategory === 'ALL' 
    ? programs 
    : programs.filter(p => p.category === activeCategory);

  const faqs = [
    {
      q: 'Usia berapa saja yang bisa mendaftar di Star Taekwondo Club?',
      a: 'Kami menerima atlet mulai dari usia pemula (anak-anak umur 5 tahun), usia remaja (SMP/SMA), hingga kelas dewasa.'
    },
    {
      q: 'Apakah pemula yang belum pernah latihan bela diri bisa bergabung?',
      a: 'Sangat bisa! Kurikulum latihan kami dirancang bertahap dari pengenalan teknik dasar sabuk putih hingga tingkat mahir.'
    },
    {
      q: 'Kapan dan di mana jadwal latihan diadakan?',
      a: 'Latihan rutin diadakan setiap akhir pekan (Sabtu & Minggu) berlokasi di Dojang Resmi STC (SMAN 31 Kab. Tangerang).'
    },
    {
      q: 'Apakah baju seragam (Do-bok) langsung diberikan saat daftar?',
      a: 'Informasi pembelian dan ukuran seragam resmi Do-bok Kukkiwon akan dipandu oleh pengurus saat pendaftaran ulang akun selesai.'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 font-sans space-y-24 max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden">
      
      {/* 1. HERO SECTION DENGAN AMBIENT GLOW & GRID PATTERN */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative bg-gradient-to-b from-slate-100/90 via-slate-50 to-white rounded-3xl border border-slate-200/80 p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Teks Sisi Kiri */}
        <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-red-600 uppercase bg-red-100/80 px-4 py-1.5 rounded-full border border-red-200 shadow-2xs">
            <Flame size={14} className="text-red-600 fill-red-600 animate-pulse" />
            <span>Pendaftaran Gelombang Baru Dibuka</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 font-heading tracking-tight leading-[1.08]">
            Melatih Disiplin, <br />
            <span className="text-red-600">Mengukir Prestasi</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
            Pusat pelatihan Taekwondo profesional di Kabupaten Tangerang. Membentuk karakter tangguh, mental kejuaraan, dan rekam jejak prestasi digital terpercaya.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-slate-950/10 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Daftar Sekarang <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                to="/schedule"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-black text-xs uppercase tracking-wider rounded-2xl shadow-2xs transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Cek Jadwal Latihan
              </Link>
            </motion.div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span className="text-xs font-bold">100+ Atlet Aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span className="text-xs font-bold">Lisensi Pengcab TI</span>
            </div>
          </div>
        </motion.div>

        {/* Floating PNG Showcase Kanan */}
        <motion.div variants={fadeInUp} className="lg:col-span-5 relative flex items-center justify-center py-4 relative z-10">
          <div className="relative w-full flex flex-col items-center">
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.03 }}
              src={heroAthletePng}
              alt="STC Taekwondo Athlete Cutout"
              className="w-auto h-[320px] sm:h-[380px] object-contain drop-shadow-2xl"
            />

            <motion.div 
              whileHover={{ y: -4 }}
              className="mt-2 bg-white/95 backdrop-blur-md border border-slate-200/80 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                <Trophy size={20} />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-950 uppercase font-heading">Do-Jang Resmi Pengcab TI</div>
                <div className="text-[10px] text-red-600 font-extrabold uppercase tracking-wider">Terverifikasi & Bersetifikat</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* 2. STATISTIK STRIP BENTO BOX */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'ATLET TERDAFTAR', count: '100+', icon: Users, color: 'text-red-600', bg: 'bg-red-50/50' },
          { label: 'MEDALI PEROLEHAN', count: '50+', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50/50' },
          { label: 'LOKASI DOJANG', count: '2 Area', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50/50' },
          { label: 'PELATIH KUKKIWON', count: '100%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`bg-white border border-slate-200/80 p-5 rounded-3xl shadow-2xs text-center space-y-1.5 hover:border-slate-300 transition-all`}
          >
            <div className={`w-10 h-10 mx-auto rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-1`}>
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-black text-slate-950 font-heading tracking-tight">{stat.count}</div>
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* 3. PROGRAM PEMBINAAN (DENSE CARDS) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            PROGRAM PEMBINAAN ATLET
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Kategori Spesialisasi
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Program dibimbing oleh instruktur berpengalaman sesuai dengan minat & bakat atlet.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'ALL', label: 'Semua Program' },
            { id: 'KYORUGI', label: 'Kyorugi (Tanding)' },
            { id: 'POOMSAE', label: 'Poomsae (Seni)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-slate-950 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatePresence>
            {filteredPrograms.map((prog) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                key={prog.id}
                className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative bg-slate-100">
                    <img
                      src={prog.img}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                      {prog.tag}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-950 font-heading uppercase">{prog.title}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{prog.desc}</p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
                      {prog.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-red-600 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100/60 mt-2">
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

      {/* 4. GALERI SUASANA DOJANG & LATIHAN (NEW SECTION FOR DENSITY) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            ATMOSPHERE & ACTIVITIES
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Suasana Latihan Dojang
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Atmosfer latihan disiplin, seru, dan penuh semangat kebersamaan para atlet STC.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Latihan Fisik & Sparring',
              tag: 'KYORUGI',
              img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
            },
            {
              title: 'Presisi Jurus Poomsae',
              tag: 'SENI',
              img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
            },
            {
              title: 'Pemberian Medali Juara',
              tag: 'KEJUARAAN',
              img: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=600&q=80'
            },
            {
              title: 'Pembentukan Karakter Usia Dini',
              tag: 'PEMULA',
              img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 h-64 shadow-2xs hover:shadow-xl transition-all duration-500"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="px-2.5 py-0.5 bg-red-600 text-[9px] font-black uppercase rounded-md tracking-wider">
                  {item.tag}
                </span>
                <h3 className="text-xs font-black uppercase font-heading leading-snug">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 5. KEUNGGULAN CLUB (4 KARTU BENTO) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            WHY STAR TAEKWONDO
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Mengapa Memilih STC?
          </h2>
          <p className="text-xs text-slate-500 font-medium">Fasilitas dan standar pelatihan modern untuk mencetak atlet tangguh.</p>
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
              desc: 'Peluang terbuka mengikuti kejuaraan daerah, provinsi, hingga nasional.',
              icon: Trophy,
              iconBg: 'bg-amber-50 text-amber-500 border-amber-100'
            },
            {
              title: 'Rekam Jejak Digital',
              desc: 'Data keanggotaan dan koleksi medali tercatat dalam sistem online.',
              icon: Sparkles,
              iconBg: 'bg-red-50 text-red-600 border-red-100'
            },
            {
              title: 'Mental & Disiplin',
              desc: 'Menanamkan nilai rasa hormat, ketaatan, dan ketahanan fisik juara.',
              icon: Award,
              iconBg: 'bg-amber-50 text-amber-500 border-amber-100'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs hover:shadow-xl transition-all duration-500 space-y-4"
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

      {/* 6. HEAD COACH SPOTLIGHT */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
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
                whileHover={{ y: -6 }}
                className="w-full sm:w-80 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs hover:shadow-xl transition-all duration-500 text-center space-y-3"
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
            <motion.div variants={fadeInUp} className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-6 text-center space-y-2 shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <User size={24} />
              </div>
              <h3 className="text-xs font-black uppercase text-slate-800">Belum Ada Sabeum Ditunjuk</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Admin dapat memilih akun anggota dan mengubah aksesnya menjadi <strong>SABEUM (COACH)</strong> melalui Admin Dashboard.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* 7. TESTIMONI (NEW SECTION FOR DENSITY & TRUST) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Kata Orang Tua & Atlet
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Pengalaman tumbuh bersama Star Taekwondo Club.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Sejak bergabung di STC, anak saya jadi jauh lebih disiplin dalam membagi waktu sekolah dan olahraga. Pelatihnya sangat sabar mengarahkan.",
              name: "Ibu Rina",
              role: "Orang Tua Atlet Kyorugi"
            },
            {
              quote: "Latihannya terstruktur banget. Dari awal sabuk putih sampai dapat medali pertama di kejuaraan daerah bener-bener didukung penuh sama Sabeum.",
              name: "Rizky Pratama",
              role: "Atlet STC (Sabuk Merah)"
            },
            {
              quote: "Sistem rekam jejak prestasinya keren, semua medali tercatat online. Bikin makin semangat buat ikut kejuaraan berikutnya!",
              name: "Bapak Hendra",
              role: "Orang Tua Atlet Poomsae"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs hover:shadow-xl transition-all duration-500 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-black text-xs">
                  <User size={18} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-slate-950">{item.name}</div>
                  <div className="text-[10px] text-slate-400 font-extrabold uppercase">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 8. FAQ ACCORDION SECTION (NEW SECTION FOR DENSITY) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="bg-slate-100/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-8"
      >
        <motion.div variants={fadeInUp} className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading uppercase tracking-tight">
            Pertanyaan Umum
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Hal yang sering ditanyakan seputar pendaftaran & latihan di Dojang STC.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-xs sm:text-sm font-black text-slate-950 uppercase font-heading">
                  {faq.q}
                </span>
                <ChevronDown 
                  size={18} 
                  className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180 text-red-600' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* 9. LOKASI DOJANG / GOOGLE MAPS */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeInUp}
        className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xs hover:shadow-md transition-all duration-500 space-y-6"
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

      {/* 10. DARK CTA BANNER */}
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