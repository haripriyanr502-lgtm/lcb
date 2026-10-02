'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  X,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
} from 'lucide-react';
import { CMSMeeting } from '@/types/cms';

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<CMSMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<CMSMeeting | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '6:30 PM onwards (Board: 6:30 PM | General Body: 7:30 PM)',
    location: 'Official Brigade Venue / Secretariat Hall, Bengaluru',
    status: 'upcoming' as 'upcoming' | 'completed',
    description: '',
    agendaRaw: '',
    isPublished: true,
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation State
  const [deletingMeeting, setDeletingMeeting] = useState<CMSMeeting | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMeetings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/meetings');
      const data = await res.json();
      if (data.success && Array.isArray(data.meetings)) {
        setMeetings(data.meetings);
      }
    } catch (err) {
      console.error('Failed to load meetings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function initialFetch() {
      try {
        const res = await fetch('/api/admin/meetings');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.meetings)) {
          setMeetings(data.meetings);
        }
      } catch (err) {
        console.error('Failed to load meetings:', err);
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
    setEditingMeeting(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '6:30 PM onwards (Board: 6:30 PM | General Body: 7:30 PM)',
      location: 'Official Brigade Venue / Secretariat Hall, Bengaluru',
      status: 'upcoming',
      description: 'Official monthly assembly adhering to the constitutional schedule. Incorporates the executive Board Meeting followed by the General Body Meeting and fellowship.',
      agendaRaw: '6:30 PM – 7:30 PM — Board Meeting (Executive Review)\n7:30 PM — General Body Meeting (Club Assembly)\nFollowed by Networking & Fellowship',
      isPublished: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (meeting: CMSMeeting) => {
    setEditingMeeting(meeting);
    setFormData({
      title: meeting.title,
      date: meeting.date,
      time: meeting.time || '6:30 PM onwards',
      location: meeting.location || 'Bangalore, India',
      status: meeting.status || 'upcoming',
      description: meeting.description || '',
      agendaRaw: Array.isArray(meeting.agenda) ? meeting.agenda.join('\n') : '',
      isPublished: meeting.isPublished !== false,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (meeting: CMSMeeting) => {
    const updated = !meeting.isPublished;
    try {
      const res = await fetch('/api/admin/meetings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: meeting.id,
          title: meeting.title,
          date: meeting.date,
          isPublished: updated,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMeetings((prev) =>
          prev.map((m) => (m.id === meeting.id ? { ...m, isPublished: updated } : m))
        );
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Meeting title is required.');
      return;
    }
    if (!formData.date.trim()) {
      setFormError('Meeting date is required.');
      return;
    }

    setIsSaving(true);
    try {
      const agenda = formData.agendaRaw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      const payload = {
        ...(editingMeeting ? { id: editingMeeting.id } : {}),
        title: formData.title.trim(),
        date: formData.date.trim(),
        time: formData.time.trim(),
        location: formData.location.trim(),
        status: formData.status,
        description: formData.description.trim(),
        agenda,
        isPublished: formData.isPublished,
      };

      const res = await fetch('/api/admin/meetings', {
        method: editingMeeting ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        setFormError(data.error || 'Failed to save meeting.');
        return;
      }

      setIsModalOpen(false);
      await loadMeetings();
    } catch (err) {
      console.error('Error saving meeting:', err);
      setFormError('Network or server error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingMeeting) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/meetings?id=${encodeURIComponent(deletingMeeting.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setMeetings((prev) => prev.filter((m) => m.id !== deletingMeeting.id));
        setDeletingMeeting(null);
      } else {
        alert(data.error || 'Failed to delete meeting.');
      }
    } catch (err) {
      console.error('Error deleting meeting:', err);
      alert('Network error while deleting meeting.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Meetings
  const filteredMeetings = meetings.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.date.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' ? true : m.status === statusFilter;

    const matchesPublished =
      publishedFilter === 'all'
        ? true
        : publishedFilter === 'published'
        ? m.isPublished
        : !m.isPublished;

    return matchesSearch && matchesStatus && matchesPublished;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900">
              Constitutional Governance
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">
              2nd Tuesday Assembly Cadence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Meetings & Assembly Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Configure monthly executive board and general body assemblies, schedule details, locations, and constitutional agendas with real-time Supabase persistence.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/meetings"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Public Page</span>
          </Link>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Assemblies
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {isLoading ? '...' : meetings.length}
          </div>
          <span className="text-[11px] text-slate-500">Documented in database</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Published Live
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-2">
            {isLoading ? '...' : meetings.filter((m) => m.isPublished).length}
          </div>
          <span className="text-[11px] text-emerald-700">Visible on public timetable</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Upcoming Assemblies
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-900 mt-2">
            {isLoading ? '...' : meetings.filter((m) => m.status === 'upcoming').length}
          </div>
          <span className="text-[11px] text-amber-700">Scheduled on calendar</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Completed Records
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-900 mt-2">
            {isLoading ? '...' : meetings.filter((m) => m.status === 'completed').length}
          </div>
          <span className="text-[11px] text-purple-700">Archived minutes & agenda</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by meeting title, date (YYYY-MM-DD), location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'upcoming' | 'completed')}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="all">All Cadence Status</option>
            <option value="upcoming">Upcoming Only</option>
            <option value="completed">Completed Only</option>
          </select>

          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="all">All Visibility</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Meetings Catalog */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Loading Assembly Records...
            </p>
          </div>
        ) : filteredMeetings.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Meetings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm || statusFilter !== 'all' || publishedFilter !== 'all'
                ? 'No assemblies match the current filter criteria.'
                : 'No meetings have been documented yet.'}
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-950 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule First Assembly</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-6 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        meeting.status === 'upcoming'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {meeting.status}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        meeting.isPublished
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {meeting.isPublished ? 'Published Live' : 'Draft / Hidden'}
                    </span>

                    <span className="text-xs text-slate-400 font-mono">
                      ID: {meeting.id}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {meeting.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-semibold text-blue-900">
                      <Calendar className="w-3.5 h-3.5 text-blue-700" />
                      <span>{meeting.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{meeting.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{meeting.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {meeting.description}
                  </p>

                  {Array.isArray(meeting.agenda) && meeting.agenda.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-slate-400">
                        Agenda:
                      </span>
                      {meeting.agenda.map((ag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]"
                        >
                          {ag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                  <button
                    onClick={() => handleTogglePublish(meeting)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      meeting.isPublished
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                    title={meeting.isPublished ? 'Unpublish from public timetable' : 'Publish to public timetable'}
                  >
                    {meeting.isPublished ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publish</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openEditModal(meeting)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeletingMeeting(meeting)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">
                {editingMeeting ? 'Edit Assembly Session' : 'Schedule New Assembly'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Persists directly to Supabase relational tables. Published records reflect immediately on the official timetable.
              </p>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              {formError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Meeting Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monthly Assembly — November 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Meeting Date (YYYY-MM-DD) *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Assembly Cadence Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'upcoming' | 'completed',
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white font-semibold"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Meeting Timings
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6:30 PM onwards (Board: 6:30 PM | General Body: 7:30 PM)"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Meeting Location / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Official Brigade Venue / Secretariat Hall, Bengaluru"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assembly Overview / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Constitutional summary of business, guest speakers, or directives..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assembly Agenda (One item per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="6:30 PM – 7:30 PM — Board Meeting (Executive Review)&#10;7:30 PM — General Body Meeting (Club Assembly)&#10;Followed by Networking & Fellowship"
                  value={formData.agendaRaw}
                  onChange={(e) => setFormData({ ...formData, agendaRaw: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublished: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-900 focus:ring-blue-900 border-slate-300"
                  />
                  <span className="font-bold text-slate-800">
                    Publish immediately on public website
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-blue-900 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-blue-950 transition-all disabled:opacity-50"
                  >
                    {isSaving ? 'Saving to Database...' : editingMeeting ? 'Update Meeting' : 'Save Meeting'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-slate-900">
                  {deletingMeeting.title} ({deletingMeeting.date})
                </span>
                ? This action removes the row from the Supabase relational database.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingMeeting(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
