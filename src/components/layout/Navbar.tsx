'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useApp } from '@/lib/context';
import { locales } from '@/i18n';
import { scrollToSection } from '@/lib/utils';

export function Navbar() {
  const { t, locale, setLocale, mounted } = useApp();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'skills', 'mindset', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'experience', label: t.nav.experience },
    { id: 'skills', label: t.nav.skills },
    { id: 'mindset', label: t.nav.mindset },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="logo-text">NV</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="nav"
    >
      <div className="nav-container">
        {/* Logo */}
        <motion.button
          onClick={() => handleNavClick('hero')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="nav-brand"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <span className="logo-text">NV</span>
        </motion.button>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="nav-links">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Controls */}
        <div className="nav-controls">
          {/* Language Selector */}
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as 'en' | 'de' | 'fr')}
            className="language-select"
          >
            {locales.map((l) => (
              <option key={l} value={l}>{l.toUpperCase()}</option>
            ))}
          </select>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>

          {/* Mobile Menu Toggle - visible only on mobile */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                whileTap={{ scale: 0.98 }}
                className={`mobile-menu-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
