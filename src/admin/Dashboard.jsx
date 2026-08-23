import React, { useState } from 'react';
import MembersManager from './MembersManager';
import AchievementsManager from './AchievementsManager';
import ScheduleManager from './ScheduleManager';
import { Users, Award, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Admin */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 mb-8 shadow-sm">
          <span className="text-[10px] font-black tracking-widest text-stc-red uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
            ADMIN CONTROL CENTER
          </span>
          <h1 className="text-3xl font-black text-slate-900 font-heading uppercase mt-3">
            Pusat Pengelola STAR TAEKWONDO
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola pendaftaran anggota, jadwal latihan, dan rekam prestasi klub.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === 'members'
                ? 'bg-stc-red text-white shadow-md shadow-red-500/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-sm'
            }`}
          >
            <Users size={16} /> Data Anggota
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === 'schedule'
                ? 'bg-stc-red text-white shadow-md shadow-red-500/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-sm'
            }`}
          >
            <Calendar size={16} /> Jadwal Latihan
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition ${
              activeTab === 'achievements'
                ? 'bg-stc-red text-white shadow-md shadow-red-500/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-sm'
            }`}
          >
            <Award size={16} /> Data Prestasi
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'members' && <MembersManager />}
        {activeTab === 'schedule' && <ScheduleManager />}
        {activeTab === 'achievements' && <AchievementsManager />}

      </div>
    </div>
  );
}