import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Phone, Video } from 'lucide-react';
import { PRACTICE_IMAGES, PRACTICE_INFO, VERIFIED_SERVICES } from '../data/practiceData';
import { PageMeta } from '../components/PageMeta';
import { SafeImage } from '../components/SafeImage';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = VERIFIED_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <section className="py-24 max-w-2xl mx-auto px-4 text-center space-y-5">
        <h1 className="font-editorial text-3xl font-semibold text-[#142746]">
          Service not found
        </h1>
        <p className="text-[#526075]">
          The requested treatment page could not be located. Explore all verified services below.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#142746] text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View All Services</span>
        </Link>
      </section>
    );
  }

  const image = PRACTICE_IMAGES[service.imageKey];
  const related = VERIFIED_SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageMeta
        title={`${service.title} | Georgia Holistic Dentist`}
        description={service.summary}
      />

      {/* Service Hero */}
      <section className="bg-[#EFF5FB] border-b border-[#DCE5F0] py-12 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526075] hover:text-[#142746] mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#346CF0]">
                <span>{service.number}.</span>
                <span aria-hidden="true">·</span>
                <span>{service.category}</span>
                {service.supportsVirtual && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" />
                      Virtual option available
                    </span>
                  </>
                )}
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#142746] leading-[1.12]">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-[#526075] leading-relaxed">
                {service.tagline}
              </p>

              <div className="pt-2 flex flex-wrap gap-3.5">
                <Link
                  to={`/appointments?service=${service.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request This Service</span>
                </Link>
                <a
                  href={PRACTICE_INFO.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#DCE5F0] text-[#142746] text-sm font-semibold hover:border-[#142746] tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#346CF0]" />
                  <span>{PRACTICE_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-[#DCE5F0] bg-white shadow-sm">
                <SafeImage src={image.src} alt={service.imageAlt} className="w-full h-full" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Clinical Overview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#142746]">
                Clinical Overview
              </h2>
              <p className="mt-3 text-base text-[#1B2637] leading-relaxed">
                {service.overview}
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#F5F2ED] border border-[#DCE5F0]">
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                The Holistic Perspective
              </h3>
              <p className="mt-2.5 text-base text-[#526075] leading-relaxed">
                {service.holisticPerspective}
              </p>
            </div>

            <div>
              <h3 className="font-editorial text-xl font-semibold text-[#142746] mb-4">
                Key Care Highlights
              </h3>
              <ul className="space-y-3">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm sm:text-base text-[#1B2637]">
                    <CheckCircle2 className="w-5 h-5 text-[#346CF0] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#EFF5FB] border border-[#DCE5F0] space-y-4">
              <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                Who This Visit Helps
              </h3>
              <ul className="space-y-2.5 text-sm text-[#1B2637]">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#346CF0] font-semibold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#142746] text-white space-y-4">
              <h3 className="font-editorial text-xl font-semibold">
                Schedule With Dr. Lorie
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Weekday appointments are scheduled by reservation. Submit your preferred time in our interactive demo wizard—clinic staff confirm every visit directly.
              </p>
              <Link
                to={`/appointments?service=${service.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
              >
                <span>Request {service.shortTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#EFF5FB]/60 border-t border-[#DCE5F0]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="font-editorial text-2xl font-semibold text-[#142746] mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="p-6 rounded-xl bg-white border border-[#DCE5F0] hover:border-[#346CF0] transition-colors flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-[#346CF0]">
                    {item.number}. · {item.category}
                  </p>
                  <h3 className="font-editorial text-lg font-semibold text-[#142746] mt-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#526075] mt-2 leading-relaxed">{item.summary}</p>
                </div>
                <span className="mt-4 text-xs font-semibold text-[#142746] inline-flex items-center gap-1">
                  <span>View details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#346CF0]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
