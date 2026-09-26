import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/sections/Container';
import { VideoCard } from '@/components/media/VideoCard';
import { SERVICES_DATA, getServiceById } from '@/data/services';
import { getVideosForService } from '@/data/videos';
import { getCMSServices, getCMSServiceById, getCMSVideos } from '@/lib/cms/store';
import { ORGANIZATION } from '@/lib/constants';
import { VideoItem } from '@/types';
import {
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle,
  Award,
  Video,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Droplets,
  Trees,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Users,
  Settings,
} from 'lucide-react';

interface ServiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  Trees,
  HeartPulse,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Users,
};

export async function generateStaticParams() {
  try {
    const cmsServices = await getCMSServices(true);
    const allIds = Array.from(
      new Set([
        ...SERVICES_DATA.map((s) => s.id),
        ...cmsServices.map((s) => s.id),
      ])
    );
    return allIds.map((id) => ({ id }));
  } catch {
    return SERVICES_DATA.map((service) => ({ id: service.id }));
  }
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  let serviceName = '';
  let serviceDesc = '';

  try {
    const cmsService = await getCMSServiceById(id);
    if (cmsService && cmsService.isPublished) {
      serviceName = cmsService.name;
      serviceDesc = cmsService.shortDescription;
    }
  } catch {
    // fallback
  }

  if (!serviceName) {
    const baseline = getServiceById(id);
    if (baseline) {
      serviceName = baseline.name;
      serviceDesc = baseline.shortDescription;
    }
  }

  if (!serviceName) {
    return {
      title: 'Service Initiative Not Found',
    };
  }

  return {
    title: `${serviceName} | ${ORGANIZATION.fullName}`,
    description: serviceDesc,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;

  let service = null;
  try {
    const cmsService = await getCMSServiceById(id);
    if (cmsService && cmsService.isPublished) {
      service = {
        id: cmsService.id,
        name: cmsService.name,
        category: cmsService.category,
        year: cmsService.year || '2024–2025',
        partnerAssociation: cmsService.partnerAssociation,
        shortDescription: cmsService.shortDescription,
        fullDescription: cmsService.fullDescription,
        impactMetrics: cmsService.impactMetrics,
        iconName: cmsService.iconName || 'Users',
        isOfficial: true,
      };
    }
  } catch {
    // fallback
  }

  if (!service) {
    service = getServiceById(id);
  }

  if (!service) {
    notFound();
  }

  // Fetch videos for this service
  let videos: VideoItem[] = [];
  try {
    const cmsVideos = await getCMSVideos({ serviceId: service.id, publishedOnly: true });
    if (cmsVideos.length > 0) {
      videos = cmsVideos.map((v) => ({
        id: v.id,
        youtubeId: v.youtubeId,
        title: v.title,
        category: v.category,
        serviceId: v.serviceId,
        channel: v.channel,
        description: v.description,
      }));
    }
  } catch {
    // fallback
  }

  if (videos.length === 0) {
    videos = getVideosForService(service.id);
  }

  const relatedServices = SERVICES_DATA.filter((s) => s.id !== service.id).slice(
    0,
    3
  );
  const IconComponent = ICON_MAP[service.iconName] || Users;

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Navigation Breadcrumb & Back Link */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950 hover:text-blue-900 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Back to All Services</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline-block font-medium">
              Initiative Code: <span className="font-mono text-slate-700">{service.id}</span>
            </span>
            <Link
              href="/admin/services"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-900 bg-white hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
              title="Manage services in CMS Admin"
            >
              <Settings className="w-3 h-3 text-slate-500" />
              <span>CMS Edit</span>
            </Link>
          </div>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                {service.category}
              </span>

              {service.year && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-200 bg-white/10 rounded-full border border-white/15">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {service.year}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-300 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified LCB Brigade Directive
              </span>
            </div>

            <div className="flex items-start gap-4 pt-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg mt-1">
                <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {service.name}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Association Banner (if applicable) */}
        {service.partnerAssociation && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                Partner Association
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-950">
                {service.partnerAssociation}
              </span>
            </div>
          </div>
        )}

        {/* Content Grid: Initiative Details & Impact Metric */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
          {/* Main Initiative Narrative */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
              <span>Initiative Overview & Directives</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Operational Framework
              </h3>
              <p className="leading-relaxed">
                Executed in strict alignment with Lions Clubs International service pillars. All operational funding, equipment deployment, and on-ground volunteer logistics are governed transparently by {ORGANIZATION.fullName}.
              </p>
            </div>
          </div>

          {/* Impact Metric & Quick Highlights Card */}
          <div className="space-y-6">
            {service.impactMetrics && (
              <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200 p-6 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Civic Impact Accomplished
                </span>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
                    {service.impactMetrics}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Initiative Credentials
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Organization</span>
                  <span className="font-bold text-slate-800">{ORGANIZATION.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Category</span>
                  <span className="font-bold text-slate-800">{service.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Deployment Period</span>
                  <span className="font-bold text-slate-800">{service.year || 'Ongoing Community Directive'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">International Ethos</span>
                  <span className="font-bold text-blue-950">&quot;{ORGANIZATION.motto}&quot;</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/join-us"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  <span>Participate in Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* VIDEOS SECTION */}
        <section className="mb-14 scroll-mt-28" id="videos">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Video className="w-5 h-5 text-blue-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Field Media Documentation
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Initiative Recordings & Activity Videos
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Verified field video recordings documenting on-ground deployment and community participation.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 self-start sm:self-center shrink-0">
                {videos.length} {videos.length === 1 ? 'Video' : 'Videos'} Documented
              </span>
            </div>

            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid) => (
                  <VideoCard key={vid.id} video={vid} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
                  <Video className="w-6 h-6 text-blue-800" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Field Media Records Archiving
                </h3>
                <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Dedicated video documentation for this infrastructure installation is currently being compiled from archival records and will be linked upon publication by the Directorate.
                </p>
                <div className="pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 hover:text-blue-950 underline"
                  >
                    <span>Explore other documented initiatives</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RELATED SERVICES */}
        <section className="mb-14">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Related Service Initiatives
              </h2>
              <p className="text-xs text-slate-500">
                Explore complementary community welfare programs of {ORGANIZATION.fullName}.
              </p>
            </div>

            <Link
              href="/services"
              className="text-xs font-bold uppercase tracking-wider text-blue-900 hover:text-blue-950 flex items-center gap-1 shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => {
              const RelIcon = ICON_MAP[rel.iconName] || Users;
              return (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center">
                        <RelIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {rel.year || 'Directive'}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                      {rel.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <Link
                    href={`/services/${rel.id}`}
                    className="inline-flex items-center justify-between text-xs font-bold text-blue-900 hover:text-blue-950 pt-3 border-t border-slate-100 group"
                  >
                    <span>View Initiative Page</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-400/20 text-center max-w-3xl mx-auto space-y-4">
          <HeartHandshake className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Support Community Welfare Initiatives
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Every contribution directly strengthens community drinking water supplies, health camps, student kits, and environmental preservation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all"
            >
              <span>Contribute to Projects</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all"
            >
              <span>Back to Services</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
