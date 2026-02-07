'use client';

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';
import { siteConfig } from '@/lib/config';
import {
  greetings,
  unknownResponses,
  suggestedQuestionsLabel,
  contactButtonLabel,
  findMatchingQA,
  findQAById,
  getTranslatedQuestion,
  getTranslatedAnswer,
  getSuggestedQuestions,
  SuggestionItem,
} from '@/lib/chatbot-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  contentKey?: string; // Original English content for re-translation
  suggestions?: SuggestionItem[]; // Suggestions with ID and text
  showContactButton?: boolean;
  suggestionsUsed?: boolean; // Track if suggestions were clicked
}

// Session storage key for persistence
const SESSION_STORAGE_KEY = 'chatbot-session';

interface ChatSession {
  messages: Message[];
  askedQuestionIds: string[];
}

export function Chatbot() {
  const { t, locale, mounted } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevLocaleRef = useRef<string | null>(null);

  // Load session from storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (stored) {
          const session: ChatSession = JSON.parse(stored);
          setMessages(session.messages);
          setAskedQuestionIds(session.askedQuestionIds);
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save session to storage on changes
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      const session: ChatSession = { messages, askedQuestionIds };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  }, [messages, askedQuestionIds]);

  // Re-translate messages when locale changes
  useEffect(() => {
    // Skip first render or if locale hasn't changed
    if (prevLocaleRef.current === null) {
      prevLocaleRef.current = locale;
      return;
    }

    if (prevLocaleRef.current !== locale && messages.length > 0) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.role === 'assistant') {
            // Re-translate content if we have the original key
            let newContent = msg.content;
            if (msg.contentKey) {
              if (msg.contentKey === 'greeting') {
                newContent = greetings[locale] || greetings.en;
              } else if (msg.contentKey === 'unknown') {
                newContent = unknownResponses[locale] || unknownResponses.en;
              } else {
                // It's an answer - translate it
                newContent = getTranslatedAnswer(msg.contentKey, locale);
              }
            }

            // Re-translate suggestions if not used yet
            let newSuggestions = msg.suggestions;
            if (msg.suggestions && msg.suggestions.length > 0 && !msg.suggestionsUsed) {
              // Re-translate each suggestion using its ID
              newSuggestions = msg.suggestions.map((s) => {
                const qa = findQAById(s.id);
                return {
                  id: s.id,
                  text: qa ? getTranslatedQuestion(qa.question, locale) : s.text,
                };
              });
            }

            return {
              ...msg,
              content: newContent,
              suggestions: newSuggestions,
            };
          }
          return msg;
        })
      );
      prevLocaleRef.current = locale;
    }
  }, [locale, messages, askedQuestionIds]);

  // Initialize greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = greetings[locale] || greetings.en;
      const initialSuggestions = getSuggestedQuestions(null, [], locale, 4);
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: greeting,
          contentKey: 'greeting',
          suggestions: initialSuggestions,
        },
      ]);
    }
  }, [isOpen, messages.length, locale]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Handle sending a message (from input or suggestion click)
  const handleSend = useCallback(
    async (messageText?: string, questionId?: string, fromMessageId?: string) => {
      const textToSend = messageText || input.trim();
      if (!textToSend && !questionId) return;

      // If this came from a suggestion, mark that message's suggestions as used
      if (fromMessageId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === fromMessageId ? { ...msg, suggestionsUsed: true } : msg
          )
        );
      }

      // Add user message (show translated text)
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: textToSend,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400));

      // Find matching Q&A - use ID if provided, otherwise search by text
      let match = questionId ? findQAById(questionId) : findMatchingQA(textToSend);

      let responseContent: string;
      let contentKey: string;
      let newAskedIds = [...askedQuestionIds];
      let suggestions: SuggestionItem[] = [];
      let showContactButton = false;

      if (match) {
        // Found a match - translate and respond
        contentKey = match.answer;
        responseContent = getTranslatedAnswer(match.answer, locale);
        newAskedIds = [...askedQuestionIds, match.id];
        setAskedQuestionIds(newAskedIds);

        // Get follow-up suggestions (3-5 questions)
        suggestions = getSuggestedQuestions(match.id, newAskedIds, locale, 4);
      } else {
        // No match - provide fallback with contact button
        contentKey = 'unknown';
        responseContent = unknownResponses[locale] || unknownResponses.en;
        showContactButton = true;
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          contentKey,
          suggestions: suggestions.length > 0 ? suggestions : undefined,
          showContactButton,
        },
      ]);
    },
    [input, locale, askedQuestionIds]
  );

  // Handle clicking a suggestion - pass both the displayed text and the question ID
  const handleSuggestionClick = (suggestion: SuggestionItem, messageId: string) => {
    handleSend(suggestion.text, suggestion.id, messageId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat"
          className="chatbot-button"
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div className="chatbot-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="chatbot-avatar">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: 'white', fontSize: 14, margin: 0 }}>
                    {t.chatbot.title}
                  </h3>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="chatbot-close">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div className={`chatbot-message ${message.role}`}>{message.content}</div>

                  {/* Contact button for unknown questions */}
                  {message.role === 'assistant' && message.showContactButton && (
                    <div className="chatbot-contact-wrapper">
                      <a
                        href={`mailto:${siteConfig.contact.email}?subject=Contact from Portfolio`}
                        className="chatbot-contact-btn"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        {contactButtonLabel[locale] || contactButtonLabel.en}
                      </a>
                    </div>
                  )}

                  {/* Suggested questions - only show if not used */}
                  {message.role === 'assistant' &&
                    message.suggestions &&
                    message.suggestions.length > 0 &&
                    !message.suggestionsUsed && (
                      <div className="chatbot-suggestions">
                        <p className="chatbot-suggestions-label">
                          {suggestedQuestionsLabel[locale] || suggestedQuestionsLabel.en}
                        </p>
                        {message.suggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion, message.id)}
                            className="chatbot-suggestion-btn"
                          >
                            {suggestion.text}
                          </button>
                        ))}
                      </div>
                    )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <div className="chatbot-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatbot.placeholder}
                className="chatbot-input"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                aria-label={t.chatbot.send}
                className="chatbot-send"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
