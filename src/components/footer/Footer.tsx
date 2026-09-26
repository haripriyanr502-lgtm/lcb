import React from 'react';
import Link from 'next/link';
import { Shield, Phone, MapPin, Calendar, HeartHandshake, UserPlus, Users, Lock } from 'lucide-react';
import { ORGANIZATION, NAV_LINKS } from '@/lib/constants';
import { Container } from '@/components/sections/Container';

export const Footer: React.FC = () => {
  const treasurer = ORGANIZATION.confirmedOfficers.treasurer;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-900 border border-amber-400/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-wider text-white">
                  {ORGANIZATION.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {ORGANIZATION.fullName}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {ORGANIZATION.shortDescription}
            </p>

            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-lg">
                Motto: &quot;{ORGANIZATION.motto}&quot;
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg">
                Chartered {ORGANIZATION.establishedMonth} {ORGANIZATION.establishedYear}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-2 py-0.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Meetings & Requests */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Meetings Cadence
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="font-semibold text-white">
                2nd Tuesday of every month
              </p>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>6:30 PM – 7:30 PM — Board Meeting</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>7:30 PM — General Body Meeting</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Followed by Networking & Fellowship</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/meetings"
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold"
                >
                  <Users className="w-3.5 h-3.5" />
                  Write Request to Secretary Team &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: Official Secretariat & Location */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              Club Secretariat & Contacts
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{ORGANIZATION.region}</span>
              </li>
              <li className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Confirmed Office-Bearer
                </span>
                <span className="font-bold text-white block mt-0.5">
                  {treasurer.name}
                </span>
                <span className="text-[11px] text-amber-300 block">
                  {treasurer.position}
                </span>
                <div className="flex items-center gap-1.5 mt-2 text-emerald-400 font-semibold">
                  <Phone className="w-3.5 h-3.5" />
                  <a href={`tel:${treasurer.phone}`} className="hover:underline">
                    {treasurer.phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {ORGANIZATION.fullName} ({ORGANIZATION.name}). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/charter" className="hover:text-slate-300 transition-colors">
              Institutional Charter
            </Link>
            <Link href="/team" className="hover:text-slate-300 transition-colors">
              Leadership
            </Link>
            <Link href="/meetings" className="hover:text-slate-300 transition-colors">
              Assemblies
            </Link>
            <Link
              href="/admin/login"
              className="text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium"
              title="Secretariat CMS Content Management"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
