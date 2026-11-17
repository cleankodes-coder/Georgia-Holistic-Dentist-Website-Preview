import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Archive,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Mail,
  MessageSquarePlus,
  Phone,
  PhoneCall,
  RefreshCw,
  RotateCcw,
  Video,
  X,
  XCircle,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { AppointmentRequest } from '../../types/demo';
import { StatusBadge, getStatusLabel } from '../StatusBadge';

interface RequestDetailDrawerProps {
  request: AppointmentRequest | null;
  onClose: () => void;
}

export const RequestDetailDrawer: React.FC<RequestDetailDrawerProps> = ({ request, onClose }) => {
  const {
    settings,
    confirmRequestSlot,
    rescheduleRequestSlot,
    updateRequestStatus,
    cancelRequest,
    reopenRequest,
    addStaffNote,
  } = useDemoStore();

  const [slotDate, setSlotDate] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [duration, setDuration] = useState<number>(45);
  const [noteInput, setNoteInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (request) {
      setSlotDate(request.assignedDate || request.preferredDate);
      setSlotTime(request.assignedTime || request.preferredTime);
      setDuration(request.durationMinutes || settings.defaultDurationMinutes);
      setFeedback(null);
    }
  }, [request, settings.defaultDurationMinutes]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (request) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [request, onClose]);

  if (!request) return null;

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleConfirm = () => {
    confirmRequestSlot(request.id, slotDate, slotTime, duration);
    showFeedback(`Confirmed on ${slotDate} at ${slotTime}.`);
  };

  const handleReschedule = () => {
    rescheduleRequestSlot(request.id, slotDate, slotTime);
    showFeedback(`Rescheduled to ${slotDate} at ${slotTime}.`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addStaffNote(request.id, noteInput);
    setNoteInput('');
    showFeedback('Staff note saved.');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" data-native-cursor="true">
      <div
        className="fixed inset-0 bg-[#0D1A30]/45 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Appointment request ${request.reference}`}
        className="relative z-10 w-full max-w-xl bg-white h-full shadow-2xl border-l border-[#DCE5F0] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DCE5F0] flex items-center justify-between gap-4 bg-[#EFF5FB]/60">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold text-[#346CF0] tabular-nums">
                {request.reference}
              </span>
              <StatusBadge status={request.status} compact />
            </div>
            <h2 className="font-editorial text-xl font-semibold text-[#142746] mt-1">
              {request.patientName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/staff-demo/requests/${request.id}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE5F0] bg-white text-xs font-semibold text-[#142746] hover:bg-[#EFF5FB]"
            >
              <span>Full Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="w-9 h-9 rounded-lg border border-[#DCE5F0] bg-white inline-flex items-center justify-center text-[#526075] hover:text-[#142746]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {feedback && (
            <div className="px-4 py-2.5 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-xs font-semibold text-[#166534]">
              {feedback}
            </div>
          )}

          {/* Request Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#EFF5FB]/50 border border-[#DCE5F0] text-sm">
            <div>
              <p className="text-xs text-[#526075]">Service Requested</p>
              <p className="font-semibold text-[#142746] mt-0.5">{request.serviceName}</p>
            </div>
            <div>
              <p className="text-xs text-[#526075]">Visit Type & Format</p>
              <p className="font-medium text-[#1B2637] mt-0.5 capitalize inline-flex items-center gap-1.5">
                {request.visitFormat === 'virtual' && <Video className="w-3.5 h-3.5 text-[#346CF0]" />}
                <span>{request.patientType} · {request.visitFormat}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-[#526075]">Requested Preference</p>
              <p className="font-medium text-[#1B2637] mt-0.5 tabular-nums">
                {request.preferredDate} · {request.preferredTime}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#526075]">Assigned Calendar Slot</p>
              <p className="font-semibold text-[#346CF0] mt-0.5 tabular-nums">
                {request.assignedDate && request.assignedTime
                  ? `${request.assignedDate} · ${request.assignedTime}`
                  : 'Unscheduled'}
              </p>
            </div>
            <div className="col-span-2 pt-2 border-t border-[#DCE5F0]/80 flex flex-wrap gap-4 text-xs text-[#1B2637]">
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Phone className="w-3.5 h-3.5 text-[#526075]" />
                {request.patientPhone}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#526075]" />
                {request.patientEmail}
              </span>
              <span className="text-[#526075] capitalize">
                Prefers: {request.preferredContact}
              </span>
            </div>
          </div>

          {/* Schedule Assignment / Reschedule Panel */}
          <div className="border border-[#DCE5F0] rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#142746] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#346CF0]" />
                <span>Assign or Reschedule Calendar Slot</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#526075] mb-1">Date</label>
                <input
                  type="date"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs text-[#142746] tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#526075] mb-1">Time</label>
                <select
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs text-[#142746] bg-white tabular-nums"
                >
                  {settings.sampleTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#526075] mb-1">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs text-[#142746] bg-white tabular-nums"
                >
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>60 min</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {request.status !== 'confirmed' ? (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-xs font-semibold transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Appointment</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReschedule}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#142746] hover:bg-[#0D1A30] text-white text-xs font-semibold transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Save Rescheduled Time</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  updateRequestStatus(request.id, 'contacted', 'Patient contacted regarding slot options.');
                  showFeedback('Marked as Contacted.');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-xs font-semibold text-[#142746]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Mark Contacted</span>
              </button>

              {request.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() => {
                    cancelRequest(request.id);
                    showFeedback('Request cancelled.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              )}

              {(request.status === 'cancelled' || request.status === 'closed') ? (
                <button
                  type="button"
                  onClick={() => {
                    reopenRequest(request.id);
                    showFeedback('Request reopened.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-xs font-semibold text-[#142746]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reopen</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    updateRequestStatus(request.id, 'closed', 'Closed in demo workspace.');
                    showFeedback('Marked Closed.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-xs font-semibold text-[#526075]"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              )}
            </div>
          </div>

          {/* Nonclinical Staff Notes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#142746]">Nonclinical Staff Notes</h3>
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Add scheduling or comfort preference note..."
                className="flex-1 px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs text-[#142746]"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#142746] text-white text-xs font-semibold hover:bg-[#0D1A30] shrink-0"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {request.notes.length === 0 ? (
              <p className="text-xs text-[#526075]">No staff notes recorded yet.</p>
            ) : (
              <ul className="space-y-2">
                {request.notes.map((n) => (
                  <li key={n.id} className="p-3 rounded-lg bg-[#F5F2ED] text-xs text-[#1B2637]">
                    <p>{n.text}</p>
                    <p className="text-[11px] text-[#526075] mt-1 tabular-nums">
                      {n.author} · {format(new Date(n.createdAt), 'MMM d, h:mm a')}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Status History */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#142746]">Status History</h3>
            <ol className="space-y-3 border-l border-[#DCE5F0] ml-2 pl-4">
              {request.statusHistory
                .slice()
                .reverse()
                .map((h) => (
                  <li key={h.id} className="text-xs">
                    <p className="font-semibold text-[#142746]">
                      {getStatusLabel(h.status)}
                    </p>
                    <p className="text-[#526075] mt-0.5">{h.note}</p>
                    <p className="text-[11px] text-[#526075] mt-0.5 tabular-nums">
                      {h.actor} · {format(new Date(h.timestamp), 'MMM d, yyyy h:mm a')}
                    </p>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
