import type { Metadata } from 'next';
import { Container } from '@/components/sections/Container';
import { CharterDocument } from '@/components/charter/CharterDocument';

export const metadata: Metadata = {
  title: 'Official Charter & Governance',
  description: 'Ratified Institutional Charter of LCB BRIGADE detailing governance structure, mission, objectives, principles, and member code of conduct.',
};

export default function CharterPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <Container>
        <CharterDocument />
      </Container>
    </div>
  );
}
