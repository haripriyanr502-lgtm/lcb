'use client';

import React from 'react';
import { Award, Calendar, CheckCircle, Sparkles, Shield } from 'lucide-react';
import { LeadershipTenure } from '@/types';

interface TenureTimelineProps {
  tenures: LeadershipTenure[];
}

export const TenureTimeline: React.FC<TenureTimelineProps> = ({ tenures }) => {
  return (
    <div className="space-y-6">
      {tenures.map((tenure) => (
        <div
          key={tenure.id}
          className={`rounded-2xl border p-6 sm:p-8 transition-all duration-200 ${
            tenure.isOfficial
              ? 'bg-white border-blue-900/20 shadow-md ring-1 ring-blue-900/5'
              : 'bg-slate-50/80 border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-950 bg-blue-100/70 border border-blue-200 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-blue-900" />
                {tenure.tenureYear}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Term: {tenure.termDates}
              </span>
            </div>

            <div>
              {tenure.isOfficial ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  Official LCB BRIGADE History
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/70 text-slate-600 border border-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  [SAMPLE / DEMO ENTRY]
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {tenure.teamTitle}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {tenure.summary}
              </p>

              {/* Rotary or Background Highlight */}
              {tenure.backgroundNote && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Foundational Background: </span>
                    <span>{tenure.backgroundNote}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Key Initiatives Strip */}
            {tenure.keyInitiatives && tenure.keyInitiatives.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <p className="text-[11px] font-bold text-blue-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-900" />
                  Key Term Highlights & Projects
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  {tenure.keyInitiatives.map((init, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{init}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
