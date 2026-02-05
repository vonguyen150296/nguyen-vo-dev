'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context';
import { siteConfig } from '@/lib/config';
import { MailIcon, LinkedInIcon, GitHubIcon } from '@/components/ui/Icons';

export function Contact() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  if (!mounted) {
    return (
      <section id="contact" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ height: 48, width: 320, margin: '0 auto 16px', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
            <div style={{ height: 24, width: 256, margin: '0 auto', background: 'var(--bg-tertiary)', borderRadius: 4 }} className="animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  const contactLinks = [
    {
      id: 'email',
      label: t.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: MailIcon,
      iconText: '@',
    },
    {
      id: 'linkedin',
      label: t.contact.linkedin,
      href: siteConfig.contact.linkedin,
      icon: LinkedInIcon,
      iconText: 'in',
    },
    {
      id: 'github',
      label: t.contact.github,
      href: siteConfig.contact.github,
      icon: GitHubIcon,
      iconText: '</>',
    },
  ];

  return (
    <section id="contact" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 style={{
            fontFamily: "'Epilogue', -apple-system, system-ui, sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}>
            {t.contact.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>
            {t.contact.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            marginBottom: 40,
            flexWrap: 'wrap',
          }}
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.id}
              variants={itemVariants}
              href={link.href}
              target={link.id !== 'email' ? '_blank' : undefined}
              rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
              whileHover={{ y: -4, borderColor: 'var(--accent-primary)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 32px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: 20, color: 'var(--accent-primary)' }}>{link.iconText}</span>
              <span>{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 16 }}
        >
          {t.contact.availability}
        </motion.p>
      </div>
    </section>
  );
}
