import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/catalog/product-grid";
import { products } from "@/data/products";

export default function Spring2025Page() {
  const springProducts = products.filter((p: any) => (p.category || "").toString().toLowerCase() === "remera");

  return (
    <>
      <Header />
      <main>
        <section className="py-14">
          <Container className="space-y-10">
            <SectionTitle
              eyebrow="Colección"
              title="Spring 2025"
              description="Piezas destacadas de la colección primavera 2025."
            />
            <ProductGrid products={springProducts} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
