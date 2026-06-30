import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TestAccountBanner } from '@/components/layout/test-account-banner';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `注册 - ${siteConfig.name}`,
  description: `注册 ${siteConfig.name} 账户，开始你的编程学习之旅`,
};

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 lg:hidden">
          <Image
            src={siteConfig.brand.logo}
            alt={siteConfig.university.fullName}
            width={48}
            height={48}
            className="mx-auto"
          />
        </div>
        <CardTitle className="text-2xl font-bold">创建账户</CardTitle>
        <CardDescription>
          注册 {siteConfig.name} · {siteConfig.project.internship} · {siteConfig.project.aiProgramming}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TestAccountBanner />

        <div className="rounded-md border border-bistu-orange/30 bg-bistu-orange/5 p-3 text-sm text-muted-foreground">
          建议使用
          <Link href="/login" className="mx-1 font-medium text-primary hover:underline">
            测试账号
          </Link>
          立即体验全部功能。注册功能即将开放，推荐使用 @bistu.edu.cn 邮箱。
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">用户名</label>
            <input
              id="username"
              type="text"
              placeholder="zhang_xinke"
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">邮箱</label>
            <input
              id="email"
              type="email"
              placeholder="yourname@bistu.edu.cn"
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">密码</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border px-3 py-2"
              required
              minLength={8}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">确认密码</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border px-3 py-2"
              required
              minLength={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled>
            注册（即将开放）
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          注册即表示你同意我们的
          <Link href="/terms" className="ml-1 text-primary hover:underline">服务条款</Link>
          和
          <Link href="/privacy" className="ml-1 text-primary hover:underline">隐私政策</Link>
        </div>

        <div className="text-center text-sm">
          已有账号？
          <Link href="/login" className="ml-1 text-primary hover:underline">立即登录</Link>
        </div>
      </CardContent>
    </Card>
  );
}
