import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface BistuHeroBannerProps {
  className?: string;
  showMotto?: boolean;
}

export function BistuHeroBanner({ className, showMotto = true }: BistuHeroBannerProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src="/bistu/banner-campus.svg"
        alt={`${siteConfig.university.fullName}校园`}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-bistu-orange/10" />
      {showMotto && (
        <div className="absolute bottom-4 left-4 hidden rounded-lg bg-white/80 px-4 py-2 text-sm backdrop-blur md:block">
          <span className="text-bistu-red font-medium">{siteConfig.university.motto}</span>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-muted-foreground">{siteConfig.project.internship} · {siteConfig.project.aiProgramming}</span>
        </div>
      )}
    </div>
  );
}
