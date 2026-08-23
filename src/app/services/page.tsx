'use client';

import React, { useState } from 'react';
import { Container } from '@/components/sections/Container';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SERVICES_DATA } from '@/data/services';
import { ShieldCheck, Award, Sparkles, Filter } from 'lucide-react';

export default function ServicesPage() {
  const [filterMode, setFilterMode] = useState<'all' | 'official' | 'demo'>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (filterMode === 'official') return s.isOfficial;
    if (filterMode === 'demo') return s.isDemo;
    return true;
  });

  const officialProjects = SERVICES_DATA.filter((s) => s.isOfficial);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Public Service & Community Welfare Projects
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Services & Community Projects
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Explore the key service projects and civic initiatives executed by LCB BRIGADE, from emergency food grain relief with partner organizations to environmental tree plantations and community RO clean water installations.
            </p>
          </div>
        </div>

        {/* Filter Controls Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter Projects:</span>
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
              All Projects ({SERVICES_DATA.length})
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
              Official Service Projects ({officialProjects.length})
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

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </div>
  );
}
