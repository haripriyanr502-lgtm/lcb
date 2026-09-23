'use client';

import React, { useState } from 'react';
import { Container } from '@/components/sections/Container';
import { AchievementTimeline } from '@/components/achievements/AchievementTimeline';
import { ACHIEVEMENTS_DATA } from '@/data/achievements';
import { ORGANIZATION } from '@/lib/constants';
import { Award, Filter, Calendar, CheckCircle2, Shield } from 'lucide-react';

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Charter & Foundation',
    'Resource Mobilization',
    'Community Welfare & Food Relief',
    'Environmental Stewardship',
    'Civic Infrastructure',
    'Healthcare & Emergency Support',
    'Youth Leadership & Development',
  ];

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((a) => {
    if (selectedCategory === 'all') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Award className="w-4 h-4 text-amber-400" />
              Verified Historical Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Milestones & Achievements
            </h1>
            <p className="text-slate-300 text-xs sm:text-base mt-4 leading-relaxed">
              Chronological milestones of {ORGANIZATION.fullName} since formal chartering in April 2021. Highlights foundational projects including the ₹31 Lakh CSR fund mobilization, community RO clean water installation, food grain distribution with ISKCON & MLA Ashoka, tree plantation, and Leo Club installation.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter Milestones:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Milestones ({ACHIEVEMENTS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory('Civic Infrastructure')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'Civic Infrastructure'
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              RO Water Plant
            </button>
            <button
              onClick={() => setSelectedCategory('Resource Mobilization')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'Resource Mobilization'
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              CSR ₹31 Lakh
            </button>
            <button
              onClick={() => setSelectedCategory('Community Welfare & Food Relief')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'Community Welfare & Food Relief'
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Food Relief
            </button>
          </div>
        </div>

        {/* Milestone Timeline */}
        <AchievementTimeline achievements={filteredAchievements} />

        {/* Archival Documentation Note */}
        <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 text-xs text-slate-500 max-w-4xl mx-auto flex items-start gap-3 shadow-sm">
          <Shield className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-800 block">Archival Authenticity</span>
            <p className="leading-relaxed">
              All milestones recorded above correspond to official projects executed under respective presidential terms. Unconfirmed or conjectural accomplishments have been strictly omitted.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
