"use client";

import { useEffect, useRef } from "react";
import { createEngine } from "@/components/new-year-banner/engine";
import styles from "./hero-banner.module.css";

const NARROW_PX = 600;

/**
 * Клиентский остров баннера: два canvas (искры и конфетти) на общем движке.
 * - салюты идут в такт CSS-циклу: фаза читается из метронома [data-hero-clock];
 * - пауза вне экрана и на скрытой вкладке (data-paused на корне останавливает и CSS-анимации);
 * - при prefers-reduced-motion рисуется один статичный кадр;
 * - если первые ~2 с кадры идут медленнее ~30 FPS, canvas отключается (data-lite), CSS-часть остаётся.
 */
export default function HeroBannerMotion() {
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const back = backRef.current;
    const front = frontRef.current;
    const host = front?.parentElement;
    const root = host?.closest<HTMLElement>("[data-hero-banner]");
    if (!back || !front || !host || !root) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clock = root.querySelector<HTMLElement>("[data-hero-clock]");
    const phase = () => {
      const anim = clock?.getAnimations?.()[0];
      const time = anim?.currentTime;
      const duration = anim?.effect?.getComputedTiming().duration;
      return typeof time === "number" && typeof duration === "number" && duration > 0 ? (time % duration) / duration : 0.1;
    };

    const engine = createEngine(back, front, "party", {
      reduced: mq.matches,
      snow: false,
      maxDpr: 1.5,
      maxConfetti: host.clientWidth < NARROW_PX ? 40 : 90,
      rocketZone: [0.08, 0.92],
      burstScale: host.clientWidth < NARROW_PX ? 1.3 : 1.7,
      phase,
    });

    let inView = true;
    let lite = false;
    let probe = 0;
    let probeStart = 0;
    let probeFrames = 0;
    let judged = false;

    const stopProbe = () => {
      cancelAnimationFrame(probe);
      probe = 0;
      probeStart = 0;
      probeFrames = 0;
    };
    const runProbe = (now: number) => {
      if (!probeStart) probeStart = now + 500; // даём странице прогреться
      if (now > probeStart) {
        probeFrames++;
        if (now - probeStart > 2000) {
          judged = true;
          if (probeFrames / ((now - probeStart) / 1000) < 30) {
            lite = true;
            root.dataset.lite = "true";
            sync();
          }
          probe = 0;
          return;
        }
      }
      probe = requestAnimationFrame(runProbe);
    };

    const sync = () => {
      const visible = inView && !document.hidden && !mq.matches;
      root.dataset.paused = visible ? "false" : "true";
      if (visible && !lite) {
        engine.start();
        if (!judged && !probe) probe = requestAnimationFrame(runProbe);
      } else {
        engine.stop();
        stopProbe();
      }
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

    engine.resize();
    io.observe(root);
    ro.observe(host);
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", onMotion);
    sync();

    return () => {
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", onMotion);
      stopProbe();
      engine.destroy();
    };
  }, []);

  return (
    <>
      <canvas ref={backRef} className={styles.canvasBack} aria-hidden="true" />
      <canvas ref={frontRef} className={styles.canvasFront} aria-hidden="true" />
    </>
  );
}
