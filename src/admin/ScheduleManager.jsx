import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Calendar, Clock, MapPin, User, Plus, Edit3, Trash2, Sparkles, Flame, Check, X } from 'lucide-react';

export default function ScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [day, setDay] = useState('SABTU');
  const [time, setTime] = useState('15:30 - 17:30 WIB');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [coach, setCoach] = useState('');

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

  // Buka Form Edit Data
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setDay(item.day || item.hari || 'SABTU');
    setTime(item.time || item.jam || '');
    setCategory(item.category || item.kategori || '');
    setLocation(item.location || item.lokasi || '');
    setCoach(item.coach || item.pelatih || '');
    setShowForm(true);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setDay('SABTU');
    setTime('15:30 - 17:30 WIB');
    setCategory('');
    setLocation('');
    setCoach('');
    setShowForm(false);
  };

  // Simpan (Tambah / Update) Jadwal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      day,
      time,
      category,
      location,
      coach,
    };

    let error;
    if (editingId) {
      // Update Jadwal Lama
      const res = await supabase.from('schedules').update(payload).eq('id', editingId);
      error = res.error;
    } else {
      // Tambah Jadwal Baru
      const res = await supabase.from('schedules').insert([payload]);
      error = res.error;
    }

    if (error) {
      alert('Gagal menyimpan jadwal: ' + error.message);
    } else {
      alert(editingId ? 'Jadwal berhasil diperbarui!' : 'Jadwal baru berhasil ditambahkan!');
      resetForm();
      fetchSchedules();
    }
    setSubmitting(false);
  };

  // Hapus Jadwal
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus sesi latihan ini?')) return;
    const { error } = await supabase.from('schedules').delete().eq('id', id);
    if (!error) fetchSchedules();
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Banner Admin (Clean Light + Border Merah) */}
      <div className="bg-gradient-to-br from-red-50/50 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200">
            <Flame size={12} className="text-red-600" /> PENGELOLA JADWAL
          </span>
          <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-2">
            Atur Sesi <span className="text-red-600">Latihan STC</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Tambah, ubah, atau hapus jadwal latihan rutin dojang yang tampil di halaman utama.
          </p>
        </div>

        {/* Widget 2 Sesi / Minggu Berwarna Putih Bersih */}
        <div className="flex items-center gap-3.5 bg-white border-2 border-red-100 px-6 py-4 rounded-2xl shadow-sm">
          <Sparkles size={28} className="text-amber-500" />
          <div>
            <div className="text-xl font-black font-heading text-slate-900">{schedules.length} Sesi Terjadwal</div>
            <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider">Aktif Di Sistem</div>
          </div>
        </div>
      </div>

      {/* Tombol Tambah Jadwal */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-500/20 transition flex items-center gap-2 active:scale-95"
        >
          <Plus size={18} /> {showForm ? 'Batal' : 'Tambah Sesi Latihan Baru'}
        </button>
      </div>

      {/* Form Input / Edit Jadwal */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gradient-to-b from-red-50/40 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 p-6 rounded-3xl shadow-md space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
            {editingId ? 'Edit Sesi Latihan' : 'Form Tambah Sesi Latihan Baru'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Hari Latihan</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              >
                <option value="SENIN">HARI SENIN</option>
                <option value="SELASA">HARI SELASA</option>
                <option value="RABU">HARI RABU</option>
                <option value="KAMIS">HARI KAMIS</option>
                <option value="JUMAT">HARI JUM'AT</option>
                <option value="SABTU">HARI SABTU</option>
                <option value="MINGGU">HARI MINGGU</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Jam / Waktu</label>
              <input
                type="text"
                required
                placeholder="Contoh: 15:30 - 17:30 WIB"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Kategori / Nama Sesi</label>
              <input
                type="text"
                required
                placeholder="Contoh: REGULER (KYORUGI & POOMSAE)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Lokasi Latihan</label>
              <input
                type="text"
                required
                placeholder="Contoh: Dojang Utama STC (Gedung Olahraga)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Pelatih / Sabeum</label>
              <input
                type="text"
                required
                placeholder="Contoh: Sabeum Nabil & Team"
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
            >
              {submitting ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Sesi Latihan'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl transition"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Grid Kartu Jadwal Dengan Tombol EDIT & HAPUS */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400">Memuat data jadwal...</div>
      ) : schedules.length === 0 ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
          Belum ada jadwal latihan. Klik tombol "Tambah Sesi Latihan Baru" di atas.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-red-50/30 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3.5 py-1.5 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider rounded-xl shadow-xs">
                    HARI {item.day || item.hari}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 bg-red-50 px-3 py-1 rounded-xl border border-red-100">
                    <Clock size={13} className="text-red-600" /> {item.time || item.jam}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 uppercase font-heading tracking-wide mt-2">
                  {item.category || item.kategori}
                </h3>

                <div className="space-y-2 mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-red-600 flex-shrink-0" />
                    <span>{item.location || item.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-amber-500 flex-shrink-0" />
                    <span>Pelatih: <strong className="text-slate-900">{item.coach || item.pelatih}</strong></span>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi EDIT & HAPUS */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleStartEdit(item)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-[11px] uppercase rounded-xl transition flex items-center gap-1.5"
                >
                  <Edit3 size={14} className="text-slate-600" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-[11px] uppercase rounded-xl transition flex items-center gap-1.5"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}