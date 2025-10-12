import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contacto | FoxDrip",
  description: "Escribinos para consultas o soporte. Te responderemos a la brevedad.",
  openGraph: {
    title: "Contacto | FoxDrip",
    description: "Escribinos para consultas o soporte. Te responderemos a la brevedad.",
    url: "https://www.foxdrip.example/contacto",
    type: "website",
  },
  twitter: {
    title: "Contacto | FoxDrip",
    description: "Escribinos para consultas o soporte. Te responderemos a la brevedad.",
    card: "summary_large_image",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-12 max-w-5xl">
          <h1 className="text-2xl font-bold mb-2">Contacto</h1>
          <p className="text-[var(--fd-color-text-muted)] mb-6">Escribinos y te contestamos a la brevedad.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Formulario */}
            <section className="group overflow-hidden rounded-xl border border-[var(--fd-color-border)] hover:scale-[1.01] hover:border-[var(--fd-color-primary)] transition-colors duration-300 col-span-1 md:col-span-2 p-6 h-full" style={{ background: "var(--fd-gradient-card)"}}>
              <h2 className="text-[var(--fd-font-size-xl)] font-semibold leading-[var(--fd-leading-default)] pb-2 mb-4">Enviá tu consulta</h2>
              <form role="form" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-[var(--fd-font-size-sm)] text-[var(--fd-color-text-muted)] mb-1">Nombre</label>
                    <input id="name" name="name" className="input" placeholder="Nombre" autoComplete="name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[var(--fd-font-size-sm)] text-[var(--fd-color-text-muted)] mb-1">Email</label>
                    <input id="email" name="email" className="input" placeholder="Email" type="email" autoComplete="email" required/>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[var(--fd-font-size-sm)] text-[var(--fd-color-text-muted)] mb-1">Asunto</label>
                  <input id="subject" name="subject" className="input" placeholder="(opcional)" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[var(--fd-font-size-sm)] text-[var(--fd-color-text-muted)] mb-1">Mensaje</label>
                  <textarea id="message" name="message" className="input h-36 max-h-56 resize-none" placeholder="Contanos tu consulta" required/>
                </div>
                <Button type="submit" aria-label="Enviar consulta" className="mt-2 w-full sm:w-1/2 max-w-xs mx-auto">Enviar</Button>
              </form>
            </section>
            {/* Tarjeta de contacto*/}
              <aside className="group overflow-hidden rounded-xl border border-[var(--fd-color-border)] hover:border-[var(--fd-color-primary)] transition-colors duration-300 p-8 max-w-sm w-full mx-auto h-full flex flex-col justify-between hover:scale-[1.01]" style={{background: "var(--fd-gradient-card)"}}>
                <h2 className="text-2xl font-semibold leading-[var(--fd-leading-default)] pb-2 mb-4">Horario de Atención</h2>
                <ul className="text-[var(--fd-color-text-muted)] space-y-6 text-[var(--fd-font-size-sm)] mb-5">
                  <li><span className="font-medium text-[var(--fd-color-text)]">Lun - Vie:</span> 10:00 - 19:00</li>
                  <li><span className="font-medium text-[var(--fd-color-text)]">Sáb:</span> 10:00 - 17:00</li>
                  <li><span className="font-medium text-[var(--fd-color-text)]">Dom:</span> Cerrado</li>
                </ul>

                <h2 className="text-2xl font-semibold text-[var(--fd-color-text)] border-b border-[var(--fd-color-border-strong)] pb-2 mb-4">Otros Contactos</h2>
                <div className="space-y-6 text-[var(--fd-font-size-base)]">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--fd-color-primary)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <div className="text-[var(--fd-color-text-muted)]">Av. Principal 123, Ciudad</div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--fd-color-primary)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.83.36 1.65.72 2.41a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.67-1.67a2 2 0 0 1 2.11-.45c.76.36 1.58.6 2.41.72A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div className="text-[var(--fd-color-text-muted)]">+54 9 11 1234-5678</div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--fd-color-primary)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16v16H4z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <a href="mailto:contacto@foxdrip.example" className="text-[var(--fd-color-text-muted)] hover:text-[var(--fd-color-primary)]">contacto@foxdrip.example</a>
                  </div>
                </div>
              </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}