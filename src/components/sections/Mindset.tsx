'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';
import { getIcon } from '@/components/ui/Icons';

export function Mindset() {
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

  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  if (!mounted) {
    return (
      <section id="mindset" className="mindset-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ height: 48, width: 256, margin: '0 auto 16px', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
            <div style={{ height: 24, width: 224, margin: '0 auto', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="mindset" className="mindset-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 className="section-title">
            {t.mindset.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
            {t.mindset.subtitle}
          </p>
        </motion.div>

        {/* Values Grid - 4 items in a row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="values-grid"
        >
          {t.mindset.values.map((value) => {
            const IconComponent = getIcon(value.icon);
            return (
              <motion.div
                key={value.id}
                variants={cardVariants}
                whileHover={{ y: -4, borderColor: 'var(--accent-primary)' }}
                className="value-card"
              >
                <div className="value-icon">
                  <IconComponent size={32} />
                </div>
                <h3 className="value-title">
                  {value.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Personality Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="personality-section"
        >
          <h3 className="personality-title">
            {t.mindset.personalityTitle}
          </h3>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ listStyle: 'none' }}
          >
            {t.mindset.personality.map((item, index) => (
              <motion.li
                key={index}
                variants={listVariants}
                className="personality-item"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
