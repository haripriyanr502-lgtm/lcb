'use client';

import React, { useState } from 'react';
import { Container } from '@/components/sections/Container';
import { CharterFamilyTree } from '@/components/charter/CharterFamilyTree';
import { CharterDocument } from '@/components/charter/CharterDocument';
import { ORGANIZATION } from '@/lib/constants';
import { Users, FileText, Shield, Award, Crown } from 'lucide-react';

export const CharterClientView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tree' | 'document'>('tree');

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full">
              <Crown className="w-4 h-4 text-amber-400" />
              Foundational Charter • April 2021
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Official Charter & Member Lineage
            </h1>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Explore the official founding charter of {ORGANIZATION.fullName}, chartered in April 2021 under Charter President Ln. L. A. V. Nagaraj and Team. View the genealogical Family Tree of charter members as well as the ratified institutional governance code.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl">
            <button
              onClick={() => setActiveTab('tree')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'tree'
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              Charter Family Tree
            </button>
            <button
              onClick={() => setActiveTab('document')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'document'
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Ratified Governance Code
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-950 px-3.5 py-2 rounded-xl border border-amber-200 font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Chartered: April 2021 • Lions District 317F</span>
          </div>
        </div>

        {/* TAB 1: CHARTER MEMBERS FAMILY TREE */}
        {activeTab === 'tree' && (
          <div className="animate-in fade-in duration-200 space-y-10">
            <CharterFamilyTree />
          </div>
        )}

        {/* TAB 2: RATIFIED INSTITUTIONAL CHARTER DOCUMENT */}
        {activeTab === 'document' && (
          <div className="animate-in fade-in duration-200">
            <CharterDocument />
          </div>
        )}
      </Container>
    </div>
  );
};
