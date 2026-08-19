import type { Metadata } from 'next';
import { Container } from '@/components/sections/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { MEETINGS_DATA } from '@/data/meetings';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meetings & Schedule',
  description: 'Official schedule of assemblies, council meetings, and general directorate sessions of LCB BRIGADE.',
};

export default function MeetingsPage() {
  const upcomingMeetings = MEETINGS_DATA.filter((m) => m.status === 'upcoming');
  const completedMeetings = MEETINGS_DATA.filter((m) => m.status === 'completed');

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Header */}
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-amber-400" />
              Official Directorate Calendar
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Institutional Meetings & Assemblies
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
              Explore scheduled assemblies, operational coordination briefings, and past convention records. Official meeting parameters are recorded in the central secretariat.
            </p>
          </div>
        </div>

        {/* Section 1: Upcoming Assemblies */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <Clock className="w-6 h-6 text-blue-900" />
            <h2 className="text-2xl font-bold text-slate-900">Upcoming Assemblies & Sessions</h2>
          </div>

          {upcomingMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              <Calendar className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <p className="font-bold text-slate-700">No upcoming meetings available.</p>
              <p className="text-xs text-slate-500 mt-1">
                Future schedules will be posted following Directorate General authorization.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Previous Assemblies */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <CheckCircle2 className="w-6 h-6 text-slate-600" />
            <h2 className="text-2xl font-bold text-slate-900">Concluded Assemblies</h2>
          </div>

          {completedMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              <p className="font-bold text-slate-700">No past assembly archives recorded.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
