import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Plus, Trash2, Award } from 'lucide-react';

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [competition, setCompetition] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [medal, setMedal] = useState('GOLD');
  const [athleteName, setAthleteName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    const { data } = await supabase.from('achievements').select('*').order('created_at', { ascending: false });
    setAchievements(data || []);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from('achievements').insert([{ title, competition, year: parseInt(year), medal, athlete_name: athleteName }]);
    if (!error) {
      setTitle(''); setCompetition(''); setAthleteName(''); setShowModal(false); fetchAchievements();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus prestasi ini?')) return;
    await supabase.from('achievements').delete().eq('id', id);
    fetchAchievements();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-black text-slate-900 uppercase font-heading">Kelola Prestasi</h2>
          <p className="text-xs text-slate-500">Daftar medali dan kejuaraan klub.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 bg-stc-red text-white font-extrabold text-xs rounded-xl flex items-center gap-2">
          <Plus size={16} /> TAMBAH PRESTASI
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-black text-slate-900 uppercase mb-4">Input Prestasi Baru</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <input type="text" required placeholder="Judul / Kategori" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border p-2.5 text-xs rounded-xl" />
              <input type="text" required placeholder="Nama Kejuaraan" value={competition} onChange={(e) => setCompetition(e.target.value)} className="w-full bg-slate-50 border p-2.5 text-xs rounded-xl" />
              <div className="grid grid-cols-2 gap-2">
                <select value={medal} onChange={(e) => setMedal(e.target.value)} className="bg-slate-50 border p-2.5 text-xs rounded-xl font-bold">
                  <option value="GOLD">GOLD</option>
                  <option value="SILVER">SILVER</option>
                  <option value="BRONZE">BRONZE</option>
                </select>
                <input type="number" required value={year} onChange={(e) => setYear(e.target.value)} className="bg-slate-50 border p-2.5 text-xs rounded-xl" />
              </div>
              <input type="text" placeholder="Nama Atlet" value={athleteName} onChange={(e) => setAthleteName(e.target.value)} className="w-full bg-slate-50 border p-2.5 text-xs rounded-xl" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-slate-100 rounded-xl text-xs font-bold">Batal</button>
                <button type="submit" disabled={submitting} className="flex-1 py-2 bg-stc-red text-white rounded-xl text-xs font-bold">{submitting ? 'Simpan...' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? <div className="py-6 text-center text-xs text-slate-400">Memuat...</div> : achievements.length > 0 ? (
        <div className="space-y-3">
          {achievements.map((item) => (
            <div key={item.id} className="p-4 bg-slate-50 border rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award size={20} className="text-amber-500" />
                <div>
                  <h4 className="text-xs font-black">{item.title}</h4>
                  <p className="text-[11px] text-slate-500">{item.competition} ({item.year}) • {item.athlete_name || '-'}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-stc-red p-2"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      ) : <div className="py-6 text-center text-xs text-slate-400">Belum ada data.</div>}
    </div>
  );
}