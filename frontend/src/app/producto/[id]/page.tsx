"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { getProduct } from "@/lib/api";
import { products as localProducts } from "@/data/products";
import Link from "next/link";
import { Product } from "@/components/catalog/product-card";
import { ProductGrid } from "@/components/catalog/product-grid";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }: { params: any }) {
  const resolvedParams = React.use(params) as { id: string };
  const { id } = resolvedParams;
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const magnifierRef = useRef<HTMLDivElement | null>(null);
  const [zoomActive, setZoomActive] = useState(false);
  const zoomActiveRef = useRef(false);

  const { addItem, setOpen } = useCart();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    getProduct(id)
      .then((res) => {
        if (!mounted) return;
        const p =
          res?.data ?? res ?? localProducts.find((p) => p.id === id) ?? null;
        setProduct(p);
      })
      .catch(() => {
        setProduct(localProducts.find((p) => p.id === id) ?? null);
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  /* Lógica del zoom */
  useEffect(() => {
    const wrap = imgWrapRef.current;
    const mag = magnifierRef.current;
    if (!wrap || !mag) return;

    const zoomScale = 1.8;

    const handleMove = (e: MouseEvent) => {
      if (!zoomActiveRef.current) return;
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;

      mag.style.left = `${x - mag.offsetWidth / 2}px`;
      mag.style.top = `${y - mag.offsetHeight / 2}px`;
      mag.style.backgroundPosition = `${bgX}% ${bgY}%`;
      mag.style.backgroundSize = `${rect.width * zoomScale}px ${rect.height * zoomScale}px`;
    };

    const handleDocClick = (e: MouseEvent) => {
      if (!zoomActiveRef.current) return;
      if (!wrap.contains(e.target as Node)) {
        zoomActiveRef.current = false;
        setZoomActive(false);
        mag.classList.add("hidden");
      }
    };

    wrap.addEventListener("mousemove", handleMove);
    document.addEventListener("click", handleDocClick);

    return () => {
      wrap.removeEventListener("mousemove", handleMove);
      document.removeEventListener("click", handleDocClick);
    };
  }, [product]);

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const mag = magnifierRef.current;
    const wrap = imgWrapRef.current;
    if (!mag || !wrap) return;
    const next = !zoomActiveRef.current;
    zoomActiveRef.current = next;
    setZoomActive(next);

    if (next) {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;

      mag.classList.remove("hidden");
      mag.style.left = `${x - mag.offsetWidth / 2}px`;
      mag.style.top = `${y - mag.offsetHeight / 2}px`;
      mag.style.backgroundImage = `url(${product.image || "/product-example.webp"})`;
      mag.style.backgroundSize = `${rect.width * 1.8}px ${rect.height * 1.8}px`;
      mag.style.backgroundPosition = `${bgX}% ${bgY}%`;
      mag.style.backgroundRepeat = "no-repeat";
    } else {
      mag.classList.add("hidden");
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <Container className="py-12">Cargando...</Container>
        <Footer />
      </>
    );

  if (!product) {
    return (
      <>
        <Header />
        <Container className="py-12">Producto no encontrado</Container>
        <Footer />
      </>
    );
  }

  const addToCart = () => {
    try {
      addItem({ id: product.id, name: product.name, price: product.price, qty: 1 });
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const backQuery = (searchParams && searchParams.toString()) ? `?${searchParams.toString()}` : "";

  return (
    <>
      <Header />
      <main>
        <Container className="py-12">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Imagen + lupa */}
            <div className="w-full">
              <div
                ref={imgWrapRef}
                onClick={toggleZoom}
                className={`relative overflow-hidden rounded-lg group ${
                  zoomActive ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                style={{ paddingTop: "125%" }}
              >
                <Image
                  src={product.image || "/product-example.webp"}
                  alt={product.name || "Producto"}
                  fill
                  className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                  priority
                />

                {/* Lupa */}
                <div
                  ref={magnifierRef}
                  id="magnifier"
                  className="hidden pointer-events-none absolute w-35 h-35 rounded-full border-2 border-white shadow-lg bg-no-repeat bg-cover"
                  aria-hidden={!zoomActive}
                />
              </div>
            </div>

            {/* Información */}
            <div className="flex flex-col justify-center p-4 md:p-6 lg:p-10">
              <h1 className="text-2xl font-bold mb-8">{product.name}</h1>
              <div className="text-sm text-[var(--fd-color-text-muted)] mb-8">
                {(product as Product)?.category ?? "Sin categoría"}
              </div>
              <div className="text-xl font-semibold text-[var(--fd-color-primary)] mb-8">
                {product.price ? `$${product.price}` : "Precio no disponible"}
              </div>
              <p className="text-[var(--fd-color-text-muted)] mb-8">
                {product.description ?? "Descripción no disponible"}
              </p>
              <div className="flex items-center gap-4">
                <Button
                  onClick={addToCart}
                  aria-label={`Agregar ${product.name} al carrito`}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-md font-medium bg-[var(--fd-color-primary)] text-[var(--fd-color-primary-foreground)]"
                >
                  Agregar al carrito
                </Button>
                <Link
                  href={`/productos${backQuery}`}
                  aria-label="Volver a productos"
                  className="text-sm text-[var(--fd-color-text-muted)] underline"
                >
                  Volver al listado
                </Link>
              </div>
            </div>
          </div>

          {/* Productos similares */}
          <div className="mt-14">
            <h3 className="text-lg font-semibold mb-6">Productos similares</h3>
            <ProductGrid
              products={localProducts
                .filter(
                  (p) =>
                    (p as any).category === (product as any).category &&
                    p.id !== product.id
                )
                .slice(0, 4)}
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
