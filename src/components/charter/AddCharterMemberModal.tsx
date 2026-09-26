'use client';

import React, { useState } from 'react';
import { X, UserPlus, Shield, Info } from 'lucide-react';
import { CharterMemberNode } from '@/types';

interface AddCharterMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableParents: { id: string; label: string }[];
  onAddMember: (member: CharterMemberNode) => void;
}

export const AddCharterMemberModal: React.FC<AddCharterMemberModalProps> = ({
  isOpen,
  onClose,
  availableParents,
  onAddMember,
}) => {
  const [parentId, setParentId] = useState<string>(
    availableParents[0]?.id || ''
  );
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState<'confirmed' | 'pending_team_submission'>(
    'pending_team_submission'
  );
  const [sponsorName, setSponsorName] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!position.trim()) errs.position = 'Position / Designation is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const timestamp = Date.now();
    const newMember: CharterMemberNode = {
      id: `charter-custom-${timestamp}`,
      name: name.trim() || `${position.trim()} (Pending Official Name)`,
      position: position.trim(),
      charterYear: 'April 2021',
      status,
      sponsorName: sponsorName.trim() || undefined,
      notes: notes.trim() || undefined,
      level: 3,
      parentId: parentId || null,
      children: [],
      isCustomAdded: true,
    };

    onAddMember(newMember);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Add Charter Member / Branch
            </h3>
            <p className="text-xs text-slate-500">
              Attach a new member or lineage node to the Charter Family Tree
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Sponsor / Parent Lineage Node
            </label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-300 p-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
            >
              {availableParents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Charter Position / Designation *
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Charter Director, Inducted Charter Member"
              className="w-full text-xs rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors.position && (
              <p className="text-[11px] text-red-600 mt-1">{errors.position}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Member Full Name (Optional if pending submission)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Leave blank to designate as pending submission slot"
              className="w-full text-xs rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Confirmation Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as 'confirmed' | 'pending_team_submission'
                  )
                }
                className="w-full text-xs rounded-xl border border-slate-300 p-3 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="pending_team_submission">Pending Submission</option>
                <option value="confirmed">Confirmed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Sponsoring Lion Name
              </label>
              <input
                type="text"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
                placeholder="e.g. Ln. L. A. V. Nagaraj"
                className="w-full text-xs rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Archival Notes / Remarks
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional background context, committee role, etc."
              className="w-full text-xs rounded-xl border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Data configured here updates the live visual tree immediately. Real charter rosters can also be hard-coded into <code className="font-mono font-bold">src/data/charter.ts</code>.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all"
            >
              Attach to Tree
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
