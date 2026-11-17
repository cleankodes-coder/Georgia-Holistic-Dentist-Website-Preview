import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Video } from 'lucide-react';
import { ServiceDefinition } from '../types/demo';
import { PRACTICE_IMAGES } from '../data/practiceData';
import { SafeImage } from './SafeImage';

interface ServiceCardProps {
  service: ServiceDefinition;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  const image = PRACTICE_IMAGES[service.imageKey];

  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group block bg-white border border-[#DCE5F0] rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:border-[#346CF0]/55 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(20,39,70,0.14)] ${
        featured ? 'md:grid md:grid-cols-12' : 'flex flex-col h-full'
      }`}
    >
      {/* Clinical Photographic Frame */}
      <div
        className={`relative overflow-hidden bg-[#EFF5FB] ${
          featured
            ? 'md:col-span-6 aspect-[16/10] md:aspect-auto md:min-h-[340px]'
            : 'aspect-[16/10]'
        }`}
      >
        <SafeImage
          src={image.src}
          alt={service.imageAlt}
          className="w-full h-full group-hover:scale-[1.045] transition-transform duration-700 ease-out"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0D1A30]/40 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300"
        />
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white/95">
          <span className="font-mono text-[11px] font-semibold tracking-wider tabular-nums">
            {service.number} / {service.category}
          </span>
          {service.supportsVirtual && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/95">
              <Video className="w-3 h-3 text-[#93B4E5]" aria-hidden="true" />
              <span>Zoom Consult</span>
            </span>
          )}
        </div>
      </div>

      {/* Editorial Body */}
      <div
        className={`p-6 sm:p-7 flex flex-col justify-between ${
          featured ? 'md:col-span-6 md:p-9 lg:p-10' : 'flex-1'
        }`}
      >
        <div>
          <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-wider text-[#346CF0] uppercase mb-3">
            <span className="w-5 h-px bg-[#346CF0]" aria-hidden="true" />
            <span>{service.category}</span>
          </div>

          <h3
            className={`font-editorial font-semibold text-[#142746] group-hover:text-[#346CF0] transition-colors leading-[1.2] ${
              featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-[22px]'
            }`}
          >
            {service.title}
          </h3>

          <p className="mt-3 text-sm sm:text-[15px] text-[#526075] leading-relaxed">
            {service.summary}
          </p>

          {featured && (
            <ul className="mt-5 pt-5 border-t border-[#DCE5F0]/80 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
              {service.highlights.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-[#1B2637] leading-snug"
                >
                  <Check className="w-3.5 h-3.5 text-[#346CF0] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#DCE5F0]/80 flex items-center justify-between text-xs font-semibold text-[#142746]">
          <span className="group-hover:text-[#346CF0] transition-colors">
            Explore clinical overview
          </span>
          <span className="w-8 h-8 rounded-full bg-[#EFF5FB] group-hover:bg-[#346CF0] text-[#142746] group-hover:text-white inline-flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
};
