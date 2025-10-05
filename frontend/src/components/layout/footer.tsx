import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--fd-color-border)] mt-16">
      <Container className="py-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between text-sm">
        <div className="space-y-3 max-w-sm">
          <h3 className="font-semibold text-base">FoxDrip</h3>
          <p className="text-[var(--fd-color-text-muted)]">
            Ropa pensada para la comunidad creativa y la cultura urbana. Hecha
            con materiales de calidad y foco en el detalle.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:gap-12">
          <div>
            <h4 className="font-medium mb-3">Ayuda</h4>
            <ul className="space-y-2 text-[var(--fd-color-text-muted)]">
              <li>
                <a href="#" className="hover:text-[var(--fd-color-text)]">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--fd-color-text)]">
                  Cambios y devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--fd-color-text)]">
                  Rastrea tu pedido
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Compañía</h4>
            <ul className="space-y-2 text-[var(--fd-color-text-muted)]">
              <li>
                <a href="#" className="hover:text-[var(--fd-color-text)]">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--fd-color-text)]">
                  Sustentabilidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--fd-color-text)]">
                  Trabajá con nosotros
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-[var(--fd-color-border)] py-4 text-xs text-[var(--fd-color-text-muted)]">
        <Container className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} FoxDrip. Todos los derechos reservados.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--fd-color-text)]">
              Privacidad
            </a>
            <a href="#" className="hover:text-[var(--fd-color-text)]">
              Términos
            </a>
            <a href="#" className="hover:text-[var(--fd-color-text)]">
              Cookies
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
