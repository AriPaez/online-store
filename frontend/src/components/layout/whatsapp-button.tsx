"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  href?: string;
  className?: string;
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2c-5.52 0-10 4.43-10 9.9 0 1.75.48 3.45 1.38 4.95L2 22l5.28-1.38a10.1 10.1 0 0 0 4.76 1.21h.01c5.52 0 10-4.43 10-9.9 0-2.64-1.07-5.12-3.02-6.98A10.4 10.4 0 0 0 12.04 2Zm-.01 18.2a8.5 8.5 0 0 1-4.33-1.19l-.31-.18-3.13.82.84-3.05-.2-.31a8.27 8.27 0 0 1-1.27-4.43c0-4.64 3.85-8.4 8.59-8.4 2.27 0 4.4.87 6 2.44 1.6 1.57 2.48 3.65 2.48 5.86 0 4.64-3.85 8.4-8.59 8.4Zm4.72-6.26c-.26-.13-1.53-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.67.83-.82 1-.15.17-.3.19-.56.06-.26-.13-1.11-.41-2.12-1.31-.78-.69-1.31-1.53-1.46-1.79-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.39-.8-1.9-.21-.5-.42-.43-.58-.44h-.5c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.81 2.84 4.51 3.87.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.53-.62 1.75-1.22.22-.6.22-1.11.15-1.22-.06-.11-.24-.17-.5-.3Z" />
    </svg>
  );
}

export function WhatsAppButton({ href = "#", className }: WhatsAppButtonProps) {
  return (
    <Link
      href={href}
      aria-label="WhatsApp"
      className={cn(
        "group fixed z-[var(--fd-z-overlay)] bottom-5 right-5 md:bottom-6 md:right-6 inline-flex items-center justify-center rounded-full shadow-lg shadow-black/50",
        "bg-[#25D366] text-white w-14 h-14 hover:scale-105 active:scale-[0.97] transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]/70 ring-offset-black",
        className
      )}
    >
      <WhatsAppIcon className="w-7 h-7 drop-shadow-sm" />
      <span className="sr-only">Abrir WhatsApp</span>
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-opacity bg-white/10" />
    </Link>
  );
}
