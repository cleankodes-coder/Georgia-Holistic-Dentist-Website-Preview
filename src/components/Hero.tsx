import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface InnerHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  primaryActionLabel?: string;
  primaryActionTo?: string;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
}

export const InnerHero: React.FC<InnerHeroProps> = ({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  primaryActionLabel = 'Request an Appointment',
  primaryActionTo = '/appointments',
  secondaryActionLabel,
  secondaryActionTo,
}) => {
  return (
    <section className="bg-[#EFF5FB] border-b border-[#DCE5F0]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider text-[#346CF0] mb-3">
              {eyebrow}
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#142746] leading-[1.12] tracking-tight">
              {title}
            </h1>
            <p className="mt-5 text-base sm:text-[17px] text-[#526075] leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to={primaryActionTo}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#346CF0] hover:bg-[#2558D4] text-white text-sm font-semibold transition-colors"
              >
                <span>{primaryActionLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              {secondaryActionLabel && secondaryActionTo && (
                <Link
                  to={secondaryActionTo}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#DCE5F0] hover:border-[#142746]/40 text-[#142746] text-sm font-semibold transition-colors"
                >
                  <span>{secondaryActionLabel}</span>
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#DCE5F0] bg-white shadow-sm">
              <SafeImage src={imageSrc} alt={imageAlt} className="w-full h-full" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
