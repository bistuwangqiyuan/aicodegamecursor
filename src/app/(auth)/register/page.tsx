import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '注册 - GameCode Lab',
  description: '注册 GameCode Lab 账户，开始学习编程',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">创建账户</CardTitle>
          <CardDescription>注册 GameCode Lab，开始你的编程学习之旅</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                用户名
              </label>
              <input
                id="username"
                type="text"
                placeholder="yourname"
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                密码
              </label>
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
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                确认密码
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border px-3 py-2"
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full">
              注册
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            注册即表示你同意我们的
            <Link href="/terms" className="ml-1 text-primary hover:underline">
              服务条款
            </Link>
            和
            <Link href="/privacy" className="ml-1 text-primary hover:underline">
              隐私政策
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">或</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full" type="button">
              使用 Google 注册
            </Button>
            <Button variant="outline" className="w-full" type="button">
              使用 GitHub 注册
            </Button>
          </div>

          <div className="text-center text-sm">
            已有账号？
            <Link href="/login" className="ml-1 text-primary hover:underline">
              立即登录
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

