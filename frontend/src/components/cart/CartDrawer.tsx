"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";

export const CartDrawer: React.FC = () => {
  const { items, updateQty, removeItem, total, open, setOpen, clear } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  // Cierra el carrito al cambiar de ruta
  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed top-24 right-0 z-50 w-[300px] sm:w-[340px] 
        bg-[var(--fd-color-surface)]/80 backdrop-blur-lg border-l border-[var(--fd-color-border)] 
        rounded-l-xl shadow-2xl p-3 transition-all duration-300 ease-in-out
        ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
      style={{ maxHeight: "85vh" }}
    >
      <div className="flex items-center justify-between mb-3 mt-3">
        <h3 className="font-semibold text-lg">Carrito</h3>
        <IconButton label="Cerrar" onClick={() => setOpen(false)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </IconButton>
      </div>

      <div className="space-y-3 overflow-auto" style={{ maxHeight: "60vh" }}>
        {items.length === 0 ? (
          <div className="text-sm text-[var(--fd-color-text-muted)] text-center py-6">
            El carrito está vacío
          </div>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              className="border border-[var(--fd-color-border)] rounded-lg p-2 flex flex-col gap-2 bg-[var(--fd-color-surface)]/70"
            >
              <div>
                <div className="font-medium text-sm">{it.name}</div>
                <div className="text-xs text-[var(--fd-color-text-muted)]">{`$${it.price}`}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(it.id, it.qty - 1)}
                    className="px-2 border rounded"
                  >
                    -
                  </button>
                  <div className="px-2">{it.qty}</div>
                  <button
                    onClick={() => updateQty(it.id, it.qty + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(it.id)}
                  className="text-xs text-red-400"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 border-t pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-[var(--fd-color-text-muted)]">Total</div>
          <div className="font-semibold text-base">
            ${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="w-full"
            disabled={items.length === 0}
            onClick={() => {
              try {
                setOpen(false);
                router.push("/checkout");
              } catch (e) {
                setOpen(false);
              }
            }}
          >
            Pagar
          </Button>

          <button
            onClick={() => clear()}
            className="px-3 py-2 border rounded-md text-sm"
          >
            Vaciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;