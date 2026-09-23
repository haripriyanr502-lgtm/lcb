'use client';

import React, { useState } from 'react';
import { User, Shield, ShieldCheck, Clock, Phone, ArrowUpRight, Calendar, X } from 'lucide-react';
import { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [showModal, setShowModal] = useState(false);
  const isConfirmed = member.status === 'confirmed';

  return (
    <>
      <div
        className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center card-hover-effect group relative ${
          isConfirmed
            ? 'border-emerald-200 ring-1 ring-emerald-100'
            : 'border-slate-200'
        }`}
      >
        {/* Verification Status Badge */}
        <div className="absolute top-4 right-4">
          {isConfirmed ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Confirmed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="w-3 h-3 text-amber-600" />
              Confirmation Pending
            </span>
          )}
        </div>

        {/* Profile Avatar Frame */}
        <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner mb-4 group-hover:scale-105 transition-transform duration-200 relative overflow-hidden mt-3">
          <Shield className="w-12 h-12 text-amber-400/70" />
          <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-[1px]" />
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
          <div className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium mb-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{member.tenure}</span>
          </div>
        )}

        {/* Phone if available */}
        {member.phone && (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-2 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <a href={`tel:${member.phone}`} className="hover:underline">
              {member.phone}
            </a>
          </div>
        )}

        {/* Short Bio */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-5 flex-grow">
          {member.bio}
        </p>

        {/* Action Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 group-hover:underline pt-3 border-t border-slate-100 w-full justify-center"
        >
          View Position Details
          <ArrowUpRight className="w-3.5 h-3.5 text-blue-900" />
        </button>
      </div>

      {/* Profile Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 border-b border-slate-100 pb-5 mb-5">
              <div className="w-14 h-14 rounded-full bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                  {member.position}
                </span>
                <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                {member.tenure && (
                  <span className="text-xs text-slate-500">{member.tenure}</span>
                )}
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div>
                <h5 className="font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Official Details
                </h5>
                <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {member.bio}
                </p>
              </div>

              {member.phone && (
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Contact Phone
                  </h5>
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 font-semibold">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <a href={`tel:${member.phone}`} className="hover:underline">
                      {member.phone}
                    </a>
                  </div>
                </div>
              )}

              <div>
                <h5 className="font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Confirmation Status
                </h5>
                <div
                  className={`p-3 rounded-xl border ${
                    isConfirmed
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}
                >
                  {isConfirmed ? (
                    <span className="font-medium">
                      Official office-bearer confirmed by the Directorate.
                    </span>
                  ) : (
                    <span className="font-medium">
                      Official profile announcement pending from Directorate.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
