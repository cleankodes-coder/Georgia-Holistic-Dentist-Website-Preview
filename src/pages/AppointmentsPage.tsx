import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Info, Phone } from 'lucide-react';
import { PRACTICE_INFO } from '../data/practiceData';
import { AppointmentWizard } from '../components/AppointmentWizard';
import { PageMeta } from '../components/PageMeta';

export function AppointmentsPage() {
  const [searchParams] = useSearchParams();
  const initialServiceSlug = searchParams.get('service') || undefined;
  const initialDate = searchParams.get('date') || undefined;
  const initialTime = searchParams.get('time') || undefined;

  return (
    <>
      <PageMeta
        title="Request an Appointment (Interactive Demo) | Georgia Holistic Dentist"
        description="Interactive 5-step appointment request demonstration for Georgia Holistic Dentist in Gainesville, GA."
      />

      <section className="bg-[#EFF5FB] border-b border-[#DCE5F0] py-10 lg:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#346CF0] mb-2">
                {PRACTICE_INFO.name} · Gainesville, Georgia
              </p>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#142746] leading-tight">
                Appointment Request Demo
              </h1>
              <p className="mt-3 text-base text-[#526075] max-w-2xl">
                Choose your visit focus, pick a preferred weekday date and sample time, and submit a demo request to watch it flow directly into the Staff Management Dashboard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={PRACTICE_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#DCE5F0] text-xs font-semibold text-[#142746] tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#346CF0]" />
                <span>Call {PRACTICE_INFO.phone}</span>
              </a>
              <Link
                to="/staff-demo"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#142746] text-white text-xs font-semibold"
              >
                <span>Open Staff Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <AppointmentWizard
            initialServiceSlug={initialServiceSlug}
            initialDate={initialDate}
            initialTime={initialTime}
            compactHeader
          />

          <div className="p-4 rounded-xl bg-[#F5F2ED] border border-[#DCE5F0] flex items-start gap-3 text-xs text-[#526075]">
            <Info className="w-4 h-4 text-[#142746] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              This workflow uses fictional sample profiles and local browser persistence for demonstration only. For actual dental scheduling with {PRACTICE_INFO.doctorName}, please call{' '}
              <a href={PRACTICE_INFO.phoneHref} className="text-[#142746] font-semibold underline tabular-nums">
                {PRACTICE_INFO.phone}
              </a>
              .
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
