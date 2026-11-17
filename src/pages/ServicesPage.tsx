import { useState } from 'react';
import { VERIFIED_SERVICES, PRACTICE_IMAGES } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { ServiceCard } from '../components/ServiceCard';

const CATEGORIES = [
  'All Services',
  'Holistic & Restorative',
  'Laser & Technology',
  'Airway & Cosmetic',
  'Virtual Access',
] as const;

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All Services');

  const filtered =
    activeCategory === 'All Services'
      ? VERIFIED_SERVICES
      : VERIFIED_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      <PageMeta
        title="Holistic & Laser Dental Services | Georgia Holistic Dentist"
        description="Explore verified dental services including Waterlase dentistry, non-surgical laser gum treatment, Myo=Smile, biocompatible restorations, cosmetic dentistry, and virtual consultations."
      />

      <InnerHero
        eyebrow="Verified Practice Services"
        title="Thoughtful, Biocompatible Care Across Every Stage"
        description="Each treatment at Georgia Holistic Dentist is designed to conserve healthy tooth structure, reduce chemical or thermal stress, and support whole-body wellness."
        imageSrc={PRACTICE_IMAGES.heroSuite.src}
        imageAlt={PRACTICE_IMAGES.heroSuite.alt}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DCE5F0]">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#142746] text-white'
                      : 'bg-[#EFF5FB] text-[#526075] hover:text-[#142746]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#526075] tabular-nums">
              Showing {filtered.length} verified service{filtered.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((svc, idx) => (
              <Reveal key={svc.slug} delay={Math.min(idx * 0.05, 0.25)}>
                <ServiceCard service={svc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
