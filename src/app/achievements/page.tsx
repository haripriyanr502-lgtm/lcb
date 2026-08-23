'use client';

import React, { useState } from 'react';
import { Container } from '@/components/sections/Container';
import { AchievementTimeline } from '@/components/achievements/AchievementTimeline';
import { ACHIEVEMENTS_DATA } from '@/data/achievements';
import { Award, Sparkles, Filter } from 'lucide-react';

export default function AchievementsPage() {
  const [filterMode, setFilterMode] = useState<'all' | 'official' | 'demo'>('all');

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((a) => {
    if (filterMode === 'official') return a.isOfficial;
    if (filterMode === 'demo') return a.isDemo;
    return true;
  });

  const officialCount = ACHIEVEMENTS_DATA.filter((a) => a.isOfficial).length;

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden border border-blue-900 text-center sm:text-left">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Award className="w-4 h-4 text-amber-400" />
              Impact & Historical Milestones
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Achievements & Milestones
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Chronological record of LCB BRIGADE public service achievements, starting from the official April 2021 chartering under Charter President L. A. V. Nagaraj, subsequent annual tenures, and major civic projects.
            </p>
          </div>
        </div>

        {/* Filter Controls Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Milestones:</span>
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
              All Milestones ({ACHIEVEMENTS_DATA.length})
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
              Official Milestones ({officialCount})
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
              Sample / Demo Archive
            </button>
          </div>
        </div>

        {/* Timeline Component */}
        <AchievementTimeline achievements={filteredAchievements} />
      </Container>
    </div>
  );
}
