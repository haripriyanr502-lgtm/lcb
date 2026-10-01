'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/sections/Container';
import { MeetingCard } from '@/components/meetings/MeetingCard';
import { SecretaryRequestModal } from '@/components/meetings/SecretaryRequestModal';
import { MEETINGS_DATA, OFFICIAL_MEETING_SCHEDULE } from '@/data/meetings';
import { JOINT_MEETING_VIDEOS } from '@/data/videos';
import { VideoCard } from '@/components/media/VideoCard';
import { SECRETARY_REQUEST_CONFIG, ORGANIZATION } from '@/lib/constants';
import { VideoItem } from '@/types';
import { CMSVideo } from '@/types/cms';
import {
  Calendar,
  Clock,
  Users,
  Shield,
  HeartHandshake,
  CheckCircle2,
  Building2,
  FileText,
  AlertCircle,
  Video,
  Settings,
} from 'lucide-react';

export default function MeetingsPage() {
  const [isSecretaryModalOpen, setIsSecretaryModalOpen] = useState(false);
  const [jointVideos, setJointVideos] = useState<VideoItem[]>(JOINT_MEETING_VIDEOS);

  useEffect(() => {
    let isMounted = true;
    async function fetchVideos() {
      try {
        const res = await fetch('/api/content/videos?category=joint_meeting', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.videos) && data.videos.length > 0) {
            const mapped: VideoItem[] = data.videos.map((v: CMSVideo) => ({
              id: v.id,
              youtubeId: v.youtubeId,
              title: v.title,
              category: v.category,
              serviceId: v.serviceId,
              channel: v.channel,
              description: v.description,
            }));
            setJointVideos(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load joint meeting videos, using baseline:', err);
      }
    }
    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-amber-400" />
              Constitutional Cadence
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Official Meetings & Assemblies
            </h1>
            <p className="text-slate-300 text-xs sm:text-base mt-4 leading-relaxed">
              Official assemblies of {ORGANIZATION.fullName} are scheduled on the <span className="text-amber-300 font-bold">2nd Tuesday of every month</span>. Sessions comprise executive board governance, full general body proceedings, and fellowship.
            </p>
          </div>
        </div>

        {/* Schedule Highlight Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-950">
              Mandated Timetable
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Monthly Assembly Cadence & Program
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            Timings are adhered to punctually for all regular monthly gatherings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Board Meeting */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-blue-950 bg-blue-100/80 mb-3">
                  <Clock className="w-3.5 h-3.5 text-blue-900" />
                  6:30 PM – 7:30 PM
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Board Meeting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Executive committee session reviewing administrative decisions, statutory filings, committee recommendations, and financial oversight.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 font-semibold">
                Attended by: Office-Bearers & Committee Chairs
              </div>
            </div>

            {/* General Body Meeting */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 border border-blue-900 flex flex-col justify-between shadow-md">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-amber-950 bg-amber-400 mb-3">
                  <Users className="w-3.5 h-3.5 text-amber-950" />
                  7:30 PM onwards
                </span>
                <h3 className="text-lg font-bold text-white mb-2">General Body Meeting</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full assembly of club members. Encompasses the presidential address, project reports, induction of new members, and service proposals.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-amber-300 font-semibold">
                Attended by: All Club Members & Delegations
              </div>
            </div>

            {/* Networking & Fellowship */}
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 bg-emerald-50/30 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-emerald-900 bg-emerald-100 mb-3">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
                  Post-Assembly
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Networking & Fellowship</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lions fellowship dinner and collaborative networking among members, partner club leaders, and community guests.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-200/60 text-[11px] text-emerald-800 font-semibold">
                Fellowship & Camaraderie
              </div>
            </div>
          </div>
        </div>

        {/* REQUEST UNDER MEETINGS STRIP */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 mb-14 shadow-xl border border-amber-400/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Building2 className="w-3.5 h-3.5" />
                Inter-Club & District Coordination
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Representing a Club / District?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {SECRETARY_REQUEST_CONFIG.noticeText}
              </p>
              <p className="text-xs text-slate-400">
                Visiting dignitaries, twin-club representatives, and District officers are requested to submit representation details in advance to coordinate official protocol.
              </p>
            </div>

            <button
              onClick={() => setIsSecretaryModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all shrink-0 transform hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4 text-slate-950" />
              Write Request to Secretary Team
            </button>
          </div>
        </div>

        {/* UPCOMING 2ND TUESDAY DATES */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <Clock className="w-6 h-6 text-blue-900" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Upcoming Assembly Dates</h2>
              <p className="text-xs text-slate-500">
                Calculated strictly for the 2nd Tuesday of each upcoming calendar month.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {MEETINGS_DATA.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onOpenRequest={() => setIsSecretaryModalOpen(true)}
              />
            ))}
          </div>
        </div>

        {/* JOINT MEETINGS & REGIONAL CONCLAVES MEDIA SECTION */}
        <div className="mb-14 scroll-mt-28" id="joint-meetings">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Video className="w-5 h-5 text-blue-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Inter-Club & Regional Assemblies
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Joint Meetings & Conclave Video Proceedings
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Official archival video recordings of bilateral club meetings, regional conclaves convened under RC Ln. A. V. Nagaraj, and District 317F leadership schooling conventions.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                  {jointVideos.length} Recorded Proceedings
                </span>
                <Link
                  href="/admin/videos"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                  title="Manage video catalog in CMS"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>CMS</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jointVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>

        {/* Assembly Guidelines & Protocols */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-900" />
            Meeting Protocol & Etiquette
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">Punctuality</span>
              <p className="leading-relaxed">
                Board members are requested to take their seats by 6:25 PM. General Body members assemble promptly before 7:30 PM.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">Dress Code & Insignia</span>
              <p className="leading-relaxed">
                Official Lions club lapel pin or formal blazer is encouraged for all active members and visiting delegates.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block">Guest Introductions</span>
              <p className="leading-relaxed">
                Guest representatives from other clubs will be acknowledged by the presiding officer during the General Body session.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Secretary Request Modal */}
      <SecretaryRequestModal
        isOpen={isSecretaryModalOpen}
        onClose={() => setIsSecretaryModalOpen(false)}
      />
    </div>
  );
}
