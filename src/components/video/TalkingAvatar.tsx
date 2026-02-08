'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TalkingAvatarProps {
  src: string;
  alt?: string;
  isPlaying?: boolean;
  isSpeaking?: boolean;
}

/**
 * TalkingAvatar Component
 * Displays an avatar with lip-sync animation effect when speaking
 * Uses multiple visual cues to simulate talking:
 * - Subtle scale pulse
 * - Glow effect
 * - Mouth animation overlay (optional)
 */
export function TalkingAvatar({ 
  src, 
  alt = 'Avatar', 
  isPlaying = false,
  isSpeaking = false,
}: TalkingAvatarProps) {
  const mouthRef = useRef<HTMLDivElement>(null);

  // Randomize mouth animation for more natural look
  useEffect(() => {
    if (!isSpeaking || !mouthRef.current) return;
    
    const animate = () => {
      if (mouthRef.current && isSpeaking) {
        // Random mouth openness
        const openness = Math.random() * 0.6 + 0.2;
        mouthRef.current.style.transform = `scaleY(${openness})`;
      }
    };

    const interval = setInterval(animate, 100);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  return (
    <motion.div 
      className="talking-avatar-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Glow effect behind avatar when speaking */}
      <motion.div
        className="avatar-glow"
        animate={
          isSpeaking
            ? {
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }
            : { opacity: 0.2, scale: 1 }
        }
        transition={{
          duration: 0.5,
          repeat: isSpeaking ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Main avatar container */}
      <motion.div
        className="talking-avatar-inner"
        animate={
          isSpeaking
            ? {
                // Subtle pulse when speaking
                scale: [1, 1.02, 1],
              }
            : isPlaying
            ? {
                // Gentle breathing when not speaking but playing
                scale: [1, 1.01, 1],
              }
            : {}
        }
        transition={{
          duration: isSpeaking ? 0.3 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Avatar image */}
        <div className="talking-avatar-image-wrapper">
          <Image
            src={src}
            alt={alt}
            fill
            className="talking-avatar-image"
            priority
            sizes="(max-width: 768px) 30vw, 200px"
            onError={(e) => {
              // Fallback to placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Speaking indicator ring */}
        <motion.div
          className="speaking-ring"
          animate={
            isSpeaking
              ? {
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.3, 1.5],
                }
              : { opacity: 0, scale: 1 }
          }
          transition={{
            duration: 1,
            repeat: isSpeaking ? Infinity : 0,
            ease: 'easeOut',
          }}
        />

        {/* Sound waves animation when speaking */}
        {isSpeaking && (
          <div className="sound-waves">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="sound-wave"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.2, 1.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="avatar-status"
        animate={
          isPlaying
            ? { backgroundColor: isSpeaking ? '#22c55e' : '#3b82f6' }
            : { backgroundColor: '#6b7280' }
        }
      >
        {isPlaying && (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ●
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
