import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { BrandTags } from '@/components/layout/brand-tags';

export function SiteFooter() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <Image
                src={siteConfig.brand.logoWhite}
                alt={siteConfig.university.fullName}
                width={48}
                height={48}
                unoptimized
              />
              <div>
                <div className="text-lg font-bold">{siteConfig.name}</div>
                <div className="text-sm opacity-90">{siteConfig.subtitle}</div>
                <BrandTags className="mt-2" size="sm" variant="inverse" />
              </div>
            </div>
            <p className="text-sm italic opacity-90">
              「{siteConfig.university.motto}」
            </p>
            <p className="text-xs opacity-75">
              办学历史可追溯至 {siteConfig.university.foundedYear} 年
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">快速链接</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="/courses" className="hover:underline">
                  课程中心
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:underline">
                  代码实验场
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:underline">
                  信科编程达人榜
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  测试账号登录
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">{siteConfig.university.shortName}官网</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a
                  href={siteConfig.university.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.university.fullName}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.university.viUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  视觉形象识别系统
                </a>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-75">
          <p>
            © {new Date().getFullYear()} {siteConfig.university.fullName} · {siteConfig.name}
          </p>
          <p className="mt-1">
            {siteConfig.project.internship} · {siteConfig.project.aiProgramming} · 校徽及视觉元素参考
            <a
              href={siteConfig.university.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline"
            >
              学校官网
            </a>
            视觉形象规范，仅供教学演示使用
          </p>
        </div>
      </div>
    </footer>
  );
}
