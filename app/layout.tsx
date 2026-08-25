import type { Metadata } from 'next';
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
} from 'next/font/google';

import './globals.css';

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import GrainOverlay from '@/components/ui/GrainOverlay';
import StarfieldBackground from '@/components/ui/StarfieldBackground';
import { LanguageProvider } from '@/lib/language';

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600'],
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

const title =
  'Amir Heidari — Designer · Developer · Digital Creative';

const description =
  'The portfolio of Amir Heidari — a designer and developer building digital experiences where design, technology, and interaction meet.';

export const metadata: Metadata = {
  title,
  description,

  openGraph: {
    title,
    description,
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body className="no-overflow-guard">
        <LanguageProvider>
          <div id="site-root">
            <StarfieldBackground />

            <GrainOverlay />

            <CustomCursor />

            <Navigation />

            <main>
              {children}
            </main>

            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}