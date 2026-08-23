'use client';

import React, { useState } from 'react';
import { User, Mail, Shield, Award, CheckCircle2, ArrowUpRight, Sparkles, Calendar } from 'lucide-react';
import { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center card-hover-effect group relative ${
          member.isOfficial
            ? 'border-blue-900/30 ring-1 ring-blue-900/10'
            : 'border-slate-200'
        }`}
      >
        {/* Verification Status Badge */}
        <div className="absolute top-4 right-4">
          {member.isOfficial ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300">
              <Award className="w-3 h-3 text-amber-600" />
              Official Record
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-300">
              <Sparkles className="w-3 h-3 text-slate-400" />
              Sample / Demo
            </span>
          )}
        </div>

        {/* Profile Avatar Frame */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-900 border-4 border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner mb-4 group-hover:scale-105 transition-transform duration-200 relative overflow-hidden mt-3">
          <Shield className="w-12 h-12 text-amber-400/70" />
          <div className="absolute inset-0 bg-blue-950/30 backdrop-blur-[1px]" />
          <User className="w-10 h-10 text-white z-10" />
        </div>

        {/* Position Title */}
        <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-950 bg-blue-50 border border-blue-100 rounded-md mb-2">
          {member.position}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">
          {member.name}
        </h3>

        {/* Tenure / Term Dates */}
        {member.tenure && (
          <div className="inline-flex items-center gap-1 text-xs text-blue-900 font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 text-blue-800" />
            <span>{member.tenure}</span>
          </div>
        )}

        {/* Rotary / Experience Highlight Tag */}
        {member.experienceHighlight && (
          <div className="my-2 p-2 rounded-lg bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 font-medium text-left w-full flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>{member.experienceHighlight}</span>
          </div>
        )}

        {/* Department */}
        {member.department && (
          <p className="text-xs text-slate-500 font-medium mb-3">
            {member.department}
          </p>
        )}

        {/* Short Bio */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-5">
          {member.bio}
        </p>

        {/* Action Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 group-hover:underline pt-2 border-t border-slate-100 w-full justify-center"
        >
          View Full Profile & Tenure
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-900" />
        </button>
      </div>

      {/* Bio Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-blue-900 font-semibold">{member.position}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-lg font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              {/* Official / Demo Status Strip */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                  member.isOfficial
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {member.isOfficial ? (
                  <>
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Official LCB BRIGADE Leadership Record</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>[SAMPLE / DEMO ENTRY] — Provided for UI and Archival Display Layout</span>
                  </>
                )}
              </div>

              {/* Tenure Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Leadership Tenure</p>
                  <p className="font-bold text-slate-900 text-xs mt-0.5">{member.tenure || 'Executive Role'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Term Dates</p>
                  <p className="font-semibold text-slate-800 text-xs mt-0.5">{member.termDates || 'Standard Term'}</p>
                </div>
              </div>

              {/* Experience Highlight */}
              {member.experienceHighlight && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-blue-800 mb-1">
                    Foundational Experience & Background
                  </p>
                  <p className="font-semibold">{member.experienceHighlight}</p>
                </div>
              )}

              {/* Biography */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Biography & Mandate</p>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{member.bio}</p>
              </div>

              {member.emailContact && (
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-600">
                  <Mail className="w-4 h-4 text-blue-900" />
                  <span>{member.emailContact}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
