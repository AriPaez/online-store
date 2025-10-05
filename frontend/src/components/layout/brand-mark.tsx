import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BrandMarkProps {
  size?: number; // tamaño en px
  className?: string;
  withText?: boolean; // muestra texto
  textClassName?: string;
  shape?: 'rounded' | 'circle' | 'none';
  asLink?: boolean; // si true envuelve en <Link href="/">
  priority?: boolean; // controlar priority de Next/Image
  srText?: string; // texto accesible personalizado
}

/**
 * BrandMark: marca reutilizable de FoxDrip.
 * - Usa icon.webp temporal (reemplazar por SVG optimizado cuando esté listo)
 * - Permite variantes de forma, link opcional, control de priority y texto accesible.
 */
export function BrandMark({
  size = 36,
  className,
  withText = false,
  textClassName,
  shape = 'rounded',
  asLink = false,
  priority = false,
  srText = 'FoxDrip'
}: BrandMarkProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : shape === 'rounded' ? 'rounded-md' : '';
  const Wrapper: React.ElementType = asLink ? Link : 'span';
  const wrapperProps = asLink ? { href: '/' } : {};

  return (
    <Wrapper className={cn('inline-flex items-center gap-2 select-none', className)} {...wrapperProps} aria-label={srText}>
      <span className="relative inline-flex">
        <Image
          src="/icon.webp"
          alt={srText}
          width={size}
          height={size}
          priority={priority}
          className={cn('object-contain', shapeClass)}
        />
        <span className="sr-only">{srText}</span>
      </span>
      {withText && (
        <span className={cn('font-bold tracking-tight', textClassName)}>FoxDrip</span>
      )}
    </Wrapper>
  );
}

export default BrandMark;
