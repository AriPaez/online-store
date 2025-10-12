import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';

export const metadata = {
  title: "Guía de Talles | FoxDrip",
  description: "Consulta nuestra guía de talles para elegir la prenda que mejor te quede. Medidas orientativas según modelo.",
  openGraph: {
    url: "https://www.foxdrip.example/guia-de-talles",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function SizeGuidePage() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-16 max-w-3xl">
          <h1
            className="text-2xl font-bold mb-4 text-[var(--fd-color-text)] inline-block pb-1"
          >
            Guía de Talles
          </h1>

          <p className="text-[var(--fd-color-text-muted)] mb-8 leading-relaxed">
            Las medidas son orientativas y pueden variar ligeramente según el modelo. 
            Te recomendamos revisar la descripción del producto para información más precisa.
          </p>

          <div>
            <div className="w-full max-w-5xl overflow-x-auto rounded-2xl border-2 border-[var(--fd-color-border-strong)] bg-[var(--fd-color-surface)] shadow-sm hover:border-[var(--fd-color-primary)]">
              <table className="min-w-full text-sm md:text-base text-[var(--fd-color-text-muted)]">
                <thead className="bg-[var(--fd-color-surface-hover)] text-[var(--fd-color-text)]">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold">Talle</th>
                    <th className="text-left px-6 py-3 font-semibold">Pecho</th>
                    <th className="text-left px-6 py-3 font-semibold">Cintura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[var(--fd-color-border)]">
                    <td className="px-6 py-3 font-medium text-[var(--fd-color-text)]">XS</td>
                    <td className="px-6 py-3">82–88 cm</td>
                    <td className="px-6 py-3">64–70 cm</td>
                  </tr>
                  <tr className="border-t border-[var(--fd-color-border)]">
                    <td className="px-6 py-3 font-medium text-[var(--fd-color-text)]">S</td>
                    <td className="px-6 py-3">88–94 cm</td>
                    <td className="px-6 py-3">70–76 cm</td>
                  </tr>
                  <tr className="border-t border-[var(--fd-color-border)]">
                    <td className="px-6 py-3 font-medium text-[var(--fd-color-text)]">M</td>
                    <td className="px-6 py-3">94–100 cm</td>
                    <td className="px-6 py-3">76–82 cm</td>
                  </tr>
                  <tr className="border-t border-[var(--fd-color-border)]">
                    <td className="px-6 py-3 font-medium text-[var(--fd-color-text)]">L</td>
                    <td className="px-6 py-3">100–106 cm</td>
                    <td className="px-6 py-3">82–88 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-8 text-sm text-[var(--fd-color-text-muted)] italic">
            *Si estás entre dos talles, te recomendamos elegir el más grande para un ajuste cómodo.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
