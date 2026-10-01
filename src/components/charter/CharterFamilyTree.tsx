'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Clock,
  Crown,
  Award,
  Info,
  Settings,
  HeartHandshake,
} from 'lucide-react';
import { CharterMemberNode } from '@/types';
import { INITIAL_CHARTER_TREE } from '@/data/charter';

export const CharterFamilyTree: React.FC = () => {
  const [treeData, setTreeData] =
    useState<CharterMemberNode[]>(INITIAL_CHARTER_TREE);
  const [isLoadedFromCMS, setIsLoadedFromCMS] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchPublishedTree() {
      try {
        const res = await fetch('/api/content/charter-tree', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.tree) && data.tree.length > 0) {
            setTreeData(data.tree);
            setIsLoadedFromCMS(true);
          }
        }
      } catch (err) {
        console.error('Failed to fetch published charter tree, using baseline:', err);
      }
    }
    fetchPublishedTree();
    return () => {
      isMounted = false;
    };
  }, []);

  const rootPresident = treeData[0];
  const secondLevelBranches = rootPresident?.children || [];

  return (
    <div className="space-y-8">
      {/* Header & Controls Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300 inline-flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-700" />
              Founding Lineage (April 2021)
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-950 border border-blue-200 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
              {isLoadedFromCMS ? 'Live CMS Published Roll' : 'Data-Driven Family Tree'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Charter Members Family Tree
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Visual genealogical hierarchy of the founding members of Lions Club of Bangalore Brigade, originating with Charter President Ln. L. A. V. Nagaraj and Team.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/admin/charter-members"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:text-blue-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200"
            title="Authorized Secretariat CMS Panel"
          >
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            Manage in CMS
          </Link>
        </div>
      </div>

      {/* Official Directorate Roster Readiness Notice */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 flex items-start gap-3 shadow-sm">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold uppercase tracking-wider text-amber-900 block">
            Charter Member Roll Architecture Status
          </span>
          <p className="leading-relaxed text-amber-900/90">
            The Charter Family Tree architecture is fully data-driven. Founding Charter President <span className="font-bold">Ln. L. A. V. Nagaraj and Team</span> (April 2021) is confirmed based on ratified charter records. The detailed member roll and sponsoring lineage branches are structured and awaiting final roster publication by the Secretariat. No speculative member names have been invented.
          </p>
        </div>
      </div>

      {/* VISUAL FAMILY TREE CANVAS */}
      <div className="bg-slate-50/70 rounded-3xl border border-slate-200 p-6 sm:p-10 relative overflow-hidden shadow-inner">
        {/* DESKTOP GENEALOGICAL TREE (Visible on lg and above) */}
        <div className="hidden lg:block overflow-x-auto pb-6">
          {rootPresident && (
            <div className="flex flex-col items-center min-w-max mx-auto">
              {/* Root Founder: Charter President */}
              <div className="w-full max-w-xl">
                <CharterNodeCard node={rootPresident} isRoot />
              </div>

              {/* Vertical connector stem from Charter President */}
              {secondLevelBranches.length > 0 && (
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-10 bg-amber-400" />
                  {/* Horizontal crossbar connecting executive branches */}
                  <div
                    className="h-0.5 bg-slate-300"
                    style={{
                      width:
                        secondLevelBranches.length > 1
                          ? `${Math.min(secondLevelBranches.length * 330, 1100)}px`
                          : '2px',
                    }}
                  />
                </div>
              )}

              {/* Recursive Level 2+ Branches */}
              {secondLevelBranches.length > 0 && (
                <div className="flex justify-center items-start gap-6 pt-0 flex-wrap">
                  {secondLevelBranches.map((branch) => (
                    <DesktopTreeNodeBranch key={branch.id} node={branch} level={2} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE & TABLET RESPONSIVE TREE (Clean Indented Lineage - Zero Horizontal Overflow) */}
        <div className="lg:hidden space-y-4">
          {rootPresident && (
            <div className="space-y-3">
              <MobileTreeNode node={rootPresident} depth={0} />
            </div>
          )}
        </div>
      </div>

      {/* Legend & Verification Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="font-semibold text-slate-800">
              Confirmed Founding Record
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="font-semibold text-slate-800">
              Awaiting Official Directorate Roll
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Lions District 317F • Chartered April 2021</span>
        </div>
      </div>
    </div>
  );
};

const DesktopTreeNodeBranch: React.FC<{ node: CharterMemberNode; level: number }> = ({
  node,
  level,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-0.5 h-8 bg-slate-300" />
      <div className="w-[310px]">
        <CharterNodeCard node={node} isSubBranch={level > 2} />
      </div>

      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center mt-2 w-full">
          <div className="w-0.5 h-6 bg-slate-300" />
          <div className="flex justify-center items-start gap-4 flex-wrap">
            {node.children.map((child) => (
              <DesktopTreeNodeBranch
                key={child.id}
                node={child}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileTreeNode: React.FC<{ node: CharterMemberNode; depth: number }> = ({
  node,
  depth,
}) => {
  return (
    <div className="space-y-3">
      <CharterNodeCard
        node={node}
        isRoot={depth === 0}
        isSubBranch={depth > 1}
      />
      {node.children && node.children.length > 0 && (
        <div className="pl-3 sm:pl-5 border-l-2 border-slate-300 space-y-3 pt-1">
          {node.children.map((child) => (
            <MobileTreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

interface CharterNodeCardProps {
  node: CharterMemberNode;
  isRoot?: boolean;
  isSubBranch?: boolean;
}

const CharterNodeCard: React.FC<CharterNodeCardProps> = ({
  node,
  isRoot,
  isSubBranch,
}) => {
  const isConfirmed = node.status === 'confirmed';

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden shadow-sm hover:shadow-md ${
        isRoot
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white border-amber-400 shadow-lg'
          : isConfirmed
          ? 'bg-white border-emerald-300 text-slate-900'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Node Header Pill */}
      <div
        className={`px-4 py-2 flex items-center justify-between gap-2 border-b text-[10px] font-black uppercase tracking-wider ${
          isRoot
            ? 'bg-amber-400/15 border-amber-400/30 text-amber-300'
            : isConfirmed
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-slate-50 border-slate-200 text-amber-800'
        }`}
      >
        <div className="flex items-center gap-1.5">
          {isRoot ? (
            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          ) : isConfirmed ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          )}
          <span>
            {isRoot
              ? 'Founding Charter Head'
              : isConfirmed
              ? 'Confirmed Record'
              : 'Awaiting Official Roll'}
          </span>
        </div>

        <span
          className={`font-semibold ${
            isRoot ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {node.charterYear}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 space-y-2.5">
        <div>
          <span
            className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block ${
              isRoot ? 'text-amber-400' : 'text-blue-900'
            }`}
          >
            {node.position}
          </span>
          <h4
            className={`text-base sm:text-lg font-black tracking-tight ${
              isRoot ? 'text-white' : 'text-slate-900'
            }`}
          >
            {node.name}
          </h4>
        </div>

        {node.sponsorName && (
          <div className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200 font-medium">
            <HeartHandshake className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Sponsor: {node.sponsorName}</span>
          </div>
        )}

        {node.bio && (
          <p
            className={`text-xs leading-relaxed ${
              isRoot ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {node.bio}
          </p>
        )}

        {node.notes && (
          <div
            className={`p-2.5 rounded-xl text-[11px] leading-relaxed border ${
              isRoot
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            {node.notes}
          </div>
        )}
      </div>
    </div>
  );
};
