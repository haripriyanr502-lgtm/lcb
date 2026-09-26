'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
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
} from 'lucide-react';
import { CMSService } from '@/types/cms';

const CATEGORIES = [
  'Civic Infrastructure & Public Health',
  'Community Welfare & Food Security',
  'Environmental Sustainability',
  'Healthcare & Life Support',
  'Youth Leadership & Social Empowerment',
  'Corporate Social Responsibility & Civic Funding',
];

const ICONS = [
  'Droplets',
  'Trees',
  'HeartPulse',
  'GraduationCap',
  'HeartHandshake',
  'Briefcase',
  'Users',
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<CMSService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<CMSService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[0],
    year: '2024–2025',
    partnerAssociation: '',
    shortDescription: '',
    fullDescription: '',
    impactMetrics: '',
    iconName: 'Users',
    displayOrder: 1,
    isPublished: true,
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function initialFetch() {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json();
        if (isMounted && data.success) {
          setServices(data.services);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
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
    setEditingService(null);
    setFormData({
      name: '',
      category: CATEGORIES[0],
      year: '2024–2025',
      partnerAssociation: '',
      shortDescription: '',
      fullDescription: '',
      impactMetrics: '',
      iconName: 'Users',
      displayOrder: services.length + 1,
      isPublished: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (srv: CMSService) => {
    setEditingService(srv);
    setFormData({
      name: srv.name,
      category: srv.category,
      year: srv.year || '',
      partnerAssociation: srv.partnerAssociation || '',
      shortDescription: srv.shortDescription || '',
      fullDescription: srv.fullDescription || '',
      impactMetrics: srv.impactMetrics || '',
      iconName: srv.iconName || 'Users',
      displayOrder: srv.displayOrder || 1,
      isPublished: srv.isPublished,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim()) {
      setFormError('Service name and category are required.');
      return;
    }

    setIsSaving(true);
    setFormError('');

    try {
      const method = editingService ? 'PUT' : 'POST';
      const body = {
        ...(editingService ? { id: editingService.id } : {}),
        name: formData.name.trim(),
        category: formData.category.trim(),
        year: formData.year.trim() || undefined,
        partnerAssociation: formData.partnerAssociation.trim() || undefined,
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim() || formData.shortDescription.trim(),
        impactMetrics: formData.impactMetrics.trim() || undefined,
        iconName: formData.iconName,
        displayOrder: Number(formData.displayOrder) || 1,
        isPublished: formData.isPublished,
      };

      const res = await fetch('/api/admin/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsModalOpen(false);
        await loadServices();
      } else {
        setFormError(data.error || 'Failed to save service.');
      }
    } catch {
      setFormError('Connection failure while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete service "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        await loadServices();
      } else {
        alert(data.error || 'Failed to delete service.');
      }
    } catch {
      alert('Error occurred while deleting.');
    }
  };

  const handleTogglePublish = async (srv: CMSService) => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: srv.id,
          name: srv.name,
          category: srv.category,
          isPublished: !srv.isPublished,
        }),
      });
      if (res.ok) {
        await loadServices();
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    if (categoryFilter === 'all') return matchesSearch;
    return matchesSearch && s.category === categoryFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-950 border border-purple-200 inline-flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-800" />
              Community Welfare Directives
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Live on /services & Detail Pages
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Community Service Initiatives
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Manage public service programs, potable water installations, healthcare drives, and educational distributions. Changes instantly reflect on the public listing and individual detail pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/services"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
            <span>View Public Services</span>
          </Link>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Add Service Initiative</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by initiative name or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">
            Category:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto text-xs rounded-xl border border-slate-200 p-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-4 px-6">Service Initiative</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Year</th>
                <th className="py-4 px-4">Impact Accomplished</th>
                <th className="py-4 px-4">Publish</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="inline-block w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-2" />
                    <p>Loading Services...</p>
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No services matched your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{srv.name}</div>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {srv.shortDescription}
                      </span>
                      {srv.partnerAssociation && (
                        <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
                          {srv.partnerAssociation}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-700">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-800">
                        {srv.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-600">
                      {srv.year || 'Ongoing'}
                    </td>

                    <td className="py-4 px-4 text-slate-600 max-w-xs">
                      {srv.impactMetrics ? (
                        <div className="flex items-center gap-1.5 text-emerald-800 font-medium text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{srv.impactMetrics}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">None specified</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTogglePublish(srv)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          srv.isPublished
                            ? 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {srv.isPublished ? (
                          <>
                            <Eye className="w-3 h-3 text-blue-800" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            Draft
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        href={`/services/${srv.id}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg inline-block transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(srv)}
                        className="p-1.5 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id, srv.name)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
              <div className="w-10 h-10 rounded-xl bg-purple-950 text-amber-400 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  {editingService ? 'Edit Service Initiative' : 'Add Service Initiative'}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure initiative overview, impact accomplishments, and directives
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
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Initiative Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Dental & Oral Health Camp"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Deployment Year / Term
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2024–2025"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Partner Association (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. In association with Narayana Health & Local RWA"
                  value={formData.partnerAssociation}
                  onChange={(e) => setFormData({ ...formData, partnerAssociation: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief 1-2 sentence overview shown on listing cards..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Initiative Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive narrative, background, objectives, and on-ground deployment details..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Direct Civic Impact Metric
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 250+ patients screened"
                    value={formData.impactMetrics}
                    onChange={(e) => setFormData({ ...formData, impactMetrics: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Display Icon
                  </label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {ICONS.map((ico) => (
                      <option key={ico} value={ico}>
                        {ico}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {isSaving ? 'Saving...' : editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
