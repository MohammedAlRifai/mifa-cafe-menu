import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MIFA_LOGO_URL, MENU_ITEMS } from '../data/menuData';
import { Language } from '../types';

interface SplashScreenProps {
  language: Language;
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  language,
  onFinish,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    // Check if splash screen was already shown in this session
    const hasSeenSplash = sessionStorage.getItem('mifa_intro_seen');
    if (hasSeenSplash) {
      setIsVisible(false);
      if (onFinish) onFinish();
      return;
    }

    // Collect all unique images to preload
    const imagePaths = Array.from(
      new Set([
        MIFA_LOGO_URL,
        ...MENU_ITEMS.map((item) => item.image).filter(Boolean),
      ])
    );

    let loadedCount = 0;
    const totalCount = imagePaths.length;
    let isCancelled = false;

    const handleClose = () => {
      sessionStorage.setItem('mifa_intro_seen', 'true');
      setIsVisible(false);
      if (onFinish) onFinish();
    };

    if (totalCount === 0) {
      setProgress(100);
      setIsLoaded(true);
      setTimeout(handleClose, 300);
      return;
    }

    // Safety timeout: max 3.5 seconds so user is never stuck
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) {
        setProgress(100);
        setIsLoaded(true);
        setTimeout(handleClose, 300);
      }
    }, 3500);

    // Preload each image in parallel
    imagePaths.forEach((src) => {
      const img = new Image();
      const onImageComplete = () => {
        if (isCancelled) return;
        loadedCount++;
        const currentProg = Math.min(100, Math.round((loadedCount / totalCount) * 100));
        setProgress(currentProg);

        if (loadedCount >= totalCount) {
          clearTimeout(safetyTimer);
          setIsLoaded(true);
          setTimeout(() => {
            if (!isCancelled) handleClose();
          }, 350);
        }
      };

      img.onload = onImageComplete;
      img.onerror = onImageComplete;
      img.src = src;
    });

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    sessionStorage.setItem('mifa_intro_seen', 'true');
    setIsVisible(false);
    if (onFinish) onFinish();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#013220] text-[#f7faf5] px-6 select-none overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          {/* Subtle Ambient Golden Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] bg-[#D4AF37]/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Center Brand Elements */}
          <div className="relative flex flex-col items-center gap-6 max-w-md w-full text-center z-10">
            {/* Animated Logo with Rings */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer Golden Ring Pulsing */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 -m-3 rounded-full border-2 border-[#D4AF37]/40"
              />

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] ring-8 ring-[#013220] shadow-[0_0_30px_rgba(212,175,55,0.25)] bg-[#013220]">
                <img
                  src={MIFA_LOGO_URL}
                  alt="MIFA Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Brand Title & Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-wider">
                {isAr ? 'مرحباً بكم' : 'WELCOME'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f7faf5] tracking-wide leading-snug">
                {isAr ? 'أهلاً بكم في ميفا كافيه' : 'Welcome to MIFA Cafe'}
              </h1>
              <p className="text-[#c0c9c3] text-xs sm:text-sm max-w-xs font-normal">
                {isAr
                  ? 'قهوة مختصة، مخبوزات طازجة، وتجربة لا تُنسى'
                  : 'Specialty Coffee, Fresh Bakery & Sweet Moments'}
              </p>
            </motion.div>

            {/* Real Progress Bar & Image Loading Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-2 mt-2 w-full max-w-[200px]"
            >
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#f3e5ab] to-[#D4AF37] rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between w-full text-[11px] text-[#c0c9c3]/80 font-medium px-0.5">
                <span>
                  {isLoaded
                    ? isAr
                      ? 'تم تجهيز القائمة!'
                      : 'Menu ready!'
                    : isAr
                    ? 'جاري تحميل الصور...'
                    : 'Preloading images...'}
                </span>
                <span className="text-[#D4AF37] font-bold">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={handleSkip}
            className="absolute bottom-8 text-xs text-[#c0c9c3] hover:text-[#D4AF37] px-4 py-2 rounded-full border border-[#c0c9c3]/20 hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
          >
            {isAr ? 'تخطي' : 'Skip'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
