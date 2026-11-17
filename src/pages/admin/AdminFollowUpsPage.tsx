import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Circle, Save } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { PageMeta } from '../../components/PageMeta';

export function AdminFollowUpsPage() {
  const { followUps, requests, toggleFollowUpComplete, updateFollowUp } = useDemoStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftDate, setDraftDate] = useState('');
  const [draftNote, setDraftNote] = useState('');
  const [filter, setFilter] = useState<'open' | 'completed' | 'all'>('open');

  const filtered = followUps.filter((f) => {
    if (filter === 'open') return !f.completed;
    if (filter === 'completed') return f.completed;
    return true;
  });

  return (
    <>
      <PageMeta
        title="Follow-Ups Queue | Staff Demo"
        description="Manage simulated patient callback and confirmation follow-ups."
      />
      <AdminLayout title="Staff Follow-Ups" breadcrumb="Follow-Ups">
        {(openDrawer) => (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center p-1 bg-white border border-[#DCE5F0] rounded-lg">
                {(['open', 'completed', 'all'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilter(tab)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                      filter === tab
                        ? 'bg-[#142746] text-white'
                        : 'text-[#526075] hover:text-[#142746]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#526075] tabular-nums">
                Showing {filtered.length} of {followUps.length} sample follow-ups
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border border-[#DCE5F0] rounded-xl p-10 text-center">
                <p className="text-sm font-semibold text-[#142746]">No follow-ups in this view</p>
                <p className="text-xs text-[#526075] mt-1">
                  New patient demo requests automatically create a follow-up task here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((fu) => {
                  const linked = requests.find((r) => r.id === fu.requestId);
                  const isEditing = editingId === fu.id;

                  return (
                    <div
                      key={fu.id}
                      className={`bg-white border border-[#DCE5F0] rounded-xl p-5 transition-opacity ${
                        fu.completed ? 'opacity-75' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <button
                            type="button"
                            onClick={() => toggleFollowUpComplete(fu.id)}
                            aria-label={fu.completed ? 'Mark incomplete' : 'Mark completed'}
                            className="mt-0.5 text-[#346CF0] hover:scale-110 transition-transform"
                          >
                            {fu.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                            ) : (
                              <Circle className="w-5 h-5 text-[#6E95CB]" />
                            )}
                          </button>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-semibold text-[#346CF0] tabular-nums">
                                {fu.reference}
                              </span>
                              <span className="text-sm font-semibold text-[#142746]">
                                {fu.patientName}
                              </span>
                              <span className="text-xs text-[#526075]">· {fu.serviceName}</span>
                            </div>
                            <p className={`text-sm mt-1 ${fu.completed ? 'line-through text-[#526075]' : 'text-[#1B2637]'}`}>
                              {fu.reason}
                            </p>
                            {!isEditing && fu.note && (
                              <p className="text-xs text-[#526075] mt-1.5">{fu.note}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFF5FB] text-xs font-medium text-[#142746] tabular-nums">
                            <Calendar className="w-3.5 h-3.5 text-[#346CF0]" />
                            <span>Due {fu.dueDate}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (isEditing) {
                                setEditingId(null);
                              } else {
                                setEditingId(fu.id);
                                setDraftDate(fu.dueDate);
                                setDraftNote(fu.note);
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg border border-[#DCE5F0] text-xs font-semibold text-[#142746] hover:bg-[#EFF5FB]"
                          >
                            {isEditing ? 'Cancel' : 'Reschedule / Note'}
                          </button>
                          {linked && (
                            <button
                              type="button"
                              onClick={() => openDrawer(linked)}
                              className="px-3 py-1.5 rounded-lg bg-[#142746] text-white text-xs font-semibold hover:bg-[#0D1A30]"
                            >
                              Open Request
                            </button>
                          )}
                        </div>
                      </div>

                      {isEditing && (
                        <div className="mt-4 pt-4 border-t border-[#DCE5F0] grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                          <div className="sm:col-span-3">
                            <label className="block text-xs font-medium text-[#526075] mb-1">
                              Next Follow-Up Date
                            </label>
                            <input
                              type="date"
                              value={draftDate}
                              onChange={(e) => setDraftDate(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs text-[#142746] tabular-nums"
                            />
                          </div>
                          <div className="sm:col-span-7">
                            <label className="block text-xs font-medium text-[#526075] mb-1">
                              Follow-Up Note
                            </label>
                            <input
                              type="text"
                              value={draftNote}
                              onChange={(e) => setDraftNote(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs text-[#142746]"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <button
                              type="button"
                              onClick={() => {
                                updateFollowUp(fu.id, draftDate, draftNote);
                                setEditingId(null);
                              }}
                              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#346CF0] text-white text-xs font-semibold hover:bg-[#2558D4]"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="text-xs text-[#526075]">
              Want to test generating a new follow-up?{' '}
              <Link to="/appointments" className="text-[#346CF0] font-semibold hover:underline">
                Submit a sample patient request →
              </Link>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
