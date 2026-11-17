import { useMemo, useState } from 'react';
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Inbox,
  Video,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { PageMeta } from '../../components/PageMeta';
import { StatusBadge } from '../../components/StatusBadge';

type CalendarViewMode = 'month' | 'week' | 'day';

export function AdminCalendarPage() {
  const { calendarEvents, requests, settings } = useDemoStore();
  const [view, setView] = useState<CalendarViewMode>('week');
  const [cursorDate, setCursorDate] = useState<Date>(() => new Date());

  const unscheduledRequests = useMemo(
    () =>
      requests.filter((r) =>
        ['new', 'awaiting_confirmation', 'contacted'].includes(r.status)
      ),
    [requests]
  );

  const handlePrev = () => {
    if (view === 'month') setCursorDate((d) => subMonths(d, 1));
    else if (view === 'week') setCursorDate((d) => subWeeks(d, 1));
    else setCursorDate((d) => subDays(d, 1));
  };

  const handleNext = () => {
    if (view === 'month') setCursorDate((d) => addMonths(d, 1));
    else if (view === 'week') setCursorDate((d) => addWeeks(d, 1));
    else setCursorDate((d) => addDays(d, 1));
  };

  const handleToday = () => setCursorDate(new Date());

  const headerLabel = useMemo(() => {
    if (view === 'month') return format(cursorDate, 'MMMM yyyy');
    if (view === 'day') return format(cursorDate, 'EEEE, MMMM d, yyyy');
    const start = startOfWeek(cursorDate, { weekStartsOn: 1 });
    const end = addDays(start, 4);
    return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`;
  }, [cursorDate, view]);

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursorDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(cursorDate), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [cursorDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(cursorDate, { weekStartsOn: 1 });
    return [0, 1, 2, 3, 4].map((offset) => addDays(start, offset));
  }, [cursorDate]);

  return (
    <>
      <PageMeta
        title="Staff Demo Calendar | Georgia Holistic Dentist"
        description="Month, week, and day simulated dental practice calendar for managing appointment requests."
      />
      <AdminLayout title="Practice Schedule Calendar" breadcrumb="Calendar">
        {(openDrawer) => (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Main Calendar Area */}
            <div className="xl:col-span-9 bg-white border border-[#DCE5F0] rounded-xl overflow-hidden">
              {/* Calendar Toolbar */}
              <div className="p-4 sm:p-5 border-b border-[#DCE5F0] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous period"
                    className="w-9 h-9 rounded-lg border border-[#DCE5F0] inline-flex items-center justify-center text-[#142746] hover:bg-[#EFF5FB]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleToday}
                    className="px-3.5 py-2 rounded-lg border border-[#DCE5F0] text-xs font-semibold text-[#142746] hover:bg-[#EFF5FB]"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next period"
                    className="w-9 h-9 rounded-lg border border-[#DCE5F0] inline-flex items-center justify-center text-[#142746] hover:bg-[#EFF5FB]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <h2 className="font-editorial text-lg sm:text-xl font-semibold text-[#142746] ml-2 tabular-nums">
                    {headerLabel}
                  </h2>
                </div>

                {/* View Mode Segmented Control */}
                <div className="inline-flex items-center p-1 bg-[#EFF5FB] rounded-lg border border-[#DCE5F0]">
                  {(['month', 'week', 'day'] as CalendarViewMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setView(mode)}
                      className={`px-3.5 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                        view === mode
                          ? 'bg-white text-[#142746] shadow-xs'
                          : 'text-[#526075] hover:text-[#142746]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* MONTH VIEW */}
              {view === 'month' && (
                <div>
                  <div className="grid grid-cols-7 border-b border-[#DCE5F0] bg-[#EFF5FB]/50 text-center text-[11px] font-semibold text-[#526075] py-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 divide-x divide-y divide-[#DCE5F0]">
                    {monthDays.map((day) => {
                      const iso = format(day, 'yyyy-MM-dd');
                      const inMonth = isSameMonth(day, cursorDate);
                      const isToday = isSameDay(day, new Date());
                      const dayEvents = calendarEvents
                        .filter((e) => e.date === iso)
                        .sort((a, b) => a.time.localeCompare(b.time));

                      return (
                        <div
                          key={iso}
                          className={`min-h-[108px] p-2 transition-colors ${
                            !inMonth ? 'bg-slate-50/70 text-slate-400' : 'bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setCursorDate(day);
                                setView('day');
                              }}
                              className={`w-7 h-7 rounded-full text-xs font-semibold tabular-nums inline-flex items-center justify-center ${
                                isToday
                                  ? 'bg-[#346CF0] text-white'
                                  : 'text-[#142746] hover:bg-[#EFF5FB]'
                              }`}
                            >
                              {format(day, 'd')}
                            </button>
                          </div>

                          <div className="space-y-1">
                            {dayEvents.map((evt) => {
                              const linked = requests.find((r) => r.id === evt.requestId);
                              const isReschedule = evt.status === 'reschedule_requested';
                              return (
                                <button
                                  key={evt.id}
                                  type="button"
                                  onClick={() => linked && openDrawer(linked)}
                                  className={`w-full text-left px-2 py-1 rounded text-[11px] font-medium truncate border transition-colors ${
                                    isReschedule
                                      ? 'bg-[#FFEDD5] border-[#FED7AA] text-[#9A3412]'
                                      : 'bg-[#EFF5FB] border-[#BFDBFE] text-[#142746] hover:border-[#346CF0]'
                                  }`}
                                >
                                  <span className="font-mono tabular-nums mr-1">{evt.time}</span>
                                  <span>{evt.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* WEEK VIEW */}
              {view === 'week' && (
                <div className="overflow-x-auto">
                  <div className="min-w-[720px] grid grid-cols-5 divide-x divide-[#DCE5F0]">
                    {weekDays.map((day) => {
                      const iso = format(day, 'yyyy-MM-dd');
                      const isToday = isSameDay(day, new Date());
                      const dayEvents = calendarEvents
                        .filter((e) => e.date === iso)
                        .sort((a, b) => a.time.localeCompare(b.time));

                      return (
                        <div key={iso} className="min-h-[420px] flex flex-col">
                          <div
                            className={`px-3 py-3 border-b border-[#DCE5F0] text-center ${
                              isToday ? 'bg-[#EFF5FB]' : 'bg-[#F8FAFC]'
                            }`}
                          >
                            <p className="text-[11px] font-semibold text-[#526075]">
                              {format(day, 'EEE')}
                            </p>
                            <p
                              className={`text-base font-semibold tabular-nums mt-0.5 ${
                                isToday ? 'text-[#346CF0]' : 'text-[#142746]'
                              }`}
                            >
                              {format(day, 'MMM d')}
                            </p>
                          </div>

                          <div className="p-2.5 space-y-2.5 flex-1">
                            {dayEvents.length === 0 ? (
                              <p className="text-[11px] text-slate-400 text-center py-6">
                                No confirmed slots
                              </p>
                            ) : (
                              dayEvents.map((evt) => {
                                const linked = requests.find((r) => r.id === evt.requestId);
                                const isReschedule = evt.status === 'reschedule_requested';
                                return (
                                  <button
                                    key={evt.id}
                                    type="button"
                                    onClick={() => linked && openDrawer(linked)}
                                    className={`w-full text-left p-3 rounded-xl border transition-all hover:shadow-xs ${
                                      isReschedule
                                        ? 'bg-[#FFEDD5]/70 border-[#FED7AA]'
                                        : 'bg-[#EFF5FB]/80 border-[#BFDBFE] hover:border-[#346CF0]'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="font-mono text-[11px] font-semibold text-[#346CF0] tabular-nums">
                                        {evt.time}
                                      </span>
                                      {evt.visitFormat === 'virtual' && (
                                        <Video className="w-3.5 h-3.5 text-[#346CF0]" />
                                      )}
                                    </div>
                                    <p className="text-xs font-semibold text-[#142746] mt-1">
                                      {evt.patientName}
                                    </p>
                                    <p className="text-[11px] text-[#526075] mt-0.5 line-clamp-2">
                                      {evt.serviceName}
                                    </p>
                                    <div className="mt-2 pt-2 border-t border-[#DCE5F0]/70 flex items-center justify-between text-[10px] text-[#526075]">
                                      <span className="tabular-nums">{evt.durationMinutes} min</span>
                                      <span className="font-semibold text-[#142746]">
                                        {isReschedule ? 'Reschedule' : 'Confirmed'}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DAY VIEW */}
              {view === 'day' && (
                <div className="divide-y divide-[#DCE5F0]">
                  {settings.sampleTimeSlots.map((slot) => {
                    const iso = format(cursorDate, 'yyyy-MM-dd');
                    const slotEvents = calendarEvents.filter(
                      (e) => e.date === iso && e.time === slot
                    );
                    return (
                      <div key={slot} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-28 shrink-0 flex items-center gap-2 text-xs font-mono font-semibold text-[#142746] tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-[#346CF0]" />
                          <span>{slot}</span>
                        </div>
                        <div className="flex-1">
                          {slotEvents.length === 0 ? (
                            <p className="text-xs text-[#526075] py-2">
                              Open simulated weekday block
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {slotEvents.map((evt) => {
                                const linked = requests.find((r) => r.id === evt.requestId);
                                return (
                                  <button
                                    key={evt.id}
                                    type="button"
                                    onClick={() => linked && openDrawer(linked)}
                                    className="text-left p-3.5 rounded-xl bg-[#EFF5FB] border border-[#BFDBFE] hover:border-[#346CF0] flex items-center justify-between gap-3"
                                  >
                                    <div>
                                      <p className="text-sm font-semibold text-[#142746]">
                                        {evt.patientName}
                                      </p>
                                      <p className="text-xs text-[#526075] mt-0.5">
                                        {evt.serviceName} · {evt.durationMinutes} min
                                      </p>
                                    </div>
                                    <StatusBadge status={evt.status} compact />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Sidebar: Pending Requests Ready to Schedule */}
            <aside className="xl:col-span-3 bg-white border border-[#DCE5F0] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-[#DCE5F0] bg-[#EFF5FB]/60">
                <h3 className="text-sm font-semibold text-[#142746] flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-[#346CF0]" />
                  <span>Unscheduled Queue ({unscheduledRequests.length})</span>
                </h3>
                <p className="text-xs text-[#526075] mt-0.5">
                  Click a request to confirm and place onto the calendar.
                </p>
              </div>

              {unscheduledRequests.length === 0 ? (
                <p className="p-6 text-xs text-[#526075] text-center">
                  No pending unscheduled requests.
                </p>
              ) : (
                <ul className="divide-y divide-[#DCE5F0]">
                  {unscheduledRequests.map((req) => (
                    <li
                      key={req.id}
                      onClick={() => openDrawer(req)}
                      className="p-4 hover:bg-[#EFF5FB]/50 cursor-pointer transition-colors space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-semibold text-[#346CF0] tabular-nums">
                          {req.reference}
                        </span>
                        <StatusBadge status={req.status} compact />
                      </div>
                      <p className="text-xs font-semibold text-[#142746]">{req.patientName}</p>
                      <p className="text-[11px] text-[#526075] line-clamp-1">{req.serviceName}</p>
                      <p className="text-[11px] text-[#1B2637] tabular-nums">
                        Prefers: {req.preferredDate} · {req.preferredTime}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
