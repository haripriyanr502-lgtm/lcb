import Link from 'next/link';
import { ArrowRight, ShieldCheck, Calendar, BookOpen, Award, Users, HeartHandshake, UserPlus } from 'lucide-react';
import { HeroSection } from '@/components/hero/HeroSection';
import { Container } from '@/components/sections/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { TeamCard } from '@/components/team/TeamCard';
import { MEETINGS_DATA } from '@/data/meetings';
import { SERVICES_DATA } from '@/data/services';
import { TEAM_DATA } from '@/data/team';
import { CHARTER_SECTIONS } from '@/data/charter';

export default function HomePage() {
  const upcomingMeetings = MEETINGS_DATA.filter((m) => m.status === 'upcoming').slice(0, 3);
  const featuredServices = SERVICES_DATA.slice(0, 3);
  const leadershipPreview = TEAM_DATA.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Institutional Values Pillar Strip */}
      <section className="py-16 bg-white border-b border-slate-200">
        <Container>
          <SectionHeading
            badge="Institutional Identity"
            title="Pillars of LCB BRIGADE"
            subtitle="Our organization operates under an unyielding commitment to five core principles that define our duty to society."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Leadership', desc: 'Ethical decision-making and principled guidance.', color: 'border-blue-900 bg-blue-50/50' },
              { title: 'Service', desc: 'Unwavering dedication to community welfare.', color: 'border-blue-800 bg-slate-50' },
              { title: 'Unity', desc: 'Fostering solidarity across all sections of society.', color: 'border-amber-400 bg-amber-50/30' },
              { title: 'Responsibility', desc: 'Absolute accountability in all assigned mandates.', color: 'border-blue-900 bg-blue-50/50' },
              { title: 'Excellence', desc: 'Striving for highest quality in public duty.', color: 'border-slate-800 bg-slate-50' },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className={`p-6 rounded-xl border-l-4 ${pillar.color} border-slate-200 shadow-sm hover:shadow-md transition-shadow`}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming Meetings Teaser */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 rounded-full mb-3">
                <Calendar className="w-3.5 h-3.5 text-blue-900" />
                Assemblies & Schedule
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">Upcoming Meetings</h2>
              <p className="text-sm text-slate-600 mt-1">
                Official gathering schedules, council sessions, and assembly details.
              </p>
            </div>

            <Link
              href="/meetings"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 hover:text-blue-950 bg-white hover:bg-slate-100 px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
            >
              View Full Calendar
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </Container>
      </section>

      {/* Services Teaser */}
      <section className="py-20 bg-white border-b border-slate-200">
        <Container>
          <SectionHeading
            badge="Public Initiatives"
            title="Core Organizational Services"
            subtitle="Delivering structured support, capability building, and community welfare programs."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow transition-colors"
            >
              Explore All Services & Programs
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Charter Teaser Banner */}
      <section className="py-20 bg-blue-950 text-white relative overflow-hidden border-b border-blue-900">
        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Governance & Code
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ratified Institutional Charter
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              The official charter dictates our organizational structure, member duties, disciplinary protocols, and public commitments. Transparency is the bedrock of LCB BRIGADE.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/charter"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg transition-all"
              >
                Read Official Charter
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Directorate Teaser */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 rounded-full mb-3">
                <Users className="w-3.5 h-3.5 text-blue-900" />
                Directorate & Officers
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">Leadership Team</h2>
              <p className="text-sm text-slate-600 mt-1">
                Guided by structured executive leadership across operational domains.
              </p>
            </div>

            <Link
              href="/team"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 hover:text-blue-950 bg-white hover:bg-slate-100 px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
            >
              View Full Directorate
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipPreview.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      {/* Final Call to Action Strip */}
      <section className="py-20 bg-white">
        <Container>
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden border border-amber-400/20">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Be Part of LCB BRIGADE
              </h2>
              <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
                Whether applying for membership or supporting our civic projects, your engagement powers our mission of disciplined service and community unity.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/join-us"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all"
                >
                  <UserPlus className="w-4 h-4 text-slate-950" />
                  Apply for Membership
                </Link>

                <Link
                  href="/donate"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-800 border border-blue-700 rounded-xl shadow transition-all"
                >
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  Support Public Drives
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
