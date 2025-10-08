"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { postLogin, verifyToken } from '@/lib/api';

type User = { id?: string; name?: string; email?: string; dni_user?: string } | null;

const AuthContext = createContext<{
  user: User;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (u: User) => void;
}>({ user: null, token: null, login: async () => {}, logout: () => {}, setUser: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
    // verify token with backend and refresh user
    (async () => {
      try {
        if (t) {
          const res = await verifyToken(t);
          if (res) {
            setUser(res.user || JSON.parse(u || '{}'));
            // refresh stored user
            if (res.user) localStorage.setItem('user', JSON.stringify(res.user));
          }
        }
      } catch (e) {
        // invalid token or network error -> clear
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
      }
    })();
  }, []);

  async function login(username: string, password: string) {
    const data = await postLogin({ username, password });
    if (data?.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || {}));
      setToken(data.token);
      setUser(data.user || null);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
