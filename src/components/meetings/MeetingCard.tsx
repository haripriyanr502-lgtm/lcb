'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, Users, ArrowRight, Shield } from 'lucide-react';
import { Meeting } from '@/types';
import { SecretaryRequestModal } from './SecretaryRequestModal';

interface MeetingCardProps {
  meeting: Meeting;
  onOpenRequest?: () => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onOpenRequest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (onOpenRequest) {
      onOpenRequest();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full card-hover-effect">
        {/* Card Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-5 text-white">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Calendar className="w-3 h-3 text-amber-400" />
              2nd Tuesday of the Month
            </span>

            <span className="text-[11px] font-semibold text-slate-300">
              {meeting.date}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
            {meeting.title}
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow space-y-5">
          {/* Exact Meeting Schedule Timeline */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-900" />
              Official Session Schedule
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200">
                <span className="font-bold text-blue-950 shrink-0 min-w-[110px]">
                  6:30 PM – 7:30 PM
                </span>
                <span className="text-slate-700 font-medium">Board Meeting</span>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="font-bold text-blue-900 shrink-0 min-w-[110px]">
                  7:30 PM onwards
                </span>
                <span className="text-blue-950 font-bold">General Body Meeting</span>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50 border border-amber-200/60">
                <span className="font-bold text-amber-900 shrink-0 min-w-[110px]">
                  Followed by
                </span>
                <span className="text-amber-950 font-medium">Networking & Fellowship</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed flex-grow">
            {meeting.description}
          </p>

          {/* Location */}
          <div className="flex items-start gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{meeting.location}</span>
          </div>

          {/* District / Club Action CTA */}
          <div className="pt-2">
            <button
              onClick={handleOpenModal}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-blue-900 text-slate-700 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 hover:border-blue-900 transition-all group"
            >
              <Users className="w-3.5 h-3.5 text-amber-500 group-hover:text-amber-400" />
              <span>Representing a Club / District?</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      <SecretaryRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
