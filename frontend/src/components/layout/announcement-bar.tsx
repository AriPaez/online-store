"use client";
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnnouncementBarProps {
  messages: string[];
  className?: string;
  speed?: number;
  separator?: string;
}

export function AnnouncementBar({
  messages,
  className,
  speed = 20,
  separator = '|',
}: AnnouncementBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null); // contenedor de una secuencia (mensajes + separadores internos + separador final)
  const baseWidthRef = useRef(0); // ancho en px de esa secuencia
  const copiesRef = useRef(0);
  const initializedRef = useRef(false);

  const sepText = separator.trim();
  const buildSegment = () => {
    const middle = messages
      .map(m => m.trim())
      .join(` ${sepText} `);
    return `${middle} ${sepText}\u00A0`;
  };
  const segment = buildSegment();

  useEffect(() => {
    const track = trackRef.current;
    const baseEl = baseRef.current;
    if (!track || !baseEl) return;

    const measure = () => {
      baseWidthRef.current = baseEl.offsetWidth;
      if (baseWidthRef.current === 0) return;
      const vw = track.parentElement?.clientWidth || window.innerWidth;
      const minCopies = Math.ceil((vw * 2) / baseWidthRef.current) + 1;
      copiesRef.current = Math.max(3, minCopies);
      while (track.children.length > 1) track.removeChild(track.lastChild!);
      for (let i = 1; i < copiesRef.current; i++) {
        const clone = baseEl.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      }
    };

    measure();
    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        measure();
      });
    };
    window.addEventListener('resize', onResize);

    let x = 0;
    let raf: number;
    const step = () => {
      const w = baseWidthRef.current;
      if (w > 0) {
        x -= speed / 60;
        while (-x >= w) {
          x += w;
        }
        if (x > 0) x = 0;
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    initializedRef.current = true;
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      cancelAnimationFrame(raf);
    };
  }, [messages, speed, separator]);

  return (
    <div
      className={cn(
        'announcement-bar text-text-muted',
        className
      )}
      role="marquee"
  aria-label={segment}
    >
      <div className="relative h-full">
        <div
          ref={trackRef}
          className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap will-change-transform pl-6"
        >
          <div ref={baseRef} className="flex items-center" aria-hidden={false}>
            {segment}
          </div>
        </div>
      </div>
    </div>
  );
}
