import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/src/components/ThemeContext';

export const metadata: Metadata = {
  title: 'Atlas de Chile',
  description: 'Explora las 16 regiones de Chile: geografía, cultura e historia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
