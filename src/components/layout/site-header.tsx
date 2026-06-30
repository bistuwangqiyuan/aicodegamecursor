'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { siteConfig, roleLabels } from '@/config/site';
import { BrandTags } from '@/components/layout/brand-tags';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import { LogOut, User } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: '学习面板' },
  { href: '/courses', label: '课程' },
  { href: '/playground', label: '实验场' },
  { href: '/projects', label: '作品' },
  { href: '/leaderboard', label: '排行榜' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={siteConfig.brand.logo}
            alt={siteConfig.university.fullName}
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div className="hidden sm:block">
            <div className="text-lg font-bold leading-tight text-primary">
              {siteConfig.name}
            </div>
            <div className="text-xs text-muted-foreground">{siteConfig.subtitle}</div>
            <BrandTags className="mt-1" size="sm" variant="subtle" />
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors hover:text-primary',
                pathname.startsWith(item.href)
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{user.displayName}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {roleLabels[user.role] || user.role}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => logout()}>
                <LogOut className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">退出</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">登录</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/login">测试账号体验</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
