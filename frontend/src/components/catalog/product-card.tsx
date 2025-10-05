import Link from "next/link";
import { formatPrice, truncateWords } from "@/lib/utils";
import { ProductImage } from "./product-image";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // ruta o url
  badge?: string;
  variantCount?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.id}`}
      className="group block overflow-hidden rounded-xl border border-[var(--fd-color-border)] bg-[var(--fd-color-surface)] hover:border-[var(--fd-color-primary)] transition-colors duration-300"
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        ratio="4/5"
        wrapperClassName="md:aspect-[3/4]"
      />
      {product.badge && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-[var(--fd-color-primary)]/90 px-3 py-1 text-[10px] font-semibold tracking-wide text-white uppercase shadow-[var(--fd-shadow-sm)]">
          {product.badge}
        </span>
      )}
      <div className="p-5 space-y-3">
        <h3 className="text-base font-medium leading-snug line-clamp-2 min-h-[2.75rem] text-[var(--fd-color-text)] group-hover:text-white transition-colors">
          {truncateWords(product.name, 14)}
        </h3>
        <div className="flex items-center justify-between text-[15px]">
          <span className="font-semibold text-[var(--fd-color-primary)] tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.variantCount && product.variantCount > 1 && (
            <span className="text-[var(--fd-color-text-muted)] text-xs">
              {product.variantCount} colores
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
