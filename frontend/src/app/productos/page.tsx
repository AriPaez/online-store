"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/catalog/product-grid";
import { products as localProducts } from "@/data/products";
import { getProducts } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [products, setProducts] = useState(localProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(Math.max(...localProducts.map(p => p.price)));
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<number | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(localProducts.map(p => p.category).filter(Boolean))),
    []
  );

  // Traer productos del backend
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProducts()
      .then(res => {
        if (!mounted) return;
        const list = Array.isArray(res) ? res : res?.data ?? localProducts;
        setProducts(list.length ? list : localProducts);
      })
      .catch(() => setProducts(localProducts))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // Inicializar filtros desde URL
  useEffect(() => {
    const params = Object.fromEntries(Array.from(searchParams.entries()));
    if (params.category) setCategory(params.category);
    if (params.maxPrice) setMaxPrice(Number(params.maxPrice));
  }, [searchParams]);

  const maxPriceLimit = Math.max(...products.map(p => p.price), 1000);

  // Filtrado
  const filteredList = useMemo(() => {
    return products.filter(p => {
      if (category !== "all" && p.category !== category) return false;
      if (typeof maxPrice === "number" && p.price > maxPrice) return false;
      return true;
    });
  }, [products, category, maxPrice]);

  const qs = useMemo(() => {
    const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    return params.toString() ? `?${params.toString()}` : "";
  }, [searchParams]);

  const updateUrlParams = useCallback((updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    updater(params);
    router.replace(`${window.location.pathname}?${params.toString()}`);
  }, [router, searchParams]);

  const handleCategorySelect = useCallback((cat: string) => {
    setCategory(cat);
    updateUrlParams(params => { if (cat === "all") params.delete("category"); else params.set("category", cat); });
  }, [updateUrlParams]);

  const handlePriceChange = useCallback((value: number) => {
    const v = Math.max(0, Math.floor(value));
    setMaxPrice(v);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      updateUrlParams(params => { params.set("maxPrice", String(v)); });
    }, 300);
  }, [updateUrlParams]);

  useEffect(() => {
    return () => { if (debounceRef.current) window.clearTimeout(debounceRef.current); };
  }, []);

  const handleClearFilters = useCallback(() => {
    setCategory("all");
    const initialMax = Math.max(...localProducts.map(p => p.price));
    setMaxPrice(initialMax);
    updateUrlParams(params => { params.delete("category"); params.delete("maxPrice"); });
  }, [updateUrlParams]);

  return (
    <>
      <style>{`/* ocultar spinners nativos para el input number */#price-number::-webkit-outer-spin-button,#price-number::-webkit-inner-spin-button {-webkit-appearance: none; margin: 0;}#price-number {-moz-appearance: textfield; /* Firefox */}`}</style>
      <Header />
      <main>
        <section className="py-14">
          <Container className="space-y-3">

            {/* SectionTitle Catálogo*/}
            <SectionTitle eyebrow="Catálogo" title="" description="" />

            {/* Título y descripción */}
            <div className="space-y-6 mb-6 text-left">
              <h1 className="text-2xl md:text-4xl font-semibold text-[var(--fd-color-text)]">Productos</h1>
              <p className="text-base md:text-lg text-[var(--fd-color-text-muted)]">Explorá nuestra selección</p>
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-start flex-wrap">
              {/* Categoría */}
              <div className="relative">
                <select
                  value={category}
                  onChange={e => handleCategorySelect(e.target.value)}
                  aria-label="Filtrar por categoría"
                  className="appearance-none h-12 min-w-[200px] px-4 pr-10 text-[var(--fd-color-text)] rounded-lg shadow-sm border border-[var(--fd-color-border)] hover:scale-[1.01] hover:border-[var(--fd-color-primary)]"
                  style={{ background: 'var(--fd-gradient-card)', color: 'var(--fd-color-text)' }}
                >
                  <option value="all" style={{ background: 'var(--fd-color-surface)', color: 'var(--fd-color-text)' }}>Todas las categorías</option>
                  {categories.map(c => (
                    <option key={c} value={c} style={{ background: 'var(--fd-color-surface)', color: 'var(--fd-color-text)' }}>{c}</option>
                  ))}
                </select>
                {/* flechita custom*/}
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--fd-color-text-muted)]" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Precio Máximo */}
              <div
                className="relative flex items-center h-12 rounded-lg shadow-sm border border-[var(--fd-color-border)] hover:scale-[1.01] hover:border-[var(--fd-color-primary)]" style={{ background: 'var(--fd-gradient-card)'}}>
                <span className="text-[var(--fd-color-text)] font-medium ml-3 mr-3">Precio Máximo:</span>

               {/* Slider */}
              <input
                type="range"
                min={0}
                max={maxPriceLimit}
                step={Math.max(1, Math.floor(maxPriceLimit / 2500))}
                value={maxPrice}
                onChange={e => handlePriceChange(Number(e.target.value))}
                className="h-2 rounded-lg accent-[var(--fd-color-primary)] flex-1 mr-3"
                aria-label="Precio máximo"
                aria-valuemin={0}
                aria-valuemax={maxPriceLimit}
                aria-valuenow={maxPrice}
              />

                {/* Numeric input */}
                <div className="flex items-center mr-3">
                  <span className="text-[var(--fd-color-text)] mr-1 font-semibold">$</span>
                  <input
                    id="price-number"
                    type="number"
                    value={maxPrice}
                    className="h-7 w-20 text-right text-[var(--fd-color-text)] bg-transparent border border-[var(--fd-color-border-strong)] rounded-lg pr-1"
                    style={{ background: 'var(--fd-color-surface)' }}
                    onChange={e => handlePriceChange(Number(e.target.value || 0))}
                    min={0}
                    aria-label="Precio máximo exacto"
                    onWheel={e => e.currentTarget.blur()} 
                  />
                </div>
              </div>

              {/* Limpiar filtros */}
              <Button
                onClick={handleClearFilters}
                className="h-12 px-3 py-2 rounded-md bg-[var(--fd-color-surface-alt)] border border-[var(--fd-color-border)] hover:scale-[1.01] hover:border-[var(--fd-color-primary)]" style={{ background: 'var(--fd-gradient-card)', color: 'var(--fd-color-text)'}}>
                Limpiar Filtros
              </Button>
            </div>

            {/* Resultados */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-[var(--fd-color-text-muted)]">{filteredList.length} resultados</div>
            </div>

            {/* Grid de productos */}
            <div className="mt-6">
              {loading && <div>Cargando productos...</div>}
              {error && <div className="text-sm text-red-500">{error}</div>}
              {!loading && !error && <ProductGrid products={filteredList} search={qs} />}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
