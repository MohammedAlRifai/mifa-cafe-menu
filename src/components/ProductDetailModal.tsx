import React, { useState } from 'react';
import { MenuItem, Language } from '../types';
import { handleImageFallback } from '../utils/imageUtils';

interface ProductDetailModalProps {
  item: MenuItem | null;
  language: Language;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  language,
  onClose,
}) => {
  if (!item) return null;

  const isAr = language === 'ar';
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedOpts, setSelectedOpts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (item.customizations) {
      item.customizations.forEach((group) => {
        if (group.options.length > 0) {
          initial[group.id] = group.options[0].nameAr;
        }
      });
    }
    return initial;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        id="product-detail-modal"
        className="relative w-full max-w-lg bg-[#f7faf5] dark:bg-[#131b17] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-[#c0c9c3]/30 dark:border-[#213228] transition-colors"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-[#1a2620]/90 hover:bg-white dark:hover:bg-[#22332a] text-[#013220] dark:text-[#f7faf5] flex items-center justify-center shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer border border-transparent dark:border-[#213228]"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-72 bg-[#e6eae3] dark:bg-[#16201b] overflow-hidden">
            {/* Animated Skeleton Shimmer Overlay */}
            {!isLoaded && (
              <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-[#dbe0d7] via-[#f1f4ef] to-[#dbe0d7] dark:from-[#131b17] dark:via-[#213228] dark:to-[#131b17]" />
            )}

            <img
              src={item.image}
              alt={isAr ? item.nameAr : item.nameEn}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
              }`}
              onLoad={() => setIsLoaded(true)}
              onError={(e) => {
                setIsLoaded(true);
                handleImageFallback(e, item.id, item.image);
              }}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Badge on image */}
            <div className="absolute bottom-4 start-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#ffdf90]">
                  {item.badgeIcon}
                </span>
                <span>{isAr ? item.badgeTextAr : item.badgeTextEn}</span>
              </span>
              {item.originAr && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                  <span>{isAr ? item.originAr : item.originEn}</span>
                </span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-bold text-[#013220] dark:text-[#f7faf5]">
                {isAr ? item.nameAr : item.nameEn}
              </h3>
              <span className="text-xl sm:text-2xl font-bold text-[#D4AF37] whitespace-nowrap">
                {item.price} {isAr ? 'ر.س' : 'SAR'}
              </span>
            </div>

            <p className="text-sm text-[#404945] dark:text-[#9eaba3] leading-relaxed">
              {isAr ? item.descriptionAr : item.descriptionEn}
            </p>

            {/* Customizations / Options Details */}
            {item.customizations && item.customizations.length > 0 && (
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-sm text-[#013220] dark:text-[#f7faf5] border-b border-[#c0c9c3]/20 dark:border-[#213228] pb-2">
                  {isAr ? 'الخيارات المتاحة وطريقة التقديم' : 'Available Options & Serving'}
                </h4>

                {item.customizations.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <div className="text-xs font-semibold text-[#404945] dark:text-[#9eaba3]">
                      {isAr ? group.titleAr : group.titleEn}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.options.map((opt) => {
                        const isSelected = selectedOpts[group.id] === opt.nameAr;
                        return (
                          <button
                            key={opt.nameAr}
                            type="button"
                            onClick={() =>
                              setSelectedOpts((prev) => ({
                                ...prev,
                                [group.id]: opt.nameAr,
                              }))
                            }
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all text-start cursor-pointer ${
                              isSelected
                                ? 'bg-[#013220] dark:bg-[#D4AF37] text-white dark:text-[#0d1310] border-[#013220] dark:border-[#D4AF37] shadow-xs'
                                : 'bg-white dark:bg-[#1a2620] text-[#191d19] dark:text-[#f7faf5] border-[#c0c9c3]/40 dark:border-[#213228] hover:border-[#013220] dark:hover:border-[#D4AF37]/50'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {isSelected && (
                                <span className="material-symbols-outlined text-[16px] text-[#ffdf90] dark:text-[#0d1310]">
                                  check
                                </span>
                              )}
                              <span>{isAr ? opt.nameAr : opt.nameEn}</span>
                            </span>
                            {opt.price > 0 && (
                              <span
                                className={`text-xs font-bold ${
                                  isSelected ? 'text-[#ffdf90] dark:text-[#0d1310]' : 'text-[#D4AF37]'
                                }`}
                              >
                                +{opt.price} {isAr ? 'ر.س' : 'SAR'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#0d1310] border-t border-[#c0c9c3]/20 dark:border-[#213228] flex items-center justify-end shadow-lg transition-colors">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-full bg-[#013220] dark:bg-[#D4AF37] hover:bg-[#003c2d] dark:hover:bg-[#e5c158] text-white dark:text-[#0d1310] font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer text-center"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
