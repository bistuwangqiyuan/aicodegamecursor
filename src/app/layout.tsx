import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GameCode Lab - 游戏化编程教育平台',
  description: '通过游戏化机制和AI助教，让编程学习更有趣、更高效',
  keywords: ['编程教育', 'HTML5', 'CSS', 'JavaScript', 'AI教学', '游戏化学习'],
  authors: [{ name: 'GameCode Lab Team' }],
  openGraph: {
    title: 'GameCode Lab - 游戏化编程教育平台',
    description: '通过游戏化机制和AI助教，让编程学习更有趣、更高效',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

