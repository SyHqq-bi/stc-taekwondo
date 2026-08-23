import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Clock, MapPin, User, Flame, Sparkles } from 'lucide-react';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    const { data } = await supabase.from('schedules').select('*').order('created_at', { ascending: true });
    setSchedules(data || []);
    setLoading(false);
  };

  const defaultSchedules = [
    {
      id: 1,
      day: 'SABTU',
      time: '15:30 - 17:30 WIB',
      location: 'Dojang Utama STC (Gedung Olahraga)',
      coach: 'Sabeum Nabil & Team',
      category: 'Reguler (Kyorugi & Poomsae)',
    },
    {
      id: 2,
      day: 'MINGGU',
      time: '08:00 - 11:00 WIB',
      location: 'Outdoor Area / Lapangan STC',
      coach: 'Sabeum Head Coach',
      category: 'TC Kejuaraan & Fisik Khusus',
    }
  ];

  const displayData = schedules.length > 0 ? schedules : defaultSchedules;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-red-50/50 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
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

          <div className="flex items-center gap-2.5 bg-white border-2 border-red-100 px-5 py-3.5 rounded-2xl shadow-sm">
            <Sparkles size={22} className="text-amber-500" />
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-900">2 Sesi / Minggu</div>
              <div className="text-[10px] text-red-600 font-bold">Terjadwal Sistem</div>
            </div>
          </div>
        </div>

        {/* Grid Kartu Jadwal */}
        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400">Memuat agenda latihan...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayData.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-red-50/30 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-red-500/20">
                      HARI {item.day || item.hari}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-red-50 px-3 py-1 rounded-xl border border-red-100">
                      <Clock size={13} className="text-red-600" /> {item.time || item.jam}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 uppercase font-heading tracking-wide mt-2">
                    {item.category || item.kategori || 'Sesi Latihan STC'}
                  </h3>

                  <div className="space-y-2.5 mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-2.5">
                      <MapPin size={16} className="text-red-600 flex-shrink-0" />
                      <span>{item.location || item.lokasi}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <User size={16} className="text-amber-500 flex-shrink-0" />
                      <span>Pelatih: <strong className="text-slate-900">{item.coach || item.pelatih}</strong></span>
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