import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: schedData } = await supabase.from('training_schedule').select('*');
    const { data: eventData } = await supabase.from('events').select('*').order('event_date', { ascending: true });

    setSchedules(schedData || []);
    setEvents(eventData || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pt-32 pb-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-extrabold text-stc-red tracking-widest uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
            AGENDA & JADWAL
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-3 uppercase font-heading">
            JADWAL LATIHAN & EVENT
          </h1>
          <p className="text-slate-600 text-sm mt-3">
            Informasi lengkap hari latihan reguler Star Taekwondo Club dan agenda kejuaraan terdekat.
          </p>
        </div>

        {/* JADWAL LATIHAN MINGGUAN */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-stc-red" size={20} />
            <h2 className="text-xl font-black text-slate-900 font-heading uppercase">Jadwal Latihan Rutin</h2>
          </div>

          {loading ? (
            <div className="text-center py-10 text-xs text-slate-400">Memuat jadwal...</div>
          ) : schedules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schedules.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
                  <span className="px-3 py-1 bg-red-50 text-stc-red text-[11px] font-black rounded-lg uppercase">
                    {item.day_name}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-4 mb-2">{item.category}</h3>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-2 font-medium">
                      <Clock size={14} className="text-slate-400" /> {item.time_range}
                    </p>
                    <p className="flex items-center gap-2 font-medium">
                      <MapPin size={14} className="text-slate-400" /> {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl text-center text-xs text-slate-500">
              Jadwal latihan rutin belum diatur oleh pengurus.
            </div>
          )}
        </div>

        {/* AGENDA KEJUARAAN */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-stc-red" size={20} />
            <h2 className="text-xl font-black text-slate-900 font-heading uppercase">Agenda Kejuaraan & Event</h2>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((ev) => (
                <div key={ev.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-black rounded-lg uppercase">
                        {ev.category || 'EVENT'}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {new Date(ev.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{ev.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{ev.description || 'Tidak ada deskripsi.'}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-stc-red" /> {ev.location}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-white border border-slate-200/80 rounded-2xl text-center text-xs text-slate-500">
              Belum ada agenda kejuaraan mendatang.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}