'use client';

import React, { useState } from 'react';
import { UserCheck, Send, CheckCircle2, Shield, AlertCircle, Sparkles } from 'lucide-react';
import { JoinApplication } from '@/types';
import { JOIN_SUBMISSION_ENDPOINT } from '@/lib/constants';

export const JoinForm: React.FC = () => {
  const [formData, setFormData] = useState<JoinApplication>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    areaOfInterest: 'Community Service',
    skills: '',
    whyJoin: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JoinApplication, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof JoinApplication, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Please share your motivation for joining';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clean application validation & submission feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
      {isSubmitted ? (
        <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Application Form Validated</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-bold text-blue-900">{formData.fullName}</span>. Your membership interest application has been verified client-side and prepared for official review.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 text-left max-w-md mx-auto space-y-2 mt-4">
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Integration Notice
            </div>
            <p className="text-slate-600">
              Future applications will transmit automatically to the official secretariat endpoint: <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900">{JOIN_SUBMISSION_ENDPOINT}</code>.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  organization: '',
                  areaOfInterest: 'Community Service',
                  skills: '',
                  whyJoin: '',
                  message: '',
                });
              }}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-xl font-bold text-slate-900">Membership Application Form</h3>
            <p className="text-xs text-slate-500 mt-1">
              Complete all required fields below to register your interest in joining LCB BRIGADE.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              />
              {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Organization */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Organization / Institution
              </label>
              <input
                type="text"
                placeholder="University, Company, or Institution"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Area of Interest */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Primary Area of Interest
            </label>
            <select
              value={formData.areaOfInterest}
              onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all font-medium text-slate-800"
            >
              <option value="Community Service">Community Service & Welfare Drives</option>
              <option value="Leadership Development">Leadership & Capability Training</option>
              <option value="Emergency Logistics">Emergency Logistics & Relief Units</option>
              <option value="Social Advocacy">Social Advocacy & Awareness</option>
              <option value="Administrative Support">Administrative & Event Coordination</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Relevant Skills / Qualifications
            </label>
            <input
              type="text"
              placeholder="e.g. First Aid, Event Management, Public Speaking, Logistics"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
            />
          </div>

          {/* Why Join */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Why do you want to join LCB BRIGADE? <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Share your motivation and commitment to public service..."
              value={formData.whyJoin}
              onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
            />
            {errors.whyJoin && <p className="text-xs text-red-500 mt-1">{errors.whyJoin}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Validating Application...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-slate-950" />
                Submit Application
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
