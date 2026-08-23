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
        return 'bg-amber-100 text-amber-800 border-amber-300 font-black shadow-xs';
      case 'SILVER':
        return 'bg-slate-200 text-slate-800 border-slate-300 font-black shadow-xs';
      case 'BRONZE':
        return 'bg-amber-900/10 text-amber-900 border-amber-900/20 font-black shadow-xs';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 font-bold';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 mb-8 shadow-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-200/60 shadow-xs">
              <Flame size={12} className="text-red-600" /> HALL OF FAME STC
            </span>
            <h1 className="text-3xl font-black text-slate-900 font-heading uppercase mt-3 tracking-tight">
              Rekam Jejak <span className="text-red-600">Prestasi</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Daftar medali dan pencapaian resmi atlet Star Taekwondo Club di kejuaraan daerah & nasional.
            </p>
          </div>

          {/* Badge Widget Terang & Bersih */}
          <div className="flex items-center gap-3.5 bg-amber-50/80 border border-amber-200/80 px-6 py-4 rounded-2xl shadow-sm">
            <Trophy className="text-amber-600" size={32} />
            <div>
              <div className="text-2xl font-black font-heading text-slate-900">{achievements.length} Medali</div>
              <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider">Terverifikasi Admin</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
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

          {/* Filter Pills Wadah Putih Bersih + Tombol Aktif Merah Bold */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm w-full sm:w-auto overflow-x-auto">
            {['ALL', 'GOLD', 'SILVER', 'BRONZE'].map((medal) => (
              <button
                key={medal}
                onClick={() => setFilterMedal(medal)}
                className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  filterMedal === medal
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-105'
                    : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {medal === 'ALL' ? 'Semua' : medal}
              </button>
            ))}
          </div>
        </div>

        {/* List Kartu Prestasi Horizontal */}
        {loading ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400">Memuat data prestasi...</div>
        ) : filteredData.length === 0 ? (
          <div className="py-12 text-center text-xs font-bold text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
            Belum ada prestasi yang cocok.
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredData.map((item) => {
              const studentName = item.profiles?.full_name || item.athlete_name || 'ATLET STC';
              const studentAvatar = item.profiles?.avatar_url;

              return (
                <div
                  key={item.id}
                  className="group bg-white border border-slate-200/80 hover:border-red-600/40 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
                >
                  {/* Aksentuasi Garis Merah di Kiri Kartu saat Hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Foto Akun di Kiri & Nama Atlet Bold */}
                  <div className="flex items-center gap-4 pl-1">
                    {studentAvatar ? (
                      <img
                        src={studentAvatar}
                        alt={studentName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-red-600/30 shadow-sm flex-shrink-0 transition"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0 group-hover:border-red-600/30 transition">
                        <User size={24} />
                      </div>
                    )}

                    <div>
                      {/* Nama Atlet Extra Bold */}
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

                  {/* Badge Medali di Kanan */}
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