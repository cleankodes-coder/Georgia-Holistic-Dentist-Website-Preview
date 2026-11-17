import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { VERIFIED_SERVICES } from '../../data/practiceData';
import { useDemoStore } from '../../store/demoStore';
import { AppointmentStatus } from '../../types/demo';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RequestTable } from '../../components/admin/RequestTable';
import { PageMeta } from '../../components/PageMeta';

export function AdminRequestsPage() {
  const { requests } = useDemoStore();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'preferred' | 'reference'>('updated');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests
      .filter((r) => {
        if (statusFilter !== 'all') {
          if (statusFilter === 'closed') {
            if (r.status !== 'closed' && r.status !== 'cancelled') return false;
          } else if (statusFilter === 'awaiting_confirmation') {
            if (r.status !== 'awaiting_confirmation' && r.status !== 'contacted') return false;
          } else if (r.status !== statusFilter) {
            return false;
          }
        }
        if (serviceFilter !== 'all' && r.serviceSlug !== serviceFilter) return false;
        if (q) {
          const hay = `${r.reference} ${r.patientName} ${r.patientEmail} ${r.serviceName}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'preferred') return a.preferredDate.localeCompare(b.preferredDate);
        if (sortBy === 'reference') return b.reference.localeCompare(a.reference);
        return b.updatedAt.localeCompare(a.updatedAt);
      });
  }, [requests, query, statusFilter, serviceFilter, sortBy]);

  const statusTabs: { value: string; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New' },
    { value: 'awaiting_confirmation', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'reschedule_requested', label: 'Reschedule' },
    { value: 'cancelled' as AppointmentStatus, label: 'Cancelled' },
    { value: 'closed', label: 'Closed' },
  ];

  return (
    <>
      <PageMeta
        title="Appointment Requests | Staff Demo"
        description="Search, filter, and manage demo patient appointment requests."
      />
      <AdminLayout title="Appointment Requests" breadcrumb="Requests">
        {(openDrawer) => (
          <div className="space-y-5">
            {/* Search & Filters */}
            <div className="bg-white border border-[#DCE5F0] rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5 relative">
                  <Search className="w-4 h-4 text-[#526075] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search reference, sample patient, or service..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] focus:border-[#346CF0]"
                  />
                </div>

                <div className="md:col-span-4">
                  <select
                    aria-label="Filter by service"
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white"
                  >
                    <option value="all">All Verified Services</option>
                    {VERIFIED_SERVICES.map((svc) => (
                      <option key={svc.slug} value={svc.slug}>
                        {svc.shortTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <select
                    aria-label="Sort requests"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'updated' | 'preferred' | 'reference')}
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white"
                  >
                    <option value="updated">Sort: Last Updated</option>
                    <option value="preferred">Sort: Preferred Date</option>
                    <option value="reference">Sort: Reference #</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setStatusFilter(tab.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      statusFilter === tab.value
                        ? 'bg-[#142746] text-white'
                        : 'bg-[#EFF5FB] text-[#526075] hover:text-[#142746]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <RequestTable requests={filtered} onSelectRequest={openDrawer} />
          </div>
        )}
      </AdminLayout>
    </>
  );
}
