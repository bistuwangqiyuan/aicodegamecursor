import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { BrandTagsBar } from '@/components/layout/brand-tags';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.project.internship} · ${siteConfig.project.aiProgramming} · ${siteConfig.name}`,
    template: `%s · ${siteConfig.project.internship} · ${siteConfig.project.aiProgramming}`,
  },
  description: siteConfig.description,
  keywords: [
    '信工实习',
    'AI编程',
    '北京信息科技大学',
    '北信科',
    '大学生',
    '编程教育',
    'HTML5',
    'CSS',
    'JavaScript',
    'AI教学',
    '游戏化学习',
    '信科',
  ],
  authors: [{ name: `${siteConfig.university.fullName} · ${siteConfig.name}` }],
  openGraph: {
    title: `${siteConfig.project.internship} · ${siteConfig.project.aiProgramming} · ${siteConfig.name}`,
    description: siteConfig.description,
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
        <Providers>
          <BrandTagsBar />
          {children}
        </Providers>
        <script defer src="/_vercel/insights/script.js"></script>
</body>
    </html>
  );
}
