import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { ShieldCheck, Trophy, Zap, ArrowRight, Award, Flame } from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    supabase.from('club_settings').select('*').single().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  // High-Quality Action Taekwondo Photo (Unsplash Sports Editorial)
  const athletePhoto = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop';

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-stc-red selection:text-white">
      {/* Background Subtle Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Kolom Teks Kiri */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm">
  <span className="flex h-2 w-2 relative">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stc-red opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-stc-red"></span>
  </span>
  <span className="text-[11px] font-extrabold tracking-wider text-slate-800 uppercase">
    Official Platform Star Taekwondo Club
  </span>
</div>

{/* Headline Utama */}
<h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05] font-heading">
  Platform Digital Resmi <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-stc-red via-rose-600 to-amber-500">
    Star
  </span> <br />
  <span className="text-stc-red"></span> Taekwondo Club.
</h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal max-w-xl leading-relaxed">
              {settings?.description || 'Kelola profil atlet, pendaftaran anggota baru, jadwal latihan terstruktur, serta rekam jejak prestasi kejuaraan resmi dalam satu sistem terintegrasi.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/register"
                className="px-8 py-4 bg-stc-red hover:bg-red-700 text-white font-black text-xs tracking-wider uppercase rounded-2xl transition shadow-lg shadow-red-500/25 flex items-center gap-2.5 active:scale-95"
              >
                GABUNG SEKARANG <ArrowRight size={16} />
              </Link>
              <Link
                to="/achievements"
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs tracking-wider uppercase rounded-2xl transition border border-slate-200/80 shadow-sm active:scale-95"
              >
                LIHAT PRESTASI
              </Link>
            </div>

            {/* 3 Floating Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-slate-200/80">
              <div className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-xl text-stc-red">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Resmi & Resmi</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Komunitas STC</p>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                  <Trophy size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Data Prestasi</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Sertifikat & Medali</p>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-xl text-stc-red">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Akses Member</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Portal Internal 24/7</p>
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Visual Kanan - Card Feature Atlet */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 border border-slate-200/80 shadow-2xl shadow-slate-300/40 transform lg:rotate-1 hover:rotate-0 transition duration-500">
                <div className="relative h-[420px] rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={athletePhoto}
                    alt="STC Taekwondo Action"
                    className="w-full h-full object-cover object-center filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Badge Atas Foto */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
                    <Flame size={14} className="text-stc-red" />
                    <span className="text-[10px] font-black uppercase text-slate-900 tracking-wider">STC ATHLETE SPIRIT</span>
                  </div>

                  {/* Caption Bawah Foto */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">Discipline • Power • Character</span>
                    <h3 className="text-xl font-black font-heading mt-0.5 uppercase">STC TAEKWONDO SQUAD</h3>
                  </div>
                </div>
              </div>

              {/* Floating Stat Widget */}
              <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xl hidden sm:flex items-center gap-3.5 z-20">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
                  <Award size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-heading">24+ Medali</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kejuaraan Daerah & Nasional</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* STATISTIK CLUB BAR */}
      <section className="py-10 bg-white border-y border-slate-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 font-heading">{settings?.stats_members || 10}+</div>
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-1">Anggota Aktif</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-stc-red font-heading">{settings?.stats_achievements || 24}+</div>
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-1">Total Prestasi</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-slate-900 font-heading">{settings?.stats_years || 5}+</div>
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-1">Tahun Berdiri</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-amber-600 font-heading">{settings?.stats_training_days || 3} Hari</div>
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-1">Jadwal Latihan / Minggu</div>
          </div>
        </div>
      </section>
    </div>
  );
}