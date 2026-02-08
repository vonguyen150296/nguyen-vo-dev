'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Subtitle, getActiveWordIndex } from './subtitles-data';

interface HighlightedTextProps {
  subtitle: Subtitle | null;
  currentTime: number;
}

/**
 * HighlightedText Component
 * Displays subtitles with word-by-word highlighting synced to audio
 * Features:
 * - Smooth fade in/out transitions
 * - Karaoke-style word highlighting
 * - Gradient glow effect on active words
 */
export function HighlightedText({ subtitle, currentTime }: HighlightedTextProps) {
  // Get the index of the currently active word
  const activeWordIndex = useMemo(() => {
    if (!subtitle) return -1;
    return getActiveWordIndex(subtitle, currentTime);
  }, [subtitle, currentTime]);

  return (
    <div className="highlighted-text-container">
      <AnimatePresence mode="wait">
        {subtitle && (
          <motion.div
            key={subtitle.id}
            className="highlighted-text-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="highlighted-text">
              {subtitle.words.map((wordData, index) => {
                const isActive = index === activeWordIndex;
                const isPast = index < activeWordIndex;
                const isFuture = index > activeWordIndex;

                return (
                  <motion.span
                    key={`${subtitle.id}-${index}`}
                    className={`highlight-word ${isActive ? 'active' : ''} ${isPast ? 'past' : ''} ${isFuture ? 'future' : ''}`}
                    initial={{ opacity: 0.4 }}
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.9 : 0.5,
                      scale: isActive ? 1.05 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{
                      duration: 0.15,
                      ease: 'easeOut',
                    }}
                  >
                    {wordData.word}
                    {/* Glow effect for active word */}
                    {isActive && (
                      <motion.span
                        className="word-glow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layoutId="word-glow"
                      />
                    )}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
