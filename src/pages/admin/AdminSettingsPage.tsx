import { useState } from 'react';
import { Check, Info, Plus, X } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DemoResetControl } from '../../components/admin/DemoResetControl';
import { PageMeta } from '../../components/PageMeta';

const WEEKDAYS = [
  { id: 1, label: 'Mon' },
  { id: 2, label: 'Tue' },
  { id: 3, label: 'Wed' },
  { id: 4, label: 'Thu' },
  { id: 5, label: 'Fri' },
  { id: 6, label: 'Sat' },
  { id: 0, label: 'Sun' },
];

export function AdminSettingsPage() {
  const { settings, updateSettings } = useDemoStore();
  const [newSlot, setNewSlot] = useState('');
  const [savedMsg, setSavedMsg] = useState(false);

  const toggleWeekday = (dayId: number) => {
    const exists = settings.enabledWeekdays.includes(dayId);
    const next = exists
      ? settings.enabledWeekdays.filter((d) => d !== dayId)
      : [...settings.enabledWeekdays, dayId];
    if (next.length === 0) return;
    updateSettings({ enabledWeekdays: next });
    flashSaved();
  };

  const flashSaved = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const handleAddSlot = () => {
    const trimmed = newSlot.trim();
    if (!trimmed || settings.sampleTimeSlots.includes(trimmed)) return;
    updateSettings({ sampleTimeSlots: [...settings.sampleTimeSlots, trimmed] });
    setNewSlot('');
    flashSaved();
  };

  const handleRemoveSlot = (slot: string) => {
    if (settings.sampleTimeSlots.length <= 1) return;
    updateSettings({
      sampleTimeSlots: settings.sampleTimeSlots.filter((s) => s !== slot),
    });
    flashSaved();
  };

  return (
    <>
      <PageMeta
        title="Demo Settings | Staff Demo"
        description="Configure simulated appointment hours, slot options, and reset sample demo data."
      />
      <AdminLayout title="Demo Schedule Settings" breadcrumb="Settings">
        {() => (
          <div className="max-w-3xl space-y-6">
            <div className="p-4 rounded-xl bg-[#EFF5FB] border border-[#DCE5F0] flex items-start gap-3 text-xs text-[#1B2637]">
              <Info className="w-4 h-4 text-[#346CF0] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Demo Mode Configuration:</strong> Adjusting these simulated parameters immediately updates the public Appointment Request calendar (active weekdays, sample time preferences, and virtual consultation option). These settings represent illustrative proposal defaults, not live clinic hours.
              </span>
            </div>

            {savedMsg && (
              <div className="px-4 py-2.5 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-xs font-semibold text-[#166534] inline-flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Simulated schedule settings updated.</span>
              </div>
            )}

            <div className="bg-white border border-[#DCE5F0] rounded-xl p-6 space-y-6">
              <div>
                <h2 className="font-editorial text-lg font-semibold text-[#142746]">
                  Simulated Clinic Hours & Duration
                </h2>
                <p className="text-xs text-[#526075] mt-0.5">
                  Georgia Holistic Dentist operates weekday appointments by reservation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142746] mb-1.5">
                    Simulated Start Hour
                  </label>
                  <select
                    value={settings.simulatedStartHour}
                    onChange={(e) => {
                      updateSettings({ simulatedStartHour: Number(e.target.value) });
                      flashSaved();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white tabular-nums"
                  >
                    {[8, 9, 10].map((h) => (
                      <option key={h} value={h}>
                        {h}:00 AM
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142746] mb-1.5">
                    Simulated End Hour
                  </label>
                  <select
                    value={settings.simulatedEndHour}
                    onChange={(e) => {
                      updateSettings({ simulatedEndHour: Number(e.target.value) });
                      flashSaved();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white tabular-nums"
                  >
                    {[16, 17, 18].map((h) => (
                      <option key={h} value={h}>
                        {h - 12}:00 PM
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142746] mb-1.5">
                    Default Visit Duration
                  </label>
                  <select
                    value={settings.defaultDurationMinutes}
                    onChange={(e) => {
                      updateSettings({
                        defaultDurationMinutes: Number(e.target.value) as 30 | 45 | 60,
                      });
                      flashSaved();
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE5F0] text-sm text-[#142746] bg-white tabular-nums"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142746] mb-2">
                  Enabled Appointment Days in Patient Calendar
                </label>
                <div className="flex flex-wrap gap-2">
                  {WEEKDAYS.map((day) => {
                    const active = settings.enabledWeekdays.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => toggleWeekday(day.id)}
                        className={`px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                          active
                            ? 'bg-[#346CF0] border-[#346CF0] text-white'
                            : 'bg-white border-[#DCE5F0] text-[#526075] hover:bg-[#EFF5FB]'
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#142746] mb-2">
                  Sample Time Preferences Offered
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {settings.sampleTimeSlots.map((slot) => (
                    <span
                      key={slot}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF5FB] border border-[#DCE5F0] text-xs font-medium text-[#142746] tabular-nums"
                    >
                      <span>{slot}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(slot)}
                        aria-label={`Remove ${slot}`}
                        className="text-[#526075] hover:text-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-xs">
                  <input
                    type="text"
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    placeholder="e.g., 11:30 AM"
                    className="flex-1 px-3 py-2 rounded-lg border border-[#DCE5F0] text-xs text-[#142746]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSlot}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#142746] text-white text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE5F0] flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#142746]">
                    Allow Virtual (Zoom) Consultation Requests
                  </p>
                  <p className="text-xs text-[#526075]">
                    Toggle virtual option availability in the patient appointment wizard.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateSettings({ allowVirtualRequests: !settings.allowVirtualRequests });
                    flashSaved();
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    settings.allowVirtualRequests
                      ? 'bg-[#346CF0] text-white'
                      : 'bg-[#F1F5F9] text-[#526075]'
                  }`}
                >
                  {settings.allowVirtualRequests ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>

            {/* Reset Demo Section */}
            <div className="bg-white border border-[#DCE5F0] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-editorial text-lg font-semibold text-[#142746]">
                  Reset Demo Workspace
                </h3>
                <p className="text-xs text-[#526075] mt-1">
                  Restore all sample requests, confirmed calendar blocks, follow-ups, and activity logs to the original deterministic state.
                </p>
              </div>
              <DemoResetControl />
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
