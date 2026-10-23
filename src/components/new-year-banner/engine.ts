/**
 * Лёгкий 2D-движок частиц для баннера.
 * back-слой (с шлейфами): фейерверки, падающие звёзды.
 * front-слой: снег, конфетти, блёстки.
 */
export type ThemeName = "brand" | "winter";

const TAU = Math.PI * 2;
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T>(arr: readonly T[]): T => arr[(Math.random() * arr.length) | 0];

const PALETTE = {
  brand: {
    fireworks: ["#ffd23f", "#ff4fa3", "#4de1ff", "#ffffff", "#9dff4d", "#ff9a3c"],
    confetti: ["#ffd23f", "#ff4fa3", "#4de1ff", "#9dff4d", "#ff6b4a", "#ffffff", "#b388ff"],
    glitter: "255,226,120",
  },
  winter: {
    fireworks: ["#e8f6ff", "#8fd3ff", "#ffd86b", "#b79bff", "#7af0d6"],
    confetti: ["#ffffff"],
    glitter: "210,236,255",
  },
} as const;

interface Flake {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  ph: number;
  sw: number;
  a: number;
}
interface Confetto {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  vx: number;
  rot: number;
  vr: number;
  ph: number;
  fl: number;
  color: string;
}
interface Glint {
  x: number;
  y: number;
  s: number;
  ph: number;
  sp: number;
}
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
  drag: number;
  grav: number;
}
interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
  dur: number;
  color: string;
}
interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

function makeDotSprite(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.35, "rgba(255,255,255,0.85)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return c;
}

function makeGlintSprite(rgb: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  g.translate(32, 32);
  const halo = g.createRadialGradient(0, 0, 0, 0, 0, 16);
  halo.addColorStop(0, `rgba(${rgb},0.9)`);
  halo.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = halo;
  g.fillRect(-32, -32, 64, 64);
  g.fillStyle = "#fff";
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? 30 : 3.2;
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  g.closePath();
  g.fill();
  return c;
}

export interface Engine {
  start(): void;
  stop(): void;
  resize(): void;
  setReduced(v: boolean): void;
  destroy(): void;
}

export function createEngine(
  back: HTMLCanvasElement,
  front: HTMLCanvasElement,
  theme: ThemeName,
  opts: { reduced: boolean },
): Engine {
  const bctx = back.getContext("2d")!;
  const fctx = front.getContext("2d")!;
  const pal = PALETTE[theme];
  const dot = makeDotSprite();
  const glintSprite = makeGlintSprite(pal.glitter);

  let w = 0;
  let h = 0;
  let dpr = 1;
  let raf = 0;
  let last = 0;
  let time = 0;
  let reduced = opts.reduced;
  let nextRocket = 0.5;
  let nextShooter = 2.5;

  let flakes: Flake[] = [];
  let confetti: Confetto[] = [];
  let glints: Glint[] = [];
  let sparks: Spark[] = [];
  let rockets: Rocket[] = [];
  let shooters: Shooter[] = [];

  function seed() {
    const area = w * h;
    const snowCount = Math.round(area / (theme === "winter" ? 5200 : 24000));
    flakes = Array.from({ length: snowCount }, () => {
      const depth = Math.random();
      const r = 0.8 + depth * depth * 3.4;
      return {
        x: rnd(0, w),
        y: rnd(0, h),
        r,
        vy: 14 + r * 11 + rnd(0, 10),
        vx: rnd(-6, 6) - 4,
        ph: rnd(0, TAU),
        sw: rnd(0.6, 1.6),
        a: 0.35 + depth * 0.6,
      };
    });
    confetti =
      theme === "brand"
        ? Array.from({ length: Math.round(area / 7200) }, () => newConfetto(true))
        : [];
    glints = Array.from({ length: Math.round(area / (theme === "winter" ? 9000 : 11000)) }, () => ({
      x: rnd(0, w),
      y: rnd(0, h * 0.85),
      s: rnd(6, 17),
      ph: rnd(0, TAU),
      sp: rnd(1.2, 3.2),
    }));
    sparks = [];
    rockets = [];
    shooters = [];
  }

  function newConfetto(anywhere: boolean): Confetto {
    return {
      x: rnd(0, w),
      y: anywhere ? rnd(-20, h) : rnd(-30, -6),
      w: rnd(5, 11),
      h: rnd(3, 6),
      vy: rnd(38, 95),
      vx: rnd(-14, 14),
      rot: rnd(0, TAU),
      vr: rnd(-3, 3),
      ph: rnd(0, TAU),
      fl: rnd(2, 5),
      color: pick(pal.confetti),
    };
  }

  function resize() {
    const host = front.parentElement;
    if (!host) return;
    const r = host.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    w = r.width;
    h = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, w < 600 ? 2 : 1.75);
    for (const c of [back, front]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (!raf) drawFrame(); // перерисовать статичный кадр
  }

  function launchRocket() {
    const wide = w >= 900;
    const x = wide ? rnd(w * 0.42, w * 0.95) : rnd(w * 0.1, w * 0.9);
    const targetY = rnd(h * 0.1, h * (wide ? 0.42 : 0.5));
    const y0 = h * 0.86;
    const dur = rnd(0.7, 1.05);
    rockets.push({
      x,
      y: y0,
      vx: rnd(-14, 14),
      vy: (targetY - y0) / dur,
      t: 0,
      dur,
      color: pick(pal.fireworks),
    });
  }

  function burst(x: number, y: number, color: string) {
    const kind = Math.random();
    const n = Math.round(rnd(44, 72) * (w < 600 ? 0.7 : 1));
    const speed = rnd(90, 190) * (w < 600 ? 0.75 : 1);
    const second = pick(pal.fireworks);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + rnd(-0.03, 0.03);
      const ring = kind < 0.35;
      const s = ring ? speed : speed * rnd(0.25, 1);
      sparks.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 0,
        max: kind > 0.7 ? rnd(1.6, 2.2) : rnd(1.0, 1.6),
        color: ring && i % 2 ? second : color,
        size: rnd(1.4, 2.6),
        drag: kind > 0.7 ? 1.6 : 1.1,
        grav: kind > 0.7 ? 85 : 55,
      });
    }
  }

  function update(dt: number) {
    time += dt;

    for (const f of flakes) {
      f.y += f.vy * dt;
      f.x += (f.vx + Math.sin(time * f.sw + f.ph) * 14) * dt;
      if (f.y > h + f.r) {
        f.y = -f.r;
        f.x = rnd(0, w);
      }
      if (f.x < -10) f.x = w + 10;
      if (f.x > w + 10) f.x = -10;
    }

    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      c.y += c.vy * dt;
      c.x += (c.vx + Math.sin(time * 1.4 + c.ph) * 22) * dt;
      c.rot += c.vr * dt;
      c.ph += c.fl * dt;
      if (c.y > h + 12) confetti[i] = newConfetto(false);
    }

    nextRocket -= dt;
    if (nextRocket <= 0) {
      launchRocket();
      nextRocket = rnd(0.9, 2.0);
    }

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.t += dt;
      r.x += r.vx * dt;
      r.y += r.vy * dt * (1 - (r.t / r.dur) * 0.55);
      sparks.push({
        x: r.x,
        y: r.y,
        vx: rnd(-12, 12),
        vy: rnd(10, 40),
        life: 0,
        max: rnd(0.25, 0.5),
        color: "#ffe6a0",
        size: 1.5,
        drag: 2,
        grav: 30,
      });
      if (r.t >= r.dur) {
        burst(r.x, r.y, r.color);
        rockets.splice(i, 1);
      }
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life += dt;
      if (s.life >= s.max) {
        sparks.splice(i, 1);
        continue;
      }
      const k = Math.exp(-s.drag * dt);
      s.vx *= k;
      s.vy = s.vy * k + s.grav * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
    }

    if (theme === "winter") {
      nextShooter -= dt;
      if (nextShooter <= 0) {
        shooters.push({
          x: rnd(w * 0.35, w * 0.95),
          y: rnd(0, h * 0.25),
          vx: -rnd(380, 520),
          vy: rnd(140, 220),
          life: 0,
        });
        nextShooter = rnd(5, 9);
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.life > 1.1) shooters.splice(i, 1);
      }
    }
  }

  function drawBack() {
    bctx.globalCompositeOperation = "destination-out";
    bctx.fillStyle = "rgba(0,0,0,0.2)";
    bctx.fillRect(0, 0, w, h);
    bctx.globalCompositeOperation = "lighter";
    for (const s of sparks) {
      const k = 1 - s.life / s.max;
      bctx.globalAlpha = Math.min(1, k * 1.4);
      bctx.fillStyle = s.color;
      bctx.beginPath();
      bctx.arc(s.x, s.y, s.size * (0.5 + k * 0.6), 0, TAU);
      bctx.fill();
    }
    for (const s of shooters) {
      const a = Math.max(0, 1 - s.life / 1.1);
      const len = 90;
      const g = bctx.createLinearGradient(s.x, s.y, s.x - s.vx * 0.2, s.y - s.vy * 0.2);
      g.addColorStop(0, `rgba(255,255,255,${a})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      bctx.globalAlpha = 1;
      bctx.strokeStyle = g;
      bctx.lineWidth = 2;
      bctx.beginPath();
      bctx.moveTo(s.x, s.y);
      bctx.lineTo(
        s.x - (s.vx / Math.hypot(s.vx, s.vy)) * len,
        s.y - (s.vy / Math.hypot(s.vx, s.vy)) * len,
      );
      bctx.stroke();
    }
    bctx.globalAlpha = 1;
    bctx.globalCompositeOperation = "source-over";
  }

  function drawFront() {
    fctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      fctx.globalAlpha = f.a;
      fctx.drawImage(dot, f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
    }
    for (const c of confetti) {
      fctx.save();
      fctx.translate(c.x, c.y);
      fctx.rotate(c.rot);
      fctx.scale(1, Math.cos(c.ph));
      fctx.globalAlpha = 0.95;
      fctx.fillStyle = c.color;
      fctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
      fctx.restore();
    }
    fctx.globalCompositeOperation = "lighter";
    for (const g of glints) {
      const v = (Math.sin(time * g.sp + g.ph) + 1) / 2;
      const a = v * v * v;
      if (a < 0.03) continue;
      fctx.globalAlpha = a;
      const s = g.s * (0.6 + a * 0.6);
      fctx.drawImage(glintSprite, g.x - s, g.y - s, s * 2, s * 2);
    }
    fctx.globalAlpha = 1;
    fctx.globalCompositeOperation = "source-over";
  }

  function drawFrame() {
    drawBack();
    drawFront();
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    update(dt);
    drawFrame();
  }

  function renderStatic() {
    time = 1;
    bctx.clearRect(0, 0, w, h);
    drawFront();
  }

  return {
    start() {
      if (raf || reduced) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
    resize() {
      resize();
      if (reduced) renderStatic();
    },
    setReduced(v: boolean) {
      reduced = v;
      if (v) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        renderStatic();
      }
    },
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
