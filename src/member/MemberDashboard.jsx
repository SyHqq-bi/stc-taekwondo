import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { Clock, MapPin, Calendar, Bell } from 'lucide-react';

export default function MemberDashboard() {
  const { profile } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    const { data } = await supabase.from('training_schedule').select('*');
    setSchedules(data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* WELCOME BANNER */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black tracking-widest text-stc-red uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
              PORTAL MEMBER STAR TAEKWONDO
            </span>
            <h1 className="text-3xl font-black text-slate-900 mt-3 font-heading uppercase">
              HALO, {profile?.full_name || 'MEMBER'}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Status Akun:{' '}
              <span className={`font-bold ${profile?.status === 'ACTIVE' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {profile?.status || 'PENDING'}
              </span>
            </p>
          </div>

          <div className="flex gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 text-xs">
            <div>
              <p className="text-slate-400 font-medium">Sabuk</p>
              <p className="font-extrabold text-slate-900">{profile?.belt || 'Putih'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Kategori</p>
              <p className="font-extrabold text-slate-900">{profile?.category || 'Reguler'}</p>
            </div>
          </div>
        </div>

        {/* JADWAL LATIHAN KHUSUS MEMBER */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-red-50 text-stc-red rounded-xl">
                <Calendar size={20} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 uppercase font-heading">Jadwal Latihan Terbaru</h2>
                <p className="text-xs text-slate-500">Jadwal ini diupdate secara berkala oleh pengurus/pelatih STC.</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-xs text-slate-400">Memuat jadwal latihan...</div>
          ) : schedules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {schedules.map((item) => (
                <div key={item.id} className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                  <span className="px-3 py-1 bg-stc-red text-white text-[10px] font-black rounded-lg uppercase tracking-wider">
                    {item.day_name}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 pt-1">{item.category}</h3>
                  <div className="space-y-1 text-xs text-slate-600 font-medium">
                    <p className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {item.time_range}</p>
                    <p className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
              Belum ada jadwal latihan terbaru yang diinput oleh pelatih.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}