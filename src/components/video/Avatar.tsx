'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt?: string;
  isPlaying?: boolean;
}

/**
 * Avatar Component
 * Displays a vertical avatar with subtle idle animations
 * Scales responsively within the video container
 * Shows a placeholder silhouette if image fails to load
 */
export function Avatar({ src, alt = 'Avatar', isPlaying = false }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      className="avatar-container"
      // Subtle breathing/floating animation
      animate={
        isPlaying
          ? {
              y: [0, -5, 0],
              scale: [1, 1.02, 1],
            }
          : {}
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="avatar-inner"
        // Gentle pulse effect when playing
        animate={
          isPlaying
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                  '0 0 20px 10px rgba(59, 130, 246, 0.1)',
                  '0 0 0 0 rgba(59, 130, 246, 0)',
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {hasError ? (
          // Placeholder silhouette when image fails to load
          <div className="avatar-placeholder">
            <svg
              viewBox="0 0 100 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="avatar-silhouette"
            >
              {/* Head */}
              <circle cx="50" cy="35" r="25" fill="rgba(255,255,255,0.2)" />
              {/* Body */}
              <ellipse cx="50" cy="100" rx="40" ry="35" fill="rgba(255,255,255,0.15)" />
            </svg>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="avatar-image"
            priority
            sizes="(max-width: 768px) 40vw, 300px"
            onError={() => setHasError(true)}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
