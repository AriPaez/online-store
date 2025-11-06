import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductGrid } from "@/components/catalog/product-grid";
import { products } from "@/data/products";

export default function NewInPage() {
  const newProducts = products.filter((p: any) => (p.badge || "").toString().toLowerCase().includes("nuevo"));

  return (
    <>
      <Header />
      <main>
        <section className="py-14">
          <Container className="space-y-10">
            <SectionTitle
              eyebrow="New In"
              title="Nuevos lanzamientos"
              description="Lo más reciente en la tienda."
            />
            <ProductGrid products={newProducts} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
