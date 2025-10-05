import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'primary';
  label: string; // accesibilidad
}

export function IconButton({ size = 'md', variant = 'ghost', className, label, children, ...props }: IconButtonProps) {
  const sizeMap = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' };
  const variantMap = {
    ghost: 'hover:bg-[var(--fd-color-surface-alt)] text-[var(--fd-color-text-muted)] hover:text-[var(--fd-color-text)]',
    outline: 'border border-[var(--fd-color-border)] hover:bg-[var(--fd-color-surface-alt)]',
    primary: 'bg-[var(--fd-color-primary)] text-[var(--fd-color-primary-foreground)] hover:bg-[#ff5e40]'
  } as const;
  return (
    <button
      aria-label={label}
      className={cn('inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fd-color-focus)] disabled:opacity-50 disabled:cursor-not-allowed', sizeMap[size], variantMap[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
