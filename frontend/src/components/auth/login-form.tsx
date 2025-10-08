"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { Button } from '@/components/ui/button';

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} className="input" required />
      <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
      {error && <div className="text-sm text-red-500">{error}</div>}
      <Button loading={loading} type="submit">Entrar</Button>
    </form>
  );
}

export default LoginForm;
