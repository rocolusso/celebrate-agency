"use client";

import { useEffect, useRef } from "react";
import { createEngine, type ThemeName } from "./engine";
import styles from "./NewYearBanner.module.css";

/**
 * Клиентский остров: два canvas-слоя с частицами.
 * Анимация стоит на паузе, пока баннер вне экрана или вкладка скрыта.
 */
export default function BannerScene({ theme }: { theme: ThemeName }) {
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const back = backRef.current;
    const front = frontRef.current;
    const host = front?.parentElement;
    if (!back || !front || !host) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const engine = createEngine(back, front, theme, { reduced: mq.matches });
    let inView = true;

    const sync = () => {
      if (inView && !document.hidden && !mq.matches) engine.start();
      else engine.stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    const ro = new ResizeObserver(() => engine.resize());
    const onMotion = () => {
      engine.setReduced(mq.matches);
      sync();
    };

    // Параллакс от мыши: только для устройств с точным указателем и без reduced-motion
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let pending = 0;
    let px = 0;
    let py = 0;
    const flush = () => {
      pending = 0;
      host.style.setProperty("--mx", px.toFixed(3));
      host.style.setProperty("--my", py.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (!fine.matches || mq.matches) return;
      const r = host.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!pending) pending = requestAnimationFrame(flush);
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      if (!pending) pending = requestAnimationFrame(flush);
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    engine.resize();
    io.observe(host);
    ro.observe(host);
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", onMotion);
    sync();

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", onMotion);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (pending) cancelAnimationFrame(pending);
      engine.destroy();
    };
  }, [theme]);

  return (
    <>
      <canvas ref={backRef} className={styles.canvasBack} aria-hidden="true" />
      <canvas ref={frontRef} className={styles.canvasFront} aria-hidden="true" />
    </>
  );
}
