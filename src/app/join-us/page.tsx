import type { Metadata } from 'next';
import { Container } from '@/components/sections/Container';
import { JoinForm } from '@/components/join-us/JoinForm';
import { UserPlus, Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Join LCB BRIGADE | Membership Application',
  description: 'Apply to join LCB BRIGADE and become part of a disciplined, public-service organization dedicated to community excellence.',
};

export default function JoinUsPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Header */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <UserPlus className="w-4 h-4 text-amber-400" />
              Public Cadre Recruitment
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              JOIN LCB BRIGADE
            </h1>
            <p className="text-amber-300 font-bold text-sm sm:text-base mt-2">
              Become part of something meaningful. Build leadership, serve society.
            </p>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              We welcome dedicated citizens committed to ethical discipline, community welfare, and proactive leadership. Learn what it means to serve with honor.
            </p>
          </div>
        </div>

        {/* Why Join & Expectations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Why Join?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gain structured leadership training, participate in impactful community welfare initiatives, and build lifelong bonds with disciplined peers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Who Can Join?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open to responsible citizens who uphold institutional ethics, respect the organizational charter, and demonstrate willingness to serve.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Opportunities</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Participate in field service operations, direct logistics, attend leadership conventions, and lead local project committees.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <JoinForm />
      </Container>
    </div>
  );
}
