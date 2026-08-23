import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, User, Flame, Sparkles, Edit3 } from 'lucide-react';

export default function Schedule() {
  const { profile } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('schedules')
      .select('*')
      .order('created_at', { ascending: true });

    setSchedules(data || []);
    setLoading(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 font-sans space-y-8 max-w-5xl mx-auto overflow-hidden">
      
      {/* Banner Pintas Admin */}
      {profile?.role === 'ADMIN' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs"
        >
          <div className="text-xs font-bold text-amber-900">
            Kamu login sebagai <strong className="uppercase font-black">Admin</strong>. Ingin mengedit atau menambah jadwal ini?
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 bg-slate-950 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5 flex-shrink-0"
          >
            <Edit3 size={14} /> Kelola Di Admin
          </Link>
        </motion.div>
      )}

      {/* Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.25em] text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
            <Flame size={12} className="text-red-600 fill-red-600 animate-pulse" /> AGENDA LATIHAN RUTIN
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading uppercase mt-3 tracking-tight">
            Jadwal <span className="text-red-600">Latihan STC</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium max-w-xl">
            Disiplin dan konsistensi adalah kunci prestasi. Pastikan hadir tepat waktu dengan memakai Do-bok lengkap.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-5 py-3.5 rounded-2xl">
          <Sparkles size={22} className="text-amber-500" />
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-slate-950">{schedules.length} Sesi / Minggu</div>
            <div className="text-[10px] text-red-600 font-extrabold uppercase">Terjadwal Sistem</div>
          </div>
        </div>
      </motion.div>

      {/* Grid Kartu Jadwal */}
      {loading ? (
        <div className="py-16 text-center text-xs font-bold text-slate-400">Memuat agenda latihan...</div>
      ) : schedules.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center text-xs font-bold text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
          Belum ada jadwal latihan yang ditambahkan oleh Admin.
        </motion.div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {schedules.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
                    HARI {item.day}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-full border border-slate-200/60">
                    <Clock size={13} className="text-red-600" /> {item.time}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-950 uppercase font-heading tracking-wide mt-2">
                  {item.category}
                </h3>

                <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-red-600 flex-shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <User size={16} className="text-amber-500 flex-shrink-0" />
                    <span>Pelatih: <strong className="text-slate-950">{item.coach}</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span>STC Official Dojang</span>
                <span className="text-red-600 font-bold">Wajib Hadir Tepat Waktu</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

    </div>
  );
}