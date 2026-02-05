'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function generateResponse(message: string, locale: string): string {
  const lowerMessage = message.toLowerCase();

  const responses: Record<string, Record<string, string>> = {
    skills: {
      en: "I'm proficient in React, TypeScript, Next.js, and modern frontend technologies. I specialize in building performant, accessible, and scalable web applications with excellent UX.",
      de: 'Ich beherrsche React, TypeScript, Next.js und moderne Frontend-Technologien.',
      fr: "Je maîtrise React, TypeScript, Next.js et les technologies frontend modernes.",
    },
    experience: {
      en: "I have 6+ years of experience in frontend development. Most recently at Seinetime, Avisto, and ALSTOM.",
      de: 'Ich habe über 6 Jahre Erfahrung in der Frontend-Entwicklung.',
      fr: "J'ai plus de 6 ans d'expérience en développement frontend.",
    },
    contact: {
      en: "You can reach me via email or connect with me on LinkedIn and GitHub. Scroll down to the Contact section!",
      de: 'Scrollen Sie zum Kontaktbereich für Links!',
      fr: "Descendez jusqu'à la section Contact pour les liens !",
    },
    hello: {
      en: "Hello! I'm Nguyen's assistant. Ask about skills, experience, or projects!",
      de: 'Hallo! Ich bin Nguyens Assistent.',
      fr: "Bonjour ! Je suis l'assistant de Nguyen.",
    },
    default: {
      en: "I can help you learn about Nguyen's skills, experience, or projects!",
      de: 'Ich kann Ihnen bei Fragen helfen.',
      fr: "Je peux vous aider !",
    },
  };

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return responses.hello[locale] || responses.hello.en;
  }
  if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
    return responses.skills[locale] || responses.skills.en;
  }
  if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
    return responses.experience[locale] || responses.experience.en;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
    return responses.contact[locale] || responses.contact.en;
  }
  return responses.default[locale] || responses.default.en;
}

export function Chatbot() {
  const { t, locale, mounted } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: '1', role: 'assistant', content: t.chatbot.greeting }]);
    }
  }, [isOpen, messages.length, t.chatbot.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const response = generateResponse(input, locale);
    setIsTyping(false);
    setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
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
      {/* Floating button - visible on all screen sizes */}
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
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <h3 style={{ fontWeight: 600, color: 'white', fontSize: 14, margin: 0 }}>{t.chatbot.title}</h3>
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
                  style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <div className={`chatbot-message ${message.role}`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div className="chatbot-typing">
                    <span /><span /><span />
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
              <button onClick={handleSend} disabled={!input.trim()} aria-label={t.chatbot.send} className="chatbot-send">
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
