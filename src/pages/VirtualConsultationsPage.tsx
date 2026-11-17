import { Link } from 'react-router-dom';
import { Calendar, Camera, FileImage, Video } from 'lucide-react';
import { PRACTICE_IMAGES } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export function VirtualConsultationsPage() {
  return (
    <>
      <PageMeta
        title="Virtual Consultations (Zoom) | Georgia Holistic Dentist"
        description="Connect with Dr. Lorie Miller Stevens via Zoom before traveling to Gainesville. Learn how to prepare dental photos and X-rays for a virtual consultation."
      />

      <InnerHero
        eyebrow="Remote Holistic Guidance"
        title="Virtual Consultations With Dr. Lorie via Zoom"
        description="Ideal for out-of-town patients, exploratory second opinions, or preliminary holistic questions prior to scheduling an in-office visit in Gainesville."
        imageSrc={PRACTICE_IMAGES.virtualConsult.src}
        imageAlt={PRACTICE_IMAGES.virtualConsult.alt}
        primaryActionLabel="Request Virtual Consultation"
        primaryActionTo="/appointments?service=virtual-consultations"
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="How Virtual Visits Work"
              title="Preparing for a productive Zoom consultation."
              description="Georgia Holistic Dentist structures focused virtual Zoom sessions (10-minute and 15-minute tiers) so patients traveling from outside Gainesville can receive meaningful preliminary insight."
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.04} className="p-6 rounded-2xl bg-[#EFF5FB]/60 border border-[#DCE5F0] space-y-3">
              <FileImage className="w-6 h-6 text-[#346CF0]" />
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                01. Share Recent X-Rays
              </h3>
              <p className="text-sm text-[#526075] leading-relaxed">
                Patients are asked to email recent dental X-rays of any problem areas ahead of the virtual session so Dr. Lorie can review diagnostic context in advance.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="p-6 rounded-2xl bg-[#EFF5FB]/60 border border-[#DCE5F0] space-y-3">
              <Camera className="w-6 h-6 text-[#346CF0]" />
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                02. Provide Clear Tooth Photos
              </h3>
              <p className="text-sm text-[#526075] leading-relaxed">
                Clear smartphone or digital photos of your smile and specific teeth help Dr. Lorie offer targeted holistic guidance during your allotted Zoom time.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="p-6 rounded-2xl bg-[#EFF5FB]/60 border border-[#DCE5F0] space-y-3">
              <Video className="w-6 h-6 text-[#346CF0]" />
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                03. Focused Zoom Discussion
              </h3>
              <p className="text-sm text-[#526075] leading-relaxed">
                Discuss holistic priorities such as safe amalgam removal, Myo=Smile® airway goals, or biocompatible restorations before planning travel to North Georgia.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#142746] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-editorial text-2xl font-semibold">
                Request a simulated virtual consultation in the booking demo
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Select “Virtual Consultations (Zoom)” in the interactive wizard to see how virtual visits appear on the Staff Demo calendar.
              </p>
            </div>
            <Link
              to="/appointments?service=virtual-consultations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Start Virtual Request</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
