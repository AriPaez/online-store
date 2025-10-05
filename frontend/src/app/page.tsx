import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/catalog/product-grid";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/portrait.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-45 mix-blend-normal"
            />
            {/* Overlay para oscurecer y mantener contraste del texto */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.75))]" />
            {/* Radial ligero de color marca encima */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,#7c3aed33,transparent_60%)]" />
          </div>
          <Container className="pt-28 pb-36 flex flex-col gap-10 items-start relative">
            <div className="max-w-3xl space-y-8">
              <h1 className="font-semibold text-5xl tracking-tight text-gradient">
                Expresá tu identidad con ropa de calidad y diseño único
              </h1>
              <p className="text-lg text-text-muted max-w-prose">
                Diseño independiente, producción responsable y piezas que
                cuentan historias. Ediciones reducidas — cuando se agotan, no
                vuelven.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[var(--fd-color-primary)] hover:bg-[#6d32d7]"
                >
                  NEW IN
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[var(--fd-color-border)] hover:border-[var(--fd-color-primary)]"
                >
                  Colección Spring 2025
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Grid productos */}
        <section className="py-14">
          <Container className="space-y-10">
            <SectionTitle
              eyebrow="Nuevos productos!"
              title="Lanzamientos recientes"
              description="Ediciones limitadas disponibles hasta agotar stock."
            />
            <ProductGrid products={products} />
          </Container>
        </section>

        {/* Sección CTA */}
        <section className="py-20 bg-bg-alt border-y border-border">
          <Container className="flex flex-col items-center text-center gap-6 max-w-2xl">
            <h2 className="font-semibold text-4xl leading-tight">
              Únite a la comunidad
            </h2>
            <p className="text-text-muted">
              Accedé antes a lanzamientos, descuentos exclusivos y contenido
              detrás de escena.
            </p>
            <Button
              size="lg"
              className="bg-[var(--fd-color-primary)] hover:bg-[#6d32d7]"
            >
              Suscribirme
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
