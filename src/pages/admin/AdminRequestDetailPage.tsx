import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Archive,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Mail,
  MessageSquarePlus,
  Phone,
  PhoneCall,
  RefreshCw,
  RotateCcw,
  Video,
  XCircle,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StatusBadge, getStatusLabel } from '../../components/StatusBadge';
import { PageMeta } from '../../components/PageMeta';

export function AdminRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    requests,
    settings,
    confirmRequestSlot,
    rescheduleRequestSlot,
    updateRequestStatus,
    cancelRequest,
    reopenRequest,
    addStaffNote,
  } = useDemoStore();

  const request = requests.find((r) => r.id === id || r.reference === id);
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
    }
  }, [request, settings.defaultDurationMinutes]);

  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request || !noteInput.trim()) return;
    addStaffNote(request.id, noteInput);
    setNoteInput('');
    notify('Staff note recorded.');
  };

  return (
    <>
      <PageMeta
        title={request ? `${request.reference} | Staff Demo` : 'Request Not Found | Staff Demo'}
        description="Detailed demo appointment request view and status management."
      />
      <AdminLayout
        title={request ? `Request ${request.reference}` : 'Request Not Found'}
        breadcrumb={request ? request.reference : 'Requests'}
      >
        {() =>
          !request ? (
            <div className="bg-white border border-[#DCE5F0] rounded-xl p-10 text-center space-y-4">
              <p className="font-editorial text-xl font-semibold text-[#142746]">
                Demo request record not found
              </p>
              <p className="text-sm text-[#526075]">
                It may have been cleared by resetting demo data.
              </p>
              <Link
                to="/staff-demo/requests"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#142746] text-white text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Requests</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/staff-demo/requests"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#142746] hover:text-[#346CF0]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Appointment Requests</span>
                </Link>
                <StatusBadge status={request.status} />
              </div>

              {feedback && (
                <div className="px-4 py-3 rounded-xl bg-[#DCFCE7] border border-[#BBF7D0] text-xs font-semibold text-[#166534]">
                  {feedback}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 7 cols */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Requester Card */}
                  <div className="bg-white border border-[#DCE5F0] rounded-xl p-6 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs font-semibold text-[#346CF0] tabular-nums">
                          {request.reference}
                        </p>
                        <h2 className="font-editorial text-2xl font-semibold text-[#142746] mt-1">
                          {request.patientName}
                        </h2>
                        <p className="text-xs text-[#526075] mt-1 capitalize">
                          {request.patientType} patient · {request.visitFormat} visit
                        </p>
                      </div>
                      <div className="text-xs text-[#1B2637] space-y-1">
                        <p className="flex items-center gap-1.5 tabular-nums">
                          <Phone className="w-3.5 h-3.5 text-[#526075]" />
                          {request.patientPhone}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#526075]" />
                          {request.patientEmail}
                        </p>
                        <p className="text-[#526075] capitalize">
                          Contact preference: {request.preferredContact}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#DCE5F0]">
                      <div>
                        <p className="text-xs text-[#526075]">Service Requested</p>
                        <p className="text-sm font-semibold text-[#142746] mt-0.5 flex items-center gap-1.5">
                          {request.visitFormat === 'virtual' && (
                            <Video className="w-3.5 h-3.5 text-[#346CF0] shrink-0" />
                          )}
                          <span>{request.serviceName}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#526075]">Requested Preference</p>
                        <p className="text-sm font-medium text-[#1B2637] mt-0.5 tabular-nums">
                          {request.preferredDate} · {request.preferredTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#526075]">Assigned Calendar Slot</p>
                        <p className="text-sm font-semibold text-[#346CF0] mt-0.5 tabular-nums">
                          {request.assignedDate && request.assignedTime
                            ? `${request.assignedDate} · ${request.assignedTime}`
                            : 'Not yet confirmed'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Slot & Status Controls */}
                  <div className="bg-white border border-[#DCE5F0] rounded-xl p-6 space-y-5">
                    <h3 className="font-editorial text-lg font-semibold text-[#142746] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#346CF0]" />
                      <span>Schedule Slot & Actions</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#526075] mb-1">Date</label>
                        <input
                          type="date"
                          value={slotDate}
                          onChange={(e) => setSlotDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] tabular-nums"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#526075] mb-1">Time</label>
                        <select
                          value={slotTime}
                          onChange={(e) => setSlotTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white tabular-nums"
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
                          className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white tabular-nums"
                        >
                          <option value={30}>30 minutes</option>
                          <option value={45}>45 minutes</option>
                          <option value={60}>60 minutes</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {request.status !== 'confirmed' ? (
                        <button
                          type="button"
                          onClick={() => {
                            confirmRequestSlot(request.id, slotDate, slotTime, duration);
                            notify(`Confirmed on ${slotDate} at ${slotTime}.`);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-xs font-semibold"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirm & Place on Calendar</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            rescheduleRequestSlot(request.id, slotDate, slotTime);
                            notify(`Rescheduled to ${slotDate} at ${slotTime}.`);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#142746] hover:bg-[#0D1A30] text-white text-xs font-semibold"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Reschedule Slot</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          updateRequestStatus(request.id, 'contacted', 'Patient contacted by front-desk coordinator.');
                          notify('Marked Contacted.');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-xs font-semibold text-[#142746]"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Contacted</span>
                      </button>

                      {request.status !== 'cancelled' && (
                        <button
                          type="button"
                          onClick={() => {
                            cancelRequest(request.id);
                            notify('Appointment cancelled.');
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      )}

                      {request.status === 'cancelled' || request.status === 'closed' ? (
                        <button
                          type="button"
                          onClick={() => {
                            reopenRequest(request.id);
                            notify('Request reopened.');
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-xs font-semibold text-[#142746]"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Reopen</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            updateRequestStatus(request.id, 'closed', 'Request closed.');
                            notify('Request closed.');
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-xs font-semibold text-[#526075]"
                        >
                          <Archive className="w-4 h-4" />
                          <span>Close</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Staff Notes */}
                  <div className="bg-white border border-[#DCE5F0] rounded-xl p-6 space-y-4">
                    <h3 className="font-editorial text-lg font-semibold text-[#142746]">
                      Nonclinical Staff Notes
                    </h3>
                    <form onSubmit={handleAddNote} className="flex gap-2">
                      <input
                        type="text"
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Add comfort or scheduling note..."
                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#DCE5F0] text-sm text-[#142746]"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#142746] text-white text-xs font-semibold hover:bg-[#0D1A30]"
                      >
                        <MessageSquarePlus className="w-4 h-4" />
                        <span>Add Note</span>
                      </button>
                    </form>

                    {request.notes.length === 0 ? (
                      <p className="text-xs text-[#526075]">No notes added yet.</p>
                    ) : (
                      <ul className="space-y-2.5">
                        {request.notes.map((n) => (
                          <li key={n.id} className="p-3.5 rounded-lg bg-[#F5F2ED] text-sm text-[#1B2637]">
                            <p>{n.text}</p>
                            <p className="text-xs text-[#526075] mt-1 tabular-nums">
                              {n.author} · {format(new Date(n.createdAt), 'MMM d, yyyy h:mm a')}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Right 5 cols: Status History */}
                <div className="lg:col-span-5 bg-white border border-[#DCE5F0] rounded-xl p-6 space-y-4">
                  <h3 className="font-editorial text-lg font-semibold text-[#142746]">
                    Status History
                  </h3>
                  <ol className="space-y-4 border-l border-[#DCE5F0] ml-2 pl-4">
                    {request.statusHistory
                      .slice()
                      .reverse()
                      .map((entry) => (
                        <li key={entry.id} className="text-sm">
                          <p className="font-semibold text-[#142746]">
                            {getStatusLabel(entry.status)}
                          </p>
                          <p className="text-xs text-[#526075] mt-0.5 leading-relaxed">
                            {entry.note}
                          </p>
                          <p className="text-[11px] text-[#526075] mt-1 tabular-nums">
                            {entry.actor} · {format(new Date(entry.timestamp), 'MMM d, yyyy h:mm a')}
                          </p>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          )
        }
      </AdminLayout>
    </>
  );
}
