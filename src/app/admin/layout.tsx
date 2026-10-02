'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Users,
  History,
  Briefcase,
  Video,
  Calendar,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { ORGANIZATION } from '@/lib/constants';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    isLoginPage ? true : null
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage) return;

    let isMounted = true;
    fetch('/api/admin/me')
      .then((res) => {
        if (!isMounted) return;
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setIsAuthenticated(false);
        router.push('/admin/login');
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  // If on login page, render children directly without admin shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while verifying authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
            Verifying Directorate Access...
          </span>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      label: 'Dashboard Overview',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Charter Members & Tree',
      href: '/admin/charter-members',
      icon: Users,
    },
    {
      label: 'Organizational History',
      href: '/admin/history',
      icon: History,
    },
    {
      label: 'Services & Initiatives',
      href: '/admin/services',
      icon: Briefcase,
    },
    {
      label: 'Video Media Catalog',
      href: '/admin/videos',
      icon: Video,
    },
    {
      label: 'Meetings & Assemblies',
      href: '/admin/meetings',
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="hidden lg:flex w-72 bg-slate-950 text-white flex-col justify-between shrink-0 border-r border-slate-800 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Brand Mark Header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-slate-950 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-black text-sm tracking-wider uppercase text-white block">
                {ORGANIZATION.name} CMS
              </span>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                Content Management
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Management Modules
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors border border-slate-800"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>View Public Website</span>
            </div>
            <span className="text-[10px] text-slate-500">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* TOP HEADER BAR (Mobile & Tablet) */}
      <header className="lg:hidden bg-slate-950 text-white p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center">
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-black text-xs tracking-wider uppercase">
            {ORGANIZATION.name} CMS
          </span>
        </div>

        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 text-slate-400 hover:text-white"
          aria-label="Toggle navigation"
        >
          {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileNavOpen && (
        <div className="lg:hidden bg-slate-950 text-white p-4 border-b border-slate-800 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold ${
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 py-2 text-center text-xs font-bold bg-slate-900 rounded-lg text-slate-300"
            >
              Live Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 text-center text-xs font-bold bg-red-500/10 text-red-400 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* MAIN ADMIN WORKSPACE CONTENT */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
