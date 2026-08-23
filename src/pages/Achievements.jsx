import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
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
        return 'bg-amber-500 text-white border-amber-400 font-black shadow-sm';
      case 'SILVER':
        return 'bg-slate-800 text-white border-slate-700 font-black shadow-sm';
      case 'BRONZE':
        return 'bg-amber-800 text-amber-100 border-amber-700 font-black shadow-sm';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 font-bold';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section Dengan Frame Merah Top Border */}
        <div className="bg-gradient-to-br from-red-50/50 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-8 shadow-md text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200 shadow-xs">
              <Flame size={12} className="text-red-600" /> HALL OF FAME STC
            </span>
            <h1 className="text-3xl font-black text-slate-900 font-heading uppercase mt-3 tracking-tight">
              Rekam Jejak <span className="text-red-600">Prestasi</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Daftar medali dan pencapaian resmi atlet Star Taekwondo Club di kejuaraan daerah & nasional.
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white border-2 border-red-100 px-6 py-4 rounded-2xl shadow-sm">
            <Trophy className="text-amber-500" size={32} />
            <div>
              <div className="text-2xl font-black font-heading text-slate-900">{achievements.length} Medali</div>
              <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider">Terverifikasi Admin</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atlet / kejuaraan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/80 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 shadow-sm transition"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm w-full sm:w-auto overflow-x-auto">
            {['ALL', 'GOLD', 'SILVER', 'BRONZE'].map((medal) => (
              <button
                key={medal}
                onClick={() => setFilterMedal(medal)}
                className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  filterMedal === medal
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/30 scale-105'
                    : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {medal === 'ALL' ? 'Semua' : medal}
              </button>
            ))}
          </div>
        </div>

        {/* List Kartu Prestasi Mendatar Dengan Aksen Merah */}
        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400">Memuat data prestasi...</div>
        ) : filteredData.length === 0 ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
            Belum ada prestasi yang cocok.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((item) => {
              const studentName = item.profiles?.full_name || item.athlete_name || 'ATLET STC';
              const studentAvatar = item.profiles?.avatar_url;

              return (
                <div
                  key={item.id}
                  className="group bg-gradient-to-r from-red-50/40 via-white to-white border border-slate-200/80 border-l-4 border-l-red-600 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {studentAvatar ? (
                      <img
                        src={studentAvatar}
                        alt={studentName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-red-100 shadow-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                        <User size={24} />
                      </div>
                    )}

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase font-heading tracking-wide">
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
                      className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 border ${getMedalBadge(
                        item.medal
                      )}`}
                    >
                      <Award size={16} />
                      MEDALI {item.medal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}