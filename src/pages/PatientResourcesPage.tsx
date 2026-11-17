import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, FileCheck2, Calendar } from 'lucide-react';
import { PRACTICE_IMAGES, PRACTICE_INFO, VERIFICATION_REPORT } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const FAQS = [
  {
    q: 'How does scheduling work at Georgia Holistic Dentist?',
    a: `Georgia Holistic Dentist is an independent, doctor-led practice located at ${PRACTICE_INFO.fullAddress}. Appointments are scheduled on weekdays by reservation. Online requests submitted in this interactive proposal demonstrate preference capture and require clinic staff confirmation.`,
  },
  {
    q: 'What makes Dr. Lorie Miller Stevens’ approach holistic?',
    a: 'Dr. Lorie evaluates the oral-systemic connection—how gum inflammation, toxic metals, bite balance, and airway posture interact with whole-body wellness—favoring biocompatible tooth-colored materials, ozone therapy, safe amalgam removal protocols, and conservative Waterlase® care.',
  },
  {
    q: 'Can out-of-town patients start with a virtual appointment?',
    a: 'Yes. Structured Zoom virtual consultations are available for preliminary holistic guidance. Patients are asked to email recent X-rays and clear photos of their teeth ahead of the call so Dr. Lorie can prepare.',
  },
  {
    q: 'What comfort options are available if I experience dental anxiety?',
    a: 'Treatment rooms are thoughtfully arranged with therapeutic chair massages, wireless music headphones, overhead flat-screen DVDs, low-level ambient lighting, and gentle Waterlase® laser technology that avoids traditional drill vibration.',
  },
  {
    q: 'Is this website connected to a live medical records database?',
    a: 'No. This application is an interactive pre-sales design and workflow demonstration. All sample patient records and calendar blocks are fictional and stored strictly inside your browser for testing.',
  },
];

export function PatientResourcesPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <PageMeta
        title="Patient Resources, FAQs & Asset Report | Georgia Holistic Dentist"
        description="Frequently asked questions, appointment preparation guidance, and transparent content & asset verification report for Georgia Holistic Dentist."
      />

      <InnerHero
        eyebrow="Patient Information"
        title="Patient Resources, FAQs & Verification Notes"
        description="Helpful guidance for preparing for an in-office or virtual consultation, plus full transparency on verified practice facts versus illustrative proposal assets."
        imageSrc={PRACTICE_IMAGES.heroSuite.src}
        imageAlt={PRACTICE_IMAGES.heroSuite.alt}
      />

      {/* FAQs */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Common Questions"
              title="Frequently asked questions."
            />
          </Reveal>

          <div className="divide-y divide-[#DCE5F0] border-y border-[#DCE5F0]">
            {FAQS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={item.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-editorial text-lg sm:text-xl font-semibold text-[#142746]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#346CF0] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm sm:text-base text-[#526075] leading-relaxed pr-6">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content & Asset Verification Report */}
      <section id="verification-report" className="py-20 lg:py-24 bg-[#EFF5FB] border-t border-[#DCE5F0]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Proposal Transparency"
              title="Content & Asset Verification Report"
              description="Clear documentation distinguishing verified factual data from the official practice website and illustrative assets prepared for this proposal."
            />
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#346CF0] text-white text-sm font-semibold whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Test Appointment Flow</span>
            </Link>
          </Reveal>

          <Reveal className="bg-white border border-[#DCE5F0] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#DCE5F0]">
              {VERIFICATION_REPORT.map((row) => (
                <div
                  key={row.category}
                  className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start"
                >
                  <div className="md:col-span-3 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#346CF0] shrink-0" />
                    <span className="text-sm font-semibold text-[#142746]">{row.category}</span>
                  </div>
                  <div className="md:col-span-3 text-xs font-semibold text-[#346CF0]">
                    {row.status} · <span className="text-[#526075] font-normal">{row.source}</span>
                  </div>
                  <div className="md:col-span-6 text-sm text-[#526075] leading-relaxed">
                    {row.notes}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
