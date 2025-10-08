"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
// react-datepicker CSS is loaded on-demand to avoid blocking initial render
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { postRegister } from "@/lib/api";
import DatePicker from "react-datepicker";
import { format, parse, isValid } from "date-fns";

type ZxcvbnResult = {
  score: number;
  feedback?: { warning?: string; suggestions?: string[] };
};

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
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
  const [pwScore, setPwScore] = useState(0);
  const [pwFeedback, setPwFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const dpRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [zxcvbnFn, setZxcvbnFn] = useState<((s: string) => ZxcvbnResult) | null>(null);
  const [datepickerCssLoaded, setDatepickerCssLoaded] = useState(false);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (popupRef.current && popupRef.current.contains(target)) return;
      if (dpRef.current && dpRef.current.contains(target)) return;
      setDatePickerOpen(false);
    }
    if (datePickerOpen) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [datePickerOpen]);

  function ensureDatepickerCss() {
    if (typeof document === "undefined" || datepickerCssLoaded) return;
    if (document.getElementById("react-datepicker-css")) {
      setDatepickerCssLoaded(true);
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    // CDN copy so CSS isn't part of initial critical CSS
    link.href = "https://unpkg.com/react-datepicker/dist/react-datepicker.css";
    link.id = "react-datepicker-css";
    link.onload = () => setDatepickerCssLoaded(true);
    document.head.appendChild(link);
  }

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!/^[0-9]{7,8}$/.test(form.dni_user))
      e.dni_user = "DNI inválido. Ej: 40293374";
    if (!form.name) e.name = "Nombre requerido";
    if (!form.lastname) e.lastname = "Apellido requerido";
    if (!form.username) e.username = "Usuario requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email inválido";
    // Use zxcvbn if already loaded, otherwise a length heuristic
    if (zxcvbnFn) {
      try {
        const r = zxcvbnFn(form.password || "");
        if (r && typeof r === "object") {
          const score = (r as Record<string, unknown>)["score"];
          if (typeof score === "number" && score < 3)
            e.password = "La contraseña debe ser más fuerte";
        }
      } catch {
        if ((form.password || "").length < 8)
          e.password = "La contraseña debe ser más fuerte";
      }
    } else {
      if ((form.password || "").length < 8)
        e.password = "La contraseña debe ser más fuerte";
    }
    if (!birthDateObj) e.birthdate = "Fecha de nacimiento requerida";
    else {
      // precise age check
      const today = new Date();
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const m = today.getMonth() - birthDateObj.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
      if (age < 18) e.birthdate = "Debes ser mayor de 18 años";
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
      const bd = birthDateObj
        ? birthDateObj.toISOString().slice(0, 10)
        : undefined;
      await postRegister({ ...form, birthdate: bd });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      function extractMessage(e: unknown): string {
        if (!e || typeof e !== "object") return "Error al registrarse";
        const k = (e as Record<string, unknown>)["message"];
        return typeof k === "string" ? k : "Error al registrarse";
      }
      alert(extractMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // compute the popup element when popup coordinates are available
  let popupElement: React.ReactNode = null;
  if (datePickerOpen && popupPos) {
    const desiredTop = popupPos.y - 80; // shift up
    const top = Math.max(8, desiredTop);
    const left = popupPos.x + 8;
    popupElement = (
      <div
        ref={popupRef}
        className="fd-datepicker-popper"
        style={{ position: "fixed", left, top }}
      >
        <DatePicker
          selected={birthDateObj}
          onChange={(d: Date | null) => {
            setBirthDateObj(d);
            update("birthdate", d ? format(d, "dd-MM-yyyy") : "");
            setDatePickerOpen(false);
          }}
          inline
          dateFormat="dd-MM-yyyy"
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        placeholder="DNI"
        value={form.dni_user}
        onChange={(e) => update("dni_user", e.target.value)}
        className="input"
      />
      {errors.dni_user && (
        <div className="text-sm text-red-500">{errors.dni_user}</div>
      )}
      <input
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        className="input"
      />
      <input
        placeholder="Apellido"
        value={form.lastname}
        onChange={(e) => update("lastname", e.target.value)}
        className="input"
      />
      <input
        placeholder="Usuario"
        value={form.username}
        onChange={(e) => update("username", e.target.value)}
        className="input"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        className="input"
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={form.password}
        onChange={(e) => {
          const v = e.target.value;
          update("password", v);
          // optimistic quick heuristic
          const quick = v.length >= 12 ? 4 : v.length >= 10 ? 3 : v.length >= 8 ? 2 : v.length >= 6 ? 1 : 0;
          setPwScore(quick);
          setPwFeedback(null);
          if (!zxcvbnFn) {
            import('zxcvbn')
              .then((m) => {
                const fn = ((m as unknown) as { default?: unknown })?.default || (m as unknown);
                if (typeof fn === 'function') {
                  const typedFn = fn as (s: string) => ZxcvbnResult;
                  setZxcvbnFn(() => typedFn);
                  try {
                    const r = typedFn(v || '');
                    if (r && typeof r === 'object') {
                      setPwScore((r as ZxcvbnResult).score);
                      setPwFeedback((r as ZxcvbnResult).feedback?.warning || (r as ZxcvbnResult).feedback?.suggestions?.[0] || null);
                    }
                  } catch {
                    // ignore
                  }
                }
              })
              .catch(() => {});
          } else {
            try {
              const r = zxcvbnFn(v || '');
              setPwScore(r.score);
              setPwFeedback(r.feedback?.warning || r.feedback?.suggestions?.[0] || null);
            } catch {
              // ignore
            }
          }
        }}
        className="input"
      />
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
          <div
            style={{ width: `${(pwScore + 1) * 20}%` }}
            className={cn(
              "h-full transition-width",
              pwScore < 2
                ? "bg-red-500"
                : pwScore === 2
                  ? "bg-yellow-400"
                  : "bg-green-400"
            )}
          ></div>
        </div>
        <div className="text-xs text-white/60 w-24 text-right">
          {["Muy débil", "Débil", "Aceptable", "Fuerte", "Excelente"][pwScore]}
        </div>
      </div>
      {pwFeedback && (
        <div className="text-sm text-yellow-300">{pwFeedback}</div>
      )}
      {errors.password && (
        <div className="text-sm text-red-500">{errors.password}</div>
      )}
      <div className="flex items-center gap-2" ref={dpRef}>
        <input
          className="input"
          placeholder="DD-MM-YYYY"
          value={
            form.birthdate ||
            (birthDateObj ? format(birthDateObj, "dd-MM-yyyy") : "")
          }
          onChange={(e) => {
            const v = e.target.value;
            update("birthdate", v);
            // try parsing typed value as dd-MM-yyyy
            const parsed = parse(v, "dd-MM-yyyy", new Date());
            if (isValid(parsed)) {
              setBirthDateObj(parsed);
              setErrors((err) => ({ ...err, birthdate: "" }));
            } else {
              setBirthDateObj(null);
            }
          }}
          onFocus={() => { ensureDatepickerCss(); setDatePickerOpen(true); }}
          aria-label="Fecha de nacimiento"
        />
        <button
          type="button"
          aria-label="Abrir calendario"
          className="p-2 rounded bg-[var(--fd-color-surface-alt)] hover:bg-[var(--fd-color-surface)]"
          onClick={(e: React.MouseEvent) => {
            const ev = e as React.MouseEvent;
            ensureDatepickerCss();
            setPopupPos({ x: ev.clientX, y: ev.clientY });
            setDatePickerOpen((s) => !s);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--fd-color-text-muted)]"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
        {popupElement && createPortal(popupElement, document.body)}
      </div>
      {errors.birthdate && (
        <div className="text-sm text-red-500">{errors.birthdate}</div>
      )}
      <Button loading={loading} type="submit">
        Registrarme
      </Button>
    </form>
  );
}

export default RegisterForm;
