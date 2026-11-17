import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [hiddenOverControl, setHiddenOverControl] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isNativeZone = Boolean(
        target.closest('input, textarea, select, [data-native-cursor], [contenteditable="true"]')
      );
      setHiddenOverControl(isNativeZone);

      const isInteractive = Boolean(
        target.closest('a, button, [data-cursor="magnetic"], [role="button"]')
      );
      setInteractive(isInteractive && !isNativeZone);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!enabled || !visible || hiddenOverControl) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block transition-transform duration-150 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
          interactive
            ? 'w-10 h-10 border-[#346CF0]/60 bg-[#346CF0]/10 scale-110'
            : 'w-5 h-5 border-[#142746]/35 bg-transparent'
        }`}
      />
    </div>
  );
}
