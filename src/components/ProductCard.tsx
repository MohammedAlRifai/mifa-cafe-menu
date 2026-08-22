import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MenuItem, Language } from '../types';
import { handleImageFallback } from '../utils/imageUtils';

interface ProductCardProps {
  item: MenuItem;
  language: Language;
  onSelect: (item: MenuItem) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  language,
  onSelect,
  index = 0,
}) => {
  const isAr = language === 'ar';
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.article
      id={`product-card-${item.id}`}
      onClick={() => onSelect(item)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        delay: Math.min(index * 0.05, 0.3),
      }}
      layout
      className="group flex flex-col gap-2.5 sm:gap-4 cursor-pointer"
    >
      <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#e6eae3] dark:bg-[#16201b] border border-transparent dark:border-[#213228] shadow-xs transition-all duration-300 group-hover:scale-[1.02] dark:group-hover:border-[#D4AF37]/40">
        {/* Animated Skeleton Shimmer Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-[#dbe0d7] via-[#f1f4ef] to-[#dbe0d7] dark:from-[#131b17] dark:via-[#213228] dark:to-[#131b17]" />
        )}

        <img
          alt={isAr ? item.nameAr : item.nameEn}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
          }`}
          src={item.image}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setIsLoaded(true);
            handleImageFallback(e, item.id, item.image);
          }}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:gap-2 px-1 sm:px-2">
        <div className="flex justify-between items-start gap-2 sm:gap-4">
          <h3 className="font-bold text-[#013220] dark:text-[#f7faf5] text-[13px] sm:text-[15px] group-hover:text-[#D4AF37] dark:group-hover:text-[#D4AF37] transition-colors leading-snug">
            {isAr ? item.nameAr : item.nameEn}
          </h3>
          <span className="font-bold text-[#D4AF37] text-[13px] sm:text-[15px] whitespace-nowrap">
            {item.price} {isAr ? 'ر.س' : 'SAR'}
          </span>
        </div>

        <p className="text-[11px] sm:text-[13px] leading-tight text-[#404945] dark:text-[#9eaba3] line-clamp-2">
          {isAr ? item.descriptionAr : item.descriptionEn}
        </p>

        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 text-[#707974] dark:text-[#88968f]">
          <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-[#D4AF37]">
            {item.badgeIcon}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold">
            {isAr ? item.badgeTextAr : item.badgeTextEn}
          </span>
        </div>
      </div>
    </motion.article>
  );
};
