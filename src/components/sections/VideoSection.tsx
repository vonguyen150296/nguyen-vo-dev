'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useApp } from '@/lib/context';
import { useAudioSync } from '@/components/video/useAudioSync';
import { TalkingAvatar } from '@/components/video/TalkingAvatar';
import { HighlightedText } from '@/components/video/HighlightedText';
import { subtitles, getCurrentSubtitle } from '@/components/video/subtitles-data';

/**
 * VideoSection Component
 * 
 * Features:
 * - Responsive: 16:9 on desktop, 9:16 on mobile
 * - Background image
 * - Talking avatar with lip-sync animation
 * - Word-by-word highlighted subtitles synced to audio
 * - Play/pause controls
 */
export function VideoSection() {
  const { t, mounted } = useApp();
  const [hasStarted, setHasStarted] = useState(false);

  const {
    currentTime,
    duration,
    isPlaying,
    isLoaded,
    toggle,
    seek,
  } = useAudioSync({ src: '/intro.m4a', autoplay: false });

  // Get current subtitle based on audio time
  const currentSubtitle = useMemo(() => {
    return getCurrentSubtitle(currentTime);
  }, [currentTime]);

  // Check if avatar should be "speaking" (has active subtitle)
  const isSpeaking = currentSubtitle !== null && isPlaying;

  // Handle play/pause
  const handleToggle = useCallback(async () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    await toggle();
  }, [hasStarted, toggle]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Loading skeleton
  if (!mounted) {
    return (
      <section className="video-section">
        <div className="container">
          <div className="video-section-skeleton">
            <div className="skeleton-title animate-pulse" />
            <div className="skeleton-video animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="video-section" id="video">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="video-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="video-section-label">{t.video.title}</span>
        </motion.div>

        {/* Video Container - Responsive aspect ratio */}
        <motion.div
          className="video-player-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Background Image */}
          <div className="video-bg-image">
            <Image
              src="/background.png"
              alt="Background"
              fill
              className="video-bg-img"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="video-bg-overlay" />
          </div>

          {/* Title Badge */}
          <motion.div
            className="video-title-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="video-title-text">Senior Frontend Engineer</span>
          </motion.div>

          {/* Talking Avatar */}
          <div className="video-avatar-area">
            <TalkingAvatar
              src="/avatar.png"
              alt="Nguyen Vo"
              isPlaying={isPlaying}
              isSpeaking={isSpeaking}
            />
          </div>

          {/* Highlighted Subtitles */}
          <div className="video-subtitle-area">
            <HighlightedText
              subtitle={currentSubtitle}
              currentTime={currentTime}
            />
          </div>

          {/* Play/Pause Overlay */}
          <AnimatePresence>
            {(!hasStarted || !isPlaying) && isLoaded && (
              <motion.button
                className="video-play-overlay"
                onClick={handleToggle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <motion.div
                  className="video-play-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="video-play-icon"
                  >
                    {isPlaying ? (
                      <>
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </>
                    ) : (
                      <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                    )}
                  </svg>
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Click to pause when playing */}
          {hasStarted && isPlaying && (
            <button
              className="video-click-to-pause"
              onClick={handleToggle}
              aria-label="Pause"
            />
          )}

          {/* Progress Bar */}
          {hasStarted && (
            <div className="video-controls">
              <div className="video-progress-track">
                <motion.div
                  className="video-progress-fill"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
                <input
                  type="range"
                  className="video-progress-slider"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => seek(parseFloat(e.target.value))}
                  aria-label="Seek"
                />
              </div>
              <div className="video-time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
