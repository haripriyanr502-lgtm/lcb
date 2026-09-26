import type { Metadata } from 'next';
import { CharterClientView } from '@/components/charter/CharterClientView';

export const metadata: Metadata = {
  title: 'Official Charter & Member Family Tree',
  description:
    'Ratified Institutional Charter of LCB BRIGADE detailing founding leadership family tree, governance structure, mission, objectives, principles, and member code of conduct.',
};

export default function CharterPage() {
  return <CharterClientView />;
}
