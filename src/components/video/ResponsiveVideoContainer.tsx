'use client';

import { ReactNode } from 'react';

interface ResponsiveVideoContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * ResponsiveVideoContainer Component
 * 
 * Creates a responsive container that maintains 9:16 aspect ratio
 * 
 * Layout Strategy:
 * - Uses CSS aspect-ratio for consistent 9:16 proportions
 * - On mobile: fills viewport height with minimal margins
 * - On desktop: centers horizontally and vertically with max-height constraint
 * - Letterboxing/pillarboxing achieved via centering within viewport
 * 
 * The container acts as a virtual video frame (target: 1080x1920)
 * All child elements should use relative units (%, em, vw/vh) for responsiveness
 */
export function ResponsiveVideoContainer({ 
  children, 
  className = '' 
}: ResponsiveVideoContainerProps) {
  return (
    // Outer wrapper handles centering and viewport constraints
    <div className={`video-wrapper ${className}`}>
      {/* Inner container maintains 9:16 aspect ratio */}
      <div className="video-container">
        {/* Content layer with proper stacking */}
        <div className="video-content">
          {children}
        </div>
      </div>
    </div>
  );
}
