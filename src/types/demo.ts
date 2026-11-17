export type AppointmentStatus =
  | 'new'
  | 'awaiting_confirmation'
  | 'contacted'
  | 'confirmed'
  | 'reschedule_requested'
  | 'cancelled'
  | 'closed';

export type PatientType = 'new' | 'existing';
export type VisitFormat = 'in-person' | 'virtual';
export type ContactPreference = 'phone' | 'email' | 'either';

export interface StatusHistoryEntry {
  id: string;
  status: AppointmentStatus;
  timestamp: string;
  note: string;
  actor: string;
}

export interface StaffNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface AppointmentRequest {
  id: string;
  reference: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  preferredContact: ContactPreference;
  patientType: PatientType;
  visitFormat: VisitFormat;
  serviceSlug: string;
  serviceName: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string;
  alternateDate?: string;
  assignedDate: string | null; // YYYY-MM-DD when confirmed/scheduled
  assignedTime: string | null;
  durationMinutes: number;
  status: AppointmentStatus;
  notes: StaffNote[];
  statusHistory: StatusHistoryEntry[];
  requestNotes?: string;
  isSampleProfile?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  requestId: string;
  reference: string;
  title: string;
  patientName: string;
  serviceName: string;
  visitFormat: VisitFormat;
  date: string; // YYYY-MM-DD
  time: string;
  durationMinutes: number;
  status: AppointmentStatus;
}

export interface FollowUp {
  id: string;
  requestId: string;
  reference: string;
  patientName: string;
  serviceName: string;
  reason: string;
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
  note: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  type: 'request_submitted' | 'status_changed' | 'calendar_updated' | 'note_added' | 'follow_up' | 'settings_updated' | 'demo_reset';
  reference?: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface DemoSettings {
  simulatedStartHour: number;
  simulatedEndHour: number;
  defaultDurationMinutes: 30 | 45 | 60;
  enabledWeekdays: number[]; // 1 = Mon ... 5 = Fri
  sampleTimeSlots: string[];
  allowVirtualRequests: boolean;
}

export interface ServiceDefinition {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: 'Holistic & Restorative' | 'Laser & Technology' | 'Airway & Cosmetic' | 'Virtual Access';
  tagline: string;
  summary: string;
  overview: string;
  holisticPerspective: string;
  highlights: string[];
  idealFor: string[];
  supportsVirtual: boolean;
  imageKey:
    | 'heroCinematic'
    | 'heroSuite'
    | 'holisticConsult'
    | 'holisticArch'
    | 'cosmeticExam'
    | 'laserGum'
    | 'waterlaseClinical'
    | 'digitalIntraoral'
    | 'myosmileEval'
    | 'comfortMedia'
    | 'virtualConsult'
    | 'finalCta';
  imageAlt: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  attribution: string;
  context: string;
  sourceLabel: string;
}
