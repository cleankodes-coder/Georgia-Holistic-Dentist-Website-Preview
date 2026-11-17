import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X, Calendar, ArrowRight } from 'lucide-react';
import { PRACTICE_INFO, VERIFIED_SERVICES } from '../data/practiceData';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 ${
      isActive
        ? 'text-[#142746] border-[#346CF0]'
        : 'text-[#526075] border-transparent hover:text-[#142746] hover:border-[#6E95CB]/50'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#DCE5F0] shadow-sm'
          : 'bg-white/95 backdrop-blur-xs border-b border-[#DCE5F0]/70'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 h-[74px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Wordmark */}
        <Link
          to="/"
          className="font-editorial text-lg sm:text-xl font-semibold tracking-tight text-[#142746] whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
          aria-label="Georgia Holistic Dentist — Return to Home"
        >
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-md bg-[#142746] group-hover:bg-[#346CF0] transition-colors text-white inline-flex items-center justify-center text-xs font-sans font-semibold tracking-tight shrink-0"
          >
            GH
          </span>
          <span>{PRACTICE_INFO.name}</span>
        </Link>

        {/* Zone 2: Concise Single-Line Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary Navigation">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {/* Animated Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 ${
                location.pathname.startsWith('/services') ||
                location.pathname === '/holistic-dentistry' ||
                location.pathname === '/patient-comfort' ||
                location.pathname === '/virtual-consultations'
                  ? 'text-[#142746] border-[#346CF0]'
                  : 'text-[#526075] border-transparent hover:text-[#142746]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full mt-3 w-[560px] bg-white border border-[#DCE5F0] rounded-2xl shadow-xl p-5 grid grid-cols-2 gap-5 z-50"
                >
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider text-[#526075] mb-2.5 px-2.5">
                      Clinical Services
                    </p>
                    <ul className="space-y-1">
                      {VERIFIED_SERVICES.map((svc) => (
                        <li key={svc.slug}>
                          <Link
                            to={`/services/${svc.slug}`}
                            className="flex items-center justify-between px-2.5 py-2 rounded-lg text-[13px] font-medium text-[#1B2637] hover:bg-[#EFF5FB] hover:text-[#142746] transition-colors"
                          >
                            <span>{svc.shortTitle}</span>
                            <span className="font-mono text-[11px] text-[#6E95CB]">{svc.number}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-l border-[#DCE5F0] pl-5 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-[#526075] mb-2.5 px-2.5">
                        Practice Pillars
                      </p>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            to="/services"
                            className="block px-2.5 py-1.5 rounded-lg text-[13px] font-medium text-[#1B2637] hover:bg-[#EFF5FB]"
                          >
                            All Services Overview
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/holistic-dentistry"
                            className="block px-2.5 py-1.5 rounded-lg text-[13px] font-medium text-[#1B2637] hover:bg-[#EFF5FB]"
                          >
                            Holistic Approach
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/patient-comfort"
                            className="block px-2.5 py-1.5 rounded-lg text-[13px] font-medium text-[#1B2637] hover:bg-[#EFF5FB]"
                          >
                            Patient Comfort
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/virtual-consultations"
                            className="block px-2.5 py-1.5 rounded-lg text-[13px] font-medium text-[#1B2637] hover:bg-[#EFF5FB]"
                          >
                            Virtual Consultations
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/patient-resources"
                            className="block px-2.5 py-1.5 rounded-lg text-[13px] font-medium text-[#1B2637] hover:bg-[#EFF5FB]"
                          >
                            Patient Resources & FAQs
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <Link
                      to="/appointments"
                      className="mt-4 inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#142746] text-white text-xs font-semibold hover:bg-[#346CF0] transition-colors"
                    >
                      <span>Start Appointment Request</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/holistic-dentistry" className={navLinkClass}>
            Holistic Approach
          </NavLink>
          <NavLink to="/technology" className={navLinkClass}>
            Technology
          </NavLink>
          <NavLink to="/testimonials" className={navLinkClass}>
            Testimonials
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/appointments"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-[13px] font-semibold transition-all whitespace-nowrap shrink-0 shadow-xs hover:shadow-sm"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Request Appointment</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#DCE5F0] text-[#142746] hover:bg-[#EFF5FB] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-[#DCE5F0] bg-white max-h-[calc(100vh-74px)] overflow-y-auto px-4 py-5 space-y-5"
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              <Link to="/" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Home
              </Link>
              <Link to="/about" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Meet Dr. Lorie
              </Link>
              <Link to="/services" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Services Overview
              </Link>
              <Link to="/holistic-dentistry" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Holistic Approach
              </Link>
              <Link to="/technology" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Dental Technology
              </Link>
              <Link to="/patient-comfort" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Patient Comfort
              </Link>
              <Link to="/virtual-consultations" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Virtual Consultations
              </Link>
              <Link to="/patient-resources" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Patient Resources & FAQs
              </Link>
              <Link to="/testimonials" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Testimonials
              </Link>
              <Link to="/contact" className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#142746] hover:bg-[#EFF5FB]">
                Contact & Directions
              </Link>
            </nav>

            <div className="pt-3 border-t border-[#DCE5F0] space-y-2.5">
              <Link
                to="/appointments"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#346CF0] text-white text-sm font-semibold"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Request Appointment</span>
              </Link>
              <Link
                to="/staff-demo"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#DCE5F0] text-[#142746] text-xs font-medium hover:bg-[#EFF5FB]"
              >
                <span>Staff Management Demo</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
