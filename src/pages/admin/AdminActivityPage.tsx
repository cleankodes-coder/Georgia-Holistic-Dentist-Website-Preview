import { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ActivityTimeline } from '../../components/admin/ActivityTimeline';
import { PageMeta } from '../../components/PageMeta';
import { ActivityLog } from '../../types/demo';

export function AdminActivityPage() {
  const { activityLogs } = useDemoStore();
  const [typeFilter, setTypeFilter] = useState<'all' | ActivityLog['type']>('all');

  const filtered =
    typeFilter === 'all'
      ? activityLogs
      : activityLogs.filter((l) => l.type === typeFilter);

  return (
    <>
      <PageMeta
        title="Demo Activity Log | Staff Demo"
        description="Chronological audit log of simulated patient requests and staff scheduling actions."
      />
      <AdminLayout title="Demo Activity Log" breadcrumb="Activity">
        {() => (
          <div className="bg-white border border-[#DCE5F0] rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-editorial text-lg font-semibold text-[#142746]">
                  Chronological Workflow Timeline
                </h2>
                <p className="text-xs text-[#526075]">
                  Every patient submission, calendar confirmation, reschedule, and staff note appears here.
                </p>
              </div>
              <select
                aria-label="Filter activity type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | ActivityLog['type'])}
                className="px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs font-medium text-[#142746] bg-white"
              >
                <option value="all">All Events ({activityLogs.length})</option>
                <option value="request_submitted">Patient Submissions</option>
                <option value="calendar_updated">Calendar Confirmations & Moves</option>
                <option value="status_changed">Status Changes</option>
                <option value="note_added">Staff Notes</option>
                <option value="follow_up">Follow-Ups</option>
              </select>
            </div>

            <ActivityTimeline logs={filtered} />
          </div>
        )}
      </AdminLayout>
    </>
  );
}
