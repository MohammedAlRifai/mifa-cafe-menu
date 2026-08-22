import React from 'react';
import { MIFA_LOGO_URL } from '../data/menuData';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onOpenSearch,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const isAr = language === 'ar';

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f7faf5]/90 dark:bg-[#0d1310]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-b border-[#c0c9c3]/20 dark:border-[#213228] transition-colors duration-200">
      <div className="h-20 max-w-[1280px] mx-auto flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 lg:px-16">
        {/* Brand Logo & Name */}
        <div
          className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            alt="Mifa Logo"
            className="w-10 h-10 rounded-full object-cover border border-[#c0c9c3]/30 dark:border-[#D4AF37]/40 ring-4 ring-[#f7faf5] dark:ring-[#131b17] shadow-xs"
            src={MIFA_LOGO_URL}
          />
          <span className="text-xl sm:text-2xl text-[#013220] dark:text-[#f7faf5] tracking-widest font-bold">
            MIFA
          </span>
        </div>

        {/* Action Buttons: Dark Mode, Search & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            id="dark-mode-toggle-btn"
            onClick={onToggleDarkMode}
            className="p-2 rounded-full text-[#404945] dark:text-[#c0c9c3] hover:text-[#013220] dark:hover:text-[#D4AF37] hover:bg-[#e0e3de]/50 dark:hover:bg-[#1a2620] transition-all cursor-pointer active:scale-95 flex items-center justify-center"
            title={
              isDarkMode
                ? isAr
                  ? 'تفعيل الوضع الفاتح'
                  : 'Switch to Light Mode'
                : isAr
                ? 'تفعيل الوضع الداكن'
                : 'Switch to Dark Mode'
            }
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[21px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Quick Search */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-full text-[#404945] dark:text-[#c0c9c3] hover:text-[#013220] dark:hover:text-[#D4AF37] hover:bg-[#e0e3de]/50 dark:hover:bg-[#1a2620] transition-all cursor-pointer active:scale-95"
            title={isAr ? 'بحث في القائمة' : 'Search Menu'}
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Language Toggle Button */}
          <button
            id="language-toggle-btn"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c0c9c3]/40 dark:border-[#213228] text-[#404945] dark:text-[#c0c9c3] hover:text-[#013220] dark:hover:text-[#D4AF37] hover:border-[#013220] dark:hover:border-[#D4AF37]/50 transition-all cursor-pointer bg-white/60 dark:bg-[#131b17] active:scale-95"
            aria-label="Toggle language"
          >
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span className="text-xs font-bold tracking-widest">{isAr ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
