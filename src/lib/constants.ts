/**
 * Official Constants & Configuration for LCB Brigade (Lions Club of Bangalore Brigade)
 * Factual information strictly grounded in verified mentor instructions.
 */

export const ORGANIZATION = {
  name: 'LCB BRIGADE',
  fullName: 'Lions Club of Bangalore Brigade',
  internationalAffiliation: 'Lions Clubs International',
  motto: 'We Serve',
  tagline: 'Leadership • Service • Unity • Responsibility • Excellence',
  shortDescription:
    'Official website of Lions Club of Bangalore Brigade (LCB Brigade) — chartered in April 2021, dedicated to disciplined public service, community welfare, and ethical leadership.',
  establishedYear: '2021',
  establishedMonth: 'April',
  charterPresident: 'L. A. V. Nagaraj and Team',
  region: 'Bengaluru, Karnataka, India',

  // Confirmed office-bearer information provided by mentor:
  confirmedOfficers: {
    treasurer: {
      name: 'GnanaShekar R',
      position: 'LCB Brigade Treasurer',
      phone: '+91 96321 44481',
      status: 'confirmed' as const,
    },
    // The following positions are pending mentor confirmation:
    president: {
      position: 'President',
      status: 'pending_confirmation' as const,
      placeholderTitle: 'Office of the President',
      note: 'Official announcement pending from Directorate',
    },
    secretary: {
      position: 'Secretary',
      status: 'pending_confirmation' as const,
      placeholderTitle: 'Office of the Secretary',
      note: 'Official announcement pending from Directorate',
    },
    firstVicePresident: {
      position: '1st Vice President',
      status: 'pending_confirmation' as const,
      placeholderTitle: 'Office of the 1st Vice President',
      note: 'Official announcement pending from Directorate',
    },
  },
};

/**
 * Secretary Team Request Configuration
 * Destination can easily be set when provided by the mentor.
 */
export const SECRETARY_REQUEST_CONFIG = {
  noticeText:
    'If you are representing a Club / District, you can write a request to the Secretary Team.',
  // Configurable endpoint or email destination (no fake details invented)
  endpointUrl: process.env.NEXT_PUBLIC_SECRETARY_REQUEST_ENDPOINT || '',
  secretaryEmail: process.env.NEXT_PUBLIC_SECRETARY_EMAIL || '',
  isConfigured: Boolean(
    process.env.NEXT_PUBLIC_SECRETARY_REQUEST_ENDPOINT ||
      process.env.NEXT_PUBLIC_SECRETARY_EMAIL
  ),
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Meetings', href: '/meetings' },
  { label: 'Leadership', href: '/team' },
  { label: 'Services', href: '/services' },
  { label: 'Milestones', href: '/achievements' },
  { label: 'Charter', href: '/charter' },
  { label: 'Join Us', href: '/join-us' },
  { label: 'Donate', href: '/donate' },
];

export const DONATION_CONFIG = {
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
