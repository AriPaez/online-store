## Sistema de Diseño – FoxDrip (Versión inicial)

Este documento define los fundamentos visuales y estructurales para el e–commerce de indumentaria FoxDrip. Sirve como guía para escalar el frontend de forma consistente y veloz.

---
## 1. Principios
1. Claridad: Priorizar legibilidad y jerarquía visual limpia.
2. Consistencia: Todos los componentes consumen los mismos tokens.
3. Escalabilidad: Los tokens permiten agregar temas (p.ej. "seasonal", "sale") sin refactor masivo.
4. Performance: Usar utilidades de Tailwind + CSS variables para evitar CSS redundante.

---
## 2. Paleta de Colores (tokens)
Se implementan como CSS Custom Properties en `:root` (light) y `[data-theme="dark"]` (dark). Prefijos:
- `--fd-color-*` para colores de rol (no usar el hex directo en componentes).

| Rol | Token | Light | Dark | Uso |
|-----|-------|-------|------|-----|
| Fondo base | `--fd-color-bg` | #FFFFFF | #0D0D0F | Body / canvas principal |
| Fondo alterno | `--fd-color-bg-alt` | #F7F7F8 | #141418 | Secciones alternas |
| Superficie | `--fd-color-surface` | #FFFFFF | #1D1F23 | Tarjetas / modales |
| Superficie énfasis | `--fd-color-surface-alt` | #F2F3F5 | #23262B | Hovers / headers |
| Borde suave | `--fd-color-border` | #E3E5E8 | #2D3036 | Límites discretos |
| Borde fuerte | `--fd-color-border-strong` | #C5C9CE | #3A3F46 | Divisiones marcadas |
| Texto principal | `--fd-color-text` | #181A1F | #ECEDEF | Copys, headings |
| Texto secundario | `--fd-color-text-muted` | #5A616B | #9AA0AA | Descripciones |
| Texto invertido | `--fd-color-text-inverted` | #FFFFFF | #0D0D0F | Sobre superficies primarias |
| Primario (brand) | `--fd-color-primary` | #FF4D2D | #FF5E40 | Botones, acentos |
| Primario foreground | `--fd-color-primary-foreground` | #FFFFFF | #FFFFFF | Texto sobre primario |
| Secundario | `--fd-color-secondary` | #2563EB | #3B82F6 | Acciones secundarias / links |
| Éxito | `--fd-color-success` | #16A34A | #22C55E | Mensajes positivos |
| Advertencia | `--fd-color-warning` | #D97706 | #F59E0B | Alertas leves |
| Error | `--fd-color-danger` | #DC2626 | #F87171 | Errores |
| Focus ring | `--fd-color-focus` | #2563EB | #3B82F6 | Outline accesibilidad |

### Gradientes (futuros)
`--fd-gradient-hero: linear-gradient(135deg,#FF4D2D 0%,#FF805E 50%,#FFB199 100%);`

---
## 3. Tipografía
Usaremos las fuentes de Geist ya configuradas + escalas fluidas.

| Token | Tamaño base (clamp) | Uso |
|-------|---------------------|-----|
| `--fd-font-size-xs` | 0.75rem | Notas, etiquetas |
| `--fd-font-size-sm` | 0.875rem | Texto secundario |
| `--fd-font-size-base` | 1rem | Texto estándar |
| `--fd-font-size-lg` | 1.125rem | Texto destacado |
| `--fd-font-size-xl` | 1.25rem | Subheading |
| `--fd-font-size-2xl` | clamp(1.5rem,2vw,1.75rem) | Heading h4 |
| `--fd-font-size-3xl` | clamp(1.75rem,3vw,2.25rem) | Heading h3 |
| `--fd-font-size-4xl` | clamp(2rem,4vw,2.75rem) | Heading h2 |
| `--fd-font-size-5xl` | clamp(2.5rem,5vw,3.5rem) | Heading h1 / Hero |

Line-height: usar utilidades de Tailwind (`leading-tight`, `leading-snug`, etc.) + variable `--fd-leading-default: 1.5;`.

Peso recomendado: 500 (regular), 600 (semi), 700 (bold) para jerarquía.

---
## 4. Espaciado
Usaremos escala Tailwind por defecto (0, 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64). Documentamos alias semánticos:

| Alias | Valor sugerido |
|-------|----------------|
| `--fd-space-xs` | 4px |
| `--fd-space-sm` | 8px |
| `--fd-space-md` | 16px |
| `--fd-space-lg` | 24px |
| `--fd-space-xl` | 32px |
| `--fd-space-2xl` | 48px |

---
## 5. Radios
| Token | Valor | Uso |
|-------|-------|-----|
| `--fd-radius-xs` | 2px | Tags, chips |
| `--fd-radius-sm` | 4px | Inputs |
| `--fd-radius-md` | 6px | Tarjetas |
| `--fd-radius-lg` | 10px | Botones principales |
| `--fd-radius-full` | 9999px | Pills / Avatares |

---
## 6. Sombras
| Token | Valor |
|-------|-------|
| `--fd-shadow-sm` | 0 1px 2px 0 rgba(0,0,0,0.06) |
| `--fd-shadow` | 0 2px 4px -2px rgba(0,0,0,0.10),0 4px 8px -2px rgba(0,0,0,0.06) |
| `--fd-shadow-lg` | 0 8px 24px -4px rgba(0,0,0,0.18) |
| `--fd-shadow-glow` | 0 0 0 4px color-mix(in srgb,var(--fd-color-primary) 40%, transparent) |

---
## 7. Transiciones
`--fd-transition-fast: 120ms;`
`--fd-transition: 180ms;`
`--fd-transition-slow: 320ms;`
Timing function: `cubic-bezier(.4,0,.2,1)`.

---
## 8. Layout / Grid
Anchuras contenedor:
| Token | Valor |
|-------|-------|
| `--fd-container-xs` | 480px |
| `--fd-container-sm` | 640px |
| `--fd-container-md` | 768px |
| `--fd-container-lg` | 1024px |
| `--fd-container-xl` | 1280px |
| `--fd-container-2xl` | 1440px |

Utilizar envoltorio `.container` (Tailwind) + `max-w-[var(--fd-container-xl)]` para desktop.

---
## 9. Z-Index
`--fd-z-base: 0;`
`--fd-z-dropdown: 100;`
`--fd-z-sticky: 200;`
`--fd-z-overlay: 400;`
`--fd-z-modal: 500;`
`--fd-z-popover: 600;`
`--fd-z-toast: 700;`

---
## 10. Accesibilidad
1. Contraste AA mínimo para texto normal (≥ 4.5:1). Los colores primarios vs surfaces cumplen.
2. Estados de foco visibles usando outline custom (`--fd-color-focus`).
3. Iconos acompañados de texto o `aria-label`.

---
## 11. Nomenclatura de Componentes
Prefijo `FD` en nombres internos si fuese necesario (ej: `FDButton`), aunque para React exportaremos nombres simples.

Estados estándar:
- `hover:`
- `focus-visible:`
- `disabled:` (opacidad reducida + cursor not-allowed)
- `aria-[expanded="true"]` para acomodar animaciones.

---
## 12. Próximos Componentes (Roadmap inicial)
1. Base: Button, IconButton, Badge, Input, Select, Modal.
2. Layout: Header, Footer, Section, Container.
3. Catálogo: ProductCard, ProductGrid, FiltersDrawer, Breadcrumbs.
4. Feedback: Toast, Skeleton, EmptyState.
5. Navegación: MobileMenu, SearchBar, CartSidebar.

---
## 13. Ejemplo de Uso de Tokens en un Componente
```tsx
<button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-medium bg-[var(--fd-color-primary)] text-[var(--fd-color-primary-foreground)] shadow-[var(--fd-shadow-sm)] hover:shadow-[var(--fd-shadow)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fd-color-focus)]">
  Comprar ahora
</button>
```

---
## 14. Theming Futuro
- Modo "sale" podría sobreescribir `--fd-color-primary` con un rojo o gradiente temporal.
- Modo "season" (ej: invierno) ajusta `--fd-gradient-hero`.

Implementación: añadir atributo `data-theme="sale"` en `<html>` y nuevas reglas específicas.

---
## 15. Estructura de Carpetas Propuesta
```
src/
  app/
  components/
    ui/
    layout/
    catalog/
  lib/
  data/
```

---
## 16. Convenciones de Código
- Usar función `cn(...classes)` para concatenar clases condicionales.
- Evitar CSS adicional salvo casos complejos; preferir utilidades Tailwind + variables.
- Componentes puros, sin lógica de negocio en la capa de UI.

---
## 17. Versionado del Diseño
Este es el baseline v0.1. Cambios mayores se documentan en un `CHANGELOG.md` futuro.

---
¿Dudas o ajustes? Refinaremos tras feedback visual inicial (wireframes / mock hero). 
