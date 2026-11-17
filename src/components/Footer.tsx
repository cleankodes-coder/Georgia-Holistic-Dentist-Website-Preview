import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { PRACTICE_INFO, VERIFIED_SERVICES } from '../data/practiceData';

export function Footer() {
  return (
    <footer className="bg-[#142746] text-white border-t border-white/10">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Practice Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 font-editorial text-xl font-semibold text-white">
              <span className="w-7 h-7 rounded-md bg-white text-[#142746] inline-flex items-center justify-center text-xs font-sans font-bold">
                GH
              </span>
              <span>{PRACTICE_INFO.name}</span>
            </Link>
            <p className="text-xs text-[#93B4E5] font-medium">
              {PRACTICE_INFO.doctorName} · Temporary Editorial Wordmark
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Independent, doctor-led holistic dental practice in Gainesville, Georgia dedicated to whole-person wellness, biocompatible materials, and calm patient comfort since 1991.
            </p>
            <div className="pt-2 space-y-2 text-sm text-slate-200">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#6E95CB] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{PRACTICE_INFO.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6E95CB] shrink-0" aria-hidden="true" />
                <a href={PRACTICE_INFO.phoneHref} className="hover:text-white underline-offset-4 hover:underline tabular-nums">
                  {PRACTICE_INFO.phone}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#6E95CB] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{PRACTICE_INFO.hoursPolicy}</span>
              </p>
            </div>
          </div>

          {/* Practice Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#93B4E5]">Practice</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Meet Dr. Lorie</Link></li>
              <li><Link to="/holistic-dentistry" className="hover:text-white transition-colors">Holistic Approach</Link></li>
              <li><Link to="/technology" className="hover:text-white transition-colors">Dental Technology</Link></li>
              <li><Link to="/patient-comfort" className="hover:text-white transition-colors">Patient Comfort</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-[#93B4E5]">Verified Services</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {VERIFIED_SERVICES.map((svc) => (
                <li key={svc.slug}>
                  <Link to={`/services/${svc.slug}`} className="hover:text-white transition-colors">
                    {svc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scheduling & Staff Demo Access */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-[#93B4E5]">Appointments & Access</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/appointments" className="hover:text-white transition-colors">Request an Appointment</Link></li>
              <li><Link to="/virtual-consultations" className="hover:text-white transition-colors">Virtual Consultations</Link></li>
              <li><Link to="/patient-resources" className="hover:text-white transition-colors">Patient Resources & FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Directions</Link></li>
            </ul>

            <div className="pt-3 border-t border-white/10">
              <Link
                to="/staff-demo"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-lg transition-colors"
              >
                <span>Staff Management Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Pre-sales interactive demonstration. Simulated scheduling uses sample data stored locally in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Verification Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {PRACTICE_INFO.name} · Gainesville, Georgia. Practice proposal demonstration.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/patient-resources#verification-report" className="hover:text-white transition-colors">
              Content & Asset Verification Report
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/staff-demo" className="hover:text-white transition-colors">
              Staff Demo Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
