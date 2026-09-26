'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  History,
  Briefcase,
  Video,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
  Sparkles,
  Info,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { ORGANIZATION } from '@/lib/constants';

interface DashboardStats {
  charterMembers: {
    total: number;
    published: number;
    pendingDetails: number;
  };
  historyEntries: {
    total: number;
    published: number;
  };
  services: {
    total: number;
    published: number;
  };
  videos: {
    total: number;
    published: number;
    flaggedForVerification: number;
  };
  lastUpdated: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error('Error loading dashboard stats:', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-900 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
              CMS Administration
            </span>
            <span className="text-xs text-slate-400">
              Lions District 317F • Chartered April 2021
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Directorate CMS Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Manage public website content, charter member rosters, genealogical family tree lineage, presidential tenures, services, and official YouTube video media in real-time.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Charter Members */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              Live in Tree
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              Charter Member Roll
            </span>
            <div className="text-3xl font-black text-slate-900 mt-0.5 mb-1">
              {isLoading ? '...' : stats?.charterMembers.total || 0}
            </div>
            <p className="text-[11px] text-slate-600">
              {stats?.charterMembers.pendingDetails || 0} slots awaiting final roster
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/admin/charter-members"
              className="inline-flex items-center justify-between w-full text-xs font-bold text-blue-900 hover:text-blue-950 group"
            >
              <span>Manage Members</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* History Entries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
              Heritage
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              Historical Tenures
            </span>
            <div className="text-3xl font-black text-slate-900 mt-0.5 mb-1">
              {isLoading ? '...' : stats?.historyEntries.total || 0}
            </div>
            <p className="text-[11px] text-slate-600">
              April 2021 to Present recorded
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/admin/history"
              className="inline-flex items-center justify-between w-full text-xs font-bold text-blue-900 hover:text-blue-950 group"
            >
              <span>Manage History</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Services & Directives */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
              Directives
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              Community Services
            </span>
            <div className="text-3xl font-black text-slate-900 mt-0.5 mb-1">
              {isLoading ? '...' : stats?.services.total || 0}
            </div>
            <p className="text-[11px] text-slate-600">
              {stats?.services.published || 0} published initiatives
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/admin/services"
              className="inline-flex items-center justify-between w-full text-xs font-bold text-blue-900 hover:text-blue-950 group"
            >
              <span>Manage Services</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Videos Catalog */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-800 border border-red-200">
              Media Hub
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              YouTube Video Catalog
            </span>
            <div className="text-3xl font-black text-slate-900 mt-0.5 mb-1">
              {isLoading ? '...' : stats?.videos.total || 0}
            </div>
            <p className="text-[11px] text-slate-600">
              {stats?.videos.published || 0} published • {stats?.videos.flaggedForVerification || 0} quarantined
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/admin/videos"
              className="inline-flex items-center justify-between w-full text-xs font-bold text-blue-900 hover:text-blue-950 group"
            >
              <span>Manage Videos</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Operations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 tracking-tight mb-2">
          Immediate Content Operations
        </h2>
        <p className="text-xs text-slate-600 mb-6">
          Add or configure content modules. Changes take effect on the public website immediately upon publishing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/charter-members"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-amber-950">
                + Add Charter Member
              </span>
              <span className="text-[11px] text-slate-500">
                Extend Family Tree
              </span>
            </div>
          </Link>

          <Link
            href="/admin/history"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-950">
                + Add History Entry
              </span>
              <span className="text-[11px] text-slate-500">
                Record New Term
              </span>
            </div>
          </Link>

          <Link
            href="/admin/services"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-purple-50/70 border border-slate-200 hover:border-purple-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-900 text-white flex items-center justify-center font-bold shrink-0">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-purple-950">
                + Add Service
              </span>
              <span className="text-[11px] text-slate-500">
                New Community Directive
              </span>
            </div>
          </Link>

          <Link
            href="/admin/videos"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-red-50/70 border border-slate-200 hover:border-red-300 transition-all flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block group-hover:text-red-950">
                + Add YouTube Video
              </span>
              <span className="text-[11px] text-slate-500">
                Link Activity Media
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Directorate Governance Guidance Banner */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-6 sm:p-8 text-amber-950 text-xs shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-900 text-[11px]">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Autonomous Content Governance Architecture</span>
          </div>
          <p className="leading-relaxed">
            The LCB Brigade website is fully data-driven. When the team adds additional Charter Members or future presidential terms (such as 2024–2025), changes take effect immediately without requiring developer code changes or deployment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/charter"
            target="_blank"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-bold uppercase tracking-wider text-[11px] transition-colors"
          >
            Preview Family Tree
          </Link>
          <Link
            href="/services"
            target="_blank"
            className="px-4 py-2 bg-white text-slate-800 hover:bg-slate-100 rounded-xl font-bold uppercase tracking-wider text-[11px] border border-amber-300 transition-colors"
          >
            Preview Services
          </Link>
        </div>
      </div>
    </div>
  );
}
