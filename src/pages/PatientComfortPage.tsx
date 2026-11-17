import { Link } from 'react-router-dom';
import { Calendar, Headphones, Moon, Monitor, Sparkles } from 'lucide-react';
import { PATIENT_COMFORT_AMENITIES, PRACTICE_IMAGES, VERIFIED_TESTIMONIALS } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import { TestimonialCard } from '../components/TestimonialCard';

const ICONS = [Sparkles, Monitor, Headphones, Moon];

export function PatientComfortPage() {
  return (
    <>
      <PageMeta
        title="Patient Comfort & Anxiety-Aware Care | Georgia Holistic Dentist"
        description="Experience calming dental care in Gainesville with therapeutic chair massages, wireless music headphones, overhead flat-screen DVDs, and low-level ambient lighting."
      />

      <InnerHero
        eyebrow="Calm Patient Experience"
        title="Designed to Replace Dental Anxiety With Quiet Comfort"
        description="Every detail of the treatment room—from low-level lighting to therapeutic chair massage and gentle Waterlase® options—is arranged to help your nervous system settle."
        imageSrc={PRACTICE_IMAGES.comfortMedia.src}
        imageAlt={PRACTICE_IMAGES.comfortMedia.alt}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Verified Practice Amenities"
              title="Thoughtful comfort features available during your visit."
            />
            <div className="space-y-4">
              {PATIENT_COMFORT_AMENITIES.map((amenity, idx) => {
                const Icon = ICONS[idx % ICONS.length];
                return (
                  <div
                    key={amenity.title}
                    className="p-5 rounded-xl bg-[#EFF5FB]/60 border border-[#DCE5F0] flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#DCE5F0] flex items-center justify-center text-[#346CF0] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#142746]">{amenity.title}</h3>
                      <p className="text-sm text-[#526075] mt-1 leading-relaxed">{amenity.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 space-y-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCE5F0] shadow-sm">
              <SafeImage
                src={PRACTICE_IMAGES.heroSuite.src}
                alt={PRACTICE_IMAGES.heroSuite.alt}
                className="w-full h-full"
              />
            </div>
            <TestimonialCard item={VERIFIED_TESTIMONIALS[0]} featured />
            <div className="pt-2">
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Request a Comfortable Visit</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
