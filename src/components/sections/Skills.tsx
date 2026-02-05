'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

export function Skills() {
  const { t, mounted } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  if (!mounted) {
    return (
      <section id="skills" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ height: 48, width: 256, margin: '0 auto 16px', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
            <div style={{ height: 24, width: 192, margin: '0 auto', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ height: 256, background: 'var(--bg-tertiary)', borderRadius: 12 }} className="animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 style={{
            fontFamily: "'Epilogue', -apple-system, system-ui, sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}>
            {t.skills.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
            {t.skills.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="skills-grid"
        >
          {t.skills.categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              style={{
                background: 'var(--bg-primary)',
                padding: 28,
                borderRadius: 12,
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 style={{
                fontFamily: "'Epilogue', -apple-system, system-ui, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 20,
                color: 'var(--accent-primary)',
              }}>
                {category.name}
              </h3>

              <ul style={{ listStyle: 'none' }}>
                {category.skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    whileHover={{ x: 4 }}
                    style={{
                      padding: '10px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s',
                      cursor: 'default',
                    }}
                  >
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      flexShrink: 0,
                    }} />
                    <span>{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
