import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function MembersManager() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    supabase.from('profiles').select('*').then(({ data }) => setMembers(data || []));
  }, []);

  return (
    <div className="bg-stc-navyCard border border-white/10 rounded-xl p-6">
      <h2 className="text-lg font-bold text-white mb-4 uppercase">Daftar Anggota</h2>
      <div className="space-y-2">
        {members.map((m) => (
          <div key={m.id} className="p-3 bg-stc-navy rounded flex justify-between text-xs">
            <span>{m.full_name} ({m.email})</span>
            <span className="font-bold text-amber-400">{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}