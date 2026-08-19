import type { Metadata } from 'next';
import { Container } from '@/components/sections/Container';
import { TeamCard } from '@/components/team/TeamCard';
import { TEAM_DATA } from '@/data/team';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Organization Leadership & Directorate',
  description: 'Meet the executive directorate, department officers, and committee heads of LCB BRIGADE.',
};

export default function TeamPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Users className="w-4 h-4 text-amber-400" />
              Executive Directorate
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Institutional Leadership
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Guided by a structured council of dedicated officers managing executive governance, logistics, community relations, compliance, capability development, and resource secretariat.
            </p>
          </div>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_DATA.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </div>
  );
}
