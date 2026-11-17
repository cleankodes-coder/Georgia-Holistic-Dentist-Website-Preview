import React from 'react';
import { format } from 'date-fns';
import {
  CalendarCheck,
  ClipboardPlus,
  Clock,
  FileText,
  RefreshCw,
  RotateCcw,
  Settings,
} from 'lucide-react';
import { ActivityLog } from '../../types/demo';

const ICON_MAP: Record<ActivityLog['type'], React.ComponentType<{ className?: string }>> = {
  request_submitted: ClipboardPlus,
  status_changed: RefreshCw,
  calendar_updated: CalendarCheck,
  note_added: FileText,
  follow_up: Clock,
  settings_updated: Settings,
  demo_reset: RotateCcw,
};

export const ActivityTimeline: React.FC<{ logs: ActivityLog[]; limit?: number }> = ({
  logs,
  limit,
}) => {
  const items = limit ? logs.slice(0, limit) : logs;

  if (items.length === 0) {
    return (
      <p className="text-sm text-[#526075] py-6 text-center">
        No demo activity recorded yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[#DCE5F0]">
      {items.map((item) => {
        const Icon = ICON_MAP[item.type] ?? FileText;
        return (
          <li key={item.id} className="py-3.5 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#EFF5FB] border border-[#DCE5F0] text-[#346CF0] flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-[#142746]">{item.title}</p>
                <span className="text-[11px] text-[#526075] tabular-nums">
                  {format(new Date(item.timestamp), 'MMM d, h:mm a')}
                </span>
              </div>
              <p className="text-xs text-[#526075] mt-0.5 leading-relaxed">
                {item.description}
              </p>
              {item.reference && (
                <span className="inline-block mt-1 font-mono text-[11px] font-medium text-[#346CF0] tabular-nums">
                  {item.reference}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
