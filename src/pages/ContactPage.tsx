import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react';
import { PRACTICE_IMAGES, PRACTICE_INFO } from '../data/practiceData';
import { InnerHero } from '../components/Hero';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !message.trim()) {
      setError('Please enter your name, a valid email address, and a brief nonclinical message.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <>
      <PageMeta
        title="Contact, Hours & Directions | Georgia Holistic Dentist"
        description="Contact Georgia Holistic Dentist at 5129 Cleveland Highway, Gainesville, Georgia 30506. Call 770-983-0123 for weekday appointments."
      />

      <InnerHero
        eyebrow="Gainesville, Georgia"
        title="Visit Georgia Holistic Dentist"
        description="Located at Quillian’s Corner in North Hall County. Independent, doctor-led holistic dental care operating weekday appointments by scheduled reservation."
        imageSrc={PRACTICE_IMAGES.finalCta.src}
        imageAlt={PRACTICE_IMAGES.finalCta.alt}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Verified Contact & Directions */}
          <Reveal className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Official Office Details"
              title="Location, phone, and weekday scheduling."
            />

            <div className="divide-y divide-[#DCE5F0] border-y border-[#DCE5F0]">
              <div className="py-5 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#346CF0] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#142746]">Practice Address</p>
                  <p className="text-base text-[#1B2637] mt-0.5">
                    {PRACTICE_INFO.addressLine1}
                    <br />
                    {PRACTICE_INFO.cityStateZip}
                  </p>
                  <p className="text-xs text-[#526075] mt-1">
                    North Hall County · Quillian’s Corner (Cleveland Hwy / US-129)
                  </p>
                </div>
              </div>

              <div className="py-5 flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#346CF0] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#142746]">Office Telephone</p>
                  <a
                    href={PRACTICE_INFO.phoneHref}
                    className="text-lg font-semibold text-[#346CF0] hover:underline tabular-nums inline-block mt-0.5"
                  >
                    {PRACTICE_INFO.phone}
                  </a>
                  <p className="text-xs text-[#526075] mt-1">
                    Call directly during weekday office hours to speak with the front-desk team.
                  </p>
                </div>
              </div>

              <div className="py-5 flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#346CF0] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#142746]">Appointment Schedule Policy</p>
                  <p className="text-sm text-[#1B2637] mt-0.5">{PRACTICE_INFO.hoursPolicy}</p>
                  <p className="text-xs text-[#526075] mt-1 leading-relaxed">
                    {PRACTICE_INFO.hoursDetail}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#EFF5FB] border border-[#DCE5F0] space-y-3">
              <div className="flex items-center gap-2 text-[#142746] font-semibold text-sm">
                <Navigation className="w-4 h-4 text-[#346CF0]" />
                <span>Directions Overview</span>
              </div>
              <p className="text-sm text-[#526075] leading-relaxed">
                Situated north of downtown Gainesville along Cleveland Highway (US-129 / SR-11) at Quillian’s Corner, convenient to North Hall County, Cleveland, and Dahlonega.
              </p>
              <div className="pt-1 flex flex-wrap gap-3">
                <Link
                  to="/appointments"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-xs font-semibold"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Appointment Demo</span>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right: Demo Nonclinical Contact Message */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="bg-[#F5F2ED] border border-[#DCE5F0] rounded-2xl p-6 sm:p-8" data-native-cursor="true">
              <h2 className="font-editorial text-2xl font-semibold text-[#142746]">
                Send a General Practice Inquiry (Demo)
              </h2>
              <p className="text-sm text-[#526075] mt-1.5">
                Use fictional details to preview a general inquiry. For appointment preferences, please use the multi-step Appointment Request wizard.
              </p>

              {sent ? (
                <div className="mt-6 p-6 rounded-xl bg-white border border-[#DCE5F0] text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto" />
                  <h3 className="font-editorial text-xl font-semibold text-[#142746]">
                    Demo Inquiry Received
                  </h3>
                  <p className="text-sm text-[#526075]">
                    This form demonstrates front-desk message capture without sending external email.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-4 py-2 rounded-lg border border-[#DCE5F0] text-xs font-semibold text-[#142746]"
                  >
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#142746] mb-1.5">
                      Your Name (Sample)
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Alex Morgan (Sample)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] bg-white text-sm text-[#142746]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#142746] mb-1.5">
                      Email Address (Sample)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., alex.morgan@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] bg-white text-sm text-[#142746]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-semibold text-[#142746] mb-1.5">
                      Nonclinical Question
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Questions about parking, directions, or scheduling..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] bg-white text-sm text-[#142746]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#142746] hover:bg-[#0D1A30] text-white text-sm font-semibold transition-colors"
                  >
                    Submit Demo Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
