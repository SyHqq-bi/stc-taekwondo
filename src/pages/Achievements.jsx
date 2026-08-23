import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Award, Trophy, User, Search, Calendar } from 'lucide-react';

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
        return 'bg-amber-100 text-amber-800 border-amber-300 font-black shadow-sm';
      case 'SILVER':
        return 'bg-slate-200 text-slate-800 border-slate-300 font-black shadow-sm';
      case 'BRONZE':
        return 'bg-amber-900/10 text-amber-900 border-amber-900/20 font-black shadow-sm';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 font-bold';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 mb-8 shadow-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-[10px] font-black tracking-widest text-stc-red uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
              HALL OF FAME
            </span>
            <h1 className="text-3xl font-black text-slate-900 font-heading uppercase mt-3">
              Rekam Jejak Prestasi STC
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Daftar medali dan pencapaian atlet Star Taekwondo Club di kejuaraan daerah & nasional.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-5 py-3.5 rounded-2xl">
            <Trophy className="text-amber-600" size={30} />
            <div>
              <div className="text-xl font-black text-slate-900 font-heading">{achievements.length} Medali</div>
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Terverifikasi</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atlet / kejuaraan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/80 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm w-full sm:w-auto overflow-x-auto">
            {['ALL', 'GOLD', 'SILVER', 'BRONZE'].map((medal) => (
              <button
                key={medal}
                onClick={() => setFilterMedal(medal)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition ${
                  filterMedal === medal
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
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
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Foto Akun di Kiri & Nama Atlet Bold */}
                  <div className="flex items-center gap-4">
                    {studentAvatar ? (
                      <img
                        src={studentAvatar}
                        alt={studentName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                        <User size={24} />
                      </div>
                    )}

                    <div>
                      {/* Nama Atlet Dibuat Paling Menonjol & BOLD */}
                      <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase font-heading tracking-wide">
                        {studentName}
                      </h3>
                      <div className="text-xs font-bold text-stc-red mt-0.5 uppercase tracking-wider">
                        {item.competition}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mt-1">
                        <span>Kategori: {item.title || '-'}</span>
                        <span>•</span>
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