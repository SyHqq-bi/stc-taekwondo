import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, User, Search, Calendar, Flame } from 'lucide-react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMedal, setFilterMedal] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('achievements')
      .select('*, profiles(full_name, avatar_url)')
      .eq('status', 'APPROVED')
      .order('year', { ascending: false });

    setAchievements(data || []);
    setLoading(false);
  };

  const filteredData = achievements.filter((item) => {
    const studentName = item.profiles?.full_name || item.athlete_name || '';
    const matchesSearch = studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.competition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMedal = filterMedal === 'ALL' || item.medal === filterMedal;
    return matchesSearch && matchesMedal;
  });

  const getMedalBadge = (medal) => {
    switch (medal) {
      case 'GOLD':
        return 'bg-amber-500 text-white border-amber-400 font-black';
      case 'SILVER':
        return 'bg-slate-800 text-white border-slate-700 font-black';
      case 'BRONZE':
        return 'bg-amber-800 text-amber-100 border-amber-700 font-black';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 font-bold';
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 font-sans space-y-8 max-w-5xl mx-auto overflow-hidden">
      
      {/* Header Banner */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            <Flame size={12} className="text-red-600 fill-red-600 animate-pulse" /> HALL OF FAME STC
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading uppercase mt-3 tracking-tight">
            Rekam Jejak <span className="text-red-600">Prestasi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium max-w-xl">
            Daftar medali dan pencapaian resmi atlet Star Taekwondo Club di kejuaraan daerah & nasional.
          </p>
        </div>

        <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-200/80 px-6 py-4 rounded-2xl shadow-xs">
          <Trophy className="text-amber-500" size={32} />
          <div className="text-left">
            <div className="text-2xl font-black font-heading text-slate-950">{achievements.length} Medali</div>
            <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider">Terverifikasi Admin</div>
          </div>
        </div>
      </motion.div>

      {/* Filter Bar & Search */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari atlet / kejuaraan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-full py-3 pl-11 pr-4 text-xs font-bold text-slate-950 focus:outline-none focus:border-red-600 shadow-xs"
          />
        </div>

        {/* Pill Filter Kapsul */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1.5 rounded-full shadow-xs w-full sm:w-auto overflow-x-auto">
          {['ALL', 'GOLD', 'SILVER', 'BRONZE'].map((medal) => (
            <button
              key={medal}
              onClick={() => setFilterMedal(medal)}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                filterMedal === medal
                  ? 'bg-slate-950 text-white shadow-md scale-105'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {medal === 'ALL' ? 'Semua' : medal}
            </button>
          ))}
        </div>
      </motion.div>

      {/* List Kartu Prestasi */}
      {loading ? (
        <div className="py-16 text-center text-xs font-bold text-slate-400">Memuat rekam jejak prestasi...</div>
      ) : filteredData.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center text-xs font-bold text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
          Belum ada prestasi yang cocok.
        </motion.div>
      ) : (
        <motion.div layout className="space-y-4">
          <AnimatePresence>
            {filteredData.map((item) => {
              const studentName = item.profiles?.full_name || item.athlete_name || 'ATLET STC';
              const studentAvatar = item.profiles?.avatar_url;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  key={item.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs hover:shadow-xl transition-shadow duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {studentAvatar ? (
                      <img
                        src={studentAvatar}
                        alt={studentName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                        <User size={24} />
                      </div>
                    )}

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase font-heading tracking-wide">
                        {studentName}
                      </h3>
                      <div className="text-xs font-extrabold text-red-600 mt-0.5 uppercase tracking-wider">
                        {item.competition}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mt-1">
                        <span>Kategori: {item.title || '-'}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 font-mono text-slate-400">
                          <Calendar size={12} /> {item.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="self-end sm:self-center flex-shrink-0">
                    <span
                      className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 border shadow-xs ${getMedalBadge(
                        item.medal
                      )}`}
                    >
                      <Award size={16} />
                      MEDALI {item.medal}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

    </div>
  );
}