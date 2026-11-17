import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { PRACTICE_IMAGES } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';

export function HolisticPage() {
  const pillars = [
    {
      num: '01.',
      title: 'The Oral-Systemic Connection',
      body: 'Periodontal bacteria, chronic gum inflammation, and unresolved oral stressors do not remain isolated in the mouth. Holistic dentistry evaluates how oral wellness interacts with cardiovascular, immune, and cellular health.',
    },
    {
      num: '02.',
      title: 'Biocompatible, Non-Toxic Materials',
      body: 'Instead of metal-heavy or mercury-containing amalgam restorations, care focuses on tooth-colored composite bonding and metal-free alternatives selected to harmonize with your biology.',
    },
    {
      num: '03.',
      title: 'Safe Mercury Amalgam Removal',
      body: 'When older silver amalgam fillings require replacement, strict isolation and protective protocols are used to minimize exposure to mercury vapors for both patients and clinical staff.',
    },
    {
      num: '04.',
      title: 'Ozone Therapy & Gentle Laser Disinfection',
      body: 'Medical-grade ozone therapy and non-surgical laser gum treatments support natural antimicrobial action and calm tissue healing without unnecessary surgical trauma.',
    },
    {
      num: '05.',
      title: 'Airway, Breathing & Bite Harmony',
      body: 'Through the Myo=Smile® program and bite evaluations, Dr. Lorie examines arch width, tongue posture, nasal breathing, and jaw tension—addressing root causes rather than masking symptoms.',
    },
  ];

  return (
    <>
      <PageMeta
        title="Holistic Dental Approach | Georgia Holistic Dentist"
        description="Discover how Georgia Holistic Dentist integrates biocompatible materials, safe amalgam removal, ozone therapy, and airway wellness."
      />

      <InnerHero
        eyebrow="Whole-Person Philosophy"
        title="Holistic Dentistry Built Around Your Biology"
        description="We look beyond isolated symptoms to support biocompatible materials, calm periodontal tissues, balanced jaw posture, and healthy breathing."
        imageSrc={PRACTICE_IMAGES.holisticConsult.src}
        imageAlt={PRACTICE_IMAGES.holisticConsult.alt}
        primaryActionLabel="Request a Holistic Visit"
        primaryActionTo="/appointments"
        secondaryActionLabel="Explore Services"
        secondaryActionTo="/services"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <SectionHeading
                eyebrow="Five Core Pillars"
                title="How biological awareness shapes every treatment plan."
                description="Holistic care means slowing down, listening to your health history, and choosing conservative methods that respect living tissue."
              />
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCE5F0] shadow-sm">
                <SafeImage
                  src={PRACTICE_IMAGES.holisticArch.src}
                  alt={PRACTICE_IMAGES.holisticArch.alt}
                  className="w-full h-full"
                />
              </div>
              <div className="p-5 rounded-xl bg-[#EFF5FB] border border-[#DCE5F0] space-y-2 text-sm">
                <p className="font-semibold text-[#142746] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#346CF0]" />
                  <span>No One-Size-Fits-All Dentistry</span>
                </p>
                <p className="text-xs text-[#526075] leading-relaxed">
                  Out-of-town patients can also start with a Zoom virtual consultation to review existing X-rays and discuss biocompatible options before visiting Gainesville.
                </p>
                <Link
                  to="/virtual-consultations"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#346CF0] hover:underline pt-1"
                >
                  <span>Learn about Virtual Consultations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>

            <div className="lg:col-span-7 divide-y divide-[#DCE5F0] border-y border-[#DCE5F0]">
              {pillars.map((pillar, idx) => (
                <Reveal key={pillar.num} delay={idx * 0.05} className="py-7 flex gap-5">
                  <span className="font-mono text-sm font-semibold text-[#346CF0] tabular-nums pt-1">
                    {pillar.num}
                  </span>
                  <div>
                    <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#142746]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-base text-[#526075] leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#142746] text-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-semibold text-[#93B4E5] inline-flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Related Offerings</span>
            </p>
            <h2 className="font-editorial text-3xl font-semibold">
              Explore specific holistic treatments
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/services/biocompatible-restorations"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#93B4E5]" />
              <span>Safe Amalgam Removal</span>
            </Link>
            <Link
              to="/services/laser-gum-treatment"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#93B4E5]" />
              <span>Laser Gum Therapy</span>
            </Link>
            <Link
              to="/services/myo-smile-tmj"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-sm font-semibold transition-colors"
            >
              <span>Myo=Smile® / Airway</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
