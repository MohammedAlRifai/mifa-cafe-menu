import React, { useState, useMemo } from 'react';
import { MenuItem, Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { handleImageFallback } from '../utils/imageUtils';

interface SearchModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSelectProduct: (item: MenuItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  language,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const isAr = language === 'ar';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MENU_ITEMS.filter((item) =>
      item.nameAr.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.descriptionAr.toLowerCase().includes(q) ||
      item.descriptionEn.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        id="search-modal"
        className="w-full max-w-xl bg-[#f7faf5] dark:bg-[#131b17] rounded-2xl shadow-2xl overflow-hidden border border-[#c0c9c3]/30 dark:border-[#213228] flex flex-col transition-colors"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#c0c9c3]/20 dark:border-[#213228] bg-white dark:bg-[#1a2620] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#D4AF37] text-[24px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isAr
                ? 'ابحث بالاسم، مثل: V60، كرواسون، تيراميسو...'
                : 'Search by item name, e.g. V60, Croissant...'
            }
            className="flex-1 bg-transparent border-none text-sm sm:text-base text-[#191d19] dark:text-[#f7faf5] placeholder-[#707974] dark:placeholder-[#88968f] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#707974] dark:text-[#88968f] hover:text-[#191d19] dark:hover:text-[#f7faf5]"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-[#013220] dark:text-[#D4AF37] hover:bg-[#e0e3de]/50 dark:hover:bg-[#22332a] rounded-lg cursor-pointer"
          >
            {isAr ? 'إلغاء' : 'Close'}
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-[#707974] dark:text-[#88968f]">
              <span className="material-symbols-outlined text-[40px] text-[#D4AF37] mb-2">
                local_cafe
              </span>
              <p className="text-xs sm:text-sm">
                {isAr
                  ? 'اكتب اسم المشروب أو الحلى للبحث السريع'
                  : 'Type drink or dessert name to search'}
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-[#707974] dark:text-[#88968f]">
              <p className="text-sm">
                {isAr
                  ? 'لم يتم العثور على نتائج مطابقة'
                  : 'No matching items found'}
              </p>
            </div>
          ) : (
            results.map((item) => (
              <SearchItemRow
                key={item.id}
                item={item}
                isAr={isAr}
                onSelectProduct={onSelectProduct}
                onClose={onClose}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const SearchItemRow: React.FC<{
  item: MenuItem;
  isAr: boolean;
  onSelectProduct: (item: MenuItem) => void;
  onClose: () => void;
}> = ({ item, isAr, onSelectProduct, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => {
        onSelectProduct(item);
        onClose();
      }}
      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white dark:hover:bg-[#1a2620] border border-transparent hover:border-[#c0c9c3]/30 dark:hover:border-[#213228] transition-all cursor-pointer group"
    >
      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#e6eae3] dark:bg-[#16201b] border border-transparent dark:border-[#213228] shrink-0">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-[#dbe0d7] via-[#f1f4ef] to-[#dbe0d7] dark:from-[#131b17] dark:via-[#213228] dark:to-[#131b17]" />
        )}
        <img
          src={item.image}
          alt={isAr ? item.nameAr : item.nameEn}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setIsLoaded(true);
            handleImageFallback(e, item.id, item.image);
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-[#013220] dark:text-[#f7faf5] group-hover:text-[#D4AF37] transition-colors truncate">
          {isAr ? item.nameAr : item.nameEn}
        </h4>
        <p className="text-xs text-[#707974] dark:text-[#9eaba3] line-clamp-1">
          {isAr ? item.descriptionAr : item.descriptionEn}
        </p>
      </div>
      <span className="text-sm font-bold text-[#D4AF37] whitespace-nowrap">
        {item.price} {isAr ? 'ر.س' : 'SAR'}
      </span>
    </div>
  );
};
