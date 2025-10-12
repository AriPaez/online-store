import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface ProductImageProps extends Omit<ImageProps, 'src' | 'alt' | 'fill'> {
  src: string;
  alt?: string;
  ratio?: '4/5' | '3/4' | '1/1';
  className?: string;
  wrapperClassName?: string;
  blur?: boolean;
}

/**
 * ProductImage: manejo consistente de imágenes de producto.
 * - Aspect ratio controlado por contenedor
 * - blur opcional (utiliza un tiny placeholder inline)
 * - fallback de alt semántico
 */
export function ProductImage({
  src,
  alt,
  ratio = '4/5',
  className,
  wrapperClassName,
  blur = true,
  ...rest
}: ProductImageProps) {
  const aspectClass = ratio === '4/5' ? 'aspect-[4/5] md:aspect-[3/4]' : ratio === '3/4' ? 'aspect-[3/4]' : 'aspect-square';

  // Placeholder base64 super simple (1x1 pixel gris)
  const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP8/58BAgAI/QNvJpT9WQAAAABJRU5ErkJggg==';

  return (
    <div className={cn('relative w-full overflow-hidden bg-[linear-gradient(135deg,#1e1e2e,#161625)]', aspectClass, wrapperClassName)}>
      <Image
        src={src}
        alt={alt || 'Producto FoxDrip'}
        fill
        className={cn('object-cover transition-transform duration-500 group-hover:scale-105', className)}
        placeholder={blur ? 'blur' : undefined}
        blurDataURL={blur ? blurDataURL : undefined}
        sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 300px"
        loading="lazy" 
        {...rest}
      />
    </div>
  );
}

export default ProductImage;
