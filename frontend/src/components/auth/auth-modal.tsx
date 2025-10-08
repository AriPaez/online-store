"use client";

import React, { useState } from "react";
import { RegisterForm } from "./register-form";
import LoginForm from "./login-form";

export function AuthModal({
  initial = "login",
  onClose,
  onSuccess,
}: {
  initial?: "login" | "register";
  onClose?: () => void;
  onSuccess?: () => void;
}) {
  const [tab, setTab] = useState<"login" | "register">(initial);

  return (
    <div className="fixed inset-0 z-[var(--fd-z-modal)] flex items-center justify-center bg-black/60">
      <div className="bg-[var(--fd-color-surface)] rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3">
            <button
              className={`px-3 py-1 rounded ${tab === "login" ? "bg-white text-black" : "text-white/70"
                }`}
              onClick={() => setTab("login")}
            >
              Iniciar sesión
            </button>
            <button
              className={`px-3 py-1 rounded ${tab === "register" ? "bg-white text-black" : "text-white/70"
                }`}
              onClick={() => setTab("register")}
            >
              Registrarse
            </button>
          </div>
          <button
            onClick={() => onClose && onClose()}
            className="text-white/60"
          >
            Cerrar
          </button>
        </div>
        <div>
          {tab === "login" ? (
            <LoginForm
              onSuccess={() => {
                onSuccess && onSuccess();
                onClose && onClose();
              }}
            />
          ) : (
            <RegisterForm
              onSuccess={() => {
                onSuccess && onSuccess();
                onClose && onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
