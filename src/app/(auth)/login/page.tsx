import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '登录 - GameCode Lab',
  description: '登录到 GameCode Lab 开始你的编程学习之旅',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">欢迎回来</CardTitle>
          <CardDescription>登录到你的 GameCode Lab 账户</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
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
              />
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>

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
              使用 Google 登录
            </Button>
            <Button variant="outline" className="w-full" type="button">
              使用 GitHub 登录
            </Button>
          </div>

          <div className="text-center text-sm">
            还没有账号？
            <Link href="/register" className="ml-1 text-primary hover:underline">
              立即注册
            </Link>
          </div>

          <div className="text-center text-sm">
            <Link href="/dashboard" className="text-primary hover:underline">
              游客试用（免费30天）
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

