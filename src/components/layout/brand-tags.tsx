import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface BrandTagsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inverse' | 'subtle';
}

export function BrandTags({ className, size = 'sm', variant = 'default' }: BrandTagsProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const tagBase = cn('rounded-full font-semibold tracking-wide', sizeClasses[size]);

  const internshipClass =
    variant === 'inverse'
      ? 'bg-white/20 text-white'
      : variant === 'subtle'
        ? 'bg-bistu-orange/15 text-bistu-orange'
        : 'bg-bistu-orange/10 text-bistu-orange border border-bistu-orange/30';

  const aiClass =
    variant === 'inverse'
      ? 'bg-white/20 text-white'
      : variant === 'subtle'
        ? 'bg-primary/15 text-primary'
        : 'bg-primary/10 text-primary border border-primary/30';

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className={cn(tagBase, internshipClass)}>{siteConfig.project.internship}</span>
      <span className={cn(tagBase, aiClass)}>{siteConfig.project.aiProgramming}</span>
    </div>
  );
}

export function BrandTagsBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'border-b bg-gradient-to-r from-primary/5 via-background to-bistu-orange/5',
        className
      )}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-1.5">
        <BrandTags size="sm" />
        <p className="hidden text-xs text-muted-foreground sm:block">
          {siteConfig.project.fullTitle}
        </p>
      </div>
    </div>
  );
}
