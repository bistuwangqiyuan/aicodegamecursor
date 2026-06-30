import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { BrandTags } from '@/components/layout/brand-tags';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={siteConfig.brand.logoWhite}
              alt={siteConfig.university.fullName}
              width={56}
              height={56}
              unoptimized
            />
            <div>
              <div className="text-2xl font-bold">{siteConfig.name}</div>
              <div className="text-sm opacity-90">{siteConfig.subtitle}</div>
              <BrandTags className="mt-2" size="sm" variant="inverse" />
            </div>
          </Link>
        </div>

        <div className="space-y-6">
          <blockquote className="text-2xl font-medium italic">
            「{siteConfig.university.motto}」
          </blockquote>
          <p className="text-sm opacity-90 leading-relaxed">
            {siteConfig.project.fullTitle}。融合{siteConfig.project.aiProgramming}智能助教与
            {siteConfig.project.internship}实践场景，助力信科学子掌握 HTML5、CSS、JavaScript 核心技能。
          </p>
          <div className="flex items-center gap-4">
            <Image
              src={siteConfig.brand.mascot}
              alt="比斯兔"
              width={64}
              height={80}
              unoptimized
            />
            <div className="text-sm opacity-90">
              <p className="font-medium">吉祥物 · 比斯兔</p>
              <p>勤奋好学、活泼开朗，与校训精神相契合</p>
            </div>
          </div>
        </div>

        <p className="text-xs opacity-75">
          © {siteConfig.university.fullName} · 办学历史可追溯至 {siteConfig.university.foundedYear} 年
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-muted/30 px-4 py-12 lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
