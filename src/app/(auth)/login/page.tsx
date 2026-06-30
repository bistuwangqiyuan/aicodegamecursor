'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState(siteConfig.testPassword);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push(redirect);
    } else {
      setError(result.error || '登录失败');
    }
  };

  const quickLogin = async (accountEmail: string) => {
    setEmail(accountEmail);
    setPassword(siteConfig.testPassword);
    setError('');
    setLoading(true);
    const result = await login(accountEmail, siteConfig.testPassword);
    setLoading(false);
    if (result.success) {
      router.push(redirect);
    } else {
      setError(result.error || '登录失败');
    }
  };

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
        <CardTitle className="text-2xl font-bold">欢迎回来</CardTitle>
        <CardDescription>
          登录 {siteConfig.name} · {siteConfig.project.internship} · {siteConfig.project.aiProgramming}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@bistu.edu.cn"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                登录中...
              </>
            ) : (
              '登录'
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">测试账号快速登录</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {siteConfig.testAccounts.map((account) => (
            <Button
              key={account.email}
              variant="outline"
              size="sm"
              type="button"
              disabled={loading}
              onClick={() => quickLogin(account.email)}
              className="text-xs"
            >
              {account.roleLabel}
            </Button>
          ))}
        </div>

        <div className="rounded-md border bg-muted/50 p-3">
          <p className="mb-2 text-xs font-medium text-primary">测试账号说明</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-1 pr-2">角色</th>
                  <th className="pb-1 pr-2">邮箱</th>
                  <th className="pb-1">密码</th>
                </tr>
              </thead>
              <tbody>
                {siteConfig.testAccounts.map((account) => (
                  <tr key={account.email} className="border-b last:border-0">
                    <td className="py-1 pr-2">{account.roleLabel}</td>
                    <td className="py-1 pr-2 font-mono">{account.email}</td>
                    <td className="py-1 font-mono">{siteConfig.testPassword}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-sm">
          还没有账号？
          <Link href="/register" className="ml-1 text-primary hover:underline">
            立即注册
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}>
      <LoginForm />
    </Suspense>
  );
}
