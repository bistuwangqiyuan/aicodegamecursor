import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `登录 · ${siteConfig.project.internship} · ${siteConfig.project.aiProgramming}`,
  description: `${siteConfig.project.internship} · ${siteConfig.project.aiProgramming} — 登录 ${siteConfig.name}`,
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
