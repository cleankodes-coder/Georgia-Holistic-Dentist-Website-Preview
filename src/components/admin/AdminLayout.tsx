import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Menu,
  Plus,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { AppointmentRequest } from '../../types/demo';
import { AdminSidebar } from './AdminSidebar';
import { DemoResetControl } from './DemoResetControl';
import { RequestDetailDrawer } from './RequestDetailDrawer';

interface AdminLayoutProps {
  title: string;
  breadcrumb: string;
  children: (openDrawer: (req: AppointmentRequest) => void) => React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, breadcrumb, children }) => {
  const { hasEnteredStaffDemo, enterStaffDemo, requests, metrics } = useDemoStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quickSearch, setQuickSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const activeRequest = requests.find((r) => r.id === selectedId) ?? null;

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    navigate(`/staff-demo/requests?q=${encodeURIComponent(quickSearch.trim())}`);
  };

  // Polished Staff Demo Entry Transition Screen (No fake password!)
  if (!hasEnteredStaffDemo) {
    return (
      <div className="min-h-screen bg-[#EFF5FB] flex flex-col justify-between p-4 sm:p-8">
        <div className="max-w-3xl w-full mx-auto my-auto bg-white border border-[#DCE5F0] rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#142746] text-white px-6 sm:px-10 py-8">
            <p className="text-xs font-semibold tracking-wider text-[#93B4E5]">
              Georgia Holistic Dentist · Interactive Practice Proposal
            </p>
            <h1 className="font-editorial text-2xl sm:text-4xl font-semibold mt-2 leading-tight">
              Explore the Appointment Management Demo
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Step into the front-desk coordination workspace to see how patient appointment requests submitted on the website flow into a live weekday calendar, status queue, and follow-up timeline.
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#EFF5FB] border border-[#DCE5F0]">
                <p className="font-mono text-xl font-semibold text-[#142746] tabular-nums">
                  {metrics.total}
                </p>
                <p className="text-xs font-semibold text-[#142746] mt-1">Sample Enquiries</p>
                <p className="text-xs text-[#526075] mt-0.5">Including any requests you submitted</p>
              </div>
              <div className="p-4 rounded-xl bg-[#EFF5FB] border border-[#DCE5F0]">
                <p className="font-mono text-xl font-semibold text-[#346CF0] tabular-nums">
                  {metrics.confirmed}
                </p>
                <p className="text-xs font-semibold text-[#142746] mt-1">Scheduled Calendar Slots</p>
                <p className="text-xs text-[#526075] mt-0.5">Interactive Month / Week / Day views</p>
              </div>
              <div className="p-4 rounded-xl bg-[#EFF5FB] border border-[#DCE5F0]">
                <p className="font-mono text-xl font-semibold text-[#B45309] tabular-nums">
                  {metrics.openFollowUps}
                </p>
                <p className="text-xs font-semibold text-[#142746] mt-1">Open Follow-Ups</p>
                <p className="text-xs text-[#526075] mt-0.5">Callbacks, confirmations & notes</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F2ED] border border-[#DCE5F0] flex items-start gap-3 text-xs text-[#1B2637]">
              <ShieldAlert className="w-4 h-4 text-[#142746] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Pre-Sales Demonstration Notice:</strong> All records inside this workspace are fictional sample data persisted locally in your browser. No authentication is claimed, and no real patient health records or backend database are connected.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#DCE5F0] hover:bg-[#EFF5FB] text-sm font-semibold text-[#142746] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Public Website</span>
              </Link>

              <button
                type="button"
                onClick={enterStaffDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors shadow-xs"
              >
                <span>Enter Staff Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" data-native-cursor="true">
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Utility Bar */}
        <header className="sticky top-0 z-30 h-[68px] bg-white border-b border-[#DCE5F0] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open staff demo menu"
              className="lg:hidden w-10 h-10 rounded-lg border border-[#DCE5F0] inline-flex items-center justify-center text-[#142746]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#526075] truncate">
                Staff Demo / {breadcrumb}
              </p>
              <h1 className="font-editorial text-lg sm:text-xl font-semibold text-[#142746] truncate">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {location.pathname !== '/staff-demo/requests' && (
              <form onSubmit={handleQuickSearch} className="hidden md:flex items-center relative">
                <Search className="w-3.5 h-3.5 text-[#526075] absolute left-3 pointer-events-none" />
                <input
                  type="search"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Search reference or name..."
                  className="pl-8 pr-3 py-1.5 w-52 rounded-lg border border-[#DCE5F0] text-xs text-[#142746] bg-[#F8FAFC] focus:bg-white focus:border-[#346CF0]"
                />
              </form>
            )}

            <Link
              to="/appointments"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Test Patient Request</span>
              <span className="sm:hidden">New</span>
            </Link>

            <div className="hidden sm:block">
              <DemoResetControl compact />
            </div>
          </div>
        </header>

        {/* Simulated Mode Sub-Banner */}
        <div className="bg-[#EFF5FB] border-b border-[#DCE5F0] px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#1B2637]">
          <span className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#346CF0]" aria-hidden="true" />
            <span>
              <strong>Simulated Practice Schedule:</strong> Changes made here sync immediately with local demo persistence.
            </span>
          </span>
          <span className="text-[#526075] tabular-nums">
            {metrics.newEnquiries} new · {metrics.confirmed} confirmed · {metrics.openFollowUps} follow-ups
          </span>
        </div>

        {/* Main Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          {children((req) => setSelectedId(req.id))}
        </main>
      </div>

      <RequestDetailDrawer
        request={activeRequest}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
};
