import type { Metadata } from 'next';
import { Container } from '@/components/sections/Container';
import { AchievementTimeline } from '@/components/achievements/AchievementTimeline';
import { ACHIEVEMENTS_DATA } from '@/data/achievements';
import { Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Institutional Achievements & Milestones',
  description: 'Chronological milestone timeline of LCB BRIGADE public service initiatives and institutional growth.',
};

export default function AchievementsPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Header */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-blue-900 text-center sm:text-left">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Award className="w-4 h-4 text-amber-400" />
              Impact & History
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Achievements & Milestones
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Tracking institutional progress, ratified governance updates, community service expansions, and leadership development achievements across 2024–2026.
            </p>
          </div>
        </div>

        {/* Timeline Component */}
        <AchievementTimeline achievements={ACHIEVEMENTS_DATA} />
      </Container>
    </div>
  );
}
