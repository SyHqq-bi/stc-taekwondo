import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { Camera, User, Phone, CreditCard, Save, CheckCircle } from 'lucide-react';

export default function CompleteProfile() {
  const { user, profile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nik, setNik] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setNik(profile.nik || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  // Upload Foto ke Supabase Storage
  const handleAvatarUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
    } catch (error) {
      alert('Gagal mengunggah foto: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Simpan Data Profil ke Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone,
        nik,
        avatar_url: avatarUrl,
      })
      .eq('id', user.id);

    if (error) {
      alert('Gagal memperbarui data: ' + error.message);
    } else {
      setSuccessMsg('Data profil berhasil diperbarui!');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm">
          
          <div className="mb-6">
            <span className="text-[10px] font-black tracking-widest text-stc-red uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
              LENGKAPI DATA ANGGOTA
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-heading uppercase mt-3">
              Profil Atlet STC
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Lengkapi informasi pribadi untuk verifikasi kartu anggota dan keperluan administrasi kejuaraan.
            </p>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-600" />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Foto Profil Upload */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center">
              <div className="relative w-24 h-24 mb-3">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Foto Profil"
                    className="w-full h-full object-cover rounded-full border-2 border-stc-red shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <User size={40} />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 p-2 bg-stc-red text-white rounded-full cursor-pointer hover:bg-red-700 transition shadow-md">
                  <Camera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs font-bold text-slate-700">
                {uploading ? 'Mengunggah Foto...' : 'Unggah Foto Pas / Profil'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Format JPG/PNG max 2MB</p>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
                  placeholder="Nama Lengkap Sesuai KTP/KK"
                />
              </div>
            </div>

            {/* Nomor Telepon / WA */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Nomor WhatsApp / Telepon
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
                  placeholder="081234567890"
                />
              </div>
            </div>

            {/* NIK */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                NIK (Nomor Induk Kependudukan)
              </label>
              <div className="relative">
                <CreditCard size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:outline-none focus:border-stc-red"
                  placeholder="16 Digit NIK dari KK / KTP"
                />
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full py-3.5 bg-stc-red hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-500/20 transition flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {saving ? 'Menyimpan...' : 'Simpan Data Profil'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}