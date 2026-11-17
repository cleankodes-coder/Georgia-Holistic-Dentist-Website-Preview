import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { PRACTICE_IMAGES, TECHNOLOGY_ITEMS } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';

export function TechnologyPage() {
  return (
    <>
      <PageMeta
        title="Dental Technology | Waterlase & Digital Diagnostics | Georgia Holistic Dentist"
        description="Learn how Waterlase HydroPhotonics, intraoral cameras, low-radiation digital X-rays, Diagnodent, and oral cancer screening enhance comfort and diagnostic clarity."
      />

      <InnerHero
        eyebrow="Modern Clinical Equipment"
        title="Technology That Respects Living Tissue and Patient Comfort"
        description="From Waterlase® HydroPhotonics™ laser care to low-radiation digital radiography and intraoral visual co-discovery, every instrument is chosen for gentleness and clarity."
        imageSrc={PRACTICE_IMAGES.waterlaseClinical.src}
        imageAlt={PRACTICE_IMAGES.waterlaseClinical.alt}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <Reveal>
            <SectionHeading
              eyebrow="Verified Diagnostic & Treatment Tools"
              title="Five technologies integrated into everyday care."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECHNOLOGY_ITEMS.map((tech, idx) => (
              <Reveal
                key={tech.id}
                delay={idx * 0.05}
                className={`p-7 rounded-2xl border border-[#DCE5F0] flex flex-col justify-between ${
                  idx === 0 ? 'md:col-span-2 bg-[#142746] text-white border-[#142746]' : 'bg-[#EFF5FB]/50 text-[#1B2637]'
                }`}
              >
                <div>
                  <p className={`text-xs font-semibold ${idx === 0 ? 'text-[#93B4E5]' : 'text-[#346CF0]'}`}>
                    0{idx + 1}. · {tech.subtitle}
                  </p>
                  <h3 className={`font-editorial text-2xl font-semibold mt-2 ${idx === 0 ? 'text-white' : 'text-[#142746]'}`}>
                    {tech.name}
                  </h3>
                  <p className={`mt-3 text-base leading-relaxed max-w-3xl ${idx === 0 ? 'text-slate-300' : 'text-[#526075]'}`}>
                    {tech.summary}
                  </p>
                </div>
                {idx === 0 && (
                  <div className="mt-6">
                    <Link
                      to="/services/waterlase-dentistry"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#93B4E5]"
                    >
                      <span>Explore Waterlase® service details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F2ED] border-t border-[#DCE5F0]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCE5F0] bg-white shadow-sm">
            <SafeImage
              src={PRACTICE_IMAGES.digitalIntraoral.src}
              alt={PRACTICE_IMAGES.digitalIntraoral.alt}
              className="w-full h-full"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 space-y-4">
            <h2 className="font-editorial text-3xl font-semibold text-[#142746]">
              See what Dr. Lorie sees—chairside.
            </h2>
            <p className="text-base text-[#526075] leading-relaxed">
              High-resolution intraoral cameras and immediate low-radiation digital radiographs allow you to inspect real-time diagnostic imagery together with Dr. Lorie before making any care decision.
            </p>
            <Link
              to="/appointments?service=digital-dental-technology"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Request a Diagnostic Visit</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
