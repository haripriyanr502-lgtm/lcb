'use client';

import React, { useState } from 'react';
import { FileText, Printer, Shield, ChevronRight, BookOpen, Check } from 'lucide-react';
import { CHARTER_SECTIONS } from '@/data/charter';
import { cn } from '@/lib/utils';

export const CharterDocument: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(CHARTER_SECTIONS[0].id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      {/* Sidebar Navigation / Table of Contents */}
      <aside className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm sticky top-24 no-print">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
          <BookOpen className="w-5 h-5 text-blue-900" />
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Table of Contents
          </h3>
        </div>

        <nav className="space-y-1 text-xs">
          {CHARTER_SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={() => setActiveSectionId(sec.id)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-medium',
                  isActive
                    ? 'bg-blue-900 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-blue-900'
                )}
              >
                <span className="truncate">{sec.title}</span>
                <ChevronRight className={cn('w-3.5 h-3.5 shrink-0', isActive ? 'text-amber-400' : 'text-slate-400')} />
              </a>
            );
          })}
        </nav>

        {/* Print Button */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={handlePrint}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-700" />
            Print Official Charter
          </button>
        </div>
      </aside>

      {/* Main Charter Document Presentation Body */}
      <main className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-12">
        {/* Document Header Header Block */}
        <div className="border-b-2 border-blue-900 pb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5 text-amber-600" />
              Official Ratified Instrument
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              LCB BRIGADE INSTITUTIONAL CHARTER
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Ratified Governance Code • Standards of Discipline & Public Service
            </p>
          </div>

          <div className="w-16 h-16 rounded-xl bg-blue-950 text-amber-400 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md">
            <FileText className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        {/* Render Sections */}
        {CHARTER_SECTIONS.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 border-b border-slate-200 pb-2">
              {sec.title}
            </h2>

            <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
              {sec.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Subsections if available */}
            {sec.subsections && sec.subsections.length > 0 && (
              <div className="mt-4 space-y-4">
                {sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base">{sub.title}</h3>
                    <ul className="space-y-2">
                      {sub.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Formal Seal Footer */}
        <div className="pt-8 border-t border-slate-200 text-center space-y-2 text-xs text-slate-500">
          <p className="font-bold uppercase tracking-wider text-slate-700">
            Issued by Authority of the Directorate General • LCB BRIGADE
          </p>
          <p>© 2026 LCB BRIGADE. Official Governance Repository.</p>
        </div>
      </main>
    </div>
  );
};
