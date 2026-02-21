'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';
import { siteConfig } from '@/lib/config';
import { scrollToSection } from '@/lib/utils';

export function Hero() {
  const { t, mounted } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  if (!mounted) {
    return (
      <section id="hero" style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0 80px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15), transparent 50%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.1), transparent 50%)',
          opacity: 0.6,
        }} />
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <div style={{ height: 24, width: 256, background: 'var(--bg-tertiary)', borderRadius: 4, marginBottom: 16 }} className="animate-pulse" />
            <div style={{ height: 64, width: '100%', background: 'var(--bg-tertiary)', borderRadius: 4, marginBottom: 24 }} className="animate-pulse" />
            <div style={{ height: 80, width: '75%', background: 'var(--bg-tertiary)', borderRadius: 4, marginBottom: 40 }} className="animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="hero-section">
      {/* Background gradients */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="hero-bg"
      />

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.p variants={itemVariants} className="hero-greeting">
            {t.hero.greeting}
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero-headline">
            {t.hero.headline}
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subheadline">
            {t.hero.subheadline}
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('experience')}
              className="btn btn-primary"
            >
              <span>{t.hero.ctaProjects}</span>
              <span>→</span>
            </motion.button>
            <motion.a
              href={siteConfig.cv.downloadUrl}
              download={siteConfig.cv.filename}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-secondary"
            >
              <span>⬇</span>
              <span>{t.hero.ctaCV}</span>
            </motion.a>
            <motion.a
              href={`tel:${siteConfig.contact.phone}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-secondary"
              aria-label={t.hero.ctaCall}
            >
              <span aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span>{siteConfig.contact.phone}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
