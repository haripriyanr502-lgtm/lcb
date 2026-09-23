'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, HeartHandshake, UserPlus, Users, Calendar } from 'lucide-react';
import { NAV_LINKS, ORGANIZATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Container } from '@/components/sections/Container';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-nav-solid shadow-sm py-3'
          : isHome
          ? 'bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-transparent text-white py-4 sm:py-5'
          : 'bg-white border-b border-slate-200 py-3 sm:py-4'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-900 to-slate-950 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-black text-lg sm:text-xl tracking-wider leading-tight flex items-center gap-1.5',
                  isScrolled || !isHome ? 'text-blue-950' : 'text-white'
                )}
              >
                {ORGANIZATION.name}
              </span>
              <span
                className={cn(
                  'text-[10px] sm:text-[11px] font-bold tracking-wider uppercase',
                  isScrolled || !isHome ? 'text-slate-500' : 'text-amber-300/90'
                )}
              >
                {ORGANIZATION.fullName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.filter((l) => l.href !== '/join-us' && l.href !== '/donate').map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors relative',
                    isActive
                      ? isScrolled || !isHome
                        ? 'text-blue-950 bg-blue-50'
                        : 'text-amber-300 bg-white/10'
                      : isScrolled || !isHome
                      ? 'text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/meetings"
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200',
                isScrolled || !isHome
                  ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/20'
              )}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Meetings
            </Link>

            <Link
              href="/join-us"
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all duration-200 shadow-sm',
                isScrolled || !isHome
                  ? 'border-blue-900 text-blue-950 hover:bg-blue-950 hover:text-white'
                  : 'border-white/40 text-white hover:bg-white hover:text-blue-950'
              )}
            >
              <UserPlus className="w-3.5 h-3.5 text-amber-400" />
              Join Us
            </Link>

            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-slate-950" />
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={cn(
              'lg:hidden p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
              isScrolled || !isHome
                ? 'text-slate-800 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 border-t border-slate-200/20 bg-slate-950/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 border border-slate-800">
            <div className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const isSpecial = link.href === '/join-us' || link.href === '/donate';
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-xl flex items-center justify-between transition-colors',
                      isActive
                        ? 'bg-blue-900 text-amber-300'
                        : isSpecial
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                    )}
                  >
                    <span>{link.label}</span>
                    {link.href === '/join-us' && <UserPlus className="w-4 h-4 text-amber-400" />}
                    {link.href === '/donate' && <HeartHandshake className="w-4 h-4 text-amber-400" />}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
