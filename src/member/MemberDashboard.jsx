import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Trophy, Award, Plus, UserCheck, Clock, CheckCircle2, Calendar } from 'lucide-react';

export default function MemberDashboard() {
  const { user, profile } = useAuth();
  const [myAchievements, setMyAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [competition, setCompetition] = useState('');
  const [title, setTitle] = useState('');
  const [medal, setMedal] = useState('GOLD');
  const [year, setYear] = useState(new Date().getFullYear());
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) fetchMyAchievements();
  }, [user]);

  const fetchMyAchievements = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setMyAchievements(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('achievements').insert([
      {
        user_id: user.id,
        athlete_name: profile?.full_name || 'Atlet STC',
        competition,
        title,
        medal,
        year: parseInt(year),
        status: 'PENDING', // Otomatis PENDING sampai di-acc Admin
      },
    ]);

    if (error) {
      alert('Gagal mengirim prestasi: ' + error.message);
    } else {
      alert('Prestasi berhasil diajukan! Menunggu verifikasi Admin.');
      setCompetition('');
      setTitle('');
      setShowForm(false);
      fetchMyAchievements();
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Banner Profil Atlet */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt=""
                className="w-16 h-16 rounded-2xl object-cover border-2 border-stc-red shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border flex items-center justify-center text-slate-400">
                <Trophy size={32} />
              </div>
            )}
            <div>
              <span className="text-[10px] font-black tracking-widest text-stc-red uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
                PORTAL ATLET
              </span>
              <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-2">
                {profile?.full_name || 'Atlet STC'}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Status Akun: <span className="text-emerald-600 font-bold">{profile?.status || 'ACTIVE'}</span>
              </p>
            </div>
          </div>

          <Link
            to="/complete-profile"
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition shadow-md flex items-center gap-2"
          >
            <UserCheck size={16} /> Edit Data Profil
          </Link>
        </div>

        {/* Section Pengajuan Prestasi */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 font-heading uppercase">
                Koleksi Prestasi Saya
              </h2>
              <p className="text-xs text-slate-500">Ajukan kejuaraan dan medali yang telah kamu dapatkan.</p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2.5 bg-stc-red hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <Plus size={16} /> {showForm ? 'Batal' : 'Tambah Prestasi'}
            </button>
          </div>

          {/* Form Modal / Inline Input */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl mb-6 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Form Pengajuan Prestasi Baru
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Nama Kejuaraan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kejurnas Taekwondo Kasal Cup 2026"
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Kategori / Kelas</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kyorugi Junior Putra Under 48kg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Perolehan Medali</label>
                  <select
                    value={medal}
                    onChange={(e) => setMedal(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
                  >
                    <option value="GOLD">MEDALI EMAS</option>
                    <option value="SILVER">MEDALI PERAK</option>
                    <option value="BRONZE">MEDALI PERUNGGU</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Tahun Kejuaraan</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md"
              >
                {submitting ? 'Mengirim Data...' : 'Kirim Pengajuan Prestasi'}
              </button>
            </form>
          )}

          {/* List Prestasi Murid */}
          {loading ? (
            <div className="py-8 text-center text-xs font-bold text-slate-400">Memuat riwayat prestasi...</div>
          ) : myAchievements.length === 0 ? (
            <div className="py-8 text-center text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200/80 rounded-2xl">
              Kamu belum mengajukan prestasi. Klik tombol "Tambah Prestasi" di atas.
            </div>
          ) : (
            <div className="space-y-3">
              {myAchievements.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase">{item.competition}</h4>
                    <p className="text-[11px] font-bold text-stc-red mt-0.5">{item.title}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-semibold">
                      <span>Medali {item.medal}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar size={10} /> {item.year}</span>
                    </div>
                  </div>

                  {/* Badge Status Verifikasi Admin */}
                  <div>
                    {item.status === 'APPROVED' ? (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5">
                        <CheckCircle2 size={12} /> TAYANG DI WEB
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5">
                        <Clock size={12} /> MENUNGGU VERIFIKASI ADMIN
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}