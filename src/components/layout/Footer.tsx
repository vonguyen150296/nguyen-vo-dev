'use client';

import { useApp } from '@/lib/context';

export function Footer() {
  const { t, mounted } = useApp();

  const footerText = mounted ? t.footer.copyright : '© 2026 Nguyen Vo. Designed & built with attention to detail.';

  return (
    <footer style={{
      padding: '40px 0',
      textAlign: 'center',
      color: 'var(--text-tertiary)',
      borderTop: '1px solid var(--border-color)',
    }}>
      <div className="container">
        <p>{footerText}</p>
      </div>
    </footer>
  );
}
