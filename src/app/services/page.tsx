'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/sections/Container';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SERVICES_DATA } from '@/data/services';
import { ORGANIZATION } from '@/lib/constants';
import { Service } from '@/types';
import { CMSService } from '@/types/cms';
import { ShieldCheck, Filter, HeartHandshake } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    let isMounted = true;
    async function fetchServices() {
      try {
        const res = await fetch('/api/content/services');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.services) && data.services.length > 0) {
            const mapped: Service[] = data.services.map((s: CMSService) => ({
              id: s.id,
              name: s.name,
              category: s.category,
              year: s.year,
              partnerAssociation: s.partnerAssociation,
              shortDescription: s.shortDescription,
              fullDescription: s.fullDescription,
              impactMetrics: s.impactMetrics,
              iconName: s.iconName || 'Users',
              isOfficial: true,
            }));
            setServices(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to fetch CMS services, using baseline:', err);
      }
    }
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { label: 'All Services', value: 'all' },
    { label: 'Water Infrastructure', value: 'Civic Infrastructure & Public Health' },
    { label: 'Food Relief', value: 'Community Welfare & Food Security' },
    { label: 'Environment', value: 'Environmental Sustainability' },
    { label: 'Healthcare & Vision', value: 'Healthcare & Life Support' },
    { label: 'Youth & Education', value: 'Youth Leadership & Social Empowerment' },
    { label: 'CSR Partnerships', value: 'Corporate Social Responsibility & Civic Funding' },
  ];

  const filteredServices = services.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden border border-blue-900">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Community Welfare Directives
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Services & Public Initiatives
            </h1>
            <p className="text-slate-300 text-xs sm:text-base mt-4 leading-relaxed">
              Explore the key community service initiatives and infrastructure installations executed by {ORGANIZATION.fullName}, from the landmark community RO clean water purification plant to coordinated grocery distribution drives and youth Leo Club installations.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter Directives:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-blue-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Lions Service Philosophy Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center max-w-3xl mx-auto">
          <HeartHandshake className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Dedicated to &quot;{ORGANIZATION.motto}&quot;
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto mb-5">
            Every service initiative is conceptualized, funded, and deployed through collective volunteerism and transparent governance, creating sustainable benefits for community members in need.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider">
            <span className="text-blue-950">Ethical Governance</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-950">Sustainable Infrastructure</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-950">Youth Development</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
