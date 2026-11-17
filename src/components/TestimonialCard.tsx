import React from 'react';
import { Quote } from 'lucide-react';
import { TestimonialItem } from '../types/demo';

interface TestimonialCardProps {
  item: TestimonialItem;
  dark?: boolean;
  featured?: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  item,
  dark = false,
  featured = false,
}) => {
  return (
    <article
      className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 ${
        dark
          ? 'bg-white/5 border-white/15 text-white'
          : 'bg-white border-[#DCE5F0] text-[#1B2637] hover:border-[#6E95CB]'
      }`}
    >
      <div>
        <Quote
          className={`w-7 h-7 mb-5 ${dark ? 'text-[#93B4E5]' : 'text-[#346CF0]'}`}
          aria-hidden="true"
        />
        <blockquote
          className={`${
            featured
              ? 'font-editorial text-xl sm:text-2xl leading-relaxed'
              : 'text-[15px] sm:text-base leading-relaxed'
          } ${dark ? 'text-slate-100' : 'text-[#142746]'}`}
        >
          “{item.quote}”
        </blockquote>
      </div>

      <footer className={`mt-7 pt-4 border-t ${dark ? 'border-white/10' : 'border-[#DCE5F0]/80'}`}>
        <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#142746]'}`}>
          {item.attribution}
        </p>
        <p className={`text-xs mt-1 ${dark ? 'text-slate-300' : 'text-[#526075]'}`}>
          {item.context} · {item.sourceLabel}
        </p>
      </footer>
    </article>
  );
};
