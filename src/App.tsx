import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Language,
  CategoryId,
  MenuItem,
} from './types';
import { MENU_ITEMS, CATEGORIES } from './data/menuData';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { FeaturedHeader } from './components/FeaturedHeader';
import { ProductCard } from './components/ProductCard';
import { ViewAllButton } from './components/ViewAllButton';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { SplashScreen } from './components/SplashScreen';

// ═══════════════════════════════════════════════════════════════
// 🚀 MAINTENANCE MODE TOGGLE
// Change this ONE variable to turn the site on/off
// true  = Website is LIVE
// false = Website is in MAINTENANCE MODE
// ═══════════════════════════════════════════════════════════════
const IS_SITE_LIVE = false; // <─── CHANGE THIS TO false TO TURN OFF THE SITE

// Maintenance page component
const MaintenancePage: React.FC<{ language: Language }> = ({ language }) => {
  const isRTL = language === 'ar';
  
  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7faf5',
        color: '#191d19',
        fontFamily: 'system-ui, sans-serif',
        gap: '0.5rem',
        padding: '1rem',
        textAlign: 'center'
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: '500', margin: 0 }}>
        {isRTL ? 'الخدمة غير متاحة مؤقتاً' : 'Service Temporarily Unavailable'}
      </h1>
      <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>
        {isRTL 
          ? 'نعمل على تحسين الخدمة، نعتذر عن الإزعاج' 
          : "We're working on improving the service, sorry for the inconvenience"}
      </p>
    </div>
  );
};

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [isExpandedFullMenu, setIsExpandedFullMenu] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mifa_theme');
      if (saved) return saved === 'dark';
      return false;
    } catch {
      return false;
    }
  });

  // Modals & Panels
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync direction on html document
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync dark mode class on html document and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mifa_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mifa_theme', 'light');
    }
  }, [isDarkMode]);

  // ═══════════════════════════════════════════════════════════════
  // 🚦 MAINTENANCE MODE CHECK - Show maintenance page if site is off
  // ═══════════════════════════════════════════════════════════════
  if (!IS_SITE_LIVE) {
    return <MaintenancePage language={language} />;
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Filtered menu items based on category and expanded state
  const displayedItems = useMemo(() => {
    let items = MENU_ITEMS;

    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    } else if (!isExpandedFullMenu) {
      // In default "All" view before clicking "View All", show the 4 featured hero items
      items = items.filter((item) => item.isFeatured);
    }

    return items;
  }, [activeCategory, isExpandedFullMenu]);

  return (
    <div className="bg-[#f7faf5] dark:bg-[#0d1310] text-[#191d19] dark:text-[#f7faf5] flex flex-col min-h-screen min-h-[100dvh] transition-colors duration-200">
      {/* 0. Welcome Splash Animation (First visit only) */}
      <SplashScreen language={language} />

      {/* 1. Header (fixed) */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Spacer for fixed header */}
      <div className="h-20 w-full" />

      {/* 2. Category Nav (sticky with drag & swipe scroll) */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setIsExpandedFullMenu(true);
        }}
        language={language}
      />

      {/* 3. Main Content Container */}
      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          {/* Section Header */}
          <FeaturedHeader
            language={language}
            subtitleOverride={
              activeCategory === 'all'
                ? undefined
                : language === 'ar'
                ? `قائمة الأصناف (${displayedItems.length})`
                : `CATEGORY ITEMS (${displayedItems.length})`
            }
            titleOverride={
              activeCategory === 'all'
                ? isExpandedFullMenu
                  ? language === 'ar'
                    ? 'جميع أصناف ميفا'
                    : 'All MIFA Items'
                  : undefined
                : language === 'ar'
                ? CATEGORIES.find((c) => c.id === activeCategory)?.nameAr
                : CATEGORIES.find((c) => c.id === activeCategory)?.nameEn
            }
          />

          {/* Product Grid with Fade-in animations (2 items per row on mobile) */}
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item, idx) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  index={idx}
                  language={language}
                  onSelect={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View Full Menu Button */}
          {activeCategory === 'all' && (
            <ViewAllButton
              language={language}
              isExpanded={isExpandedFullMenu}
              onClick={() => setIsExpandedFullMenu(!isExpandedFullMenu)}
            />
          )}
        </div>
      </main>

      {/* 4. Footer */}
      <Footer language={language} />

      {/* Modals */}
      <ProductDetailModal
        item={selectedProduct}
        language={language}
        onClose={() => setSelectedProduct(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        language={language}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />
    </div>
  );
};

export default App;
