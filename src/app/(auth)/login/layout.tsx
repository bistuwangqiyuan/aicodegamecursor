import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `登录 - ${siteConfig.name}`,
  description: `登录 ${siteConfig.name}，${siteConfig.subtitle}`,
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
