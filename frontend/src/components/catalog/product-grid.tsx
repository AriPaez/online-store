"use client";

import { ProductCard, Product } from './product-card';

interface ProductGridProps {
  products: Product[];
  search?: string;
}

export function ProductGrid({ products, search }: ProductGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          href={search ? `/producto/${p.id}${search}` : undefined}
        />
      ))}
    </div>
  );
}
