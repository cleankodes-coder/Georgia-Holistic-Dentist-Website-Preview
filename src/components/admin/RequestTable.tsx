import React from 'react';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { AppointmentRequest } from '../../types/demo';
import { StatusBadge } from '../StatusBadge';

interface RequestTableProps {
  requests: AppointmentRequest[];
  onSelectRequest: (req: AppointmentRequest) => void;
}

export const RequestTable: React.FC<RequestTableProps> = ({ requests, onSelectRequest }) => {
  if (requests.length === 0) {
    return (
      <div className="bg-white border border-[#DCE5F0] rounded-xl p-10 text-center">
        <p className="text-sm font-semibold text-[#142746]">No matching demo appointment requests</p>
        <p className="text-xs text-[#526075] mt-1">
          Adjust your search or status filter, or submit a new sample request from the patient booking wizard.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-[#DCE5F0] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DCE5F0] bg-[#EFF5FB]/60 text-[11px] font-semibold uppercase tracking-wider text-[#526075]">
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Sample Patient</th>
                <th className="py-3 px-4">Requested Service</th>
                <th className="py-3 px-4">Preferred Date / Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5F0] text-sm">
              {requests.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => onSelectRequest(req)}
                  className="hover:bg-[#EFF5FB]/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#346CF0] tabular-nums whitespace-nowrap">
                    {req.reference}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-[#142746] text-[13px]">{req.patientName}</p>
                    <p className="text-xs text-[#526075] capitalize">
                      {req.patientType} · {req.visitFormat}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-[13px] text-[#1B2637] max-w-[240px]">
                    <span className="line-clamp-1">{req.serviceName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#1B2637] tabular-nums whitespace-nowrap">
                    <p className="font-medium">
                      {req.assignedDate || req.preferredDate} · {req.assignedTime || req.preferredTime}
                    </p>
                    {req.assignedDate && (
                      <p className="text-[11px] text-[#166534]">Assigned calendar slot</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={req.status} compact />
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#526075] tabular-nums whitespace-nowrap">
                    {format(new Date(req.updatedAt), 'MMM d, h:mm a')}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRequest(req);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE5F0] bg-white hover:border-[#346CF0] text-xs font-semibold text-[#142746]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#346CF0]" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {requests.map((req) => (
          <div
            key={req.id}
            onClick={() => onSelectRequest(req)}
            className="bg-white border border-[#DCE5F0] rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold text-[#346CF0] tabular-nums">
                {req.reference}
              </span>
              <StatusBadge status={req.status} compact />
            </div>
            <div>
              <p className="font-semibold text-[#142746] text-sm">{req.patientName}</p>
              <p className="text-xs text-[#526075] mt-0.5">{req.serviceName}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-[#526075] pt-2 border-t border-[#DCE5F0]/70">
              <span className="tabular-nums">
                {req.assignedDate || req.preferredDate} · {req.assignedTime || req.preferredTime}
              </span>
              <span className="font-semibold text-[#346CF0]">Review →</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
