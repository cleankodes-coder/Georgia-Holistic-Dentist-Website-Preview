import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Info,
  Sparkles,
  UserCheck,
  Video,
} from 'lucide-react';
import { VERIFIED_SERVICES } from '../data/practiceData';
import { useDemoStore } from '../store/demoStore';
import {
  AppointmentRequest,
  ContactPreference,
  PatientType,
  VisitFormat,
} from '../types/demo';
import { CalendarGrid } from './CalendarGrid';

const SAMPLE_PROFILES = [
  {
    label: 'Sample New Patient (Laura Vance)',
    name: 'Laura Vance (Sample)',
    email: 'laura.vance@example.com',
    phone: '(770) 555-0148',
    preferredContact: 'phone' as ContactPreference,
  },
  {
    label: 'Sample Existing Patient (Martin Ellis)',
    name: 'Martin Ellis (Sample)',
    email: 'martin.ellis@example.com',
    phone: '(678) 555-0192',
    preferredContact: 'email' as ContactPreference,
  },
];

interface AppointmentWizardProps {
  initialServiceSlug?: string;
  initialDate?: string;
  initialTime?: string;
  compactHeader?: boolean;
}

export const AppointmentWizard: React.FC<AppointmentWizardProps> = ({
  initialServiceSlug,
  initialDate,
  initialTime,
  compactHeader = false,
}) => {
  const { settings, submitDemoRequest } = useDemoStore();
  const navigate = useNavigate();

  const defaultService =
    VERIFIED_SERVICES.find((s) => s.slug === initialServiceSlug) ?? VERIFIED_SERVICES[0];

  const defaultWeekday = useMemo(() => {
    if (initialDate) return initialDate;
    let d = addDays(new Date(), 1);
    while (!settings.enabledWeekdays.includes(d.getDay())) {
      d = addDays(d, 1);
    }
    return format(d, 'yyyy-MM-dd');
  }, [initialDate, settings.enabledWeekdays]);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [patientType, setPatientType] = useState<PatientType>('new');
  const [serviceSlug, setServiceSlug] = useState<string>(defaultService.slug);
  const [visitFormat, setVisitFormat] = useState<VisitFormat>(
    defaultService.slug === 'virtual-consultations' ? 'virtual' : 'in-person'
  );
  const [preferredDate, setPreferredDate] = useState<string>(defaultWeekday);
  const [preferredTime, setPreferredTime] = useState<string>(
    initialTime || settings.sampleTimeSlots[0] || '09:00 AM'
  );
  const [alternateDate, setAlternateDate] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<ContactPreference>('phone');
  const [requestNotes, setRequestNotes] = useState('');
  const [isSampleProfile, setIsSampleProfile] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRequest, setSubmittedRequest] = useState<AppointmentRequest | null>(null);

  const selectedService =
    VERIFIED_SERVICES.find((s) => s.slug === serviceSlug) ?? VERIFIED_SERVICES[0];

  const handleServiceSelect = (slug: string) => {
    setServiceSlug(slug);
    if (slug === 'virtual-consultations') {
      setVisitFormat('virtual');
    } else if (!VERIFIED_SERVICES.find((s) => s.slug === slug)?.supportsVirtual) {
      setVisitFormat('in-person');
    }
  };

  const applySampleProfile = (profile: (typeof SAMPLE_PROFILES)[number]) => {
    setPatientName(profile.name);
    setPatientEmail(profile.email);
    setPatientPhone(profile.phone);
    setPreferredContact(profile.preferredContact);
    setIsSampleProfile(true);
    setErrors({});
  };

  const validateStep3 = () => {
    const nextErrors: Record<string, string> = {};
    if (!patientName.trim() || patientName.trim().length < 2) {
      nextErrors.patientName = 'Please enter a fictional or demo requester name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail.trim())) {
      nextErrors.patientEmail = 'Please enter a valid demo email address.';
    }
    if (patientPhone.replace(/\D/g, '').length < 7) {
      nextErrors.patientPhone = 'Please enter a valid phone number (minimum 7 digits).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleConfirmSubmit = () => {
    const created = submitDemoRequest({
      patientName,
      patientEmail,
      patientPhone,
      preferredContact,
      patientType,
      visitFormat,
      serviceSlug: selectedService.slug,
      serviceName: selectedService.title,
      preferredDate,
      preferredTime,
      alternateDate: alternateDate || undefined,
      requestNotes: requestNotes || undefined,
      isSampleProfile,
    });
    setSubmittedRequest(created);
    setStep(5);
  };

  const steps = [
    { id: 1, label: 'Visit' },
    { id: 2, label: 'Schedule' },
    { id: 3, label: 'Contact' },
    { id: 4, label: 'Review' },
  ];

  return (
    <div className="bg-white border border-[#DCE5F0] rounded-2xl shadow-sm overflow-hidden">
      {/* Top Demo Banner + Step Progress */}
      <div className="bg-[#142746] text-white px-6 sm:px-8 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[#93B4E5]">
              Interactive Appointment Request Demo · Simulated Schedule
            </p>
            {!compactHeader && (
              <h2 className="font-editorial text-xl sm:text-2xl font-semibold mt-0.5">
                Request Your Preferred Holistic Visit
              </h2>
            )}
          </div>
          {step < 5 && (
            <div className="flex items-center gap-2 text-xs tabular-nums">
              {steps.map((s, idx) => {
                const active = step === s.id;
                const done = step > s.id;
                return (
                  <React.Fragment key={s.id}>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] font-semibold transition-colors ${
                          done
                            ? 'bg-[#346CF0] text-white'
                            : active
                            ? 'bg-white text-[#142746]'
                            : 'bg-white/15 text-slate-300'
                        }`}
                      >
                        {done ? <Check className="w-3.5 h-3.5" /> : s.id}
                      </span>
                      <span
                        className={`hidden md:inline ${
                          active ? 'text-white font-semibold' : 'text-slate-300'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <span className="w-4 h-px bg-white/20" aria-hidden="true" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10" data-native-cursor="true">
        {/* STEP 1: VISIT */}
        {step === 1 && (
          <div className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#142746] mb-2.5">
                  Patient Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'new' as PatientType, label: 'New Patient', sub: 'First visit with Dr. Lorie' },
                    { value: 'existing' as PatientType, label: 'Existing Patient', sub: 'Returning patient' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPatientType(opt.value)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        patientType === opt.value
                          ? 'border-[#346CF0] bg-[#EFF5FB] text-[#142746]'
                          : 'border-[#DCE5F0] hover:border-[#6E95CB] text-[#1B2637]'
                      }`}
                    >
                      <p className="text-sm font-semibold">{opt.label}</p>
                      <p className="text-xs text-[#526075] mt-0.5">{opt.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#142746] mb-2.5">
                  Visit Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={serviceSlug === 'virtual-consultations'}
                    onClick={() => setVisitFormat('in-person')}
                    className={`p-3.5 rounded-xl border text-left transition-all disabled:opacity-45 disabled:cursor-not-allowed ${
                      visitFormat === 'in-person'
                        ? 'border-[#346CF0] bg-[#EFF5FB] text-[#142746]'
                        : 'border-[#DCE5F0] hover:border-[#6E95CB] text-[#1B2637]'
                    }`}
                  >
                    <p className="text-sm font-semibold">In-Office (Gainesville)</p>
                    <p className="text-xs text-[#526075] mt-0.5">5129 Cleveland Hwy</p>
                  </button>
                  <button
                    type="button"
                    disabled={!settings.allowVirtualRequests || !selectedService.supportsVirtual}
                    onClick={() => setVisitFormat('virtual')}
                    className={`p-3.5 rounded-xl border text-left transition-all disabled:opacity-45 disabled:cursor-not-allowed ${
                      visitFormat === 'virtual'
                        ? 'border-[#346CF0] bg-[#EFF5FB] text-[#142746]'
                        : 'border-[#DCE5F0] hover:border-[#6E95CB] text-[#1B2637]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-[#346CF0]" aria-hidden="true" />
                      <p className="text-sm font-semibold">Virtual (Zoom)</p>
                    </div>
                    <p className="text-xs text-[#526075] mt-0.5">
                      {selectedService.supportsVirtual ? 'Preliminary consult' : 'In-office required'}
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#142746] mb-3">
                Select Service or Consultation Focus
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {VERIFIED_SERVICES.map((svc) => {
                  const selected = svc.slug === serviceSlug;
                  return (
                    <button
                      key={svc.slug}
                      type="button"
                      onClick={() => handleServiceSelect(svc.slug)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        selected
                          ? 'border-[#346CF0] bg-[#EFF5FB] ring-1 ring-[#346CF0]'
                          : 'border-[#DCE5F0] hover:border-[#6E95CB] bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-[11px] font-medium text-[#526075]">
                          {svc.number}. · {svc.category}
                        </p>
                        <p className="text-sm font-semibold text-[#142746] mt-1">
                          {svc.title}
                        </p>
                      </div>
                      <p className="text-xs text-[#526075] mt-2 line-clamp-2">
                        {svc.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE5F0] flex items-center justify-between">
              <p className="text-xs text-[#526075]">
                Demo flow · No clinical records are transmitted
              </p>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
              >
                <span>Choose Preferred Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCHEDULING */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="p-3.5 rounded-xl bg-[#EFF5FB] border border-[#DCE5F0] flex items-start gap-3 text-xs text-[#1B2637]">
              <Info className="w-4 h-4 text-[#346CF0] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Sample scheduling preferences only:</strong> Georgia Holistic Dentist operates weekday hours by scheduled appointment. Final date and time require clinic staff confirmation.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <label className="block text-sm font-semibold text-[#142746] mb-2.5">
                  1. Preferred Date
                </label>
                <CalendarGrid
                  selectedDate={preferredDate}
                  onSelectDate={setPreferredDate}
                  enabledWeekdays={settings.enabledWeekdays}
                />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#142746] mb-2.5">
                    2. Sample Preferred Time
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {settings.sampleTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTime(slot)}
                        className={`px-3.5 py-3 rounded-lg border text-sm font-medium tabular-nums transition-all flex items-center justify-center gap-2 ${
                          preferredTime === slot
                            ? 'bg-[#346CF0] border-[#346CF0] text-white font-semibold'
                            : 'bg-white border-[#DCE5F0] text-[#142746] hover:bg-[#EFF5FB]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="alt-date-input"
                    className="block text-sm font-semibold text-[#142746] mb-1.5"
                  >
                    3. Optional Alternate Date
                  </label>
                  <input
                    id="alt-date-input"
                    type="date"
                    min={format(new Date(), 'yyyy-MM-dd')}
                    value={alternateDate}
                    onChange={(e) => setAlternateDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white"
                  />
                  <p className="mt-1 text-xs text-[#526075]">
                    Helpful if your first choice is already booked.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F2ED] border border-[#DCE5F0]">
                  <p className="text-xs font-semibold text-[#142746]">Selected Preference</p>
                  <p className="text-sm font-semibold text-[#346CF0] mt-1 tabular-nums">
                    {format(new Date(`${preferredDate}T12:00:00`), 'EEEE, MMM d, yyyy')} · {preferredTime}
                  </p>
                  <p className="text-xs text-[#526075] mt-1">
                    {selectedService.shortTitle} ({visitFormat === 'virtual' ? 'Zoom Virtual' : 'In-Office'})
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE5F0] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#DCE5F0] text-sm font-semibold text-[#142746] hover:bg-[#EFF5FB]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
              >
                <span>Continue to Demo Contact</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DEMO-SAFE CONTACT */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#EFF5FB] border border-[#DCE5F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#142746]">
                  Demo-Safe Input Notice
                </p>
                <p className="text-xs text-[#526075] mt-0.5">
                  Please use fictional contact information or load a sample profile below. Do not submit sensitive health records.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {SAMPLE_PROFILES.map((p) => (
                  <button
                    key={p.email}
                    type="button"
                    onClick={() => applySampleProfile(p)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DCE5F0] hover:border-[#346CF0] text-xs font-semibold text-[#142746] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#346CF0]" aria-hidden="true" />
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="demo-name" className="block text-sm font-semibold text-[#142746] mb-1.5">
                  Fictional Full Name *
                </label>
                <input
                  id="demo-name"
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g., Jordan Vance (Sample)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] focus:border-[#346CF0]"
                />
                {errors.patientName && (
                  <p className="mt-1 text-xs text-red-600">{errors.patientName}</p>
                )}
              </div>

              <div>
                <label htmlFor="demo-email" className="block text-sm font-semibold text-[#142746] mb-1.5">
                  Fictional Email *
                </label>
                <input
                  id="demo-email"
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="e.g., jordan.vance@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] focus:border-[#346CF0]"
                />
                {errors.patientEmail && (
                  <p className="mt-1 text-xs text-red-600">{errors.patientEmail}</p>
                )}
              </div>

              <div>
                <label htmlFor="demo-phone" className="block text-sm font-semibold text-[#142746] mb-1.5">
                  Fictional Phone *
                </label>
                <input
                  id="demo-phone"
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="e.g., (770) 555-0148"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] tabular-nums focus:border-[#346CF0]"
                />
                {errors.patientPhone && (
                  <p className="mt-1 text-xs text-red-600">{errors.patientPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#142746] mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['phone', 'email', 'either'] as ContactPreference[]).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setPreferredContact(pref)}
                      className={`py-2.5 rounded-lg border text-xs font-semibold capitalize transition-colors ${
                        preferredContact === pref
                          ? 'bg-[#346CF0] border-[#346CF0] text-white'
                          : 'bg-white border-[#DCE5F0] text-[#142746] hover:bg-[#EFF5FB]'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="demo-notes" className="block text-sm font-semibold text-[#142746] mb-1.5">
                Nonclinical Scheduling Note (Optional)
              </label>
              <textarea
                id="demo-notes"
                rows={3}
                value={requestNotes}
                onChange={(e) => setRequestNotes(e.target.value)}
                placeholder="e.g., Prefer quiet morning visit or traveling from North Atlanta."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] focus:border-[#346CF0]"
              />
            </div>

            <div className="pt-4 border-t border-[#DCE5F0] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#DCE5F0] text-sm font-semibold text-[#142746] hover:bg-[#EFF5FB]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep3()) setStep(4);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
              >
                <span>Review Demo Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-sm flex items-start gap-3">
              <Info className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold">Appointment Not Yet Confirmed</p>
                <p className="text-xs mt-1">
                  Submitting this demo request routes your preference to the Staff Management Demo queue. In clinical practice, Dr. Lorie’s team confirms availability by phone or email before finalizing your calendar slot.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#EFF5FB]/60 border border-[#DCE5F0] rounded-xl p-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider text-[#526075]">Visit Details</p>
                <div>
                  <p className="text-xs text-[#526075]">Service Requested</p>
                  <p className="text-sm font-semibold text-[#142746]">{selectedService.title}</p>
                </div>
                <div>
                  <p className="text-xs text-[#526075]">Patient & Format</p>
                  <p className="text-sm font-medium text-[#1B2637] capitalize">
                    {patientType} patient · {visitFormat === 'virtual' ? 'Virtual (Zoom)' : 'In-Office'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#526075]">Preferred Date & Time</p>
                  <p className="text-sm font-semibold text-[#346CF0] tabular-nums">
                    {format(new Date(`${preferredDate}T12:00:00`), 'EEEE, MMMM d, yyyy')} at {preferredTime}
                  </p>
                  {alternateDate && (
                    <p className="text-xs text-[#526075] mt-0.5 tabular-nums">
                      Alternate date: {alternateDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 md:border-l md:border-[#DCE5F0] md:pl-6">
                <p className="text-xs font-semibold tracking-wider text-[#526075]">Sample Contact</p>
                <div>
                  <p className="text-xs text-[#526075]">Requester</p>
                  <p className="text-sm font-semibold text-[#142746]">{patientName}</p>
                </div>
                <div>
                  <p className="text-xs text-[#526075]">Email & Phone</p>
                  <p className="text-sm text-[#1B2637] tabular-nums">{patientEmail} · {patientPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-[#526075]">Preferred Contact Method</p>
                  <p className="text-sm text-[#1B2637] capitalize">{preferredContact}</p>
                </div>
                {requestNotes && (
                  <div>
                    <p className="text-xs text-[#526075]">Note</p>
                    <p className="text-sm text-[#1B2637]">{requestNotes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE5F0] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#DCE5F0] text-sm font-semibold text-[#142746] hover:bg-[#EFF5FB]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Edit Contact</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Demo Appointment Request</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION */}
        {step === 5 && submittedRequest && (
          <div className="py-4 text-center max-w-xl mx-auto space-y-6">
            <div className="w-14 h-14 rounded-full bg-[#DCFCE7] text-[#166534] inline-flex items-center justify-center mx-auto">
              <UserCheck className="w-7 h-7" />
            </div>

            <div>
              <p className="font-mono text-sm font-semibold text-[#346CF0] tabular-nums">
                Reference: {submittedRequest.reference}
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#142746] mt-2">
                Demo appointment request received.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#526075] leading-relaxed">
                In a live clinic setting, Dr. Lorie’s team would review your preference and contact you to confirm an appointment time. Right now, you can inspect and confirm this exact request inside the interactive Staff Management Demo.
              </p>
            </div>

            <div className="bg-[#EFF5FB] border border-[#DCE5F0] rounded-xl p-5 text-left text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <span className="text-[#526075]">Service</span>
                <span className="font-semibold text-[#142746] text-right">{submittedRequest.serviceName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#526075]">Requested Slot</span>
                <span className="font-semibold text-[#142746] tabular-nums">
                  {submittedRequest.preferredDate} · {submittedRequest.preferredTime}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#526075]">Current Status</span>
                <span className="font-semibold text-[#1D4ED8]">New Enquiry (Pending Staff Review)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(`/staff-demo/requests/${submittedRequest.id}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#142746] hover:bg-[#0D1A30] text-white text-sm font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>View Demo Request in Staff Dashboard</span>
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-[#142746] text-sm font-semibold transition-colors"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
