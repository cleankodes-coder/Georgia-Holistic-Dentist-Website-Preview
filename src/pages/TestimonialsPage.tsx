import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { PRACTICE_IMAGES, VERIFIED_TESTIMONIALS } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { TestimonialCard } from '../components/TestimonialCard';

export function TestimonialsPage() {
  return (
    <>
      <PageMeta
        title="Verified Patient Testimonials | Georgia Holistic Dentist"
        description="Read verified patient quotations from Georgia Holistic Dentist in Gainesville, Georgia."
      />

      <InnerHero
        eyebrow="Verified Practice Quotations"
        title="What Patients Share About Their Experience"
        description="Every quote displayed here comes directly from published patient testimonials on georgiaholisticdentist.com. No fabricated star ratings or synthetic reviews are used."
        imageSrc={PRACTICE_IMAGES.heroSuite.src}
        imageAlt={PRACTICE_IMAGES.heroSuite.alt}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_TESTIMONIALS.map((item, idx) => (
              <Reveal
                key={item.id}
                delay={idx * 0.05}
                className={idx === 0 ? 'md:col-span-2' : ''}
              >
                <TestimonialCard item={item} featured={idx === 0} />
              </Reveal>
            ))}
          </div>

          <Reveal className="p-8 sm:p-10 rounded-2xl bg-[#142746] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold">
                Experience holistic care in Gainesville
              </h2>
              <p className="text-sm text-slate-300 mt-1.5">
                Request your preferred appointment date and time online—our team confirms every reservation personally.
              </p>
            </div>
            <Link
              to="/appointments"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Request an Appointment</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
