"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, updateQty, removeItem, clear, setOpen } = useCart();

  const handleConfirm = () => {
    clear();
    setOpen(false);
    router.push("/gracias");
  };

  return (
    <Container className="py-12 max-w-5xl">
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Checkout</h1>
        <p className="text-[var(--fd-color-text-muted)]">
          Revisá tu pedido antes de confirmar el pago
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 text-[var(--fd-color-text-muted)] text-lg">
          Tu carrito está vacío 🛒
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="md:col-span-2 space-y-5">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-[var(--fd-color-border)] bg-[var(--fd-color-surface)] rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="font-medium text-base">{it.name}</div>
                  <div className="text-sm text-[var(--fd-color-text-muted)]">
                    ${it.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    className="w-16 border rounded-md text-center text-sm py-1"
                    min={1}
                    value={it.qty}
                    onChange={(e) =>
                      updateQty(it.id, Math.max(1, Number(e.target.value) || 1))
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(it.id)}
                    className="text-sm"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de compra */}
          <aside className="p-6 border rounded-2xl bg-[var(--fd-color-surface)] shadow-md h-fit">
            <h2 className="text-lg font-semibold mb-5 text-center md:text-left">
              Resumen de compra
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[var(--fd-color-text-muted)]">
                Total
              </span>
              <span className="text-2xl font-semibold">
                ${total.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Button onClick={handleConfirm} className="w-full">
                Confirmar pago
              </Button>
              <Button
                onClick={() => router.back()}
                variant="ghost"
                className="w-full"
              >
                Seguir comprando
              </Button>
              <Button
                variant="outline"
                onClick={() => clear()}
                className="w-full"
              >
                Vaciar carrito
              </Button>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}
