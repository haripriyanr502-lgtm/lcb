'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, HeartHandshake, UserPlus, Users, Calendar, Award, Droplets, ArrowRight } from 'lucide-react';
import { ORGANIZATION } from '@/lib/constants';
import { Container } from '@/components/sections/Container';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center hero-pattern text-white pt-28 sm:pt-32 pb-20 overflow-hidden border-b border-blue-900/40">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 hero-subtle-grid pointer-events-none opacity-40" />

      {/* Radial soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Institutional Charter Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg mb-6 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>LIONS CLUBS INTERNATIONAL • CHARTERED APRIL 2021</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]"
          >
            {ORGANIZATION.fullName}
          </motion.h1>

          {/* Subtitle / Acronym & Motto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base font-bold uppercase tracking-wider text-amber-300"
          >
            <span className="px-3 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300">
              {ORGANIZATION.name}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-white italic tracking-normal capitalize font-serif text-lg">
              &quot;{ORGANIZATION.motto}&quot;
            </span>
          </motion.div>

          {/* Core Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl"
          >
            Chartered in April 2021 in Bengaluru, dedicated to principled community service, civic welfare infrastructure, youth leadership, and collective societal empowerment.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto"
          >
            <Link
              href="/meetings"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              Monthly Meetings Schedule
            </Link>

            <Link
              href="/team"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-900/80 hover:bg-blue-800 border border-blue-700/60 rounded-xl shadow-lg transition-all duration-200"
            >
              <Users className="w-4 h-4 text-amber-400" />
              Leadership Structure
            </Link>

            <Link
              href="/join-us"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all duration-200"
            >
              <UserPlus className="w-4 h-4 text-slate-300" />
              Join Us
            </Link>
          </motion.div>

          {/* Quick Metrics & Pillars Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 backdrop-blur-md"
          >
            <div className="flex flex-col items-center p-3 text-center border-r border-slate-800 last:border-r-0">
              <Calendar className="w-5 h-5 text-amber-400 mb-1.5" />
              <span className="text-base sm:text-lg font-black text-white">2nd Tuesday</span>
              <span className="text-[11px] text-slate-400 font-medium">Monthly Assembly</span>
            </div>

            <div className="flex flex-col items-center p-3 text-center border-r border-slate-800 last:border-r-0">
              <Award className="w-5 h-5 text-amber-400 mb-1.5" />
              <span className="text-base sm:text-lg font-black text-white">₹31 Lakh</span>
              <span className="text-[11px] text-slate-400 font-medium">CSR Fund Mobilized</span>
            </div>

            <div className="flex flex-col items-center p-3 text-center border-r border-slate-800 last:border-r-0">
              <Droplets className="w-5 h-5 text-amber-400 mb-1.5" />
              <span className="text-base sm:text-lg font-black text-white">RO Water Plant</span>
              <span className="text-[11px] text-slate-400 font-medium">Clean Drinking Water</span>
            </div>

            <div className="flex flex-col items-center p-3 text-center">
              <Shield className="w-5 h-5 text-amber-400 mb-1.5" />
              <span className="text-base sm:text-lg font-black text-white">April 2021</span>
              <span className="text-[11px] text-slate-400 font-medium">Charter Foundation</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
