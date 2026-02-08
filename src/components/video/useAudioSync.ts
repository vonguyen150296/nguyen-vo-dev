'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseAudioSyncOptions {
  src: string;
  autoplay?: boolean;
}

interface UseAudioSyncReturn {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isLoaded: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  seek: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

/**
 * Custom hook for audio synchronization
 * Handles audio playback, time tracking, and browser autoplay restrictions
 */
export function useAudioSync({ src, autoplay = false }: UseAudioSyncOptions): UseAudioSyncReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Update current time using requestAnimationFrame for smooth sync
  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, [isPlaying]);

  // Start time updates when playing
  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateTime]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Handle autoplay with browser restrictions
    if (autoplay) {
      audio.play().catch(() => {
        // Autoplay blocked - user interaction required
        console.log('Autoplay blocked. Click to play.');
      });
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [src, autoplay]);

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  return {
    currentTime,
    duration,
    isPlaying,
    isLoaded,
    play,
    pause,
    toggle,
    seek,
    audioRef,
  };
}
