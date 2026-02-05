'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

export function VideoSection() {
  const { t, mounted } = useApp();

  if (!mounted) {
    return (
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ height: 24, width: 192, margin: '0 auto 32px', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
          <div style={{ aspectRatio: '16/9', background: 'var(--bg-tertiary)', borderRadius: 16 }} className="animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            fontFamily: "'Epilogue', -apple-system, system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--accent-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 32,
          }}
        >
          {t.video.title}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            aspectRatio: '16/9',
            background: 'var(--bg-tertiary)',
            boxShadow: '0 20px 60px var(--shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 16,
            color: 'var(--text-tertiary)',
          }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width={40} height={40} fill="none" stroke="var(--accent-primary)" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <polygon points="10,8 16,12 10,16" fill="var(--accent-primary)" />
              </svg>
            </motion.div>
            <span style={{ fontSize: 14 }}>{t.video.placeholder}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
