import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Plus, Trash2 } from 'lucide-react';

export default function ScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [dayName, setDayName] = useState('Sabtu');
  const [timeRange, setTimeRange] = useState('08:00 - 10:00 WIB');
  const [category, setCategory] = useState('Latihan Reguler');
  const [location, setLocation] = useState('Dojang Utama STC');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const { data } = await supabase.from('training_schedule').select('*');
    setSchedules(data || []);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('training_schedule').insert([{ day_name: dayName, time_range: timeRange, category, location }]);
    fetchSchedules();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus jadwal ini?')) return;
    await supabase.from('training_schedule').delete().eq('id', id);
    fetchSchedules();
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-black text-slate-900 uppercase font-heading">Kelola Jadwal Latihan</h2>
        <p className="text-xs text-slate-500">Atur hari dan jam latihan rutin mingguan.</p>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border">
        <input type="text" required placeholder="Hari" value={dayName} onChange={(e) => setDayName(e.target.value)} className="bg-white border p-2 text-xs rounded-xl font-bold" />
        <input type="text" required placeholder="Jam" value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="bg-white border p-2 text-xs rounded-xl" />
        <input type="text" required placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white border p-2 text-xs rounded-xl" />
        <button type="submit" disabled={loading} className="bg-stc-red text-white font-black text-xs rounded-xl py-2 flex items-center justify-center gap-1">
          <Plus size={16} /> TAMBAH JADWAL
        </button>
      </form>

      <div className="space-y-3">
        {schedules.map((item) => (
          <div key={item.id} className="p-4 bg-slate-50 border rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-stc-red uppercase">{item.day_name}</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">{item.category}</h4>
              <p className="text-[11px] text-slate-500">{item.time_range} • {item.location}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-stc-red p-2"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}