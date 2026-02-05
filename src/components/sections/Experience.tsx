'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';

export function Experience() {
  const { t, mounted } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  if (!mounted) {
    return (
      <section id="experience" className="experience-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ height: 40, width: 280, margin: '0 auto 12px', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
            <div style={{ height: 20, width: 180, margin: '0 auto', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
          className="experience-header"
        >
          <h2 className="section-title">
            {t.experience.title}
          </h2>
          <p className="section-subtitle" style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
            {t.experience.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="timeline"
        >
          {t.experience.items.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="timeline-item"
            >
              {/* Timeline marker */}
              <div className="timeline-marker" />

              <motion.div
                whileHover={{ y: -4, borderColor: 'var(--accent-primary)' }}
                className="timeline-content"
              >
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <span className="period">{exp.period}</span>
                </div>

                <h4>{exp.company} • {exp.location}</h4>

                {exp.mission && (
                  <p className="mission">{exp.mission}</p>
                )}

                <ul>
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>
                      <span className="arrow">→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="tech-tags">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
