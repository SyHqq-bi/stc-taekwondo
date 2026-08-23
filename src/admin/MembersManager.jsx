import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { User, Search, ShieldCheck, Award, UserCheck, Calendar, Check, Flame } from 'lucide-react';

export default function MembersManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    setMembers(data || []);
    setLoading(false);
  };

  // Fungsi mengubah role user (MEMBER / COACH / ADMIN)
  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      alert('Gagal mengubah role: ' + error.message);
    } else {
      alert(`Role berhasil diubah menjadi ${newRole === 'COACH' ? 'SABEUM (COACH)' : newRole}!`);
      fetchMembers();
    }
    setUpdatingId(null);
  };

  const filteredMembers = members.filter((m) =>
    (m.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Banner Admin */}
      <div className="bg-gradient-to-br from-red-50/50 via-white to-white border border-slate-200/80 border-t-4 border-t-red-600 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-red-600 uppercase bg-red-100/80 px-3.5 py-1 rounded-full border border-red-200">
            <Flame size={12} className="text-red-600" /> KELOLA ANGGOTA & SABEUM
          </span>
          <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-2">
            Daftar Anggota <span className="text-red-600">Dojang STC</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Atur role anggota menjadi Sabeum (Pelatih) agar ditampilkan di beranda utama.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white border-2 border-red-100 px-6 py-4 rounded-2xl shadow-sm">
          <UserCheck className="text-red-600" size={28} />
          <div>
            <div className="text-2xl font-black font-heading text-slate-900">{members.length} Akun</div>
            <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider">Terdaftar Di Sistem</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama anggota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-600 shadow-sm"
          />
        </div>
      </div>

      {/* List Anggota */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400">Memuat data anggota...</div>
      ) : filteredMembers.length === 0 ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
          Belum ada anggota yang terdaftar.
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredMembers.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Foto Profil & Detail Nama */}
              <div className="flex items-center gap-4">
                {m.avatar_url ? (
                  <img
                    src={m.avatar_url}
                    alt=""
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-red-100 shadow-xs flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                    <User size={22} />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900 uppercase">{m.full_name || 'Tanpa Nama'}</h3>
                    {m.role === 'COACH' && (
                      <span className="px-2.5 py-0.5 bg-red-600 text-white text-[9px] font-black uppercase rounded-md tracking-wider">
                        SABEUM / COACH
                      </span>
                    )}
                    {m.role === 'ADMIN' && (
                      <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-black uppercase rounded-md tracking-wider">
                        ADMIN
                      </span>
                    )}
                    {m.role === 'MEMBER' && (
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase rounded-md">
                        ATLET / MEMBER
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    ID Akun: <span className="font-mono text-slate-600">{m.id.substring(0, 8)}...</span>
                  </p>
                </div>
              </div>

              {/* Pilihan Pengubah Role */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <label className="text-[10px] font-black uppercase text-slate-400 mr-1">Akses Role:</label>
                <select
                  disabled={updatingId === m.id}
                  value={m.role || 'MEMBER'}
                  onChange={(e) => handleRoleChange(m.id, e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer"
                >
                  <option value="MEMBER">ATLET (MEMBER)</option>
                  <option value="COACH">SABEUM (PELATIH)</option>
                  <option value="ADMIN">ADMINISTRATOR</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}