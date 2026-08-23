'use client';

import React, { useState } from 'react';
import { Container } from '@/components/sections/Container';
import { TeamCard } from '@/components/team/TeamCard';
import { TenureTimeline } from '@/components/team/TenureTimeline';
import { TEAM_DATA, LEADERSHIP_TENURES } from '@/data/team';
import { Users, History, Award, Sparkles, Filter } from 'lucide-react';

export default function TeamPage() {
  const [filterMode, setFilterMode] = useState<'all' | 'official' | 'demo'>('all');

  const filteredTenures = LEADERSHIP_TENURES.filter((t) => {
    if (filterMode === 'official') return t.isOfficial;
    if (filterMode === 'demo') return t.isDemo;
    return true;
  });

  const filteredMembers = TEAM_DATA.filter((m) => {
    if (filterMode === 'official') return m.isOfficial;
    if (filterMode === 'demo') return m.isDemo;
    return true;
  });

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Users className="w-4 h-4 text-amber-400" />
              Institutional Leadership & Presidential History
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Leadership & Directorate
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Chronological leadership records of LCB BRIGADE starting from the April 2021 Charter formation, presidential tenures, and directorate officers guiding community service directives.
            </p>
          </div>
        </div>

        {/* Filter Controls Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Archives:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Records ({LEADERSHIP_TENURES.length} Tenures)
            </button>
            <button
              onClick={() => setFilterMode('official')}
              className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                filterMode === 'official'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                  : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-300'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Official History Only
            </button>
            <button
              onClick={() => setFilterMode('demo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                filterMode === 'demo'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              Sample / Demo Archives
            </button>
          </div>
        </div>

        {/* Section 1: Year-Wise Leadership Tenures */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <History className="w-6 h-6 text-blue-900" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Year-Wise Presidential Tenures</h2>
              <p className="text-xs text-slate-500">
                Official tenure records from Charter (April 2021) onwards, organized by annual terms (1 July – 30 June).
              </p>
            </div>
          </div>

          <TenureTimeline tenures={filteredTenures} />
        </div>

        {/* Section 2: Directorate & Leadership Cards */}
        <div>
          <div className="flex items-center gap-3 mb-6 border-t border-slate-200 pt-10">
            <Users className="w-6 h-6 text-blue-900" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Leadership & Directorate Profiles</h2>
              <p className="text-xs text-slate-500">
                Official leadership records alongside demonstration officer profiles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
