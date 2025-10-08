"use client";

import React, { useState, useRef, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { postRegister } from '@/lib/api';
import DatePicker from 'react-datepicker';
import zxcvbn from 'zxcvbn';
import { format } from 'date-fns';

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    dni_user: '', name: '', lastname: '', username: '', password: '', email: '', birthdate: '', address: '', number_phone: '', role: 'USER'
  });
  const [birthDateObj, setBirthDateObj] = useState<Date | null>(null);
  const [pwScore, setPwScore] = useState(0);
  const [pwFeedback, setPwFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const dpRef = useRef<any>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (dpRef.current && !dpRef.current.contains(e.target)) {
        setDatePickerOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function update(field: string, value: string) { setForm(f => ({ ...f, [field]: value })); setErrors(e => ({ ...e, [field]: '' })); }

  function validate() {
    const e: Record<string,string> = {};
    if (!/^[0-9]{7,8}$/.test(form.dni_user)) e.dni_user = 'DNI inválido. Ej: 40293374';
    if (!form.name) e.name = 'Nombre requerido';
    if (!form.lastname) e.lastname = 'Apellido requerido';
    if (!form.username) e.username = 'Usuario requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    const pw = zxcvbn(form.password || '');
    if (pw.score < 3) e.password = 'La contraseña debe ser más fuerte';
    if (!birthDateObj) e.birthdate = 'Fecha de nacimiento requerida';
    else {
      // precise age check
      const today = new Date();
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const m = today.getMonth() - birthDateObj.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
      if (age < 18) e.birthdate = 'Debes ser mayor de 18 años';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // send only date portion (yyyy-MM-dd) to backend
      const bd = birthDateObj ? birthDateObj.toISOString().slice(0,10) : undefined;
      await postRegister({ ...form, birthdate: bd });
      if (onSuccess) onSuccess();
    } catch (err: any) { alert(err?.message || 'Error al registrarse'); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input placeholder="DNI" value={form.dni_user} onChange={(e) => update('dni_user', e.target.value)} className="input" />
      {errors.dni_user && <div className="text-sm text-red-500">{errors.dni_user}</div>}
      <input placeholder="Nombre" value={form.name} onChange={(e) => update('name', e.target.value)} className="input" />
      <input placeholder="Apellido" value={form.lastname} onChange={(e) => update('lastname', e.target.value)} className="input" />
      <input placeholder="Usuario" value={form.username} onChange={(e) => update('username', e.target.value)} className="input" />
      <input placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input" />
      <input placeholder="Contraseña" type="password" value={form.password} onChange={(e) => { update('password', e.target.value); const r = zxcvbn(e.target.value || ''); setPwScore(r.score); setPwFeedback(r.feedback?.warning || r.feedback?.suggestions?.[0] || null); }} className="input" />
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
          <div style={{ width: `${(pwScore+1) * 20}%` }} className={cn('h-full transition-width', pwScore < 2 ? 'bg-red-500' : pwScore === 2 ? 'bg-yellow-400' : 'bg-green-400')}></div>
        </div>
        <div className="text-xs text-white/60 w-24 text-right">{['Muy débil','Débil','Aceptable','Fuerte','Excelente'][pwScore]}</div>
      </div>
      {pwFeedback && <div className="text-sm text-yellow-300">{pwFeedback}</div>}
      {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
      <div className="flex items-center gap-2" ref={dpRef}>
        <input
          className="input"
          placeholder="DD-MM-YYYY"
          value={birthDateObj ? format(birthDateObj, 'dd-MM-yyyy') : ''}
          readOnly
          aria-label="Fecha de nacimiento"
        />
        <button type="button" aria-label="Abrir calendario" className="p-2 rounded bg-[var(--fd-color-surface-alt)] hover:bg-[var(--fd-color-surface)]" onClick={() => setDatePickerOpen(s => !s)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-[var(--fd-color-text-muted)]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
          <DatePicker
            selected={birthDateObj}
            onChange={(d: Date | null) => { setBirthDateObj(d); update('birthdate', d ? d.toISOString() : ''); setDatePickerOpen(false); }}
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            open={datePickerOpen}
            onClickOutside={() => setDatePickerOpen(false)}
            withPortal={false}
            popperClassName="fd-datepicker-popper"
            popperPlacement="bottom-start"
            popperModifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
            className="hidden"
          />
      </div>
      {errors.birthdate && <div className="text-sm text-red-500">{errors.birthdate}</div>}
      <Button loading={loading} type="submit">Registrarme</Button>
    </form>
  );
}

export default RegisterForm;
