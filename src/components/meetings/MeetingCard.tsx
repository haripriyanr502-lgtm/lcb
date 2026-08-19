'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { Meeting } from '@/types';
import { formatDate, cn } from '@/lib/utils';

interface MeetingCardProps {
  meeting: Meeting;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }) => {
  const [showModal, setShowModal] = useState(false);
  const isUpcoming = meeting.status === 'upcoming';

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full relative overflow-hidden card-hover-effect">
        {/* Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={cn(
              'px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md inline-flex items-center gap-1.5',
              isUpcoming
                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            )}
          >
            {isUpcoming ? (
              <>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Upcoming Assembly
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                Completed
              </>
            )}
          </span>

          {meeting.isPlaceholder && (
            <span className="badge-placeholder text-[11px]" title="Placeholder schedule entry">
              <Info className="w-3 h-3 text-amber-600" />
              Placeholder
            </span>
          )}
        </div>

        {/* Date Display Badge */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-blue-900 text-white shrink-0 shadow-sm border border-amber-400/20">
            <span className="text-xs font-semibold uppercase text-amber-300">
              {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="text-xl font-extrabold leading-none">
              {new Date(meeting.date).getDate()}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-900 transition-colors">
              {meeting.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(meeting.date)}
            </p>
          </div>
        </div>

        {/* Meeting Details Summary */}
        <div className="space-y-2 text-xs text-slate-600 my-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-900 shrink-0" />
            <span className="font-medium">{meeting.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-900 shrink-0" />
            <span className="font-medium truncate">{meeting.location}</span>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-6">
          {meeting.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-blue-950 bg-blue-50 hover:bg-blue-900 hover:text-white rounded-lg border border-blue-200 transition-all duration-200 mt-auto group"
        >
          View Details & Agenda
          <ChevronRight className="w-4 h-4 text-blue-900 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase text-blue-900 bg-blue-50 rounded">
                  {meeting.status}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{meeting.title}</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-900 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase font-semibold text-slate-400">Date</p>
                    <p className="font-bold text-slate-800">{formatDate(meeting.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-900 shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase font-semibold text-slate-400">Time</p>
                    <p className="font-bold text-slate-800">{meeting.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase font-semibold text-slate-400">Location</p>
                  <p className="font-bold text-slate-800">{meeting.location}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Description</h4>
                <p className="text-slate-600 leading-relaxed">{meeting.description}</p>
              </div>

              {meeting.agenda && meeting.agenda.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Meeting Agenda</h4>
                  <ul className="space-y-2">
                    {meeting.agenda.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
