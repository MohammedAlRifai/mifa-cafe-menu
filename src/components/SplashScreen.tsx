import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MIFA_LOGO_URL } from '../data/menuData';
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
  const isAr = language === 'ar';

  useEffect(() => {
    // Check if splash screen was already shown in this session
    const hasSeenSplash = sessionStorage.getItem('mifa_intro_seen');
    if (hasSeenSplash) {
      setIsVisible(false);
      if (onFinish) onFinish();
      return;
    }

    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
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
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
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

            {/* Loading / Progress Line */}
            <motion.div
              initial={{ opacity: 0, width: '0%' }}
              animate={{ opacity: 1, width: '120px' }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-[2px] bg-[#D4AF37]/30 rounded-full overflow-hidden mt-2 relative w-[120px]"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-[#D4AF37] w-full"
              />
            </motion.div>
          </div>

          {/* Quick Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            onClick={handleClose}
            className="absolute bottom-8 text-xs text-[#c0c9c3] hover:text-[#D4AF37] px-4 py-2 rounded-full border border-[#c0c9c3]/20 hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
          >
            {isAr ? 'تخطي' : 'Skip'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
