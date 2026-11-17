import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Monitor,
  Moon,
  Phone,
  Quote,
  Sparkles,
} from 'lucide-react';
import {
  PATIENT_COMFORT_AMENITIES,
  PRACTICE_IMAGES,
  PRACTICE_INFO,
  TECHNOLOGY_ITEMS,
  VERIFIED_SERVICES,
  VERIFIED_TESTIMONIALS,
} from '../data/practiceData';
import { useDemoStore } from '../store/demoStore';
import { CalendarGrid } from '../components/CalendarGrid';
import { DoctorFeature } from '../components/DoctorFeature';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';

const SERVICE_FILTERS = [
  'All Services',
  'Laser & Technology',
  'Holistic & Restorative',
  'Airway & Cosmetic',
  'Virtual Access',
] as const;

const COMFORT_ICONS = [Sparkles, Monitor, Headphones, Moon];

export function HomePage() {
  const { settings } = useDemoStore();
  const navigate = useNavigate();

  const [serviceFilter, setServiceFilter] =
    useState<(typeof SERVICE_FILTERS)[number]>('All Services');
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [activeComfortIndex, setActiveComfortIndex] = useState(0);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const initialDate = useMemo(() => {
    let d = addDays(new Date(), 1);
    while (!settings.enabledWeekdays.includes(d.getDay())) {
      d = addDays(d, 1);
    }
    return format(d, 'yyyy-MM-dd');
  }, [settings.enabledWeekdays]);

  const [quickDate, setQuickDate] = useState(initialDate);
  const [quickTime, setQuickTime] = useState(settings.sampleTimeSlots[0] || '09:00 AM');
  const [quickService, setQuickService] = useState(VERIFIED_SERVICES[0].slug);

  const filteredServices =
    serviceFilter === 'All Services'
      ? VERIFIED_SERVICES
      : VERIFIED_SERVICES.filter((s) => s.category === serviceFilter);

  const activeTech = TECHNOLOGY_ITEMS[activeTechIndex];
  const activeTechImage = PRACTICE_IMAGES[activeTech.imageKey];
  const activeQuote = VERIFIED_TESTIMONIALS[activeQuoteIndex];

  const handleLaunchWizard = () => {
    const params = new URLSearchParams({
      service: quickService,
      date: quickDate,
      time: quickTime,
    });
    navigate(`/appointments?${params.toString()}`);
  };

  return (
    <>
      <PageMeta
        title="Georgia Holistic Dentist | Dr. Lorie Miller Stevens, DMD, MAGD"
        description="Independent holistic dental practice in Gainesville, Georgia led by Dr. Lorie Miller Stevens, DMD, MAGD. Whole-person dentistry, Waterlase technology, and patient comfort since 1991."
      />

      {/* SECTION 1: CINEMATIC ARCHITECTURAL HERO + OVERLAPPING CREDENTIALS STRIP */}
      <section className="relative bg-[#0E1E38] text-white">
        <div className="relative overflow-hidden">
          {/* Right-Anchored Cinematic Clinic Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[62%] h-[300px] sm:h-[380px] lg:h-full"
          >
            <SafeImage
              src={PRACTICE_IMAGES.heroCinematic.src}
              alt={PRACTICE_IMAGES.heroCinematic.alt}
              className="w-full h-full"
              priority
            />
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0E1E38] via-[#0E1E38]/75 to-transparent"
            />
            <div
              aria-hidden="true"
              className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#0E1E38] via-[#0E1E38]/30 to-transparent"
            />
          </motion.div>

          {/* Hero Editorial Copy */}
          <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-20 lg:pt-24 lg:pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 max-w-2xl"
              >
                <p className="text-xs font-semibold tracking-wider text-[#93B4E5] mb-4">
                  Gainesville, Georgia · {PRACTICE_INFO.doctorName}
                </p>
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[62px] font-semibold text-white leading-[1.06] tracking-tight">
                  Advanced Dentistry.
                  <br />
                  <span className="italic font-normal text-[#93B4E5]">
                    Thoughtful Holistic Care.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                  An independent, doctor-led dental practice dedicated to the connection between oral health and whole-person wellness. Since 1991, Dr. Lorie Miller Stevens has paired biocompatible care and modern laser technology with calm, unhurried visits.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    to="/appointments"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Request an Appointment</span>
                  </Link>
                  <a
                    href={PRACTICE_INFO.phoneHref}
                    className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#93B4E5]" aria-hidden="true" />
                    <span>Call {PRACTICE_INFO.phone}</span>
                  </a>
                </div>
              </motion.div>

              {/* Floating Editorial Location Note on Right */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 lg:flex lg:justify-end"
              >
                <div className="bg-[#0D1A30]/85 backdrop-blur-md border border-white/15 rounded-xl p-5 max-w-xs">
                  <p className="text-[11px] font-semibold tracking-wider text-[#93B4E5]">
                    5129 Cleveland Highway
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">
                    Gainesville, Georgia 30506
                  </p>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Weekday appointments by reservation · Illustrative suite photography
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Overlapping Verified Practice Facts Strip */}
        <div className="relative z-20 bg-white border-b border-[#DCE5F0]">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="lg:-mt-10 bg-white border border-[#DCE5F0] rounded-2xl shadow-lg grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DCE5F0]">
              <div className="p-5 sm:p-6">
                <p className="font-editorial text-xl sm:text-2xl font-semibold text-[#142746]">
                  DMD, MAGD
                </p>
                <p className="text-xs text-[#526075] mt-1">
                  Master in the Academy of General Dentistry
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-editorial text-xl sm:text-2xl font-semibold text-[#142746] tabular-nums">
                  Established 1991
                </p>
                <p className="text-xs text-[#526075] mt-1">
                  Independent Gainesville practice at Quillian’s Corner
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-editorial text-xl sm:text-2xl font-semibold text-[#142746]">
                  Holistic Approach
                </p>
                <p className="text-xs text-[#526075] mt-1">
                  Biocompatible materials, ozone & oral-systemic care
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-editorial text-xl sm:text-2xl font-semibold text-[#142746]">
                  Modern Technology
                </p>
                <p className="text-xs text-[#526075] mt-1">
                  Waterlase® laser, intraoral camera & digital X-rays
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ASYMMETRIC EDITORIAL PRACTICE INTRODUCTION */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Overlapping Layered Dental Photography */}
            <Reveal className="lg:col-span-6">
              <div className="relative pb-12 sm:pr-10">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCE5F0] shadow-md bg-[#EFF5FB]">
                  <SafeImage
                    src={PRACTICE_IMAGES.holisticConsult.src}
                    alt={PRACTICE_IMAGES.holisticConsult.alt}
                    className="w-full h-full"
                  />
                </div>

                <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-0 sm:right-0 sm:w-[52%] aspect-[16/10] rounded-xl overflow-hidden border-4 border-white shadow-xl bg-white">
                  <SafeImage
                    src={PRACTICE_IMAGES.holisticArch.src}
                    alt={PRACTICE_IMAGES.holisticArch.alt}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </Reveal>

            {/* Editorial Copy + Numbered Philosophy */}
            <Reveal delay={0.1} className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="Whole-Person Dental Philosophy"
                title="Dentistry that considers your whole body, not just a single tooth."
                description="At Georgia Holistic Dentist, your mouth is evaluated as a connected biological system. Gum inflammation, aging metal restorations, airway narrowing, and bite imbalance can all influence sleep, comfort, and overall wellness."
              />

              <div className="divide-y divide-[#DCE5F0] border-y border-[#DCE5F0]">
                {[
                  {
                    num: '01.',
                    title: 'Biocompatible & Metal-Free Focus',
                    text: 'Tooth-colored composite bonding, safe amalgam removal protocols, and ozone support.',
                  },
                  {
                    num: '02.',
                    title: 'Chairside Co-Discovery',
                    text: 'Dr. Lorie shares clear intraoral camera and digital X-ray views so every step makes sense.',
                  },
                  {
                    num: '03.',
                    title: 'Airway & Bite Harmony',
                    text: 'Myo=Smile® and TMJ-aware evaluations addressing breathing, arch space, and jaw balance.',
                  },
                ].map((item) => (
                  <div key={item.num} className="py-4 flex gap-4">
                    <span className="font-mono text-xs font-semibold text-[#346CF0] tabular-nums pt-1">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#142746]">{item.title}</h3>
                      <p className="text-sm text-[#526075] mt-0.5 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/holistic-dentistry"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#142746] hover:bg-[#0D1A30] text-white text-sm font-semibold transition-colors"
                >
                  <span>Explore Holistic Approach</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#142746] hover:text-[#346CF0] transition-colors"
                >
                  <span>About Dr. Lorie</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE SERVICES SHOWCASE */}
      <section className="py-24 lg:py-32 bg-[#EFF5FB] border-t border-[#DCE5F0]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <SectionHeading
              eyebrow="Verified Clinical Offerings"
              title="Comprehensive holistic, laser, and restorative services."
              description="Each discipline is tailored to preserve natural tooth structure, minimize chemical or thermal stress, and support lasting comfort."
            />
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#346CF0] hover:text-[#2558D4] whitespace-nowrap shrink-0"
            >
              <span>Explore full service directory</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>

          {/* Interactive Service Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {SERVICE_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setServiceFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  serviceFilter === cat
                    ? 'bg-[#142746] text-white shadow-xs'
                    : 'bg-white text-[#526075] border border-[#DCE5F0] hover:text-[#142746] hover:border-[#6E95CB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Staggered Editorial Grid */}
          <div
            className={`grid grid-cols-1 gap-6 ${
              serviceFilter === 'All Services'
                ? 'md:grid-cols-2 lg:grid-cols-6'
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredServices.map((svc, idx) => {
              const isAll = serviceFilter === 'All Services';
              const isFeatured = isAll && (idx === 0 || idx === filteredServices.length - 1);
              let spanClass = '';
              if (isAll) {
                if (idx === 0) spanClass = 'md:col-span-2 lg:col-span-6';
                else if (idx <= 3) spanClass = 'md:col-span-1 lg:col-span-2';
                else if (idx <= 5) spanClass = 'md:col-span-1 lg:col-span-3';
                else spanClass = 'md:col-span-1 lg:col-span-6';
              }
              return (
                <Reveal
                  key={`${serviceFilter}-${svc.slug}`}
                  delay={Math.min(idx * 0.05, 0.25)}
                  className={spanClass}
                >
                  <ServiceCard service={svc} featured={isFeatured} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: DR. LORIE MILLER STEVENS */}
      <DoctorFeature />

      {/* SECTION 5: DARK NAVY INTERACTIVE TECHNOLOGY FEATURE */}
      <section className="py-24 lg:py-32 bg-[#142746] text-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <SectionHeading
              theme="dark"
              eyebrow="Precision Without Unnecessary Trauma"
              title="Advanced dental technology designed for gentler care."
              description="Select any clinical technology below to inspect how Dr. Lorie applies modern diagnostics and Waterlase® HydroPhotonics™."
            />
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
            >
              <span>All Technology Details</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Interactive Technology Selector */}
            <div className="lg:col-span-5 divide-y divide-white/10 border-y border-white/10">
              {TECHNOLOGY_ITEMS.map((tech, idx) => {
                const active = idx === activeTechIndex;
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => setActiveTechIndex(idx)}
                    className={`w-full text-left py-4 px-4 transition-colors rounded-lg my-1 ${
                      active ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span className="font-mono text-[11px] text-[#93B4E5] tabular-nums mr-2">
                          0{idx + 1}.
                        </span>
                        <span className="text-base font-semibold text-white">{tech.name}</span>
                      </div>
                      <span className="text-xs text-[#93B4E5] shrink-0 hidden sm:inline">
                        {tech.subtitle}
                      </span>
                    </div>
                    {active && (
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                        {tech.summary}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Cross-Fading Clinical Photography */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-[#0D1A30] shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTech.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <SafeImage
                      src={activeTechImage.src}
                      alt={activeTechImage.alt}
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D1A30]/95 via-[#0D1A30]/55 to-transparent p-6">
                  <p className="text-xs font-semibold text-[#93B4E5]">{activeTech.subtitle}</p>
                  <p className="font-editorial text-xl font-semibold text-white mt-0.5">
                    {activeTech.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PATIENT COMFORT AMENITIES */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <Reveal className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DCE5F0] shadow-md bg-[#EFF5FB]">
                <SafeImage
                  src={PRACTICE_IMAGES.comfortMedia.src}
                  alt={PRACTICE_IMAGES.comfortMedia.alt}
                  className="w-full h-full"
                />
              </div>
              <p className="mt-3 text-xs text-[#526075]">
                Illustrative clinical comfort operatory showing overhead media screen, wireless headphones, and warm low-level lighting.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 space-y-6">
              <SectionHeading
                eyebrow="Anxiety-Aware Dental Experience"
                title="Thoughtful comfort amenities built into the treatment chair."
                description="Patients who carry past dental anxiety discover a noticeably calmer pace in Gainesville—without losing modern clinical precision."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PATIENT_COMFORT_AMENITIES.map((item, idx) => {
                  const Icon = COMFORT_ICONS[idx % COMFORT_ICONS.length];
                  const active = idx === activeComfortIndex;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveComfortIndex(idx)}
                      className={`text-left p-5 rounded-xl border transition-all ${
                        active
                          ? 'bg-[#EFF5FB] border-[#346CF0] shadow-xs'
                          : 'bg-white border-[#DCE5F0] hover:border-[#6E95CB]'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-3 ${active ? 'text-[#346CF0]' : 'text-[#142746]'}`}
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold text-[#142746]">{item.title}</h3>
                      <p className="mt-1.5 text-xs text-[#526075] leading-relaxed">{item.detail}</p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  to="/patient-comfort"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#346CF0] hover:text-[#2558D4]"
                >
                  <span>Explore the patient comfort experience</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 7 & 8: HOW APPOINTMENT REQUESTS WORK + INTERACTIVE CALENDAR LAUNCHER */}
      <section className="py-24 lg:py-32 bg-[#EFF5FB] border-y border-[#DCE5F0]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 5 cols: 3-Step Connected Process */}
            <Reveal className="lg:col-span-5 space-y-8">
              <SectionHeading
                eyebrow="Simple Request Workflow"
                title="How appointment requests work."
                description="Because Dr. Lorie dedicates unhurried weekday appointments to each patient, all online requests require personal confirmation by our clinic team."
              />

              <ol className="space-y-6 relative">
                {[
                  {
                    step: '01.',
                    title: 'Choose your visit',
                    text: 'Select new or existing patient status, in-office or Zoom virtual consultation, and your treatment focus.',
                  },
                  {
                    step: '02.',
                    title: 'Select preferred date and time',
                    text: 'Pick a weekday preference on the interactive calendar along with an optional alternate date.',
                  },
                  {
                    step: '03.',
                    title: 'Send your request',
                    text: 'Submit your preferences to receive a reference number. Our coordinator confirms your exact slot directly.',
                  },
                ].map((item) => (
                  <li
                    key={item.step}
                    className="p-5 rounded-xl bg-white border border-[#DCE5F0] flex gap-4 shadow-2xs"
                  >
                    <span className="font-mono text-sm font-semibold text-[#346CF0] tabular-nums pt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[#142746]">{item.title}</h3>
                      <p className="text-sm text-[#526075] mt-1 leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="p-4 rounded-xl bg-[#142746] text-white text-xs leading-relaxed">
                <span className="text-[#93B4E5] font-semibold">Interactive Proposal Demo:</span>{' '}
                Submit a sample request on the right and immediately manage it inside our{' '}
                <Link to="/staff-demo" className="underline font-semibold text-white">
                  Staff Management Demo →
                </Link>
              </div>
            </Reveal>

            {/* Right 7 cols: Real Interactive Calendar Preview */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="bg-white border border-[#DCE5F0] rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#DCE5F0]">
                  <div>
                    <p className="text-xs font-semibold text-[#346CF0]">
                      Interactive Calendar Preview
                    </p>
                    <h3 className="font-editorial text-2xl font-semibold text-[#142746] mt-0.5">
                      Start Your Appointment Request
                    </h3>
                  </div>
                  <span className="text-xs text-[#526075] inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#346CF0]" />
                    <span>Requires clinic confirmation</span>
                  </span>
                </div>

                <div data-native-cursor="true">
                  <label
                    htmlFor="home-service-select"
                    className="block text-xs font-semibold text-[#142746] mb-1.5"
                  >
                    Select Service Focus
                  </label>
                  <select
                    id="home-service-select"
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white"
                  >
                    {VERIFIED_SERVICES.map((svc) => (
                      <option key={svc.slug} value={svc.slug}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7">
                    <CalendarGrid
                      selectedDate={quickDate}
                      onSelectDate={setQuickDate}
                      enabledWeekdays={settings.enabledWeekdays}
                    />
                  </div>
                  <div className="md:col-span-5 space-y-3" data-native-cursor="true">
                    <p className="text-xs font-semibold text-[#142746]">Sample Time Preference</p>
                    <div className="space-y-2">
                      {settings.sampleTimeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setQuickTime(slot)}
                          className={`w-full px-3.5 py-2.5 rounded-lg border text-xs font-semibold tabular-nums flex items-center justify-between transition-all ${
                            quickTime === slot
                              ? 'bg-[#346CF0] border-[#346CF0] text-white shadow-xs'
                              : 'bg-white border-[#DCE5F0] text-[#142746] hover:bg-[#EFF5FB]'
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {slot}
                          </span>
                          <span>{quickTime === slot ? 'Selected' : 'Select'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE5F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#526075] tabular-nums">
                    Selected: <strong className="text-[#142746]">{quickDate}</strong> at{' '}
                    <strong className="text-[#142746]">{quickTime}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={handleLaunchWizard}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors shadow-xs"
                  >
                    <span>Continue Appointment Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 9: VERIFIED PATIENT TESTIMONIALS SPOTLIGHT */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Editorial Spotlight Quote Switcher */}
            <Reveal className="lg:col-span-7 space-y-8">
              <SectionHeading
                eyebrow="Verified Patient Voices"
                title="Trusted words from patients in Gainesville."
                description="Authentic quotations published directly on georgiaholisticdentist.com—no fabricated review totals or synthetic ratings."
              />

              <div className="bg-[#F5F2ED] border border-[#DCE5F0] rounded-2xl p-7 sm:p-10 min-h-[280px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQuote.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5"
                  >
                    <Quote className="w-8 h-8 text-[#346CF0]" aria-hidden="true" />
                    <blockquote className="font-editorial text-xl sm:text-2xl text-[#142746] leading-relaxed">
                      “{activeQuote.quote}”
                    </blockquote>
                    <div className="pt-4 border-t border-[#142746]/10">
                      <p className="text-sm font-semibold text-[#142746]">
                        {activeQuote.attribution}
                      </p>
                      <p className="text-xs text-[#526075] mt-0.5">
                        {activeQuote.context} · {activeQuote.sourceLabel}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 pt-4 border-t border-[#142746]/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveQuoteIndex((i) =>
                          i === 0 ? VERIFIED_TESTIMONIALS.length - 1 : i - 1
                        )
                      }
                      aria-label="Previous testimonial"
                      className="w-9 h-9 rounded-lg bg-white border border-[#DCE5F0] inline-flex items-center justify-center text-[#142746] hover:border-[#346CF0]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveQuoteIndex((i) => (i + 1) % VERIFIED_TESTIMONIALS.length)
                      }
                      aria-label="Next testimonial"
                      className="w-9 h-9 rounded-lg bg-white border border-[#DCE5F0] inline-flex items-center justify-center text-[#142746] hover:border-[#346CF0]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="ml-2 font-mono text-xs text-[#526075] tabular-nums">
                      0{activeQuoteIndex + 1} / 0{VERIFIED_TESTIMONIALS.length}
                    </span>
                  </div>

                  <Link
                    to="/testimonials"
                    className="text-xs font-semibold text-[#346CF0] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read all quotes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right: Verified Practice Quote Index (No Fictional Patient Portraits) */}
            <Reveal delay={0.1} className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold tracking-wider text-[#526075] uppercase">
                  Select a Verified Quote
                </p>
                <span className="font-mono text-xs text-[#346CF0] tabular-nums">
                  {VERIFIED_TESTIMONIALS.length} Published Reviews
                </span>
              </div>

              {VERIFIED_TESTIMONIALS.map((item, idx) => {
                const isSelected = idx === activeQuoteIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveQuoteIndex(idx)}
                    className={`w-full text-left p-5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#142746] border-[#142746] text-white shadow-md'
                        : 'bg-[#EFF5FB]/55 border-[#DCE5F0] text-[#142746] hover:border-[#346CF0]/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{item.attribution}</p>
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          isSelected ? 'text-[#93B4E5]' : 'text-[#526075]'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isSelected ? 'text-[#93B4E5]' : 'text-[#346CF0]'
                      }`}
                    >
                      {item.context}
                    </p>
                    <p
                      className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-slate-200' : 'text-[#526075]'
                      }`}
                    >
                      “{item.quote}”
                    </p>
                  </button>
                );
              })}
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 10: CINEMATIC TWILIGHT FINAL CTA */}
      <section className="relative py-24 lg:py-32 bg-[#0D1A30] overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage
            src={PRACTICE_IMAGES.finalCta.src}
            alt={PRACTICE_IMAGES.finalCta.alt}
            className="w-full h-full"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0D1A30]/95 via-[#0D1A30]/82 to-[#0D1A30]/60"
          />
        </div>

        <Reveal className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-[#93B4E5] mb-3">
              {PRACTICE_INFO.fullAddress} · {PRACTICE_INFO.phone}
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[48px] font-semibold text-white leading-[1.12]">
              Ready for dental care centered on your total wellness?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed">
              Submit an in-office or Zoom virtual appointment request with Dr. Lorie Miller Stevens—or step inside the Staff Management Demo to inspect how the front desk coordinates confirmations and schedules.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Request an Appointment</span>
              </Link>
              <Link
                to="/staff-demo"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-white/12 hover:bg-white/22 border border-white/25 text-white text-sm font-semibold transition-colors"
              >
                <span>Explore Staff Management Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
