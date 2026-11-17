import React, { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  selectedDate: string | null; // YYYY-MM-DD
  onSelectDate: (isoDate: string) => void;
  enabledWeekdays?: number[]; // 0=Sun..6=Sat, default Mon-Fri [1,2,3,4,5]
  minDate?: Date;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  selectedDate,
  onSelectDate,
  enabledWeekdays = [1, 2, 3, 4, 5],
  minDate,
}) => {
  const today = useMemo(() => startOfDay(minDate ?? new Date()), [minDate]);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (selectedDate) {
      const parsed = new Date(`${selectedDate}T12:00:00`);
      if (!Number.isNaN(parsed.getTime())) return startOfMonth(parsed);
    }
    return startOfMonth(today);
  });

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth]);

  const canGoPrev = !isBefore(endOfMonth(subMonths(currentMonth, 1)), today);

  return (
    <div
      data-native-cursor="true"
      className="bg-white border border-[#DCE5F0] rounded-xl p-4 sm:p-5 select-none"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-editorial text-lg font-semibold text-[#142746]">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={!canGoPrev}
            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
            aria-label="Previous month"
            className="w-9 h-9 rounded-lg border border-[#DCE5F0] inline-flex items-center justify-center text-[#142746] hover:bg-[#EFF5FB] disabled:opacity-35 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
            aria-label="Next month"
            className="w-9 h-9 rounded-lg border border-[#DCE5F0] inline-flex items-center justify-center text-[#142746] hover:bg-[#EFF5FB] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-[11px] font-semibold text-[#526075] py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const iso = format(day, 'yyyy-MM-dd');
          const inMonth = isSameMonth(day, currentMonth);
          const isPast = isBefore(day, today);
          const weekdayEnabled = enabledWeekdays.includes(day.getDay());
          const disabled = !inMonth || isPast || !weekdayEnabled;
          const isSelected = selectedDate === iso;
          const isToday = isSameDay(day, today);

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(iso)}
              aria-label={format(day, 'EEEE, MMMM d, yyyy')}
              aria-pressed={isSelected}
              className={`h-10 sm:h-11 rounded-lg text-sm font-medium tabular-nums transition-all flex flex-col items-center justify-center relative ${
                !inMonth
                  ? 'text-transparent pointer-events-none'
                  : isSelected
                  ? 'bg-[#346CF0] text-white font-semibold shadow-xs'
                  : disabled
                  ? 'text-slate-300 bg-slate-50/60 cursor-not-allowed'
                  : isToday
                  ? 'bg-[#EFF5FB] text-[#142746] border border-[#346CF0]/40 hover:bg-[#346CF0]/10'
                  : 'text-[#1B2637] hover:bg-[#EFF5FB] hover:text-[#142746]'
              }`}
            >
              <span>{format(day, 'd')}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#DCE5F0]/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#526075]">
        <span>Simulated weekday clinic preferences only</span>
        <span className="font-medium text-[#142746]">Past & weekend dates disabled</span>
      </div>
    </div>
  );
};
