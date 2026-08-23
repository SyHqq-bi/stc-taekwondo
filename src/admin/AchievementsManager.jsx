import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Trophy, Plus, Check, X, Trash2, Search, Award, Calendar, User, Flame, Clock } from 'lucide-react';

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [selectedUserId, setSelectedUserId] = useState('');
  const [athleteName, setAthleteName] = useState('');
  const [competition, setCompetition] = useState('');
  const [title, setTitle] = useState('');
  const [medal, setMedal] = useState('GOLD');
  const [year, setYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // 1. Ambil Prestasi yang sudah APPROVED
    const { data: approvedData } = await supabase
      .from('achievements')
      .select('*, profiles(full_name, avatar_url)')
      .eq('status', 'APPROVED')
      .order('year', { ascending: false });

    // 2. Ambil Prestasi PENDING yang butuh ACC Admin
    const { data: pendingData } = await supabase
      .from('achievements')
      .select('*, profiles(full_name, avatar_url)')
      .eq('status', 'PENDING')
      .order('created_at', { ascending: false });

    // 3. Ambil Daftar Atlet untuk Dropdown Form
    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, full_name');

    setAchievements(approvedData || []);
    setPendingList(pendingData || []);
    setProfiles(profileData || []);
    setLoading(false);
  };

  // ACC Pengajuan Prestasi
  const handleApprove = async (id) => {
    const { error } = await supabase
      .from('achievements')
      .update({ status: 'APPROVED' })
      .eq('id', id);

    if (!error) fetchData();
  };

  // Tolak / Hapus Prestasi
  const handleDelete = async (id) => {
    if (!confirm('Hapus/Tolak data prestasi ini?')) return;
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (!error) fetchData();
  };

  // Admin Input Prestasi Baru Manual
  const handleSubmitNew = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Ambil nama atlet jika memilih dari dropdown profiles
    const selectedProfile = profiles.find((p) => p.id === selectedUserId);
    const finalName = selectedProfile ? selectedProfile.full_name : athleteName;

    const { error } = await supabase.from('achievements').insert([
      {
        user_id: selectedUserId || null,
        athlete_name: finalName || 'Atlet STC',
        competition,
        title,
        medal,
        year: parseInt(year),
        status: 'APPROVED', // Inputan admin langsung APPROVED
      },
    ]);

    if (error) {
      alert('Gagal menambah prestasi: ' + error.message);
    } else {
      alert('Prestasi berhasil ditambahkan!');
      setCompetition('');
      setTitle('');
      setAthleteName('');
      setSelectedUserId('');
      setShowForm(false);
      fetchData();
    }
    setSubmitting(false);
  };

  const filteredApproved = achievements.filter((item) => {
    const name = item.profiles?.full_name || item.athlete_name || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.competition.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Banner Admin (Putih + Border Merah) */}
      <div className="bg-gradient-to-br from-red-50/50 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200">
            <Flame size={12} className="text-red-600" /> PENGELOLA PRESTASI
          </span>
          <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-2">
            Rekam Jejak <span className="text-red-600">Prestasi STC</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Verifikasi pengajuan medali murid atau tambahkan data kejuaraan baru secara manual.
          </p>
        </div>

        {/* Widget 0 Medali Warna Terang / Putih */}
        <div className="flex items-center gap-4 bg-white border-2 border-red-100 px-6 py-4 rounded-2xl shadow-sm">
          <Trophy className="text-amber-500" size={32} />
          <div>
            <div className="text-2xl font-black font-heading text-slate-900">{achievements.length} Medali</div>
            <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider">Terverifikasi Admin</div>
          </div>
        </div>
      </div>

      {/* Tombol Aksi & Pencarian */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-500/20 transition flex items-center justify-center gap-2 active:scale-95"
        >
          <Plus size={18} /> {showForm ? 'Batal' : 'Tambah Prestasi Baru'}
        </button>

        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari atlet atau kejuaraan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600 shadow-sm"
          />
        </div>
      </div>

      {/* Form Tambah Prestasi Baru oleh Admin */}
      {showForm && (
        <form onSubmit={handleSubmitNew} className="bg-gradient-to-b from-red-50/40 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 p-6 rounded-3xl shadow-md space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
            Form Tambah Prestasi (Input Direct Admin)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Pilih Atlet Terdaftar</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              >
                <option value="">-- Manual (Ketik Nama Sendiri) --</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>{p.full_name}</option>
                ))}
              </select>
            </div>

            {!selectedUserId && (
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Nama Atlet (Manual)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Nabil Fitrah"
                  value={athleteName}
                  onChange={(e) => setAthleteName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Nama Kejuaraan</label>
              <input
                type="text"
                required
                placeholder="Contoh: Kejurprov Taekwondo Banten 2026"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Kategori / Kelas</label>
              <input
                type="text"
                required
                placeholder="Contoh: Kyorugi Senior U-58kg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Medali</label>
              <select
                value={medal}
                onChange={(e) => setMedal(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              >
                <option value="GOLD">MEDALI EMAS</option>
                <option value="SILVER">MEDALI PERAK</option>
                <option value="BRONZE">MEDALI PERUNGGU</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Tahun</label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
          >
            {submitting ? 'Menyimpan...' : 'Simpan & Tayangkan Langsung'}
          </button>
        </form>
      )}

      {/* Bagian Pengajuan Masuk dari Murid (Butuh ACC Admin) */}
      {pendingList.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
            <Clock size={16} className="text-amber-600" />
            Pengajuan Masuk Dari Atlet ({pendingList.length} Menunggu Verifikasi)
          </div>

          <div className="space-y-3">
            {pendingList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <div className="font-black text-slate-900 text-sm uppercase">
                    {item.profiles?.full_name || item.athlete_name}
                  </div>
                  <div className="text-xs font-bold text-red-600 mt-0.5">{item.competition}</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1">
                    Kategori: {item.title} • Medali {item.medal} ({item.year})
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase rounded-xl transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Check size={14} /> Setujui
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs uppercase rounded-xl transition flex items-center gap-1"
                  >
                    <X size={14} /> Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daftar Prestasi yang Sudah Tayang (APPROVED) */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase font-heading">
          Daftar Prestasi Terpublikasi
        </h3>

        {loading ? (
          <div className="py-8 text-center text-xs font-bold text-slate-400">Memuat data...</div>
        ) : filteredApproved.length === 0 ? (
          <div className="py-8 text-center text-xs font-bold text-slate-400">Belum ada prestasi yang ditayangkan.</div>
        ) : (
          <div className="space-y-3">
            {filteredApproved.map((item) => {
              const studentName = item.profiles?.full_name || item.athlete_name || 'ATLET STC';
              const studentAvatar = item.profiles?.avatar_url;

              return (
                <div
                  key={item.id}
                  className="bg-gradient-to-r from-red-50/40 via-white to-white border border-slate-200/80 border-l-4 border-l-red-600 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    {studentAvatar ? (
                      <img src={studentAvatar} alt="" className="w-11 h-11 rounded-xl object-cover border" />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase">{studentName}</h4>
                      <p className="text-[11px] font-extrabold text-red-600 mt-0.5">{item.competition}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold mt-1">
                        <span>{item.title}</span>
                        <span>•</span>
                        <span>Medali {item.medal} ({item.year})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition self-end sm:self-center"
                    title="Hapus Prestasi"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}