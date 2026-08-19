import React from 'react';
import Link from 'next/link';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { ORGANIZATION, NAV_LINKS } from '@/lib/constants';
import { Container } from '@/components/sections/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Organization Overview */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-blue-900 border border-amber-400/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                {ORGANIZATION.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {ORGANIZATION.shortDescription}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-md">
                Established {ORGANIZATION.establishedYear} • Official Institution
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2">
              Official Secretariat
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>{ORGANIZATION.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${ORGANIZATION.contact.phone}`} className="hover:text-amber-400 transition-colors">
                  {ORGANIZATION.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${ORGANIZATION.contact.email}`} className="hover:text-amber-400 transition-colors">
                  {ORGANIZATION.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Core Values */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-4 border-b border-slate-800 pb-2">
              Institutional Values
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Guided by principles of integrity, service, disciplined leadership, and collective unity.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Leadership', 'Service', 'Unity', 'Responsibility', 'Excellence'].map((val) => (
                <span key={val} className="px-2.5 py-1 text-[11px] font-semibold bg-blue-950 text-blue-300 border border-blue-800/60 rounded">
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {ORGANIZATION.name}. All Rights Reserved. Public Information Portal.</p>
          <div className="flex items-center gap-6">
            <Link href="/charter" className="hover:text-slate-300 transition-colors">
              Charter & Governance
            </Link>
            <Link href="/join-us" className="hover:text-slate-300 transition-colors">
              Application Portal
            </Link>
            <Link href="/donate" className="hover:text-slate-300 transition-colors">
              Public Support
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
