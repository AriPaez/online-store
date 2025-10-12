import { Product } from '@/components/catalog/product-card';

export const products: Product[] = [
  {
    id: 'new-jersey-devils',
    name: 'Camiseta New Jersey Devils',
    price: 100000,
    image: '/product-example.webp',
    badge: 'Nuevo',
    description: 'Descripción de la Remera',
    variantCount: 3,
    category: 'Remera'
  },
  {
    id: 'test-product',
    name: 'TEST',
    price: 666,
    description: "Descripción del Test",
    image: '/icon.webp',
    variantCount: 2,
    category: 'Accesorio'
  }
];
