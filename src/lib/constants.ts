export const ORGANIZATION = {
  name: 'LCB BRIGADE',
  tagline: 'Leadership • Service • Unity • Responsibility • Excellence',
  shortDescription:
    'Official website of LCB BRIGADE — dedicated to public service, community development, disciplined leadership, and collective unity.',
  establishedYear: '2024',
  contact: {
    email: 'contact@lcbbrigade.org',
    phone: '+91 (0) 800-LCB-BRIGADE',
    address: 'Central Headquarters, Civic Center, New Delhi, India',
  },
  social: {
    twitter: 'https://twitter.com/lcbbrigade',
    linkedin: 'https://linkedin.com/company/lcbbrigade',
    facebook: 'https://facebook.com/lcbbrigade',
    instagram: 'https://instagram.com/lcbbrigade',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Meetings', href: '/meetings' },
  { label: 'Services', href: '/services' },
  { label: 'Charter', href: '/charter' },
  { label: 'Team', href: '/team' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Join Us', href: '/join-us' },
  { label: 'Donate', href: '/donate' },
];

export const DONATION_CONFIG = {
  // Stubs for future integration with payment backend / payment gateway URL
  paymentGatewayUrl: process.env.NEXT_PUBLIC_DONATION_PAYMENT_URL || '#',
  currency: '₹',
  defaultOptions: [
    { amount: 500, label: '₹500', description: 'Supports basic initiative operational materials' },
    { amount: 1000, label: '₹1,000', description: 'Contributes to community outreach and logistics' },
    { amount: 2500, label: '₹2,500', description: 'Sponsors leadership development and workshops' },
    { amount: 5000, label: '₹5,000', description: 'Sponsors major annual social service drives' },
  ],
};

export const JOIN_SUBMISSION_ENDPOINT =
  process.env.NEXT_PUBLIC_JOIN_FORM_ENDPOINT || '#';
