import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Search, Shield, Check, X, Trash2, Phone, CreditCard, User } from 'lucide-react';

export default function MembersManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMembers(data);
    }
    setLoading(false);
  };

  // 1. Fitur Ubah Status Active / Pending
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'PENDING' : 'ACTIVE';
    const { error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) fetchMembers();
  };

  // 2. Fitur Ubah Role Admin / Member
  const handleRoleToggle = async (id, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'MEMBER' : 'ADMIN';
    if (!confirm(`Ubah hak akses akun ini menjadi ${newRole}?`)) return;

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', id);

    if (!error) fetchMembers();
  };

  // 3. Fitur Hapus Anggota
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus anggota ini dari database?')) return;
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (!error) fetchMembers();
  };

  // Fitur Filter Search
  const filteredMembers = members.filter((m) =>
    m.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.nik?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-black text-slate-900 uppercase font-heading">Data Anggota STC</h2>
          <p className="text-xs text-slate-500">Kelola status keanggotaan, ubah role admin, dan pantau data atlet.</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, WA, atau NIK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
          />
        </div>
      </div>

      {/* Tabel Anggota */}
      {loading ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400">Memuat data anggota...</div>
      ) : filteredMembers.length === 0 ? (
        <div className="py-12 text-center text-xs font-bold text-slate-400">Anggota tidak ditemukan.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <th className="pb-3 px-3">Profil Atlet</th>
                <th className="pb-3 px-3">WhatsApp & NIK</th>
                <th className="pb-3 px-3">Role</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition">
                  {/* Foto & Nama */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      {m.avatar_url ? (
                        <img src={m.avatar_url} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-100 border flex items-center justify-center text-slate-400">
                          <User size={18} />
                        </div>
                      )}
                      <div>
                        <div className="font-extrabold text-slate-900">{m.full_name || 'Belum diisi'}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{m.id.substring(0, 8)}...</div>
                      </div>
                    </div>
                  </td>

                  {/* Kontak WA & NIK */}
                  <td className="py-3.5 px-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px]">
                        <Phone size={12} className="text-emerald-600" />
                        {m.phone || '-'}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                        <CreditCard size={12} />
                        NIK: {m.nik || '-'}
                      </div>
                    </div>
                  </td>

                  {/* Button Change Role */}
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleRoleToggle(m.id, m.role)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition ${
                        m.role === 'ADMIN'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Klik untuk ubah Role (Admin/Member)"
                    >
                      <Shield size={12} />
                      {m.role || 'MEMBER'}
                    </button>
                  </td>

                  {/* Button Change Status */}
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleStatusToggle(m.id, m.status)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition ${
                        m.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                          : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      }`}
                      title="Klik untuk ganti Status (Active/Pending)"
                    >
                      {m.status === 'ACTIVE' ? <Check size={12} /> : <X size={12} />}
                      {m.status || 'PENDING'}
                    </button>
                  </td>

                  {/* Tombol Hapus */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="p-2 text-slate-400 hover:text-stc-red hover:bg-red-50 rounded-xl transition"
                      title="Hapus Anggota"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}