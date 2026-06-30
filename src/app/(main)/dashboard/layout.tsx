import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `学习面板 · ${siteConfig.project.internship} · ${siteConfig.project.aiProgramming}`,
  description: `${siteConfig.project.internship} · ${siteConfig.project.aiProgramming} — 查看学习进度与成就`,
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
