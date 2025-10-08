"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { postRegister } from "@/lib/api";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import zxcvbn from 'zxcvbn';
import { format } from 'date-fns';
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

function formatDateToDDMMYYYY(date: Date | null) {
  if (!date) return '';
  return format(date, 'dd-MM-yyyy');
}

export default function RegisterPage() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) window.location.href = '/profile';
  }, [user]);
  const [form, setForm] = useState({
    dni_user: "",
    name: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    birthdate: "",
    address: "",
    number_phone: "",
    role: "USER",
  });
  const [birthDateObj, setBirthDateObj] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate() {
    const e: Record<string,string> = {};
    // DNI: 7-8 digits
    if (!/^[0-9]{7,8}$/.test(form.dni_user)) e.dni_user = 'DNI inválido. Ej: 40293374';
    if (!form.name) e.name = 'Nombre requerido';
    if (!form.lastname) e.lastname = 'Apellido requerido';
    if (!form.username) e.username = 'Usuario requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
  const pw = zxcvbn(form.password || '');
  if (pw.score < 3) e.password = 'La contraseña debe ser más fuerte (usa mayúsculas, números y símbolos)';
    // birthdate: must be at least 18 years
    if (!birthDateObj) e.birthdate = 'Fecha de nacimiento requerida';
    else {
      const b = birthDateObj;
      const age = new Date().getFullYear() - b.getFullYear();
      if (age < 18) e.birthdate = 'Debes ser mayor de 18 años';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await postRegister({
        ...form,
        birthdate: birthDateObj ? birthDateObj.toISOString() : undefined,
      });
      alert('Registro exitoso. Inicia sesión.');
      window.location.href = '/login';
    } catch (err: any) {
      alert(err?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  }

  const pwScore = zxcvbn(form.password || '').score;

  return (
    <Container className="max-w-md py-12">
      <div className="bg-[var(--fd-color-surface)] p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-[var(--fd-color-text)]">Crear cuenta</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input placeholder="DNI" value={form.dni_user} onChange={(e) => update('dni_user', e.target.value)} className="input" required />
            {errors.dni_user && <div className="text-sm text-red-500">{errors.dni_user}</div>}
          </div>
          <div>
            <input placeholder="Nombre" value={form.name} onChange={(e) => update('name', e.target.value)} className="input" required />
            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
          </div>
          <div>
            <input placeholder="Apellido" value={form.lastname} onChange={(e) => update('lastname', e.target.value)} className="input" required />
            {errors.lastname && <div className="text-sm text-red-500">{errors.lastname}</div>}
          </div>
          <div>
            <input placeholder="Usuario" value={form.username} onChange={(e) => update('username', e.target.value)} className="input" required />
            {errors.username && <div className="text-sm text-red-500">{errors.username}</div>}
          </div>
          <div>
            <input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input" required />
            {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
          </div>
          <div>
            <input placeholder="Contraseña" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} className="input" required />
            {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
            <div className="mt-2 h-2 w-full bg-white/5 rounded">
              <div className={`h-2 rounded ${pwScore<=1? 'bg-red-500 w-1/4': pwScore===2? 'bg-yellow-400 w-2/4' : pwScore===3? 'bg-green-400 w-3/4' : 'bg-green-600 w-full'}`}></div>
            </div>
          </div>
          <div>
            <label className="text-sm">Fecha de nacimiento</label>
            <DatePicker
              selected={birthDateObj}
              onChange={(d: Date | null) => { setBirthDateObj(d); update('birthdate', d ? d.toISOString() : ''); }}
              dateFormat="dd-MM-yyyy"
              className="input"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              maxDate={new Date()}
            />
            <div className="text-sm text-[var(--fd-color-text-muted)]">Formato: DD-MM-YYYY — {formatDateToDDMMYYYY(birthDateObj)}</div>
            {errors.birthdate && <div className="text-sm text-red-500">{errors.birthdate}</div>}
          </div>
          <div>
            <input placeholder="Dirección" value={form.address} onChange={(e) => update('address', e.target.value)} className="input" />
          </div>
          <div>
            <input placeholder="Teléfono" value={form.number_phone} onChange={(e) => update('number_phone', e.target.value)} className="input" />
          </div>
          <Button loading={loading} type="submit">{loading? 'Enviando...':'Registrarme'}</Button>
        </form>
        <p className="mt-3 text-sm text-[var(--fd-color-text-muted)]">Ya tenés cuenta? <Link href="/login" className="underline">Entrar</Link></p>
      </div>
    </Container>
  );
}
