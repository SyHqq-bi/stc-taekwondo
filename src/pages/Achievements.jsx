import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Trophy, Award } from 'lucide-react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [selectedMedal, setSelectedMedal] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('year', { ascending: false });
    if (!error) setAchievements(data || []);
    setLoading(false);
  };

  const filtered = achievements.filter((a) => {
    if (selectedMedal === 'ALL') return true;
    return a.medal === selectedMedal;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pt-32 pb-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-extrabold text-stc-red tracking-widest uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
            HONOR ROLL
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-3 uppercase font-heading">
            REKAM PRESTASI
          </h1>
          <p className="text-slate-600 text-sm mt-3">
            Catatan kejuaraan dan medali resmi yang diraih oleh atlet STC Taekwondo Club.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {['ALL', 'GOLD', 'SILVER', 'BRONZE'].map((medal) => (
            <button
              key={medal}
              onClick={() => setSelectedMedal(medal)}
              className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wider transition ${
                selectedMedal === medal
                  ? 'bg-stc-red text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-sm'
              }`}
            >
              {medal}
            </button>
          ))}
        </div>

        {/* Grid List */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Memuat data prestasi...</div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-[11px] font-black rounded-lg ${
                      item.medal === 'GOLD' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                      item.medal === 'SILVER' ? 'bg-slate-100 text-slate-700 border border-slate-200' :
                      'bg-orange-50 text-orange-600 border border-orange-200'
                    }`}>
                      MEDALI {item.medal}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400">{item.year}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">{item.competition}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Atlet: <strong className="text-slate-900 font-bold">{item.athlete_name || 'STC Team'}</strong></span>
                  <span>{item.location || 'Indonesia'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 text-slate-500 text-xs">
            Belum ada data prestasi yang tercatat.
          </div>
        )}
      </div>
    </div>
  );
}