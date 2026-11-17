import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  caption?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  caption,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFF5FB] via-white to-[#F5F2ED] border border-[#DCE5F0] text-[#142746] p-6 text-center ${className}`}
      >
        <Sparkles className="w-6 h-6 text-[#346CF0] mb-2" aria-hidden="true" />
        <p className="text-xs font-medium text-[#1B2637] max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover transition-transform duration-700 ease-out"
      />
      {caption && (
        <figcaption className="sr-only">{caption}</figcaption>
      )}
    </figure>
  );
};
