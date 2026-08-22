import React from 'react';
import { Language } from '../types';

interface FeaturedHeaderProps {
  language: Language;
  titleOverride?: string;
  subtitleOverride?: string;
}

export const FeaturedHeader: React.FC<FeaturedHeaderProps> = ({
  language,
  titleOverride,
  subtitleOverride,
}) => {
  const isAr = language === 'ar';

  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <span
        className={`text-xs font-bold text-[#D4AF37] uppercase ${
          isAr ? 'tracking-normal font-semibold text-[13px]' : 'tracking-[0.2em]'
        }`}
      >
        {subtitleOverride || (isAr ? 'اختياراتنا لك' : 'OUR SELECTION')}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#013220] dark:text-[#f7faf5] text-center transition-colors">
        {titleOverride || (isAr ? 'القائمة المميزة' : 'Featured Menu')}
      </h2>
    </div>
  );
};
