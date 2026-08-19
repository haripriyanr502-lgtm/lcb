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
  Info,
  CheckCircle,
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
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full card-hover-effect group">
        <div>
          {/* Header Row: Icon & Category */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-100 rounded-full">
              {service.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">
            {service.name}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {service.shortDescription}
          </p>
        </div>

        {/* Impact Metric Strip */}
        <div>
          {service.impactMetrics && (
            <div className="mb-6 p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle className="w-4 h-4 text-blue-900 shrink-0" />
              <span>{service.impactMetrics}</span>
            </div>
          )}

          {/* Learn More Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-blue-950 bg-blue-50 hover:bg-blue-900 hover:text-white rounded-lg border border-blue-200 transition-all duration-200"
          >
            Learn More
            <ArrowRight className="w-4 h-4 text-blue-900 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Service Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <p className="leading-relaxed text-slate-600">{service.fullDescription}</p>

              {service.impactMetrics && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                  <p className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-1">
                    Key Impact Indicator
                  </p>
                  <p className="font-semibold text-slate-800">{service.impactMetrics}</p>
                </div>
              )}

              {service.isPlaceholder && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Service parameters are governed by LCB BRIGADE institutional directives. Detailed program schedules are updated quarterly.
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow"
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
