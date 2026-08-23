import type { Metadata } from 'next';
import { Container } from '@/components/sections/Container';
import { DonateWidget } from '@/components/donate/DonateWidget';
import { HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support & Public Donations',
  description: 'Contribute to LCB BRIGADE public service drives, civic welfare programs, and leadership initiatives.',
};

export default function DonatePage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Header */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden border border-blue-900 text-center sm:text-left">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              Public Fund Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Support LCB BRIGADE
            </h1>
            <p className="text-amber-300 font-bold text-sm sm:text-base mt-2">
              Your contribution helps us continue our mission of disciplined public service.
            </p>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Every donation directly funds community welfare logistics, emergency relief supplies, public outreach drives, and member capability workshops.
            </p>
          </div>
        </div>

        {/* Donation Widget Container */}
        <DonateWidget />
      </Container>
    </div>
  );
}
