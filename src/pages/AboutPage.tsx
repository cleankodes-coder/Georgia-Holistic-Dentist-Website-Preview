import { Link } from 'react-router-dom';
import { ArrowRight, Award, Calendar, GraduationCap, HeartHandshake, MapPin } from 'lucide-react';
import { DOCTOR_CREDENTIALS, PRACTICE_IMAGES, PRACTICE_INFO } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="Meet Dr. Lorie Miller Stevens, DMD, MAGD | Georgia Holistic Dentist"
        description="Learn about Dr. Lorie Miller Stevens' education at the Medical College of Georgia, her 1991 Gainesville practice founding, MAGD distinction, and IAOMT/HDA leadership."
      />

      <InnerHero
        eyebrow="Independent Doctor-Led Practice"
        title="Meet Dr. Lorie Miller Stevens, DMD, MAGD"
        description="Serving North Georgia since 1991 with a distinctive blend of general dental mastery, biological awareness, and unhurried personal care."
        imageSrc={PRACTICE_IMAGES.holisticConsult.src}
        imageAlt={PRACTICE_IMAGES.holisticConsult.alt}
        primaryActionLabel="Request a Consultation"
        primaryActionTo="/appointments"
        secondaryActionLabel="Explore Holistic Approach"
        secondaryActionTo="/holistic-dentistry"
      />

      {/* Verified Credentials Grid */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Verified Background & Distinctions"
              title="Decades of clinical education and holistic leadership."
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTOR_CREDENTIALS.map((cred, idx) => (
              <Reveal
                key={cred.label}
                delay={idx * 0.06}
                className="p-6 rounded-2xl bg-[#EFF5FB]/65 border border-[#DCE5F0] space-y-2"
              >
                <p className="text-xs font-semibold text-[#346CF0]">{cred.label}</p>
                <p className="font-editorial text-2xl font-semibold text-[#142746]">
                  {cred.value}
                </p>
                <p className="text-sm text-[#526075] leading-relaxed">{cred.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Biography & Personal Philosophy */}
      <section className="py-20 lg:py-28 bg-[#F5F2ED] border-y border-[#DCE5F0]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-6 space-y-5">
              <SectionHeading
                eyebrow="Clinical Journey"
                title="From dental hygienist to holistic dental pioneer in Gainesville."
              />
              <p className="text-base text-[#1B2637] leading-relaxed">
                Before earning her Doctor of Dental Medicine degree from the Medical College of Georgia School of Dentistry in 1988, Dr. Lorie Miller Stevens trained and worked as a dental hygienist—an early foundation that shaped her lifelong commitment to preventive care and gentle chairside communication.
              </p>
              <p className="text-base text-[#526075] leading-relaxed">
                In 1991, she built her independent dental office at Quillian’s Corner in North Hall County, establishing what is now known as Georgia Holistic Dentist on Cleveland Highway in Gainesville. Inspired personally by her own health journey, she sought deeper answers about how dental materials, periodontal bacteria, and jaw alignment influence overall systemic wellness.
              </p>
              <p className="text-base text-[#526075] leading-relaxed">
                Alongside earning Mastership in the Academy of General Dentistry (MAGD), Dr. Lorie has served on the Board of Directors for the International Academy of Oral Medicine and Toxicology (IAOMT) and as Past President and Chairman of the Board of the Holistic Dental Association (HDA).
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/appointments"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request an Appointment</span>
                </Link>
                <Link
                  to="/services/myo-smile-tmj"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#DCE5F0] text-[#142746] text-sm font-semibold hover:border-[#142746]"
                >
                  <span>Explore Myo=Smile® Program</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 space-y-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCE5F0] bg-white shadow-md">
                <SafeImage
                  src={PRACTICE_IMAGES.heroSuite.src}
                  alt={PRACTICE_IMAGES.heroSuite.alt}
                  className="w-full h-full"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1A30]/90 via-[#0D1A30]/55 to-transparent p-5 text-white">
                  <p className="font-mono text-[11px] text-[#93B4E5] tracking-wider uppercase">
                    Official Portrait Slot Reserved
                  </p>
                  <p className="text-xs text-slate-200 mt-1">
                    Space reserved for Dr. Lorie Miller Stevens’ verified clinic photograph—no stock or substitute portrait shown.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-[#DCE5F0] rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#346CF0] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#142746]">Single Independent Office</p>
                    <p className="text-xs text-[#526075] mt-0.5">{PRACTICE_INFO.fullAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-4 h-4 text-[#346CF0] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#142746]">Doctor-Led Continuity</p>
                    <p className="text-xs text-[#526075] mt-0.5">
                      Every visit is guided directly by Dr. Lorie’s holistic care philosophy.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Associations & Commitment */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal className="p-7 rounded-2xl border border-[#DCE5F0]">
              <GraduationCap className="w-6 h-6 text-[#346CF0] mb-4" />
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                Academy of General Dentistry (MAGD)
              </h3>
              <p className="mt-2 text-sm text-[#526075] leading-relaxed">
                Mastership reflects hundreds of hours of rigorous continuing education across restorative, preventive, and diagnostic dental disciplines.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="p-7 rounded-2xl border border-[#DCE5F0]">
              <Award className="w-6 h-6 text-[#346CF0] mb-4" />
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                IAOMT Board Leadership
              </h3>
              <p className="mt-2 text-sm text-[#526075] leading-relaxed">
                Active leadership within the International Academy of Oral Medicine and Toxicology supporting safe biocompatible protocols and mercury vapor protection.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="p-7 rounded-2xl border border-[#DCE5F0]">
              <HeartHandshake className="w-6 h-6 text-[#346CF0] mb-4" />
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                Holistic Dental Association
              </h3>
              <p className="mt-2 text-sm text-[#526075] leading-relaxed">
                Past President and Chairman of the Board dedicated to advancing whole-person, non-toxic dental care nationwide.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
