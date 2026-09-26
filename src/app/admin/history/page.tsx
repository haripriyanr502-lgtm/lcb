'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  History,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  X,
  AlertCircle,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { CMSHistoryEntry } from '@/types/cms';

export default function AdminHistoryPage() {
  const [entries, setEntries] = useState<CMSHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<CMSHistoryEntry | null>(null);
  const [formData, setFormData] = useState({
    tenureYear: '',
    president: '',
    teamTitle: '',
    termDates: '',
    summary: '',
    activitiesText: '',
    backgroundNote: '',
    displayOrder: 1,
    isPublished: true,
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/history');
      const data = await res.json();
      if (data.success) {
        setEntries(data.history);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function initialFetch() {
      try {
        const res = await fetch('/api/admin/history');
        const data = await res.json();
        if (isMounted && data.success) {
          setEntries(data.history);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
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
    setEditingEntry(null);
    setFormData({
      tenureYear: '',
      president: '',
      teamTitle: '',
      termDates: '',
      summary: '',
      activitiesText: '',
      backgroundNote: '',
      displayOrder: entries.length + 1,
      isPublished: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (entry: CMSHistoryEntry) => {
    setEditingEntry(entry);
    setFormData({
      tenureYear: entry.tenureYear,
      president: entry.president,
      teamTitle: entry.teamTitle,
      termDates: entry.termDates,
      summary: entry.summary,
      activitiesText: (entry.activities || []).join('\n'),
      backgroundNote: entry.backgroundNote || '',
      displayOrder: entry.displayOrder || 1,
      isPublished: entry.isPublished,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tenureYear.trim() || !formData.president.trim()) {
      setFormError('Tenure Year/Period and President Name are required.');
      return;
    }

    setIsSaving(true);
    setFormError('');

    try {
      const method = editingEntry ? 'PUT' : 'POST';
      const activities = formData.activitiesText
        .split('\n')
        .map((a) => a.trim())
        .filter((a) => a.length > 0);

      const body = {
        ...(editingEntry ? { id: editingEntry.id } : {}),
        tenureYear: formData.tenureYear.trim(),
        president: formData.president.trim(),
        teamTitle:
          formData.teamTitle.trim() ||
          `${formData.tenureYear.trim()} — ${formData.president.trim()}, President and Team`,
        termDates: formData.termDates.trim() || formData.tenureYear.trim(),
        summary: formData.summary.trim(),
        activities,
        backgroundNote: formData.backgroundNote.trim() || undefined,
        displayOrder: Number(formData.displayOrder) || 1,
        isPublished: formData.isPublished,
      };

      const res = await fetch('/api/admin/history', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsModalOpen(false);
        await loadHistory();
      } else {
        setFormError(data.error || 'Failed to save history entry.');
      }
    } catch {
      setFormError('Connection failure while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, tenureYear: string) => {
    if (!window.confirm(`Are you sure you want to delete the historical record for "${tenureYear}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/history?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        await loadHistory();
      } else {
        alert(data.error || 'Failed to delete history record.');
      }
    } catch {
      alert('Error occurred while deleting.');
    }
  };

  const handleTogglePublish = async (entry: CMSHistoryEntry) => {
    try {
      const res = await fetch('/api/admin/history', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: entry.id,
          tenureYear: entry.tenureYear,
          president: entry.president,
          isPublished: !entry.isPublished,
        }),
      });
      if (res.ok) {
        await loadHistory();
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const filteredEntries = entries.filter((e) => {
    return (
      e.tenureYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-950 border border-blue-200 inline-flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-blue-800" />
              Organizational Heritage Records
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Live on /achievements & /team
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Presidential Tenures & History
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Manage archived tenures, presidential terms, and key civic initiatives from April 2021 chartering onwards. New terms added here appear on public heritage pages automatically.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/achievements"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
            <span>View Public Timeline</span>
          </Link>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Add History Entry</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by period, president, or milestone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50 focus:bg-white"
          />
        </div>

        <span className="text-xs text-slate-500 font-semibold hidden sm:inline-block">
          Total Historical Records: {entries.length}
        </span>
      </div>

      {/* History Entries Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <div className="inline-block w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-xs">Loading Historical Records...</p>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500">
            No history records matched your search.
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-950 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    <Calendar className="w-3 h-3 text-blue-800" />
                    {entry.tenureYear}
                  </span>

                  <button
                    onClick={() => handleTogglePublish(entry)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      entry.isPublished
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {entry.isPublished ? (
                      <>
                        <Eye className="w-3 h-3 text-emerald-600" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 text-slate-400" />
                        Draft
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {entry.president}
                </h3>
                <span className="text-xs text-slate-500 block mb-3 font-medium">
                  {entry.teamTitle}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {entry.summary}
                </p>

                {entry.activities && entry.activities.length > 0 && (
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Key Initiatives:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {entry.activities.slice(0, 3).map((act, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{act}</span>
                        </li>
                      ))}
                      {entry.activities.length > 3 && (
                        <span className="text-[11px] text-slate-400 italic">
                          +{entry.activities.length - 3} more initiatives
                        </span>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400 text-[11px]">
                  Order: {entry.displayOrder}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Record"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id, entry.tenureYear)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center font-bold">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  {editingEntry ? 'Edit Historical Record' : 'Add History Entry'}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure presidential tenure, milestones, and community impact initiatives
                </p>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Tenure Year / Period *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024–2025 or April 2021"
                    value={formData.tenureYear}
                    onChange={(e) => setFormData({ ...formData, tenureYear: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    President Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ln. John Doe and Team"
                    value={formData.president}
                    onChange={(e) => setFormData({ ...formData, president: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Team Title Banner
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2024–2025 — John Doe, President and Team"
                  value={formData.teamTitle}
                  onChange={(e) => setFormData({ ...formData, teamTitle: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Term Dates
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 July 2024 to 30 June 2025"
                  value={formData.termDates}
                  onChange={(e) => setFormData({ ...formData, termDates: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Summary Narrative
                </label>
                <textarea
                  rows={3}
                  placeholder="Comprehensive description of the presidential tenure, key milestones achieved, and civic impact..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Key Activities & Initiatives (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Blood Donation Camp&#10;Food Relief in association with Partner&#10;Tree Plantation Campaign"
                  value={formData.activitiesText}
                  onChange={(e) => setFormData({ ...formData, activitiesText: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Background Note / Archival Remarks
                </label>
                <input
                  type="text"
                  placeholder="e.g. Previous service experience, CSR mobilization notes, etc."
                  value={formData.backgroundNote}
                  onChange={(e) => setFormData({ ...formData, backgroundNote: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-900 focus:ring-amber-400"
                  />
                  <span className="font-bold text-slate-800">
                    Publish immediately to live website
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500">Order:</span>
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                    className="w-16 p-2 rounded-lg border border-slate-300 text-center font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-white bg-blue-950 hover:bg-blue-900 shadow transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingEntry ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
