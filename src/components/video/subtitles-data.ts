/**
 * Subtitle data for intro video with word-level timing
 * Each subtitle has start time, end time (in seconds), text, and word timings for highlighting
 * 
 * TIMING NOTES:
 * - Average speech rate: ~130-150 words per minute (~2.2-2.5 words/second)
 * - Adjust timings based on actual audio file
 * - Include natural pauses between sentences
 */

export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

export interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
  words: WordTiming[];
}

/**
 * Helper to generate word timings from text
 * Distributes time across words, accounting for word length
 */
function generateWordTimings(text: string, start: number, end: number): WordTiming[] {
  const words = text.split(' ');
  const totalChars = words.reduce((sum, w) => sum + w.length, 0);
  const totalDuration = end - start;
  
  let currentTime = start;
  
  return words.map((word) => {
    // Weight duration by word length
    const wordWeight = word.length / totalChars;
    const wordDuration = totalDuration * wordWeight;
    const wordStart = currentTime;
    const wordEnd = currentTime + wordDuration;
    currentTime = wordEnd;
    
    return {
      word,
      start: wordStart,
      end: wordEnd,
    };
  });
}

/**
 * Subtitle data - timings calibrated for natural speech (~140 wpm)
 * Total duration: ~72 seconds
 * 
 * To fine-tune: play audio and adjust start/end times
 */
export const subtitles: Subtitle[] = [
  {
    id: 1,
    start: 0.3,
    end: 2.0,
    text: "Hi, my name is Nguyen Vo.",
    words: generateWordTimings("Hi, my name is Nguyen Vo.", 0.3, 2.0),
  },
  {
    id: 2,
    start: 2.5,
    end: 8.5,
    text: "I'm a Frontend Engineer with over six years of experience building scalable, high-quality web applications.",
    words: generateWordTimings("I'm a Frontend Engineer with over six years of experience building scalable, high-quality web applications.", 2.5, 8.5),
  },
  {
    id: 3,
    start: 9.5,
    end: 12.5,
    text: "To me, frontend development is more than UI.",
    words: generateWordTimings("To me, frontend development is more than UI.", 9.5, 12.5),
  },
  {
    id: 4,
    start: 13.0,
    end: 17.5,
    text: "It's about how users understand, trust, and interact with a product.",
    words: generateWordTimings("It's about how users understand, trust, and interact with a product.", 13.0, 17.5),
  },
  {
    id: 5,
    start: 18.5,
    end: 28.0,
    text: "I primarily work with React, TypeScript, and Next.js, focusing on frontend architecture, design systems, and complex, data-heavy interfaces—where performance and clarity truly matter.",
    words: generateWordTimings("I primarily work with React, TypeScript, and Next.js, focusing on frontend architecture, design systems, and complex, data-heavy interfaces—where performance and clarity truly matter.", 18.5, 28.0),
  },
  {
    id: 6,
    start: 29.0,
    end: 38.5,
    text: "I have strong experience designing reusable component systems, optimizing rendering performance, and translating complex requirements into intuitive, reliable user experiences.",
    words: generateWordTimings("I have strong experience designing reusable component systems, optimizing rendering performance, and translating complex requirements into intuitive, reliable user experiences.", 29.0, 38.5),
  },
  {
    id: 7,
    start: 39.5,
    end: 45.0,
    text: "Most recently, I led frontend development for an AI-native Agentic Intelligence Platform.",
    words: generateWordTimings("Most recently, I led frontend development for an AI-native Agentic Intelligence Platform.", 39.5, 45.0),
  },
  {
    id: 8,
    start: 46.0,
    end: 57.0,
    text: "I redesigned a highly complex agent interface into a ChatGPT-like conversational experience, while still supporting advanced capabilities such as orchestration controls, contextual memory, and real-time visualization.",
    words: generateWordTimings("I redesigned a highly complex agent interface into a ChatGPT-like conversational experience, while still supporting advanced capabilities such as orchestration controls, contextual memory, and real-time visualization.", 46.0, 57.0),
  },
  {
    id: 9,
    start: 58.0,
    end: 66.0,
    text: "Beyond coding, I mentor engineers, define technical standards, and care deeply about building a strong, sustainable engineering culture.",
    words: generateWordTimings("Beyond coding, I mentor engineers, define technical standards, and care deeply about building a strong, sustainable engineering culture.", 58.0, 66.0),
  },
  {
    id: 10,
    start: 67.0,
    end: 72.5,
    text: "If you're building a product that values quality, scalability, and thoughtful user experience,",
    words: generateWordTimings("If you're building a product that values quality, scalability, and thoughtful user experience,", 67.0, 72.5),
  },
  {
    id: 11,
    start: 73.0,
    end: 76.0,
    text: "I'd love to connect and contribute.",
    words: generateWordTimings("I'd love to connect and contribute.", 73.0, 76.0),
  },
];

/**
 * Get current subtitle based on time
 */
export function getCurrentSubtitle(currentTime: number): Subtitle | null {
  return subtitles.find(
    (sub) => currentTime >= sub.start && currentTime < sub.end
  ) || null;
}

/**
 * Get currently active word index within a subtitle
 */
export function getActiveWordIndex(subtitle: Subtitle, currentTime: number): number {
  const index = subtitle.words.findIndex(
    (word) => currentTime >= word.start && currentTime < word.end
  );
  // If between words or past end, return the last highlighted word
  if (index === -1 && currentTime >= subtitle.start) {
    const lastIndex = subtitle.words.findIndex(word => currentTime < word.start);
    return lastIndex === -1 ? subtitle.words.length - 1 : Math.max(0, lastIndex - 1);
  }
  return index;
}

/**
 * Get total duration of all subtitles
 */
export function getTotalDuration(): number {
  if (subtitles.length === 0) return 0;
  return subtitles[subtitles.length - 1].end;
}
