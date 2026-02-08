'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveVideoContainer } from './ResponsiveVideoContainer';
import { Avatar } from './Avatar';
import { SubtitleText } from './SubtitleText';
import { useAudioSync } from './useAudioSync';
import { subtitles } from './subtitles-data';

interface IntroVideoProps {
  audioSrc?: string;
  avatarSrc?: string;
}

/**
 * IntroVideo Component
 * 
 * Main video-like scene component that orchestrates:
 * - Responsive 9:16 video container
 * - Animated avatar with idle effects
 * - Synchronized subtitles with audio
 * - Play/pause controls with visual feedback
 */
export function IntroVideo({
  audioSrc = '/intro.m4a',
  avatarSrc = '/avatar.png',
}: IntroVideoProps) {
  const [hasStarted, setHasStarted] = useState(false);
  
  const {
    currentTime,
    duration,
    isPlaying,
    isLoaded,
    toggle,
    seek,
  } = useAudioSync({ src: audioSrc, autoplay: false });

  // Handle initial play (user interaction required for autoplay)
  const handleStart = useCallback(async () => {
    setHasStarted(true);
    await toggle();
  }, [toggle]);

  // Handle click on video area
  const handleVideoClick = useCallback(async () => {
    if (!hasStarted) {
      await handleStart();
    } else {
      await toggle();
    }
  }, [hasStarted, handleStart, toggle]);

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <ResponsiveVideoContainer>
      {/* Background gradient */}
      <div className="video-background" />

      {/* Clickable overlay for play/pause */}
      <button
        className="video-click-area"
        onClick={handleVideoClick}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {/* Play button overlay - shown before start or when paused */}
        <AnimatePresence>
          {(!hasStarted || !isPlaying) && isLoaded && (
            <motion.div
              className="play-button-overlay"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="play-button">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="play-icon"
                >
                  {isPlaying ? (
                    // Pause icon
                    <>
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </>
                  ) : (
                    // Play icon
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                  )}
                </svg>
              </div>
              {!hasStarted && (
                <span className="play-text">Tap to Play</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Avatar */}
      <Avatar
        src={avatarSrc}
        alt="Nguyen Vo"
        isPlaying={isPlaying}
      />

      {/* Subtitles */}
      <SubtitleText subtitles={subtitles} currentTime={currentTime} />

      {/* Progress bar */}
      {hasStarted && (
        <div className="video-progress-container">
          <div
            className="video-progress-bar"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            className="video-progress-input"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            aria-label="Video progress"
          />
        </div>
      )}

      {/* Time display */}
      {hasStarted && (
        <div className="video-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      )}
    </ResponsiveVideoContainer>
  );
}

// Helper function to format time in MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Export as default for easier imports
export default IntroVideo;
