'use client';

import React from 'react';
import { Award, Calendar, TrendingUp, User, Building2, CheckCircle2 } from 'lucide-react';
import { Achievement } from '@/types';
import { cn } from '@/lib/utils';

interface AchievementTimelineProps {
  achievements: Achievement[];
}

export const AchievementTimeline: React.FC<AchievementTimelineProps> = ({
  achievements,
}) => {
  return (
    <div className="relative max-w-4xl mx-auto py-4">
      {/* Central Timeline Vertical Line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-blue-900 to-slate-200 transform sm:-translate-x-1/2" />

      <div className="space-y-10">
        {achievements.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={cn(
                'relative flex flex-col sm:flex-row items-start gap-8',
                isEven ? 'sm:flex-row-reverse' : ''
              )}
            >
              {/* Timeline Center Node Badge */}
              <div className="absolute left-4 sm:left-1/2 top-0 transform -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md z-10 bg-blue-950 border-4 border-amber-400 text-amber-400">
                <Award className="w-4 h-4 text-amber-400" />
              </div>

              {/* Card Container */}
              <div className="w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all duration-200 bg-white border-slate-200 card-hover-effect">
                {/* Header Strip: Year & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold text-blue-950 bg-blue-50 border border-blue-200 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-blue-900" />
                    {item.year}
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Leadership or Partner Association Tag */}
                {(item.leadership || item.association) && (
                  <div className="mb-3 space-y-1 text-xs">
                    {item.leadership && (
                      <div className="flex items-center gap-1.5 text-blue-950 font-semibold">
                        <User className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                        <span>Leadership: {item.leadership}</span>
                      </div>
                    )}
                    {item.association && (
                      <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{item.association}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Impact Highlight */}
                {item.impact && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{item.impact}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
