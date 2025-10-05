import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  actions?: ReactNode;
}

export function SectionTitle({ eyebrow, title, description, align = 'left', className, actions }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={cn('space-y-3', alignment, className)}>
      {eyebrow && <div className="text-xs tracking-wide uppercase font-semibold text-[var(--fd-color-primary)]">{eyebrow}</div>}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className={cn('space-y-2', align === 'center' && 'w-full')}> 
          <h2 className="font-semibold text-[var(--fd-font-size-3xl)] leading-tight">{title}</h2>
          {description && <p className="text-sm text-[var(--fd-color-text-muted)] max-w-prose">{description}</p>}
        </div>
        {actions && <div className={cn('mt-2 md:mt-0', align === 'center' && 'md:ml-auto')}>{actions}</div>}
      </div>
    </div>
  );
}
