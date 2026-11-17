import React from 'react';
import {
  CheckCircle2,
  Clock,
  Inbox,
  PhoneCall,
  RefreshCw,
  XCircle,
  Archive,
} from 'lucide-react';
import { AppointmentStatus } from '../types/demo';

interface StatusMeta {
  label: string;
  classes: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const STATUS_MAP: Record<AppointmentStatus, StatusMeta> = {
  new: {
    label: 'New Enquiry',
    classes: 'bg-[#EFF5FB] text-[#1D4ED8] border-[#BFDBFE]',
    Icon: Inbox,
  },
  awaiting_confirmation: {
    label: 'Awaiting Confirmation',
    classes: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    Icon: Clock,
  },
  contacted: {
    label: 'Contacted',
    classes: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
    Icon: PhoneCall,
  },
  confirmed: {
    label: 'Confirmed',
    classes: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
    Icon: CheckCircle2,
  },
  reschedule_requested: {
    label: 'Reschedule Requested',
    classes: 'bg-[#FFEDD5] text-[#9A3412] border-[#FED7AA]',
    Icon: RefreshCw,
  },
  cancelled: {
    label: 'Cancelled',
    classes: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
    Icon: XCircle,
  },
  closed: {
    label: 'Closed',
    classes: 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]',
    Icon: Archive,
  },
};

export function getStatusLabel(status: AppointmentStatus): string {
  return STATUS_MAP[status]?.label ?? status;
}

export const StatusBadge: React.FC<{ status: AppointmentStatus; compact?: boolean }> = ({
  status,
  compact = false,
}) => {
  const meta = STATUS_MAP[status];
  const Icon = meta.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-md font-medium whitespace-nowrap shrink-0 ${
        compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${meta.classes}`}
    >
      <Icon className={compact ? 'w-3 h-3 shrink-0' : 'w-3.5 h-3.5 shrink-0'} aria-hidden="true" />
      <span>{meta.label}</span>
    </span>
  );
};
