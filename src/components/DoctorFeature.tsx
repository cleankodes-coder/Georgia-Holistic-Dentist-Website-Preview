import { Link } from 'react-router-dom';
import { ArrowRight, Award, GraduationCap, ShieldCheck } from 'lucide-react';
import { PRACTICE_IMAGES, PRACTICE_INFO } from '../data/practiceData';
import { Reveal } from './Reveal';
import { SafeImage } from './SafeImage';

export function DoctorFeature() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F2ED] border-y border-[#DCE5F0]/80">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Sunlit Practice Operatory + Reserved Official Portrait Notice */}
          <Reveal className="lg:col-span-5">
            <div className="relative pb-12 sm:pr-8">
              <div className="aspect-[4/4.3] rounded-2xl overflow-hidden border border-[#DCE5F0] bg-white shadow-md">
                <SafeImage
                  src={PRACTICE_IMAGES.heroSuite.src}
                  alt={PRACTICE_IMAGES.heroSuite.alt}
                  className="w-full h-full"
                />
              </div>

              <div className="sm:absolute sm:bottom-0 sm:right-0 sm:max-w-[330px] mt-4 sm:mt-0 bg-[#142746] text-white rounded-xl p-6 shadow-xl border border-white/10">
                <p className="font-mono text-[11px] text-[#93B4E5] tracking-wider tabular-nums">
                  ESTABLISHED 1991 · GAINESVILLE, GA
                </p>
                <p className="font-editorial text-lg font-semibold mt-1.5 leading-snug">
                  Over three decades of independent, doctor-led holistic care.
                </p>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Official clinician portrait reserved for Dr. Lorie Miller Stevens’ verified clinic photograph—no stock portrait substituted.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Editorial Biography & Verified Milestones */}
          <Reveal delay={0.1} className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-wider text-[#346CF0] mb-3">
              Meet the Doctor
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#142746] leading-[1.12] tracking-tight">
              {PRACTICE_INFO.doctorName}
            </h2>
            <p className="mt-5 text-base sm:text-[17px] text-[#1B2637] leading-relaxed">
              Dr. Lorie Miller Stevens began her clinical career as a dental hygienist before graduating from the Medical College of Georgia School of Dentistry in 1988. In 1991, she founded her independent practice at Quillian’s Corner in Gainesville, Georgia.
            </p>
            <p className="mt-4 text-base text-[#526075] leading-relaxed">
              Inspired by her own personal health journey, she dedicated her practice to whole-person holistic dentistry—examining how biocompatible materials, gum inflammation, bite balance, and airway health influence systemic wellness. She holds Mastership in the Academy of General Dentistry (MAGD), served on the Board of Directors of the IAOMT, and is a Past President and Chairman of the Board of the Holistic Dental Association.
            </p>

            {/* Verified Milestones Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-7 border-t border-[#142746]/12">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#142746] font-semibold text-sm">
                  <GraduationCap className="w-4 h-4 text-[#346CF0]" aria-hidden="true" />
                  <span>MCG Class of 1988</span>
                </div>
                <p className="text-xs text-[#526075] leading-relaxed">
                  Dental hygienist roots & Doctor of Dental Medicine
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#142746] font-semibold text-sm">
                  <Award className="w-4 h-4 text-[#346CF0]" aria-hidden="true" />
                  <span>MAGD Distinction</span>
                </div>
                <p className="text-xs text-[#526075] leading-relaxed">
                  Master in the Academy of General Dentistry
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#142746] font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#346CF0]" aria-hidden="true" />
                  <span>IAOMT & HDA</span>
                </div>
                <p className="text-xs text-[#526075] leading-relaxed">
                  Board leadership in biological & holistic dentistry
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#142746] hover:bg-[#0D1A30] text-white text-sm font-semibold transition-colors"
              >
                <span>Read Dr. Lorie’s Full Biography</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-[#DCE5F0] hover:border-[#142746] text-[#142746] text-sm font-semibold transition-colors"
              >
                <span>Request a Visit</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
