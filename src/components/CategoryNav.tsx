import React, { useRef, useState, useEffect } from 'react';
import { CATEGORIES } from '../data/menuData';
import { CategoryId, Language } from '../types';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  language: Language;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  language,
}) => {
  const isAr = language === 'ar';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  // Mouse drag to scroll states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const hasDraggedRef = useRef(false);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    // Check if scrollable
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setCanScrollStart(false);
      setCanScrollEnd(false);
      return;
    }

    const currentScrollAbs = Math.abs(scrollLeft);
    setCanScrollStart(currentScrollAbs > 5);
    setCanScrollEnd(currentScrollAbs < maxScroll - 5);
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [language]);

  // Scroll active category into view when changed
  useEffect(() => {
    const activeEl = document.getElementById(`category-tab-${activeCategory}`);
    if (activeEl && scrollContainerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory]);

  const handleScrollBy = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 240;
    const multiplier = direction === 'left' ? -1 : 1;
    scrollContainerRef.current.scrollBy({
      left: multiplier * scrollAmount,
      behavior: 'smooth',
    });
  };

  // Drag handlers for desktop mouse dragging & touch
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // brief timeout to prevent click from triggering after drag
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
      e.preventDefault();
      scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    }
  };

  return (
    <nav
      className="sticky top-20 z-40 w-full bg-[#f7faf5]/95 dark:bg-[#0d1310]/95 backdrop-blur-md border-b border-[#c0c9c3]/20 dark:border-[#213228] shadow-xs py-2 select-none overflow-hidden transition-colors duration-200"
      id="category-nav"
    >
      <div className="max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-16 relative flex items-center">
        {/* Scroll Left Button for desktop/devices */}
        <button
          onClick={() => handleScrollBy(isAr ? 'right' : 'left')}
          className={`hidden sm:flex absolute start-1 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-[#131b17] text-[#013220] dark:text-[#f7faf5] shadow-md border border-[#c0c9c3]/30 dark:border-[#213228] items-center justify-center transition-all duration-200 hover:bg-white dark:hover:bg-[#1a2620] active:scale-90 cursor-pointer ${
            canScrollStart ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll left"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAr ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        {/* Scrollable Container with drag & touch support restricted to horizontal axis only */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`w-full overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth px-3 py-1 cursor-grab active:cursor-grabbing ${
            isDragging ? 'cursor-grabbing select-none' : ''
          }`}
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x pan-y',
            overscrollBehaviorX: 'contain',
            overscrollBehaviorY: 'none',
          }}
        >
          <ul className="flex items-center gap-3 sm:gap-6 md:gap-8 min-w-max h-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <li key={cat.id} className="flex-shrink-0">
                  <button
                    id={`category-tab-${cat.id}`}
                    onClick={(e) => {
                      if (hasDraggedRef.current) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      onSelectCategory(cat.id);
                    }}
                    style={{ touchAction: 'pan-x pan-y' }}
                    className={`flex items-center gap-2 text-[14px] sm:text-[15px] px-3 py-2 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "font-bold text-[#D4AF37] relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-[2px] after:bg-[#D4AF37]"
                        : 'font-semibold text-[#404945] dark:text-[#9eaba3] hover:text-[#013220] dark:hover:text-[#f7faf5]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] sm:text-[20px] ${
                        isActive ? 'text-[#D4AF37]' : 'text-[#D4AF37]'
                      }`}
                    >
                      {cat.icon}
                    </span>
                    <span>{isAr ? cat.nameAr : cat.nameEn}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Scroll Right Button for desktop/devices */}
        <button
          onClick={() => handleScrollBy(isAr ? 'left' : 'right')}
          className={`hidden sm:flex absolute end-1 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-[#131b17] text-[#013220] dark:text-[#f7faf5] shadow-md border border-[#c0c9c3]/30 dark:border-[#213228] items-center justify-center transition-all duration-200 hover:bg-white dark:hover:bg-[#1a2620] active:scale-90 cursor-pointer ${
            canScrollEnd ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAr ? 'chevron_left' : 'chevron_right'}
          </span>
        </button>
      </div>
    </nav>
  );
};
