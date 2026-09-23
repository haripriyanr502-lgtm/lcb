'use client';

import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  HandHeart,
  HeartHandshake,
  Compass,
  GraduationCap,
  LifeBuoy,
  ArrowRight,
  CheckCircle,
  Award,
  Calendar,
  Building2,
  Droplets,
  Trees,
  HeartPulse,
  Briefcase,
  X,
} from 'lucide-react';
import { Service } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  Users,
  ShieldCheck,
  HandHeart,
  HeartHandshake,
  Compass,
  GraduationCap,
  LifeBuoy,
  Droplets,
  Trees,
  HeartPulse,
  Briefcase,
};

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [showModal, setShowModal] = useState(false);
  const IconComponent = ICON_MAP[service.iconName] || Users;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full card-hover-effect group">
        <div>
          {/* Header Row: Icon and Year */}
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300">
                <Award className="w-3 h-3 text-amber-600" />
                Service Initiative
              </span>

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
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
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
            <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium">{service.impactMetrics}</span>
            </div>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="w-full inline-flex items-center justify-between text-xs font-bold text-blue-900 hover:text-blue-950 group-hover:underline pt-2 border-t border-slate-100"
          >
            <span>Read Initiative Overview</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-900 block">
                  {service.category}
                </span>
                <h4 className="text-xl font-bold text-slate-900">{service.name}</h4>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              {service.partnerAssociation && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>{service.partnerAssociation}</span>
                </div>
              )}

              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-1">
                  Full Initiative Details
                </h5>
                <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  {service.fullDescription}
                </p>
              </div>

              {service.impactMetrics && (
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-1">
                    Direct Civic Impact
                  </h5>
                  <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{service.impactMetrics}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
