import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <footer className="w-full bg-[#013220] dark:bg-[#080d0a] text-[#f7faf5] mt-auto pt-6 pb-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] border-t border-transparent dark:border-[#213228]/60 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 flex flex-col items-center gap-4 justify-center text-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-sm font-bold text-[#f7faf5] tracking-widest uppercase">
            MIFA
          </div>
          <div
            className={`text-xs text-[#f7faf5]/90 uppercase ${
              isAr ? 'tracking-normal' : 'tracking-widest'
            }`}
          >
            {isAr
              ? 'جميع الحقوق محفوظة لميفا كافيه © 2026'
              : 'All rights reserved MIFA Cafe © 2026'}
          </div>
        </div>
      </div>
    </footer>
  );
};
