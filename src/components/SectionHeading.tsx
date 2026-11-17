import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  return (
    <div
      className={`${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`text-xs font-semibold tracking-wider mb-3 ${
            isDark ? 'text-[#93B4E5]' : 'text-[#346CF0]'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-editorial text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.14] tracking-tight ${
          isDark ? 'text-white' : 'text-[#142746]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-[17px] leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-[#526075]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
