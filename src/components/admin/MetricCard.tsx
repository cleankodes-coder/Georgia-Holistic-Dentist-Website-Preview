import React from 'react';

interface MetricCardProps {
  label: string;
  value: number;
  helper: string;
  accent?: 'blue' | 'navy' | 'amber' | 'green' | 'slate';
  onClick?: () => void;
}

const ACCENT_DOTS: Record<NonNullable<MetricCardProps['accent']>, string> = {
  blue: 'text-[#346CF0]',
  navy: 'text-[#142746]',
  amber: 'text-[#B45309]',
  green: 'text-[#15803D]',
  slate: 'text-[#526075]',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  helper,
  accent = 'navy',
  onClick,
}) => {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`w-full text-left bg-white border border-[#DCE5F0] rounded-xl p-5 transition-colors ${
        onClick ? 'hover:border-[#346CF0]/60 cursor-pointer' : ''
      }`}
    >
      <p className="text-xs font-medium text-[#526075]">{label}</p>
      <p className={`mt-2 font-editorial text-3xl font-semibold tabular-nums ${ACCENT_DOTS[accent]}`}>
        {value}
      </p>
      <p className="mt-1.5 text-xs text-[#526075]">{helper}</p>
    </Tag>
  );
};
