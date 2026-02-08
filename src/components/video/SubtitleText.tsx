'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Subtitle } from './subtitles-data';

interface SubtitleTextProps {
  subtitles: Subtitle[];
  currentTime: number;
}

/**
 * SubtitleText Component
 * Displays synchronized subtitles with fade-in/fade-out animations
 * Uses Framer Motion for smooth transitions
 */
export function SubtitleText({ subtitles, currentTime }: SubtitleTextProps) {
  // Find the current subtitle based on audio time
  const currentSubtitle = useMemo(() => {
    return subtitles.find(
      (sub) => currentTime >= sub.start && currentTime < sub.end
    ) || null;
  }, [subtitles, currentTime]);

  return (
    <div className="subtitle-container">
      <AnimatePresence mode="wait">
        {currentSubtitle && (
          <motion.div
            key={currentSubtitle.id}
            className="subtitle-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
          >
            {currentSubtitle.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
