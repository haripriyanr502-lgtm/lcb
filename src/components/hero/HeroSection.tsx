'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, HeartHandshake, UserPlus, Award, Users, CalendarCheck, FileText } from 'lucide-react';
import { ORGANIZATION } from '@/lib/constants';
import { Container } from '@/components/sections/Container';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center hero-pattern text-white pt-28 pb-20 overflow-hidden border-b border-blue-900/40">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a0a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Organization Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-900/70 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg mb-8"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>OFFICIAL PUBLIC INSTITUTION PORTAL</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
          >
            {ORGANIZATION.name}
          </motion.h1>

          {/* Subtitle / Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-xl font-bold tracking-widest uppercase text-amber-400"
          >
            {ORGANIZATION.tagline}
          </motion.p>

          {/* Organization Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
          >
            A disciplined, public-service institution committed to cultivating ethical leadership, promoting civic unity, and executing vital community support initiatives across the region.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/join-us"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              Join LCB BRIGADE
            </Link>

            <Link
              href="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-blue-900/80 hover:bg-blue-800 border border-blue-700/60 rounded-lg shadow-lg transition-all duration-200"
            >
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              Support & Donate
            </Link>
          </motion.div>

          {/* Key Metrics / Highlights Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-blue-950/70 border border-blue-800/50 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center p-3 text-center border-r border-blue-900/50 last:border-r-0">
              <CalendarCheck className="w-6 h-6 text-amber-400 mb-2" />
              <span className="text-xl sm:text-2xl font-black text-white">7+</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Primary Directives</span>
            </div>

            <div className="flex flex-col items-center p-3 text-center border-r border-blue-900/50 last:border-r-0">
              <Users className="w-6 h-6 text-amber-400 mb-2" />
              <span className="text-xl sm:text-2xl font-black text-white">Unified</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Disciplined Cadre</span>
            </div>

            <div className="flex flex-col items-center p-3 text-center border-r border-blue-900/50 last:border-r-0">
              <FileText className="w-6 h-6 text-amber-400 mb-2" />
              <span className="text-xl sm:text-2xl font-black text-white">Formal</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Ratified Charter</span>
            </div>

            <div className="flex flex-col items-center p-3 text-center">
              <Award className="w-6 h-6 text-amber-400 mb-2" />
              <span className="text-xl sm:text-2xl font-black text-white">Excellence</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Public Duty</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
