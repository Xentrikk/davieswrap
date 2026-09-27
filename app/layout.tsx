import type { Metadata } from 'next';
import { Manrope, Racing_Sans_One, Russo_One } from 'next/font/google';
import './globals.css';
import './portfolio-live.css';

const body = Manrope({ variable: '--font-body', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const racing = Racing_Sans_One({ variable: '--font-display', subsets: ['latin'], weight: '400' });
const headline = Russo_One({ variable: '--font-headline', subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Davies / Wrap Specialist',
  description: 'Commercial fleet wrapping, colour change, PPF, window, architectural and marine film installation by Chris Davies in Hampshire.',
  openGraph: { title: 'Davies / Wrap Specialist', description: 'Commercial fleet wrapping, colour change, PPF, window, architectural and marine film installation by Chris Davies in Hampshire.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${headline.variable} ${racing.variable} ${body.variable}`}>{children}</body></html>;
}
