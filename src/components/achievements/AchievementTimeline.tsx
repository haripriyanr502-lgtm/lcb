'use client';

import React from 'react';
import { Award, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';
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
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-900 via-blue-400 to-slate-200 transform sm:-translate-x-1/2" />

      <div className="space-y-12">
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
              <div className="absolute left-4 sm:left-1/2 top-0 transform -translate-x-1/2 w-9 h-9 rounded-full bg-blue-950 border-4 border-amber-400 text-amber-400 flex items-center justify-center shadow-lg z-10">
                <Award className="w-4 h-4 text-amber-400" />
              </div>

              {/* Card Container */}
              <div className="w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 card-hover-effect">
                {/* Header Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 rounded-md">
                    <Calendar className="w-3 h-3 text-blue-900" />
                    {item.year}
                  </span>

                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Impact Highlight */}
                {item.impact && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <TrendingUp className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Institutional Impact: </span>
                      <span>{item.impact}</span>
                    </div>
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
