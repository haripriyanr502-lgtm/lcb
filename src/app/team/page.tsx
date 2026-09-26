'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/sections/Container';
import { LeadershipTree } from '@/components/team/LeadershipTree';
import { TenureTimeline } from '@/components/team/TenureTimeline';
import { HISTORICAL_TENURES, TEAM_DATA } from '@/data/team';
import { ORGANIZATION } from '@/lib/constants';
import { LeadershipTenure } from '@/types';
import { CMSHistoryEntry } from '@/types/cms';
import { Users, History, Award, Shield, Phone, Sparkles, Building2, CheckCircle2, Settings } from 'lucide-react';

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [tenures, setTenures] = useState<LeadershipTenure[]>(HISTORICAL_TENURES);
  const treasurer = ORGANIZATION.confirmedOfficers.treasurer;

  useEffect(() => {
    let isMounted = true;
    async function fetchHistory() {
      try {
        const res = await fetch('/api/content/history');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.history) && data.history.length > 0) {
            const mapped: LeadershipTenure[] = data.history.map((h: CMSHistoryEntry) => ({
              id: h.id,
              tenureYear: h.tenureYear,
              termDates: h.termDates || h.tenureYear,
              president: h.president,
              teamTitle: h.teamTitle,
              summary: h.summary,
              backgroundNote: h.backgroundNote,
              keyInitiatives: h.activities || [],
              members: [],
              isOfficial: true,
            }));
            setTenures(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load CMS history, using baseline:', err);
      }
    }
    fetchHistory();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <Users className="w-4 h-4 text-amber-400" />
              Organizational Governance
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Leadership & Directorate
            </h1>
            <p className="text-slate-300 text-xs sm:text-base mt-4 leading-relaxed">
              Explore the organizational hierarchy of {ORGANIZATION.fullName}, featuring the active leadership tree as well as the preserved historical presidential tenures since chartering in April 2021.
            </p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'current'
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              Active Leadership Tree
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'history'
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
              }`}
            >
              <History className="w-4 h-4 text-amber-400" />
              Historical Presidential Tenures
            </button>
          </div>

          {/* Quick Confirmed Treasurer Callout */}
          <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-900 px-3.5 py-2 rounded-xl border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Confirmed Treasurer:</span>
            <span>{treasurer.name}</span>
            <span className="text-emerald-700 font-semibold">({treasurer.phone})</span>
          </div>
        </div>

        {/* TAB 1: CURRENT ACTIVE LEADERSHIP TREE */}
        {activeTab === 'current' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Tree Component with Add Capability */}
            <LeadershipTree />

            {/* Explanatory Context regarding Pending Confirmations */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-900" />
                Directorate Structure Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Confirmation Status Notice</h4>
                  <p>
                    Per organizational directives, President, 1st Vice President, and Secretary positions are actively reserved in the organizational tree awaiting formal publication of officer names and bios by the Directorate. The Treasurer position is confirmed with Ln. GnanaShekar R.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Expandable Architecture</h4>
                  <p>
                    The leadership component is completely data-driven. Use the <span className="font-semibold text-slate-900">&quot;+ Add Position / Officer&quot;</span> button above to dynamically attach new office-bearers, coordinators, or committee chairpersons to any node in the hierarchy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HISTORICAL PRESIDENTIAL TENURES */}
        {activeTab === 'history' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                    Archival Heritage
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Historical Presidential Records (April 2021 – Present)
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Archived records of past presidential tenures. These historical leaders are maintained separately from the current active leadership tree to ensure factual accuracy and constitutional distinction.
                </p>
              </div>

              <Link
                href="/admin/history"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200 shrink-0 self-start sm:self-auto"
                title="Manage Historical Tenures in CMS Admin"
              >
                <Settings className="w-3.5 h-3.5 text-slate-600" />
                Manage in CMS
              </Link>
            </div>

            {/* Historical Tenures Timeline */}
            <TenureTimeline tenures={tenures} />

            {/* Historical Verification Notice */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 text-xs text-amber-950">
              <h4 className="font-bold uppercase tracking-wider flex items-center gap-2 mb-2 text-amber-900">
                <Shield className="w-4 h-4 text-amber-700" />
                Historical Documentation Notice
              </h4>
              <p className="leading-relaxed">
                Historical leadership entries are derived from archival club documentation. Some specific wording and dates remain open for mentor verification. No artificial names or conjectural data have been substituted.
              </p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
