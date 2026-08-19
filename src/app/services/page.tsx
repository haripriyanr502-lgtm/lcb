import type { Metadata } from 'next';
import { Container } from '@/components/sections/Container';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SERVICES_DATA } from '@/data/services';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Public Initiatives',
  description: 'Explore the public service, community welfare, and leadership development programs of LCB BRIGADE.',
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Header */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Public Duty & Directives
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Services & Community Initiatives
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              LCB BRIGADE mobilizes disciplined cadres to serve public interest across six key domain pillars: Community Service, Leadership, Outreach, Support, Capability Development, and Social Advocacy.
            </p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </div>
  );
}
