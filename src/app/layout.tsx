import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { ORGANIZATION } from '@/lib/constants';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'LCB BRIGADE | Official Public Website',
    template: '%s | LCB BRIGADE',
  },
  description: ORGANIZATION.shortDescription,
  keywords: [
    'LCB BRIGADE',
    'Public Service',
    'Leadership',
    'Civic Unity',
    'Community Service',
    'Official Organization',
  ],
  authors: [{ name: 'LCB BRIGADE Directorate' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lcbbrigade.org',
    title: 'LCB BRIGADE | Official Public Website',
    description: ORGANIZATION.shortDescription,
    siteName: 'LCB BRIGADE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
