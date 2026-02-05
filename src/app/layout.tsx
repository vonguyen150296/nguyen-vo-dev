import type { Metadata, Viewport } from 'next';
import { Epilogue, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider, Navbar, Footer } from '@/components/layout';
import { AppProvider } from '@/lib/context';
import { Chatbot } from '@/components/ui/Chatbot';
import { siteConfig } from '@/lib/config';

const epilogue = Epilogue({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-epilogue',
  weight: ['600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: [...siteConfig.metadata.keywords],
  authors: [{ name: siteConfig.personal.name }],
  creator: siteConfig.personal.name,
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.metadata.url,
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    siteName: `${siteConfig.personal.name} Portfolio`,
    images: siteConfig.metadata.image ? [siteConfig.metadata.image] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${epilogue.variable} ${inter.variable} antialiased`} style={{ fontFamily: "'Inter', -apple-system, system-ui, sans-serif" }}>
        <ThemeProvider>
          <AppProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Chatbot />
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
