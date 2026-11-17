import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  Calendar,
  ClipboardList,
  Clock,
  LayoutDashboard,
  Settings,
  X,
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { metrics } = useDemoStore();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
      isActive
        ? 'bg-[#346CF0] text-white'
        : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`;

  const content = (
    <div className="flex flex-col h-full bg-[#142746] text-white w-[260px] shrink-0 select-none">
      <div className="px-5 h-[68px] flex items-center justify-between border-b border-white/10">
        <Link to="/staff-demo" onClick={onCloseMobile} className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-md bg-white text-[#142746] inline-flex items-center justify-center text-xs font-bold">
            GH
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Staff Demo</p>
            <p className="text-[11px] text-[#93B4E5]">Georgia Holistic Dentist</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation drawer"
          className="lg:hidden w-9 h-9 rounded-lg inline-flex items-center justify-center text-slate-300 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto" aria-label="Staff Demo Navigation">
        <NavLink to="/staff-demo" end onClick={onCloseMobile} className={linkClass}>
          <span className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Overview</span>
          </span>
        </NavLink>

        <NavLink to="/staff-demo/calendar" onClick={onCloseMobile} className={linkClass}>
          <span className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Calendar</span>
          </span>
          <span className="font-mono text-[11px] tabular-nums opacity-85">
            {metrics.confirmed}
          </span>
        </NavLink>

        <NavLink to="/staff-demo/requests" onClick={onCloseMobile} className={linkClass}>
          <span className="flex items-center gap-2.5">
            <ClipboardList className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Appointment Requests</span>
          </span>
          {metrics.newEnquiries > 0 && (
            <span className="font-mono text-[11px] tabular-nums bg-white/15 px-1.5 py-0.5 rounded">
              {metrics.newEnquiries}
            </span>
          )}
        </NavLink>

        <NavLink to="/staff-demo/follow-ups" onClick={onCloseMobile} className={linkClass}>
          <span className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Follow-Ups</span>
          </span>
          {metrics.openFollowUps > 0 && (
            <span className="font-mono text-[11px] tabular-nums opacity-85">
              {metrics.openFollowUps}
            </span>
          )}
        </NavLink>

        <NavLink to="/staff-demo/activity" onClick={onCloseMobile} className={linkClass}>
          <span className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Activity</span>
          </span>
        </NavLink>

        <NavLink to="/staff-demo/settings" onClick={onCloseMobile} className={linkClass}>
          <span className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Demo Settings</span>
          </span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2.5">
        <div className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 leading-relaxed">
          Simulated practice data stored locally in browser. No real patient PHI.
        </div>
        <Link
          to="/"
          onClick={onCloseMobile}
          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-white text-[#142746] hover:bg-[#EFF5FB] text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Website</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block shrink-0">{content}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#0D1A30]/60 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full">{content}</div>
        </div>
      )}
    </>
  );
};
