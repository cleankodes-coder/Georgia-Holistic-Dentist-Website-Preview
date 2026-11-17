import React, { useState } from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export const DemoResetControl: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { resetDemoData } = useDemoStore();
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setConfirming(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#DCFCE7] text-[#166534] text-xs font-semibold">
        <Check className="w-3.5 h-3.5" />
        <span>Sample data restored</span>
      </span>
    );
  }

  if (confirming) {
    return (
      <div className="inline-flex items-center gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
        >
          Confirm Reset
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="px-3 py-2 rounded-lg border border-[#DCE5F0] bg-white text-xs font-semibold text-[#526075]"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5F0] bg-white hover:bg-[#EFF5FB] text-[#142746] font-semibold transition-colors whitespace-nowrap shrink-0 ${
        compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-xs'
      }`}
    >
      <RotateCcw className="w-3.5 h-3.5 text-[#346CF0]" />
      <span>Reset Demo Data</span>
    </button>
  );
};
