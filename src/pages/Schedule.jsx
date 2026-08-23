import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
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

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner Pintas Admin */}
        {profile?.role === 'ADMIN' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="text-xs font-bold text-amber-900">
              Kamu login sebagai <strong className="uppercase font-black">Admin</strong>. Ingin mengedit atau menambah jadwal ini?
            </div>
            <Link
              to="/admin"
              className="px-4 py-2 bg-slate-900 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5 flex-shrink-0"
            >
              <Edit3 size={14} /> Kelola Di Admin
            </Link>
          </div>
        )}

        {/* Header Section */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200">
              <Flame size={12} className="text-red-600" /> AGENDA LATIHAN RUTIN
            </span>
            <h1 className="text-3xl font-black text-slate-900 font-heading uppercase mt-3 tracking-tight">
              Jadwal <span className="text-red-600">Latihan STC</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium max-w-xl">
              Disiplin dan konsistensi adalah kunci prestasi. Pastikan hadir tepat waktu dengan memakai Do-bok lengkap.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white border-2 border-red-100 px-5 py-3.5 rounded-2xl shadow-xs">
            <Sparkles size={22} className="text-amber-500" />
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-900">{schedules.length} Sesi / Minggu</div>
              <div className="text-[10px] text-red-600 font-bold">Terjadwal Sistem</div>
            </div>
          </div>
        </div>

        {/* Grid Kartu Jadwal */}
        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400">Memuat agenda latihan...</div>
        ) : schedules.length === 0 ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
            Belum ada jadwal latihan yang ditambahkan oleh Admin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schedules.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/80 hover:border-red-500/30 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm">
                      HARI {item.day}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-red-50 px-3 py-1 rounded-xl border border-red-100">
                      <Clock size={13} className="text-red-600" /> {item.time}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 uppercase font-heading tracking-wide mt-2">
                    {item.category}
                  </h3>

                  <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-2.5">
                      <MapPin size={16} className="text-red-600 flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <User size={16} className="text-amber-500 flex-shrink-0" />
                      <span>Pelatih: <strong className="text-slate-900">{item.coach}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <span>STC Official Dojang</span>
                  <span className="text-red-600 font-bold">Wajib Hadir Tepat Waktu</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}