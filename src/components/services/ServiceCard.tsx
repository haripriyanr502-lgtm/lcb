'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  HandHeart,
  Compass,
  GraduationCap,
  LifeBuoy,
  ArrowRight,
  CheckCircle,
  Award,
  Sparkles,
  Calendar,
  Building2,
} from 'lucide-react';
import { Service } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  Users,
  ShieldCheck,
  HandHeart,
  Compass,
  GraduationCap,
  LifeBuoy,
};

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [showModal, setShowModal] = useState(false);
  const IconComponent = ICON_MAP[service.iconName] || Users;

  return (
    <>
      <div
        className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full card-hover-effect group relative ${
          service.isOfficial
            ? 'border-blue-900/30 ring-1 ring-blue-900/10'
            : 'border-slate-200'
        }`}
      >
        <div>
          {/* Header Row: Icon, Year, and Official/Demo Badge */}
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex flex-col items-end gap-1.5">
              {service.isOfficial ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300">
                  <Award className="w-3 h-3 text-amber-600" />
                  Official Project
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-300">
                  <Sparkles className="w-3 h-3 text-slate-400" />
                  Sample / Demo
                </span>
              )}

              {service.year && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-950 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  <Calendar className="w-3 h-3 text-blue-800" />
                  {service.year}
                </span>
              )}
            </div>
          </div>

          {/* Category */}
          <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold text-blue-900 bg-blue-50/70 border border-blue-100 rounded-md mb-2">
            {service.category}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
            {service.name}
          </h3>

          {/* Partner Association Strip */}
          {service.partnerAssociation && (
            <div className="mb-3 p-2 rounded-lg bg-amber-50/90 border border-amber-200 text-xs text-amber-950 font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{service.partnerAssociation}</span>
            </div>
          )}

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {service.shortDescription}
          </p>
        </div>

        {/* Impact Metric Strip & Action */}
        <div>
          {service.impactMetrics && (
            <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
              <span>{service.impactMetrics}</span>
            </div>
          )}

          {/* Learn More Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-blue-950 bg-blue-50 hover:bg-blue-900 hover:text-white rounded-xl border border-blue-200 transition-all duration-200 group-hover:shadow-sm"
          >
            View Project Details
            <ArrowRight className="w-4 h-4 text-blue-900 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Service Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">{service.name}</h3>
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
              {/* Official Status */}
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                  service.isOfficial
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {service.isOfficial ? (
                  <>
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Official LCB BRIGADE Service Project</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>[SAMPLE / DEMO ENTRY] — Provided for UI and Archival Display Layout</span>
                  </>
                )}
              </div>

              {/* Partner Association Banner */}
              {service.partnerAssociation && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950">
                  <p className="font-bold uppercase tracking-wider text-[10px] text-amber-800 mb-1">
                    Partner Association & Collaboration
                  </p>
                  <p className="font-semibold">{service.partnerAssociation}</p>
                </div>
              )}

              {/* Full Description */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Project Scope & Execution</p>
                <p className="leading-relaxed text-slate-600 text-xs sm:text-sm">{service.fullDescription}</p>
              </div>

              {/* Impact Metric */}
              {service.impactMetrics && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                  <p className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-1">
                    Key Impact Indicator
                  </p>
                  <p className="font-semibold text-slate-800 text-xs sm:text-sm">{service.impactMetrics}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
