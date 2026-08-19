'use client';

import React, { useState } from 'react';
import { User, Mail, Shield, Info, ArrowUpRight } from 'lucide-react';
import { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center card-hover-effect group relative">
        {/* Placeholder Badge */}
        {member.isPlaceholder && (
          <span className="absolute top-4 right-4 badge-placeholder text-[10px]" title="Institutional Role Placeholder">
            Placeholder
          </span>
        )}

        {/* Profile Avatar Frame */}
        <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner mb-5 group-hover:scale-105 transition-transform duration-200 relative overflow-hidden">
          <Shield className="w-12 h-12 text-amber-400/80" />
          <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]" />
          <User className="w-10 h-10 text-white z-10" />
        </div>

        {/* Position Title */}
        <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-950 bg-blue-50 border border-blue-100 rounded-md mb-2">
          {member.position}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">
          {member.name}
        </h3>

        {/* Department */}
        {member.department && (
          <p className="text-xs text-amber-600 font-semibold mb-3">
            {member.department}
          </p>
        )}

        {/* Short Bio */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
          {member.bio}
        </p>

        {/* Action Button */}
        <button
          onClick={() => setShowModal(false)}
          className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 group-hover:underline"
        >
          View Directorate Bio
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-900" />
        </button>
      </div>

      {/* Bio Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-blue-900 font-semibold">{member.position}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Department</p>
                <p className="font-semibold text-slate-800">{member.department || 'Executive Leadership'}</p>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Biography & Responsibilities</p>
                <p className="text-slate-600 leading-relaxed text-xs">{member.bio}</p>
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
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow"
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
