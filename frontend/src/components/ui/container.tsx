import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const widthMap = {
  sm: 'max-w-[var(--fd-container-sm)]',
  md: 'max-w-[var(--fd-container-md)]',
  lg: 'max-w-[var(--fd-container-lg)]',
  xl: 'max-w-[var(--fd-container-xl)]',
  '2xl': 'max-w-[var(--fd-container-2xl)]'
};

export function Container({ children, className, width = 'xl' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 md:px-6', widthMap[width], className)}>
      {children}
    </div>
  );
}
