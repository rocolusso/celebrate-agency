"use client";

import { useEffect, useRef } from "react";

/**
 * Клиентская часть баннера:
 * - снег на canvas (лёгкий, один спрайт на все снежинки);
 * - пауза всех CSS-анимаций и снега, когда баннер вне экрана или вкладка скрыта;
 * - при «уменьшить движение» ничего не запускается.
 */
export default function BannerRuntime({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const root = canvas?.closest<HTMLElement>("[data-promo]");
    if (!canvas || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.dataset.paused = "true";
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // спрайты: чёткая и мягкая снежинка
    const mk = (soft: number) => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(soft, "rgba(255,255,255,.85)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      return c;
    };
    const sharp = mk(0.38);
    const soft = mk(0.12);

    // детерминированный набор снежинок
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    type Flake = { x: number; y: number; r: number; sp: number; sway: number; cyc: number; ph: number; o: number; near: boolean };
    const flakes: Flake[] = [];
    for (let i = 0; i < 80; i++) {
      const d = rnd();
      flakes.push({ x: rnd(), y: rnd(), r: 1.2 + d * 3.2, sp: 0.045 + d * 0.05, sway: 6 + rnd() * 18, cyc: 0.15 + rnd() * 0.3, ph: rnd() * 6.28, o: 0.35 + d * 0.5, near: false });
    }
    for (let i = 0; i < 12; i++) {
      const d = rnd();
      flakes.push({ x: rnd(), y: rnd(), r: 6 + d * 8, sp: 0.1 + d * 0.06, sway: 20 + rnd() * 30, cyc: 0.12 + rnd() * 0.2, ph: rnd() * 6.28, o: 0.3 + d * 0.35, near: true });
    }

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const r = root.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    let raf = 0;
    let t = 0;
    let last = 0;
    let visible = true;
    // Адаптивное качество: если первые ~2 с кадры идут медленнее ~32 FPS, включаем лёгкий режим
    // (прячем самые дорогие эффекты). Сам баннер и снег продолжают работать.
    let t0 = 0;
    let frames = 0;
    let judged = false;
    let lite = false;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      t += dt;
      if (!judged) {
        if (!t0) t0 = now + 400; // даём странице спокойно прогреться
        if (now > t0) {
          frames++;
          if (now - t0 > 2000) {
            judged = true;
            if (frames / ((now - t0) / 1000) < 32) {
              lite = true;
              root.dataset.lite = "true";
            }
          }
        }
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const u = w / 1000; // единица масштаба: ширина баннера / 1000
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        if (lite && f.near) continue;
        const y = ((f.y + f.sp * t) % 1) * (h + 60 * u) - 30 * u;
        const x = f.x * w + Math.sin(t * f.cyc * 6.28 + f.ph) * f.sway * u;
        const s = f.r * u * (f.near ? 1 : 1.35) * 2;
        ctx.globalAlpha = f.o;
        ctx.drawImage(f.near ? soft : sharp, x - s / 2, y - s / 2, s, s);
      }
    };
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => {
      const on = visible && !document.hidden;
      root.dataset.paused = on ? "false" : "true";
      if (on) start();
      else stop();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(root);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
