
import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KropDev-Coming-Soon',
  description: 'Oficjalna strona kanału kropeczki',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl">
    <body>
    {children}
    </body>
    </html>
  );
}
