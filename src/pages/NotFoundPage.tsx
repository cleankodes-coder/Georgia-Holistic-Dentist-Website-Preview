import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page Not Found | Georgia Holistic Dentist"
        description="The requested page could not be found."
      />
      <section className="py-24 lg:py-32 bg-[#EFF5FB] border-b border-[#DCE5F0]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <p className="font-mono text-sm font-semibold text-[#346CF0]">404</p>
          <h1 className="font-editorial text-4xl font-semibold text-[#142746]">
            Page not found
          </h1>
          <p className="text-base text-[#526075] leading-relaxed">
            We could not find the page you requested. Return to the Georgia Holistic Dentist homepage or begin an appointment request.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#142746] text-white text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#346CF0] text-white text-sm font-semibold"
            >
              <Calendar className="w-4 h-4" />
              <span>Request Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
