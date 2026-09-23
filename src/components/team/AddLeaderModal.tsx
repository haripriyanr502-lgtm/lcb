'use client';

import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, Shield, Info } from 'lucide-react';
import { OrgTreeNode } from '@/types';

interface AddLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableParents: { id: string; label: string }[];
  onAddLeader: (newNode: OrgTreeNode) => void;
}

export const AddLeaderModal: React.FC<AddLeaderModalProps> = ({
  isOpen,
  onClose,
  availableParents,
  onAddLeader,
}) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [parentId, setParentId] = useState<string>(
    availableParents[0]?.id || 'node-president'
  );
  const [status, setStatus] = useState<'confirmed' | 'pending_confirmation'>('confirmed');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNode: OrgTreeNode = {
      id: `custom-node-${Date.now()}`,
      name: name.trim() || 'Office Bearer',
      position: position.trim() || 'Appointed Officer',
      status,
      parentId: parentId === 'none' ? null : parentId,
      phone: phone.trim() || undefined,
      photo: photo.trim() || undefined,
      description: description.trim() || undefined,
      level: parentId === 'node-president' ? 2 : 3,
      children: [],
      isCustomAdded: true,
    };

    onAddLeader(newNode);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      resetForm();
      onClose();
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setPosition('');
    setPhone('');
    setPhoto('');
    setDescription('');
    setStatus('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Expandable Structure
            </span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-amber-400" />
            Add Leadership Position / Office-Bearer
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Expand the organizational tree dynamically when additional leadership positions or confirmed officers are provided by the Directorate.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Position Successfully Added</h4>
              <p className="text-xs text-slate-600">
                The organizational tree has been updated with the new leadership node.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  This capability allows new office-bearers, coordinators, or committee heads to be seamlessly integrated into the tree hierarchy.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Office-Bearer Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ln. K. Venkatesh (or leave placeholder if pending)"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Position / Designation *
                </label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Joint Secretary, 2nd Vice President, Service Director"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Reports To / Parent Node
                  </label>
                  <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
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
                    Confirmation Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as 'confirmed' | 'pending_confirmation')
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  >
                    <option value="confirmed">Confirmed Office-Bearer</option>
                    <option value="pending_confirmation">Pending Mentor Confirmation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone / Contact (Optional)
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Description / Portfolio Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key responsibilities or notes..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-blue-900 shadow transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                  Add to Tree
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
