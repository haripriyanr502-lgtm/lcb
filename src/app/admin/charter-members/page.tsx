'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  X,
  AlertCircle,
  Crown,
  CheckCircle2,
  Clock,
  GitBranch,
} from 'lucide-react';
import { CMSCharterMember } from '@/types/cms';

export default function AdminCharterMembersPage() {
  const [members, setMembers] = useState<CMSCharterMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending_team_submission'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CMSCharterMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    charterYear: 'April 2021',
    parentId: '',
    photoUrl: '',
    description: '',
    historicalInfo: '',
    sponsorName: '',
    order: 1,
    status: 'pending_team_submission' as 'confirmed' | 'pending_team_submission',
    isPublished: true,
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/charter-members');
      const data = await res.json();
      if (data.success) {
        setMembers(data.members || []);
      }
    } catch (err) {
      console.error('Failed to load charter members:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function initialFetch() {
      try {
        const res = await fetch('/api/admin/charter-members');
        const data = await res.json();
        if (isMounted && data.success) {
          setMembers(data.members || []);
        }
      } catch (err) {
        console.error('Failed to load charter members:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    initialFetch();
    return () => {
      isMounted = false;
    };
  }, []);

  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      charterYear: 'April 2021',
      parentId: members.length > 0 ? members[0].id : '',
      photoUrl: '',
      description: '',
      historicalInfo: '',
      sponsorName: '',
      order: members.length + 1,
      status: 'pending_team_submission',
      isPublished: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (member: CMSCharterMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      charterYear: member.charterYear || 'April 2021',
      parentId: member.parentId || '',
      photoUrl: member.photoUrl || '',
      description: member.description || '',
      historicalInfo: member.historicalInfo || '',
      sponsorName: member.sponsorName || '',
      order: member.order || 1,
      status: member.status || 'pending_team_submission',
      isPublished: member.isPublished,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      setFormError('Member Name and Role/Position are required.');
      return;
    }

    setIsSaving(true);
    setFormError('');

    try {
      const method = editingMember ? 'PUT' : 'POST';
      const body = {
        ...(editingMember ? { id: editingMember.id } : {}),
        name: formData.name.trim(),
        role: formData.role.trim(),
        charterYear: formData.charterYear.trim() || 'April 2021',
        parentId: formData.parentId.trim() || null,
        photoUrl: formData.photoUrl.trim() || undefined,
        description: formData.description.trim() || undefined,
        historicalInfo: formData.historicalInfo.trim() || undefined,
        sponsorName: formData.sponsorName.trim() || undefined,
        order: Number(formData.order) || 1,
        status: formData.status,
        isPublished: formData.isPublished,
      };

      const res = await fetch('/api/admin/charter-members', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsModalOpen(false);
        await loadMembers();
      } else {
        setFormError(data.error || 'Failed to save charter member.');
      }
    } catch {
      setFormError('Connection failure while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${name}" from the Charter Roll? Any sub-branches will be re-attached safely.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/charter-members?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await loadMembers();
      } else {
        alert(data.error || 'Failed to delete member.');
      }
    } catch {
      alert('Error occurred while deleting member.');
    }
  };

  const handleTogglePublish = async (member: CMSCharterMember) => {
    try {
      const res = await fetch('/api/admin/charter-members', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: member.id,
          name: member.name,
          role: member.role,
          isPublished: !member.isPublished,
        }),
      });
      if (res.ok) {
        await loadMembers();
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || m.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getParentName = (parentId: string | null) => {
    if (!parentId) return 'None (Root Node / President)';
    const parent = members.find((m) => m.id === parentId);
    return parent ? `${parent.role} (${parent.name})` : `Parent: ${parentId}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300 inline-flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-700" />
              Foundational Lineage
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
              {members.length} Total Roster Slots
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Charter Members & Family Tree Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Manage the official April 2021 founding charter roster and genealogy. Entries update the live public Family Tree dynamically upon publishing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/charter"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-950 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-amber-500" />
            <span>View Public Tree</span>
          </Link>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add New Charter Member</span>
          </button>
        </div>
      </div>

      {/* Verification Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <span className="font-bold block">
            Data Integrity & Official Directorate Records:
          </span>
          <p className="text-amber-900 leading-relaxed">
            Only verified club records and team-confirmed members should be entered. Placeholder slots marked &quot;Pending Team Submission&quot; are designed to receive official member submissions from club archives as they are verified.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, role, bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold">Status:</span>
          {(['all', 'confirmed', 'pending_team_submission'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-blue-950 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all'
                ? 'All'
                : st === 'confirmed'
                ? 'Confirmed'
                : 'Pending Official Details'}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 text-xs flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span>Loading charter member roster...</span>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-bold text-slate-700">No charter members match your criteria.</p>
            <p className="text-slate-400 mt-1">Try resetting the search filter or add a new record.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4">Member / Officer</th>
                  <th className="py-3.5 px-4">Tree Lineage (Parent)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 text-center text-slate-400 font-mono">
                      {m.order}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{m.name}</div>
                      <div className="text-[11px] font-semibold text-blue-900 mt-0.5">
                        {m.role}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {m.description || m.historicalInfo || 'Charter Member slot'}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <GitBranch className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {getParentName(m.parentId)}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {m.status === 'confirmed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Confirmed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Pending Details
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTogglePublish(m)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                          m.isPublished
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                        title={m.isPublished ? 'Click to Unpublish' : 'Click to Publish'}
                      >
                        {m.isPublished ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            Draft (Hidden)
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(m)}
                          className="p-2 rounded-lg text-slate-600 hover:text-blue-950 hover:bg-slate-100 transition-colors"
                          title="Edit Member"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(m.id, m.name)}
                          className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">
                    {editingMember ? 'Edit Charter Member' : 'Add New Charter Member'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    April 2021 Foundational Roster & Genealogical Lineage
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Member / Officer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ln. L. A. V. Nagaraj"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                {/* Role / Position */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Charter Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Charter President / Secretary"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Charter Year */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Charter Year / Period
                  </label>
                  <input
                    type="text"
                    placeholder="April 2021"
                    value={formData.charterYear}
                    onChange={(e) => setFormData({ ...formData, charterYear: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Verification Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'confirmed' | 'pending_team_submission',
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="confirmed">Confirmed Official Member</option>
                    <option value="pending_team_submission">
                      Pending Team Submission / Slot
                    </option>
                  </select>
                </div>
              </div>

              {/* Parent Lineage (Family Tree hierarchy) */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lineage Parent (Genealogical Hierarchy)
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="">None (Root President Node)</option>
                  {members
                    .filter((m) => !editingMember || m.id !== editingMember.id)
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        Under {m.role} ({m.name})
                      </option>
                    ))}
                </select>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Select which officer or branch this member branches from in the Family Tree.
                </span>
              </div>

              {/* Sponsor Name & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Sponsor / Reference Name
                  </label>
                  <input
                    type="text"
                    placeholder="Optional sponsoring member"
                    value={formData.sponsorName}
                    onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Member Photo URL
                </label>
                <input
                  type="text"
                  placeholder="https://... or /images/..."
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Description / Bio */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Service Bio
                </label>
                <textarea
                  rows={3}
                  placeholder="Foundational contributions, civic responsibilities, leadership background..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Historical Information / Notes */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Historical Archive Information / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Official notes from Lions District archives or charter roll..."
                  value={formData.historicalInfo}
                  onChange={(e) => setFormData({ ...formData, historicalInfo: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Publish Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublished: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-950 rounded border-slate-300 focus:ring-blue-900"
                  />
                  <span className="font-bold text-slate-800">
                    Publish this member to the public website Family Tree
                  </span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider shadow-md disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
