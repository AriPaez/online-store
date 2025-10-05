"use client";

import Link from "next/link";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BrandMark } from "@/components/layout/brand-mark";

// Simple placeholder icons (SVG inline). Reemplazar por íconos reales luego.
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
    </svg>
  );
}
function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 7h12l1 13H5L6 7Z" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}
function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

interface HeaderProps {
  className?: string;
}

const NAV_LINKS = [
  { href: "/", label: "INICIO" },
  { href: "/productos", label: "PRODUCTOS" },
  { href: "/contacto", label: "CONTACTO" },
  { href: "/guia-de-talles", label: "GUÍA DE TALLES" },
];

export function Header({ className }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("sticky top-8 z-[var(--fd-z-sticky)]", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,12,18,0.85),rgba(12,12,18,0.72)_40%,rgba(12,12,18,0.4)_100%)] backdrop-blur-xl border-b border-white/5" />
      <nav aria-label="Primary" className="relative">
        <Container className="h-20 hidden md:flex items-center gap-10">
          {/* Brand Left */}
          <div className="flex items-center gap-3 min-w-[140px]">
            <BrandMark asLink priority size={36} withText={false} />
            <span className="hidden xl:inline font-extrabold text-lg tracking-tight">
              FoxDrip
            </span>
          </div>
          {/* Nav Center */}
          <ul className="flex flex-1 items-center justify-center gap-10 text-[12.5px] tracking-wider font-medium uppercase">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[var(--fd-color-text-muted)] hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Actions Right */}
          <div className="flex items-center gap-2 min-w-[140px] justify-end">
            <IconButton
              label="Buscar"
              className="hover:bg-[var(--fd-color-surface-alt)]"
            >
              <SearchIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              label="Cuenta"
              className="hover:bg-[var(--fd-color-surface-alt)]"
            >
              <UserIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              label="Carrito"
              variant="outline"
              className="border-[var(--fd-color-border)] hover:border-[var(--fd-color-primary)]"
            >
              <BagIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </Container>
        {/* Mobile */}
        <Container className="flex md:hidden h-16 items-center justify-between">
          <IconButton label="Abrir menú" onClick={() => setOpen(true)}>
            <MenuIcon className="h-5 w-5" />
          </IconButton>
          <BrandMark asLink size={32} />
          <span className="font-bold text-lg tracking-tight">FoxDrip</span>
          <div className="flex items-center gap-2">
            <IconButton label="Buscar">
              <SearchIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              label="Carrito"
              variant="outline"
              className="border-[var(--fd-color-border)] hover:border-[var(--fd-color-primary)]"
            >
              <BagIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </Container>
      </nav>

      {/* Mobile Overlay Menu */}
      {open && (
        <div className="fixed inset-0 z-[var(--fd-z-modal)] bg-black/80 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-bold text-lg"
            >
              <BrandMark size={32} />
              <span>FoxDrip</span>
            </button>
            <IconButton label="Cerrar" onClick={() => setOpen(false)}>
              <CloseIcon className="h-5 w-5" />
            </IconButton>
          </div>
          <ul className="flex-1 flex flex-col gap-2 px-6 py-6 text-sm font-medium uppercase tracking-wide">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-md px-3 py-3 text-[var(--fd-color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-8 flex flex-col gap-3 text-xs text-[var(--fd-color-text-muted)]">
            <p className="leading-relaxed">
              Indumentaria de edición limitada inspirada en la cultura urbana y
              creatividad independiente.
            </p>
            <p className="text-[10px] tracking-wide uppercase">
              © {new Date().getFullYear()} FoxDrip
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
