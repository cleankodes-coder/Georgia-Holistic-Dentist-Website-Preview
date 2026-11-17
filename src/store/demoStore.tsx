import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { addDays, format } from 'date-fns';
import {
  ActivityLog,
  AppointmentRequest,
  AppointmentStatus,
  CalendarEvent,
  ContactPreference,
  DemoSettings,
  FollowUp,
  PatientType,
  VisitFormat,
} from '../types/demo';

const STORAGE_KEY = 'ghd_demo_state_v1';

interface DemoState {
  requests: AppointmentRequest[];
  followUps: FollowUp[];
  activityLogs: ActivityLog[];
  settings: DemoSettings;
  hasEnteredStaffDemo: boolean;
}

export interface NewRequestInput {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  preferredContact: ContactPreference;
  patientType: PatientType;
  visitFormat: VisitFormat;
  serviceSlug: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  alternateDate?: string;
  requestNotes?: string;
  isSampleProfile?: boolean;
}

interface DemoContextValue extends DemoState {
  calendarEvents: CalendarEvent[];
  metrics: {
    total: number;
    newEnquiries: number;
    awaitingConfirmation: number;
    confirmed: number;
    rescheduleRequested: number;
    closedOrCancelled: number;
    openFollowUps: number;
  };
  submitDemoRequest: (input: NewRequestInput) => AppointmentRequest;
  updateRequestStatus: (requestId: string, status: AppointmentStatus, note?: string) => void;
  confirmRequestSlot: (requestId: string, date: string, time: string, durationMinutes?: number, note?: string) => void;
  rescheduleRequestSlot: (requestId: string, date: string, time: string, note?: string) => void;
  cancelRequest: (requestId: string, reason?: string) => void;
  reopenRequest: (requestId: string) => void;
  addStaffNote: (requestId: string, text: string) => void;
  toggleFollowUpComplete: (followUpId: string) => void;
  updateFollowUp: (followUpId: string, dueDate: string, note: string) => void;
  updateSettings: (partial: Partial<DemoSettings>) => void;
  resetDemoData: () => void;
  enterStaffDemo: () => void;
}

function getNextWeekday(base: Date, offsetDays: number): string {
  let candidate = addDays(base, offsetDays);
  while (candidate.getDay() === 0 || candidate.getDay() === 6) {
    candidate = addDays(candidate, 1);
  }
  return format(candidate, 'yyyy-MM-dd');
}

function createInitialState(): DemoState {
  const today = new Date();
  const todayIso = getNextWeekday(today, 0);
  const plusOne = getNextWeekday(today, 1);
  const plusTwo = getNextWeekday(today, 2);
  const plusThree = getNextWeekday(today, 3);
  const plusFive = getNextWeekday(today, 5);
  const minusOne = format(addDays(today, -1), "yyyy-MM-dd'T'14:20:00");
  const minusTwo = format(addDays(today, -2), "yyyy-MM-dd'T'10:05:00");
  const todayMorning = format(today, "yyyy-MM-dd'T'08:45:00");

  const initialRequests: AppointmentRequest[] = [
    {
      id: 'req-101',
      reference: 'GHD-DEMO-001',
      patientName: 'Claire Bennett (Sample)',
      patientEmail: 'claire.bennett@example.com',
      patientPhone: '(770) 555-0142',
      preferredContact: 'phone',
      patientType: 'new',
      visitFormat: 'in-person',
      serviceSlug: 'biocompatible-restorations',
      serviceName: 'Biocompatible Care & Safe Amalgam Removal',
      preferredDate: todayIso,
      preferredTime: '09:00 AM',
      assignedDate: todayIso,
      assignedTime: '09:00 AM',
      durationMinutes: 60,
      status: 'confirmed',
      notes: [
        {
          id: 'note-101',
          text: 'Sample new patient interested in reviewing two older amalgam fillings and biocompatible replacement options.',
          createdAt: minusTwo,
          author: 'Front Desk Demo',
        },
      ],
      statusHistory: [
        {
          id: 'hist-101-1',
          status: 'new',
          timestamp: minusTwo,
          note: 'Demo appointment request submitted online.',
          actor: 'Patient Demo Portal',
        },
        {
          id: 'hist-101-2',
          status: 'confirmed',
          timestamp: minusOne,
          note: 'Confirmed 9:00 AM consultation block in simulated schedule.',
          actor: 'Demo Coordinator',
        },
      ],
      createdAt: minusTwo,
      updatedAt: minusOne,
    },
    {
      id: 'req-102',
      reference: 'GHD-DEMO-002',
      patientName: 'David Mercer (Sample)',
      patientEmail: 'david.mercer@example.com',
      patientPhone: '(678) 555-0188',
      preferredContact: 'email',
      patientType: 'existing',
      visitFormat: 'in-person',
      serviceSlug: 'waterlase-dentistry',
      serviceName: 'Waterlase® Dentistry',
      preferredDate: todayIso,
      preferredTime: '02:30 PM',
      assignedDate: todayIso,
      assignedTime: '02:30 PM',
      durationMinutes: 45,
      status: 'confirmed',
      notes: [
        {
          id: 'note-102',
          text: 'Prefers low-level ambient lighting and wireless headphones during treatment.',
          createdAt: minusTwo,
          author: 'Demo Coordinator',
        },
      ],
      statusHistory: [
        {
          id: 'hist-102-1',
          status: 'new',
          timestamp: minusTwo,
          note: 'Sample Waterlase visit preference submitted.',
          actor: 'Patient Demo Portal',
        },
        {
          id: 'hist-102-2',
          status: 'confirmed',
          timestamp: minusOne,
          note: 'Assigned 2:30 PM comfort suite slot.',
          actor: 'Demo Coordinator',
        },
      ],
      createdAt: minusTwo,
      updatedAt: minusOne,
    },
    {
      id: 'req-103',
      reference: 'GHD-DEMO-003',
      patientName: 'Hannah Brooks (Sample)',
      patientEmail: 'hannah.brooks@example.com',
      patientPhone: '(404) 555-0194',
      preferredContact: 'either',
      patientType: 'new',
      visitFormat: 'virtual',
      serviceSlug: 'virtual-consultations',
      serviceName: 'Virtual Consultations (Zoom)',
      preferredDate: plusOne,
      preferredTime: '10:30 AM',
      alternateDate: plusTwo,
      assignedDate: plusOne,
      assignedTime: '10:30 AM',
      durationMinutes: 30,
      status: 'confirmed',
      notes: [
        {
          id: 'note-103',
          text: 'Out-of-town patient from Athens, GA exploring Myo=Smile and restorative options before driving in.',
          createdAt: minusOne,
          author: 'Demo Coordinator',
        },
      ],
      statusHistory: [
        {
          id: 'hist-103-1',
          status: 'new',
          timestamp: minusOne,
          note: 'Sample Zoom consultation requested.',
          actor: 'Patient Demo Portal',
        },
        {
          id: 'hist-103-2',
          status: 'confirmed',
          timestamp: todayMorning,
          note: 'Confirmed simulated Zoom session and reminded patient to send recent X-rays.',
          actor: 'Demo Coordinator',
        },
      ],
      createdAt: minusOne,
      updatedAt: todayMorning,
    },
    {
      id: 'req-104',
      reference: 'GHD-DEMO-004',
      patientName: 'Samuel Park (Sample)',
      patientEmail: 'samuel.park@example.com',
      patientPhone: '(770) 555-0165',
      preferredContact: 'phone',
      patientType: 'new',
      visitFormat: 'in-person',
      serviceSlug: 'myo-smile-tmj',
      serviceName: 'Myo=Smile® / TMJ & Airway Therapy',
      preferredDate: plusTwo,
      preferredTime: '01:00 PM',
      alternateDate: plusThree,
      assignedDate: null,
      assignedTime: null,
      durationMinutes: 45,
      status: 'new',
      requestNotes: 'Interested in airway-centered evaluation and jaw tension guidance.',
      notes: [],
      statusHistory: [
        {
          id: 'hist-104-1',
          status: 'new',
          timestamp: todayMorning,
          note: 'New demo request submitted. Requires staff confirmation.',
          actor: 'Patient Demo Portal',
        },
      ],
      createdAt: todayMorning,
      updatedAt: todayMorning,
    },
    {
      id: 'req-105',
      reference: 'GHD-DEMO-005',
      patientName: 'Miriam Foster (Sample)',
      patientEmail: 'miriam.foster@example.com',
      patientPhone: '(706) 555-0117',
      preferredContact: 'email',
      patientType: 'existing',
      visitFormat: 'in-person',
      serviceSlug: 'laser-gum-treatment',
      serviceName: 'Non-Surgical Laser Gum Treatment',
      preferredDate: plusThree,
      preferredTime: '10:30 AM',
      alternateDate: plusFive,
      assignedDate: null,
      assignedTime: null,
      durationMinutes: 45,
      status: 'awaiting_confirmation',
      notes: [
        {
          id: 'note-105',
          text: 'Left simulated courtesy callback details to confirm morning preference.',
          createdAt: todayMorning,
          author: 'Demo Coordinator',
        },
      ],
      statusHistory: [
        {
          id: 'hist-105-1',
          status: 'new',
          timestamp: minusOne,
          note: 'Sample laser periodontal hygiene enquiry received.',
          actor: 'Patient Demo Portal',
        },
        {
          id: 'hist-105-2',
          status: 'awaiting_confirmation',
          timestamp: todayMorning,
          note: 'Reviewed preferred morning slot; awaiting final patient confirmation.',
          actor: 'Demo Coordinator',
        },
      ],
      createdAt: minusOne,
      updatedAt: todayMorning,
    },
    {
      id: 'req-106',
      reference: 'GHD-DEMO-006',
      patientName: 'Rachel Alvarez (Sample)',
      patientEmail: 'rachel.alvarez@example.com',
      patientPhone: '(770) 555-0131',
      preferredContact: 'phone',
      patientType: 'existing',
      visitFormat: 'in-person',
      serviceSlug: 'cosmetic-dentistry',
      serviceName: 'Cosmetic Dentistry',
      preferredDate: plusTwo,
      preferredTime: '04:00 PM',
      assignedDate: plusTwo,
      assignedTime: '04:00 PM',
      durationMinutes: 45,
      status: 'reschedule_requested',
      notes: [
        {
          id: 'note-106',
          text: 'Patient asked to move afternoon shade-matching appointment earlier in the week if open.',
          createdAt: todayMorning,
          author: 'Demo Coordinator',
        },
      ],
      statusHistory: [
        {
          id: 'hist-106-1',
          status: 'confirmed',
          timestamp: minusTwo,
          note: 'Initially confirmed for 4:00 PM slot.',
          actor: 'Demo Coordinator',
        },
        {
          id: 'hist-106-2',
          status: 'reschedule_requested',
          timestamp: todayMorning,
          note: 'Marked for reschedule follow-up.',
          actor: 'Demo Coordinator',
        },
      ],
      createdAt: minusTwo,
      updatedAt: todayMorning,
    },
    {
      id: 'req-107',
      reference: 'GHD-DEMO-007',
      patientName: 'Thomas Caldwell (Sample)',
      patientEmail: 'thomas.caldwell@example.com',
      patientPhone: '(678) 555-0129',
      preferredContact: 'email',
      patientType: 'new',
      visitFormat: 'virtual',
      serviceSlug: 'virtual-consultations',
      serviceName: 'Virtual Consultations (Zoom)',
      preferredDate: plusFive,
      preferredTime: '09:00 AM',
      assignedDate: null,
      assignedTime: null,
      durationMinutes: 30,
      status: 'contacted',
      notes: [
        {
          id: 'note-107',
          text: 'Sent instructions on how to email recent dental X-rays prior to confirming Zoom slot.',
          createdAt: todayMorning,
          author: 'Demo Coordinator',
        },
      ],
      statusHistory: [
        {
          id: 'hist-107-1',
          status: 'new',
          timestamp: minusOne,
          note: 'Submitted virtual consultation enquiry.',
          actor: 'Patient Demo Portal',
        },
        {
          id: 'hist-107-2',
          status: 'contacted',
          timestamp: todayMorning,
          note: 'Emailed pre-visit imaging instructions.',
          actor: 'Demo Coordinator',
        },
      ],
      createdAt: minusOne,
      updatedAt: todayMorning,
    },
    {
      id: 'req-108',
      reference: 'GHD-DEMO-008',
      patientName: 'Evelyn Grant (Sample)',
      patientEmail: 'evelyn.grant@example.com',
      patientPhone: '(770) 555-0177',
      preferredContact: 'phone',
      patientType: 'existing',
      visitFormat: 'in-person',
      serviceSlug: 'digital-dental-technology',
      serviceName: 'Digital Dental Technology',
      preferredDate: todayIso,
      preferredTime: '10:30 AM',
      assignedDate: null,
      assignedTime: null,
      durationMinutes: 45,
      status: 'closed',
      notes: [
        {
          id: 'note-108',
          text: 'Sample completed checkup & oral cancer screening record.',
          createdAt: minusOne,
          author: 'Demo Coordinator',
        },
      ],
      statusHistory: [
        {
          id: 'hist-108-1',
          status: 'closed',
          timestamp: minusOne,
          note: 'Demo record closed after visit completion.',
          actor: 'Demo Coordinator',
        },
      ],
      createdAt: minusTwo,
      updatedAt: minusOne,
    },
  ];

  const initialFollowUps: FollowUp[] = [
    {
      id: 'fu-1',
      requestId: 'req-104',
      reference: 'GHD-DEMO-004',
      patientName: 'Samuel Park (Sample)',
      serviceName: 'Myo=Smile® / TMJ & Airway Therapy',
      reason: 'Confirm preferred afternoon evaluation date',
      dueDate: todayIso,
      completed: false,
      note: 'Call preferred number to verify 1:00 PM availability.',
      updatedAt: todayMorning,
    },
    {
      id: 'fu-2',
      requestId: 'req-106',
      reference: 'GHD-DEMO-006',
      patientName: 'Rachel Alvarez (Sample)',
      serviceName: 'Cosmetic Dentistry',
      reason: 'Offer alternate morning shade-match slot',
      dueDate: plusOne,
      completed: false,
      note: 'Check if 9:00 AM or 10:30 AM works better.',
      updatedAt: todayMorning,
    },
    {
      id: 'fu-3',
      requestId: 'req-107',
      reference: 'GHD-DEMO-007',
      patientName: 'Thomas Caldwell (Sample)',
      serviceName: 'Virtual Consultations (Zoom)',
      reason: 'Verify receipt of pre-visit X-ray images',
      dueDate: plusTwo,
      completed: false,
      note: 'Follow up prior to locking Zoom session time.',
      updatedAt: todayMorning,
    },
  ];

  const initialLogs: ActivityLog[] = [
    {
      id: 'act-1',
      type: 'request_submitted',
      reference: 'GHD-DEMO-004',
      title: 'New appointment request submitted',
      description: 'Samuel Park (Sample) requested Myo=Smile® / TMJ & Airway Therapy.',
      timestamp: todayMorning,
    },
    {
      id: 'act-2',
      type: 'status_changed',
      reference: 'GHD-DEMO-006',
      title: 'Reschedule requested',
      description: 'Rachel Alvarez (Sample) flagged for an alternate time slot.',
      timestamp: todayMorning,
    },
    {
      id: 'act-3',
      type: 'calendar_updated',
      reference: 'GHD-DEMO-003',
      title: 'Virtual consultation confirmed',
      description: `Hannah Brooks (Sample) confirmed for ${plusOne} at 10:30 AM.`,
      timestamp: todayMorning,
    },
    {
      id: 'act-4',
      type: 'calendar_updated',
      reference: 'GHD-DEMO-001',
      title: 'In-person consultation confirmed',
      description: `Claire Bennett (Sample) scheduled for ${todayIso} at 09:00 AM.`,
      timestamp: minusOne,
    },
  ];

  return {
    requests: initialRequests,
    followUps: initialFollowUps,
    activityLogs: initialLogs,
    settings: {
      simulatedStartHour: 9,
      simulatedEndHour: 17,
      defaultDurationMinutes: 45,
      enabledWeekdays: [1, 2, 3, 4, 5],
      sampleTimeSlots: ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'],
      allowVirtualRequests: true,
    },
    hasEnteredStaffDemo: false,
  };
}

function loadState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as DemoState;
    if (!parsed || !Array.isArray(parsed.requests) || !parsed.settings) {
      return createInitialState();
    }
    return parsed;
  } catch {
    return createInitialState();
  }
}

const DemoContext = createContext<DemoContextValue | null>(null);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DemoState>(() => loadState());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [state]);

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return state.requests
      .filter(
        (req) =>
          (req.status === 'confirmed' || req.status === 'reschedule_requested') &&
          Boolean(req.assignedDate) &&
          Boolean(req.assignedTime)
      )
      .map((req) => ({
        id: `evt-${req.id}`,
        requestId: req.id,
        reference: req.reference,
        title: req.patientName.replace(' (Sample)', ''),
        patientName: req.patientName,
        serviceName: req.serviceName,
        visitFormat: req.visitFormat,
        date: req.assignedDate as string,
        time: req.assignedTime as string,
        durationMinutes: req.durationMinutes,
        status: req.status,
      }));
  }, [state.requests]);

  const metrics = useMemo(() => {
    const reqs = state.requests;
    return {
      total: reqs.length,
      newEnquiries: reqs.filter((r) => r.status === 'new').length,
      awaitingConfirmation: reqs.filter((r) => r.status === 'awaiting_confirmation' || r.status === 'contacted').length,
      confirmed: reqs.filter((r) => r.status === 'confirmed').length,
      rescheduleRequested: reqs.filter((r) => r.status === 'reschedule_requested').length,
      closedOrCancelled: reqs.filter((r) => r.status === 'closed' || r.status === 'cancelled').length,
      openFollowUps: state.followUps.filter((f) => !f.completed).length,
    };
  }, [state.requests, state.followUps]);

  const submitDemoRequest = (input: NewRequestInput): AppointmentRequest => {
    const nowIso = new Date().toISOString();
    const maxNum = state.requests.reduce((max, item) => {
      const match = item.reference.match(/GHD-DEMO-(\d+)/);
      const num = match ? parseInt(match[1], 10) : 0;
      return num > max ? num : max;
    }, 0);
    const nextRef = `GHD-DEMO-${String(maxNum + 1).padStart(3, '0')}`;
    const newId = `req-${Date.now()}`;

    const newReq: AppointmentRequest = {
      id: newId,
      reference: nextRef,
      patientName: input.patientName.trim(),
      patientEmail: input.patientEmail.trim(),
      patientPhone: input.patientPhone.trim(),
      preferredContact: input.preferredContact,
      patientType: input.patientType,
      visitFormat: input.visitFormat,
      serviceSlug: input.serviceSlug,
      serviceName: input.serviceName,
      preferredDate: input.preferredDate,
      preferredTime: input.preferredTime,
      alternateDate: input.alternateDate || undefined,
      assignedDate: null,
      assignedTime: null,
      durationMinutes: input.visitFormat === 'virtual' ? 30 : state.settings.defaultDurationMinutes,
      status: 'new',
      requestNotes: input.requestNotes?.trim() || undefined,
      isSampleProfile: input.isSampleProfile,
      notes: input.requestNotes?.trim()
        ? [
            {
              id: `note-${Date.now()}`,
              text: `Requester note: ${input.requestNotes.trim()}`,
              createdAt: nowIso,
              author: 'Patient Demo Portal',
            },
          ]
        : [],
      statusHistory: [
        {
          id: `hist-${Date.now()}`,
          status: 'new',
          timestamp: nowIso,
          note: `Demo request submitted (${input.visitFormat}, preferred ${input.preferredDate} at ${input.preferredTime}). Pending clinic confirmation.`,
          actor: 'Patient Demo Portal',
        },
      ],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    const newFollowUp: FollowUp = {
      id: `fu-${Date.now()}`,
      requestId: newId,
      reference: nextRef,
      patientName: newReq.patientName,
      serviceName: newReq.serviceName,
      reason: 'Confirm newly submitted demo request slot',
      dueDate: newReq.preferredDate,
      completed: false,
      note: `Preferred contact: ${newReq.preferredContact}. Requested ${newReq.preferredDate} at ${newReq.preferredTime}.`,
      updatedAt: nowIso,
    };

    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      type: 'request_submitted',
      reference: nextRef,
      title: 'New demo appointment request received',
      description: `${newReq.patientName} requested ${newReq.serviceName} for ${newReq.preferredDate} (${newReq.preferredTime}).`,
      timestamp: nowIso,
    };

    setState((prev) => ({
      ...prev,
      requests: [newReq, ...prev.requests],
      followUps: [newFollowUp, ...prev.followUps],
      activityLogs: [newLog, ...prev.activityLogs],
    }));

    return newReq;
  };

  const updateRequestStatus = (requestId: string, status: AppointmentStatus, note?: string) => {
    const nowIso = new Date().toISOString();
    setState((prev) => {
      const target = prev.requests.find((r) => r.id === requestId);
      if (!target) return prev;
      const statusText = note?.trim() || `Status updated to ${status.replace('_', ' ')}.`;
      const updated = prev.requests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status,
              updatedAt: nowIso,
              statusHistory: [
                ...r.statusHistory,
                {
                  id: `hist-${Date.now()}`,
                  status,
                  timestamp: nowIso,
                  note: statusText,
                  actor: 'Staff Demo User',
                },
              ],
            }
          : r
      );
      const log: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'status_changed',
        reference: target.reference,
        title: `Request marked ${status.replace('_', ' ')}`,
        description: `${target.patientName} — ${statusText}`,
        timestamp: nowIso,
      };
      return {
        ...prev,
        requests: updated,
        activityLogs: [log, ...prev.activityLogs],
      };
    });
  };

  const confirmRequestSlot = (
    requestId: string,
    date: string,
    time: string,
    durationMinutes?: number,
    note?: string
  ) => {
    const nowIso = new Date().toISOString();
    setState((prev) => {
      const target = prev.requests.find((r) => r.id === requestId);
      if (!target) return prev;
      const confirmMsg = note?.trim() || `Confirmed simulated slot on ${date} at ${time}.`;
      const updated = prev.requests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'confirmed' as AppointmentStatus,
              assignedDate: date,
              assignedTime: time,
              durationMinutes: durationMinutes ?? r.durationMinutes,
              updatedAt: nowIso,
              statusHistory: [
                ...r.statusHistory,
                {
                  id: `hist-${Date.now()}`,
                  status: 'confirmed' as AppointmentStatus,
                  timestamp: nowIso,
                  note: confirmMsg,
                  actor: 'Staff Demo User',
                },
              ],
            }
          : r
      );
      const updatedFollowUps = prev.followUps.map((f) =>
        f.requestId === requestId ? { ...f, completed: true, updatedAt: nowIso } : f
      );
      const log: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'calendar_updated',
        reference: target.reference,
        title: 'Appointment confirmed on calendar',
        description: `${target.patientName} confirmed for ${date} at ${time}.`,
        timestamp: nowIso,
      };
      return {
        ...prev,
        requests: updated,
        followUps: updatedFollowUps,
        activityLogs: [log, ...prev.activityLogs],
      };
    });
  };

  const rescheduleRequestSlot = (requestId: string, date: string, time: string, note?: string) => {
    const nowIso = new Date().toISOString();
    setState((prev) => {
      const target = prev.requests.find((r) => r.id === requestId);
      if (!target) return prev;
      const msg = note?.trim() || `Rescheduled calendar slot to ${date} at ${time}.`;
      const updated = prev.requests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'confirmed' as AppointmentStatus,
              assignedDate: date,
              assignedTime: time,
              updatedAt: nowIso,
              statusHistory: [
                ...r.statusHistory,
                {
                  id: `hist-${Date.now()}`,
                  status: 'confirmed' as AppointmentStatus,
                  timestamp: nowIso,
                  note: msg,
                  actor: 'Staff Demo User',
                },
              ],
            }
          : r
      );
      const log: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'calendar_updated',
        reference: target.reference,
        title: 'Appointment rescheduled',
        description: `${target.patientName} moved to ${date} at ${time}.`,
        timestamp: nowIso,
      };
      return {
        ...prev,
        requests: updated,
        activityLogs: [log, ...prev.activityLogs],
      };
    });
  };

  const cancelRequest = (requestId: string, reason?: string) => {
    const nowIso = new Date().toISOString();
    setState((prev) => {
      const target = prev.requests.find((r) => r.id === requestId);
      if (!target) return prev;
      const msg = reason?.trim() || 'Appointment cancelled in demo schedule; history preserved.';
      const updated = prev.requests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'cancelled' as AppointmentStatus,
              assignedDate: null,
              assignedTime: null,
              updatedAt: nowIso,
              statusHistory: [
                ...r.statusHistory,
                {
                  id: `hist-${Date.now()}`,
                  status: 'cancelled' as AppointmentStatus,
                  timestamp: nowIso,
                  note: msg,
                  actor: 'Staff Demo User',
                },
              ],
            }
          : r
      );
      const log: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'status_changed',
        reference: target.reference,
        title: 'Appointment cancelled',
        description: `${target.patientName} removed from active calendar (${msg}).`,
        timestamp: nowIso,
      };
      return {
        ...prev,
        requests: updated,
        activityLogs: [log, ...prev.activityLogs],
      };
    });
  };

  const reopenRequest = (requestId: string) => {
    updateRequestStatus(requestId, 'awaiting_confirmation', 'Reopened for staff review and scheduling.');
  };

  const addStaffNote = (requestId: string, text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const nowIso = new Date().toISOString();
    setState((prev) => {
      const target = prev.requests.find((r) => r.id === requestId);
      if (!target) return prev;
      const updated = prev.requests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              updatedAt: nowIso,
              notes: [
                ...r.notes,
                {
                  id: `note-${Date.now()}`,
                  text: clean,
                  createdAt: nowIso,
                  author: 'Staff Demo User',
                },
              ],
            }
          : r
      );
      const log: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'note_added',
        reference: target.reference,
        title: 'Nonclinical staff note added',
        description: `${target.reference}: "${clean}"`,
        timestamp: nowIso,
      };
      return {
        ...prev,
        requests: updated,
        activityLogs: [log, ...prev.activityLogs],
      };
    });
  };

  const toggleFollowUpComplete = (followUpId: string) => {
    const nowIso = new Date().toISOString();
    setState((prev) => {
      const target = prev.followUps.find((f) => f.id === followUpId);
      if (!target) return prev;
      const nextDone = !target.completed;
      const updated = prev.followUps.map((f) =>
        f.id === followUpId ? { ...f, completed: nextDone, updatedAt: nowIso } : f
      );
      const log: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'follow_up',
        reference: target.reference,
        title: nextDone ? 'Follow-up marked completed' : 'Follow-up reopened',
        description: `${target.patientName} — ${target.reason}`,
        timestamp: nowIso,
      };
      return {
        ...prev,
        followUps: updated,
        activityLogs: [log, ...prev.activityLogs],
      };
    });
  };

  const updateFollowUp = (followUpId: string, dueDate: string, note: string) => {
    const nowIso = new Date().toISOString();
    setState((prev) => {
      const target = prev.followUps.find((f) => f.id === followUpId);
      if (!target) return prev;
      const updated = prev.followUps.map((f) =>
        f.id === followUpId ? { ...f, dueDate, note, updatedAt: nowIso } : f
      );
      const log: ActivityLog = {
        id: `act-${Date.now()}`,
        type: 'follow_up',
        reference: target.reference,
        title: 'Follow-up schedule updated',
        description: `${target.reference} next follow-up set for ${dueDate}.`,
        timestamp: nowIso,
      };
      return {
        ...prev,
        followUps: updated,
        activityLogs: [log, ...prev.activityLogs],
      };
    });
  };

  const updateSettings = (partial: Partial<DemoSettings>) => {
    const nowIso = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...partial },
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          type: 'settings_updated',
          title: 'Simulated clinic schedule settings updated',
          description: 'Demo hours, slot availability, or default duration adjusted.',
          timestamp: nowIso,
        },
        ...prev.activityLogs,
      ],
    }));
  };

  const resetDemoData = () => {
    const fresh = createInitialState();
    fresh.hasEnteredStaffDemo = state.hasEnteredStaffDemo;
    fresh.activityLogs = [
      {
        id: `act-reset-${Date.now()}`,
        type: 'demo_reset',
        title: 'Demo dataset restored to defaults',
        description: 'Sample appointment requests, calendar slots, and follow-ups reset cleanly.',
        timestamp: new Date().toISOString(),
      },
      ...fresh.activityLogs,
    ];
    setState(fresh);
  };

  const enterStaffDemo = () => {
    setState((prev) => ({ ...prev, hasEnteredStaffDemo: true }));
  };

  return (
    <DemoContext.Provider
      value={{
        ...state,
        calendarEvents,
        metrics,
        submitDemoRequest,
        updateRequestStatus,
        confirmRequestSlot,
        rescheduleRequestSlot,
        cancelRequest,
        reopenRequest,
        addStaffNote,
        toggleFollowUpComplete,
        updateFollowUp,
        updateSettings,
        resetDemoData,
        enterStaffDemo,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export function useDemoStore() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemoStore must be used inside DemoProvider');
  return ctx;
}
