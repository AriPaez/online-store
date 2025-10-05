/**
 * Utilidades generales
 */

// Concatenar clases condicionalmente (inspirado en clsx + tailwind-merge básica futura)
export function cn(...classes: Array<string | undefined | false | null | Record<string, boolean>>): string {
  const output: string[] = [];
  for (const c of classes) {
    if (!c) continue;
    if (typeof c === 'string') {
      output.push(c);
    } else if (typeof c === 'object') {
      for (const key in c) {
        if (c[key]) output.push(key);
      }
    }
  }
  return output.join(' ');
}

// Truncar texto sin cortar palabras (para títulos de productos)
export function truncateWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '…';
}

// Formatear precios (ARS por defecto)
export function formatPrice(value: number, currency: string = 'ARS', locale: string = 'es-AR'): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return value.toFixed(0);
  }
}
