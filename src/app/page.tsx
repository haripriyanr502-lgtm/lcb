'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  BookOpen,
  Users,
  HeartHandshake,
  UserPlus,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Phone,
  Building2,
  Award,
} from 'lucide-react';
import { HeroSection } from '@/components/hero/HeroSection';
import { Container } from '@/components/sections/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { LeadershipTree } from '@/components/team/LeadershipTree';
import { SecretaryRequestModal } from '@/components/meetings/SecretaryRequestModal';
import { MEETINGS_DATA, OFFICIAL_MEETING_SCHEDULE } from '@/data/meetings';
import { SERVICES_DATA } from '@/data/services';
import { ACHIEVEMENTS_DATA } from '@/data/achievements';
import { ORGANIZATION, SECRETARY_REQUEST_CONFIG } from '@/lib/constants';
import { Service } from '@/types';
import { CMSService } from '@/types/cms';

export default function HomePage() {
  const [isSecretaryModalOpen, setIsSecretaryModalOpen] = useState(false);
  const [featuredServices, setFeaturedServices] = useState<Service[]>(SERVICES_DATA.slice(0, 3));
  const featuredMilestones = ACHIEVEMENTS_DATA.slice(0, 4);
  const upcomingMeetings = MEETINGS_DATA.slice(0, 2);
  const treasurer = ORGANIZATION.confirmedOfficers.treasurer;

  useEffect(() => {
    let isMounted = true;
    async function fetchServices() {
      try {
        const res = await fetch('/api/content/services', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.services) && data.services.length > 0) {
            const mapped: Service[] = data.services.slice(0, 3).map((s: CMSService) => ({
              id: s.id,
              name: s.name,
              category: s.category,
              year: s.year,
              partnerAssociation: s.partnerAssociation,
              shortDescription: s.shortDescription,
              fullDescription: s.fullDescription,
              impactMetrics: s.impactMetrics,
              iconName: s.iconName || 'Users',
              isOfficial: true,
            }));
            setFeaturedServices(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load CMS featured services, using baseline:', err);
      }
    }
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Institutional Values Pillar Strip */}
      <section className="py-14 bg-white border-b border-slate-200">
        <Container>
          <SectionHeading
            badge="Foundational Tenets"
            title="Pillars of LCB BRIGADE"
            subtitle="Anchored in the international Lions ethos of dedicated humanitarian service, ethical leadership, and civic responsibility."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { title: 'Leadership', desc: 'Principled executive guidance and community mentorship.', color: 'border-blue-900 bg-blue-50/50' },
              { title: 'Service', desc: 'Unwavering commitment to societal welfare and relief drives.', color: 'border-slate-800 bg-slate-50' },
              { title: 'Unity', desc: 'Fostering civic solidarity and fellowship across communities.', color: 'border-amber-400 bg-amber-50/40' },
              { title: 'Responsibility', desc: 'Rigorous accountability in governance and fund stewardship.', color: 'border-blue-900 bg-blue-50/50' },
              { title: 'Excellence', desc: 'Upholding premier standards in all public initiatives.', color: 'border-slate-800 bg-slate-50' },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className={`p-5 rounded-2xl border-l-4 ${pillar.color} border-slate-200 shadow-sm hover:shadow-md transition-shadow`}
              >
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MEETINGS SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="meetings">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 rounded-full mb-3">
                <Calendar className="w-3.5 h-3.5 text-blue-900" />
                Regular Assemblies
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Official Meetings Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                Convenes on the <span className="font-bold text-slate-900">2nd Tuesday of every month</span>. Includes executive board oversight, full general body proceedings, and fellowship.
              </p>
            </div>

            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 hover:text-blue-900 bg-white hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-colors shrink-0"
            >
              Full Calendar & Details
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </Link>
          </div>

          {/* Schedule Banner Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Session 1: Board Meeting */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-900">
                  Part 1 • 6:30 PM – 7:30 PM
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                  Board Meeting
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dedicated council session for club office-bearers and committee chairs reviewing operational logistics, financial accounts, and project pipelines.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-900" />
                2nd Tuesday of Every Month
              </div>
            </div>

            {/* Session 2: General Body Meeting */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl border border-blue-900 p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                  Part 2 • 7:30 PM onwards
                </span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">
                  General Body Meeting
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full assembly for all members of LCB Brigade, featuring community service impact presentations, keynote remarks, and new service resolutions.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Open to Members & Official Guests
              </div>
            </div>

            {/* Session 3: Fellowship */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                  Post-Assembly Fellowship
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                  Networking & Fellowship
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Camaraderie, informal discussions, and fellowship exchange connecting members, visiting delegates, and partner service organizations.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Followed after General Body
              </div>
            </div>
          </div>

          {/* District / Club Secretary Request Strip */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 rounded-2xl p-6 sm:p-8 text-white border border-amber-400/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Official Coordination
              </span>
              <h3 className="text-xl font-black text-white">
                Visiting or Representing a Club / District?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {SECRETARY_REQUEST_CONFIG.noticeText}
              </p>
            </div>

            <button
              onClick={() => setIsSecretaryModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all shrink-0 transform hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4 text-slate-950" />
              Write Request to Secretary Team
            </button>
          </div>
        </Container>
      </section>

      {/* LEADERSHIP SECTION (Interactive Org Tree) */}
      <section className="py-20 bg-white border-b border-slate-200" id="leadership">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 rounded-full mb-3">
                <Users className="w-3.5 h-3.5 text-blue-900" />
                Directorate & Office-Bearers
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Leadership Organizational Tree
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                Visual hierarchical structure of LCB Brigade executive leadership. Confirmed office-bearers are displayed alongside positions awaiting Directorate formal confirmation.
              </p>
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 hover:text-blue-900 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-colors shrink-0"
            >
              Full Leadership Page
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </Link>
          </div>

          {/* Interactive Tree Component */}
          <LeadershipTree />
        </Container>
      </section>

      {/* CORE SERVICES SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <Container>
          <SectionHeading
            badge="Public Welfare"
            title="Core Service Initiatives"
            subtitle="Dedicated to high-impact community programs, potable water infrastructure, food security, and environmental afforestation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-950 hover:bg-blue-900 rounded-xl shadow transition-colors"
            >
              Explore All Service Projects
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </Container>
      </section>

      {/* HISTORICAL MILESTONES PREVIEW */}
      <section className="py-20 bg-white border-b border-slate-200">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 rounded-full mb-3">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                Historical Record
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Historical Milestones & Achievements
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                Chronological heritage of LCB Brigade from April 2021 chartering onwards, preserved separately from active leadership.
              </p>
            </div>

            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 hover:text-blue-900 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-colors shrink-0"
            >
              View Complete Timeline
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredMilestones.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-950 mb-2">
                    {item.year}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
                {item.impact && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-clamp-1">{item.impact}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden border border-amber-400/20">
            <div className="relative z-10 space-y-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30 inline-block">
                Community Engagement
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Be Part of {ORGANIZATION.fullName}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Whether applying for membership or contributing to our community drinking water and relief drives, your commitment powers our mission: &quot;We Serve&quot;.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href="/join-us"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all"
                >
                  <UserPlus className="w-4 h-4 text-slate-950" />
                  Apply for Membership
                </Link>

                <Link
                  href="/donate"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-800 border border-blue-700 rounded-xl shadow transition-all"
                >
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  Support Community Drives
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Secretary Request Modal */}
      <SecretaryRequestModal
        isOpen={isSecretaryModalOpen}
        onClose={() => setIsSecretaryModalOpen(false)}
      />
    </>
  );
}
