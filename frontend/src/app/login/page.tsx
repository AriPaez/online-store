"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) window.location.href = '/profile';
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      // Redirigir a perfil
      window.location.href = '/profile';
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="max-w-md py-12">
      <div className="bg-[var(--fd-color-surface)] p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-[var(--fd-color-text)]">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button loading={loading} type="submit">Entrar</Button>
        </form>
        <p className="mt-4 text-sm text-[var(--fd-color-text-muted)]">
          ¿No tenés cuenta? <Link href="/register" className="underline">Registrate</Link>
        </p>
      </div>
    </Container>
  );
}
