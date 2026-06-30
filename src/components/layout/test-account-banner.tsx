import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Info } from 'lucide-react';

export function TestAccountBanner() {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
        <Info className="h-4 w-4" />
        测试账号体验
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        所有访客可使用以下测试账号登录，体验 {siteConfig.project.internship} · {siteConfig.project.aiProgramming} 全部功能。统一密码：
        <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          {siteConfig.testPassword}
        </code>
      </p>
      <div className="flex flex-wrap gap-2">
        {siteConfig.testAccounts.map((account) => (
          <Link
            key={account.email}
            href={`/login?email=${encodeURIComponent(account.email)}`}
            className="rounded-full border border-primary/30 bg-background px-3 py-1 text-xs transition-colors hover:bg-primary/10"
          >
            {account.roleLabel} · {account.email}
          </Link>
        ))}
      </div>
    </div>
  );
}
