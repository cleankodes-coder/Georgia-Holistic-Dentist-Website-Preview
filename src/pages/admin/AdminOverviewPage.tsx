import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, Calendar, Clock, Video } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { MetricCard } from '../../components/admin/MetricCard';
import { ActivityTimeline } from '../../components/admin/ActivityTimeline';
import { StatusBadge } from '../../components/StatusBadge';
import { PageMeta } from '../../components/PageMeta';

export function AdminOverviewPage() {
  const { metrics, requests, calendarEvents, activityLogs } = useDemoStore();
  const navigate = useNavigate();
  const todayIso = format(new Date(), 'yyyy-MM-dd');

  const todaysSchedule = calendarEvents
    .filter((evt) => evt.date === todayIso)
    .sort((a, b) => a.time.localeCompare(b.time));

  const upcomingSchedule = calendarEvents
    .filter((evt) => evt.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 5);

  const actionQueue = requests.filter((r) =>
    ['new', 'awaiting_confirmation', 'reschedule_requested', 'contacted'].includes(r.status)
  );

  return (
    <>
      <PageMeta
        title="Staff Demo Overview | Georgia Holistic Dentist"
        description="Interactive simulated appointment management overview for Georgia Holistic Dentist."
      />
      <AdminLayout title="Practice Scheduling Overview" breadcrumb="Overview">
        {(openDrawer) => (
          <div className="space-y-8">
            {/* Live Computed Metrics */}
            <section aria-label="Sample Request Counts">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                <MetricCard
                  label="Total Requests"
                  value={metrics.total}
                  helper="All demo records"
                  accent="navy"
                  onClick={() => navigate('/staff-demo/requests')}
                />
                <MetricCard
                  label="New Enquiries"
                  value={metrics.newEnquiries}
                  helper="Needs initial review"
                  accent="blue"
                  onClick={() => navigate('/staff-demo/requests?status=new')}
                />
                <MetricCard
                  label="Awaiting Confirm"
                  value={metrics.awaitingConfirmation}
                  helper="Contacted / pending"
                  accent="amber"
                  onClick={() => navigate('/staff-demo/requests?status=awaiting_confirmation')}
                />
                <MetricCard
                  label="Confirmed"
                  value={metrics.confirmed}
                  helper="On demo calendar"
                  accent="green"
                  onClick={() => navigate('/staff-demo/calendar')}
                />
                <MetricCard
                  label="Reschedule Req."
                  value={metrics.rescheduleRequested}
                  helper="Alternate slot needed"
                  accent="amber"
                  onClick={() => navigate('/staff-demo/requests?status=reschedule_requested')}
                />
                <MetricCard
                  label="Closed / Cancelled"
                  value={metrics.closedOrCancelled}
                  helper="Completed or archived"
                  accent="slate"
                  onClick={() => navigate('/staff-demo/requests?status=closed')}
                />
              </div>
            </section>

            {/* Main 2-Column Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 cols: Action Queue + Today's Schedule */}
              <div className="lg:col-span-7 space-y-6">
                {/* Requests Requiring Action */}
                <div className="bg-white border border-[#DCE5F0] rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#DCE5F0] flex items-center justify-between gap-4">
                    <div>
                      <h2 className="font-editorial text-lg font-semibold text-[#142746]">
                        Requests Requiring Staff Action
                      </h2>
                      <p className="text-xs text-[#526075]">
                        Click any request to review, assign a calendar slot, or update status.
                      </p>
                    </div>
                    <Link
                      to="/staff-demo/requests"
                      className="text-xs font-semibold text-[#346CF0] hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <span>All Requests</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {actionQueue.length === 0 ? (
                    <div className="p-8 text-center text-sm text-[#526075]">
                      All sample appointment requests have been processed.
                    </div>
                  ) : (
                    <ul className="divide-y divide-[#DCE5F0]">
                      {actionQueue.map((req) => (
                        <li
                          key={req.id}
                          onClick={() => openDrawer(req)}
                          className="px-5 py-3.5 hover:bg-[#EFF5FB]/50 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-semibold text-[#346CF0] tabular-nums">
                                {req.reference}
                              </span>
                              <span className="text-sm font-semibold text-[#142746] truncate">
                                {req.patientName}
                              </span>
                            </div>
                            <p className="text-xs text-[#526075] mt-0.5 truncate">
                              {req.serviceName} · Preferred {req.preferredDate} at {req.preferredTime}
                            </p>
                          </div>
                          <div className="flex items-center gap-2.5 shrink-0">
                            <StatusBadge status={req.status} compact />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Today's & Upcoming Demo Schedule */}
                <div className="bg-white border border-[#DCE5F0] rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#DCE5F0] flex items-center justify-between gap-4">
                    <div>
                      <h2 className="font-editorial text-lg font-semibold text-[#142746]">
                        {todaysSchedule.length > 0 ? "Today's Demo Schedule" : 'Upcoming Confirmed Schedule'}
                      </h2>
                      <p className="text-xs text-[#526075] tabular-nums">
                        {format(new Date(), 'EEEE, MMMM d, yyyy')}
                      </p>
                    </div>
                    <Link
                      to="/staff-demo/calendar"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE5F0] text-xs font-semibold text-[#142746] hover:bg-[#EFF5FB]"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#346CF0]" />
                      <span>Open Calendar</span>
                    </Link>
                  </div>

                  {(todaysSchedule.length > 0 ? todaysSchedule : upcomingSchedule).length === 0 ? (
                    <div className="p-8 text-center text-sm text-[#526075]">
                      No confirmed demo appointments scheduled yet. Confirm a request above to populate the calendar.
                    </div>
                  ) : (
                    <ul className="divide-y divide-[#DCE5F0]">
                      {(todaysSchedule.length > 0 ? todaysSchedule : upcomingSchedule).map((evt) => {
                        const linked = requests.find((r) => r.id === evt.requestId);
                        return (
                          <li
                            key={evt.id}
                            onClick={() => linked && openDrawer(linked)}
                            className="px-5 py-3.5 hover:bg-[#EFF5FB]/50 cursor-pointer flex items-center justify-between gap-4 transition-colors"
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div className="px-2.5 py-1.5 rounded-lg bg-[#EFF5FB] border border-[#DCE5F0] text-center shrink-0">
                                <p className="font-mono text-xs font-semibold text-[#142746] tabular-nums">
                                  {evt.time}
                                </p>
                                <p className="text-[10px] text-[#526075] tabular-nums">{evt.date}</p>
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-[#142746] flex items-center gap-1.5 truncate">
                                  <span>{evt.patientName}</span>
                                  {evt.visitFormat === 'virtual' && (
                                    <Video className="w-3.5 h-3.5 text-[#346CF0] shrink-0" />
                                  )}
                                </p>
                                <p className="text-xs text-[#526075] truncate">
                                  {evt.serviceName} · {evt.durationMinutes} min
                                </p>
                              </div>
                            </div>
                            <StatusBadge status={evt.status} compact />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              {/* Right 5 cols: Upcoming Confirmed & Recent Activity */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-[#DCE5F0] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-editorial text-lg font-semibold text-[#142746]">
                      Recent Demo Activity
                    </h2>
                    <Link
                      to="/staff-demo/activity"
                      className="text-xs font-semibold text-[#346CF0] hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <ActivityTimeline logs={activityLogs} limit={6} />
                </div>

                <div className="bg-[#142746] text-white rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[#93B4E5] text-xs font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>End-to-End Demo Walkthrough</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Submit a new patient visit request on the public site, return here to confirm its time slot, and watch the calendar and metrics update immediately.
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2">
                    <Link
                      to="/appointments"
                      className="px-3.5 py-2 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-xs font-semibold transition-colors"
                    >
                      Open Patient Request Form
                    </Link>
                    <Link
                      to="/staff-demo/calendar"
                      className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                    >
                      Go to Calendar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
