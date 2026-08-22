import React from 'react';
import { Language } from '../types';

interface ViewAllButtonProps {
  language: Language;
  onClick: () => void;
  isExpanded: boolean;
}

export const ViewAllButton: React.FC<ViewAllButtonProps> = ({
  language,
  onClick,
  isExpanded,
}) => {
  const isAr = language === 'ar';

  return (
    <div className="flex justify-center mb-4 mt-6">
      <button
        id="view-full-menu-btn"
        onClick={onClick}
        className={`bg-transparent text-[#013220] dark:text-[#D4AF37] border-2 border-[#013220] dark:border-[#D4AF37]/60 px-10 py-3 rounded-xl text-sm font-bold hover:bg-[#013220] hover:text-[#f7faf5] dark:hover:bg-[#D4AF37] dark:hover:text-[#0d1310] transition-all cursor-pointer shadow-xs active:scale-98 ${
          isAr ? 'tracking-normal' : 'tracking-widest'
        }`}
      >
        {isExpanded
          ? isAr
            ? 'عرض المختارات المميزة فقط'
            : 'Show Featured Only'
          : isAr
          ? 'عرض القائمة كاملة'
          : 'View Full Menu'}
      </button>
    </div>
  );
};
