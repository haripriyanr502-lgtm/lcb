'use client';

import React, { useState, useEffect } from 'react';
import {
  Video,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  X,
  AlertCircle,
  Play,
  Briefcase,
} from 'lucide-react';
import { CMSVideo, CMSService } from '@/types/cms';

const CATEGORIES = [
  { value: 'service', label: 'Service Initiative' },
  { value: 'joint_meeting', label: 'Joint Meeting' },
  { value: 'event', label: 'Club Event / Ceremony' },
];

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<CMSVideo[]>([]);
  const [services, setServices] = useState<CMSService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewModalVideo, setPreviewModalVideo] = useState<CMSVideo | null>(null);
  const [editingVideo, setEditingVideo] = useState<CMSVideo | null>(null);
  const [formData, setFormData] = useState({
    youtubeId: '',
    title: '',
    category: 'service' as 'service' | 'joint_meeting' | 'event',
    serviceId: '',
    description: '',
    channel: '',
    requiresVerification: false,
    verificationNote: '',
    displayOrder: 1,
    isPublished: true,
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [videosRes, servicesRes] = await Promise.all([
        fetch('/api/admin/videos'),
        fetch('/api/admin/services'),
      ]);

      const videosData = await videosRes.json();
      const servicesData = await servicesRes.json();

      if (videosData.success) {
        setVideos(videosData.videos);
      }
      if (servicesData.success) {
        setServices(servicesData.services);
      }
    } catch (err) {
      console.error('Failed to load video catalog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function initialFetch() {
      try {
        const [videosRes, servicesRes] = await Promise.all([
          fetch('/api/admin/videos'),
          fetch('/api/admin/services'),
        ]);

        const videosData = await videosRes.json();
        const servicesData = await servicesRes.json();

        if (isMounted) {
          if (videosData.success) setVideos(videosData.videos);
          if (servicesData.success) setServices(servicesData.services);
        }
      } catch (err) {
        console.error('Failed to load video catalog:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    initialFetch();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to extract YouTube ID from URLs or raw IDs
  const extractYouTubeId = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return '';
    // If it's already an 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

    // Check watch?v= format
    const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return watchMatch[1];

    // Check youtu.be/ format
    const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return shortMatch[1];

    // Check embed/ format
    const embedMatch = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];

    return trimmed;
  };

  const openAddModal = () => {
    setEditingVideo(null);
    setFormData({
      youtubeId: '',
      title: '',
      category: 'service',
      serviceId: services[0]?.id || '',
      description: '',
      channel: '',
      requiresVerification: false,
      verificationNote: '',
      displayOrder: videos.length + 1,
      isPublished: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (video: CMSVideo) => {
    setEditingVideo(video);
    setFormData({
      youtubeId: video.youtubeId,
      title: video.title,
      category: video.category,
      serviceId: video.serviceId || '',
      description: video.description || '',
      channel: video.channel || '',
      requiresVerification: !!video.requiresVerification,
      verificationNote: video.verificationNote || '',
      displayOrder: video.displayOrder || 1,
      isPublished: video.isPublished,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVideo(null);
    setFormError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanId = extractYouTubeId(formData.youtubeId);
    if (!cleanId) {
      setFormError('Please enter a valid YouTube Video ID or URL.');
      return;
    }

    if (!formData.title.trim()) {
      setFormError('Video title is required.');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        youtubeId: cleanId,
        id: editingVideo?.id,
      };

      const url = '/api/admin/videos';
      const method = editingVideo ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save video');
      }

      await loadData();
      closeModal();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while saving';
      setFormError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (video: CMSVideo) => {
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: video.id,
          isPublished: !video.isPublished,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setVideos((prev) =>
          prev.map((v) =>
            v.id === video.id ? { ...v, isPublished: !v.isPublished } : v
          )
        );
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete video "${title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/videos?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      } else {
        alert(data.error || 'Failed to delete video');
      }
    } catch (err) {
      console.error('Failed to delete video:', err);
      alert('Network error while deleting video');
    }
  };

  // Filter & Search
  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.youtubeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.channel && video.channel.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (video.description && video.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'all' || video.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-7 h-7 text-red-600" />
            Video Media Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage embedded YouTube video documentation for Services, Joint Meetings, and Club Events.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* Preservation & Integrity Notice */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed space-y-1">
          <p className="font-semibold text-amber-950">
            Verified YouTube Archives Protected
          </p>
          <p>
            All 27 service records and official joint meeting videos are populated and verified. Do not remove verified URLs unless requested by LCB Brigade leadership.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, YouTube ID, or channel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-medium text-slate-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Categories ({videos.length})</option>
            <option value="service">Services ({videos.filter(v => v.category === 'service').length})</option>
            <option value="joint_meeting">Joint Meetings ({videos.filter(v => v.category === 'joint_meeting').length})</option>
            <option value="event">Club Events ({videos.filter(v => v.category === 'event').length})</option>
          </select>
        </div>
      </div>

      {/* Video Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-slate-200">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-sm">
          <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900">No videos found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm || categoryFilter !== 'all'
              ? 'Try adjusting your search criteria or category filter.'
              : 'Add your first video to link video documentation with services and events.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => {
            const linkedService = services.find((s) => s.id === video.serviceId);

            return (
              <div
                key={video.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-slate-300 transition-all"
              >
                {/* Thumbnail Preview Header */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback image if thumbnail doesn't resolve
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setPreviewModalVideo(video)}
                      className="p-3 bg-red-600/90 text-white rounded-full hover:bg-red-600 transition-transform transform hover:scale-110 shadow-lg"
                      title="Preview Video Player"
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  {/* Badges on thumbnail */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                        video.category === 'service'
                          ? 'bg-blue-600 text-white'
                          : video.category === 'joint_meeting'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {video.category === 'service'
                        ? 'Service'
                        : video.category === 'joint_meeting'
                        ? 'Joint Meeting'
                        : 'Event'}
                    </span>
                    {video.requiresVerification && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded shadow bg-amber-500 text-white">
                        Under Review
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/75 px-1.5 py-0.5 rounded text-[11px] font-mono text-white/90">
                    ID: {video.youtubeId}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 leading-snug">
                      {video.title}
                    </h3>

                    {linkedService ? (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                        <Briefcase className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Linked: {linkedService.name}</span>
                      </div>
                    ) : (
                      <div className="mt-2 text-xs text-slate-400 italic">
                        No service directly linked
                      </div>
                    )}

                    {video.description && (
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>

                  {/* Footer & Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(video)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          video.isPublished
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title={video.isPublished ? 'Click to unpublish' : 'Click to publish'}
                      >
                        {video.isPublished ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Live</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-slate-700 inline-flex items-center gap-0.5"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(video)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit metadata"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id, video.title)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-1">
              {editingVideo ? 'Edit Video Details' : 'Add New Video'}
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Enter the YouTube ID or full URL and configure organization linkages.
            </p>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  YouTube Video ID or Full URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., dQw4w9WgXcQ or https://youtube.com/watch?v=..."
                  value={formData.youtubeId}
                  onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Full URLs will automatically be parsed to their 11-character video ID.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Free Cataract Surgery Camp Documentation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'service' | 'joint_meeting' | 'event',
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Channel / Uploader (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Lions Club International"
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {formData.category === 'service' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Link to Service Project
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="">-- No Direct Service Linked --</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Linking assigns this video to the individual Service detail page.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Context (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe what this video documents..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                  />
                  <label htmlFor="isPublished" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Publish immediately
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingVideo ? 'Save Changes' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setPreviewModalVideo(null)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/60 p-2 rounded-full backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${previewModalVideo.youtubeId}?autoplay=1`}
                title={previewModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 bg-slate-900 text-white">
              <h3 className="font-semibold text-base">{previewModalVideo.title}</h3>
              {previewModalVideo.description && (
                <p className="text-xs text-slate-400 mt-1">{previewModalVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
