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
    default: `${ORGANIZATION.name} | ${ORGANIZATION.fullName}`,
    template: `%s | ${ORGANIZATION.name}`,
  },
  description: ORGANIZATION.shortDescription,
  keywords: [
    'LCB BRIGADE',
    'Lions Club Bangalore Brigade',
    'Lions Clubs International',
    'Community Service',
    'Clean Drinking Water RO Plant',
    'Leadership Development',
    'Bengaluru Service Organization',
    'Public Welfare',
  ],
  authors: [{ name: `${ORGANIZATION.fullName} Directorate` }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: `${ORGANIZATION.name} | ${ORGANIZATION.fullName}`,
    description: ORGANIZATION.shortDescription,
    siteName: ORGANIZATION.fullName,
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
