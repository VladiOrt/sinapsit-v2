import { useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface DendriteArm {
  angle: number;
  length: number;
  thickness: number;
  forkAngle: number;
  forkRatio: number;
  waveAmp: number;
  waveFreq: number;
  wavePhase: number;
}

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  somaRadius: number;
  dendrites: DendriteArm[];
  pulsePhase: number;
  pulseSpeed: number;
  baseOpacity: number;
  isHub: boolean;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  opacity: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function buildDendrites(count: number, isHub: boolean): DendriteArm[] {
  return Array.from({ length: count }, (_, i) => {
    const baseAngle = (i / count) * Math.PI * 2;
    const jitter = (Math.random() - 0.5) * ((Math.PI * 2) / count) * 0.7;
    return {
      angle: baseAngle + jitter,
      length: isHub ? Math.random() * 22 + 24 : Math.random() * 16 + 14,
      thickness: isHub ? Math.random() * 0.5 + 0.9 : Math.random() * 0.4 + 0.6,
      forkAngle: Math.random() * 0.45 + 0.25,
      forkRatio: Math.random() * 0.35 + 0.45,
      waveAmp: Math.random() * 4 + 2,
      waveFreq: Math.random() * 0.6 + 0.3,
      wavePhase: Math.random() * Math.PI * 2,
    };
  });
}

function drawNeuron(
  ctx: CanvasRenderingContext2D,
  n: Neuron,
  t: number,
  proximity: number,
  pulse: number
) {
  const cr = Math.round(59 + proximity * 80);
  const cg = Math.round(130 - proximity * 38);
  const alpha = Math.min(n.baseOpacity * pulse + proximity * 0.4, 1);

  if (proximity > 0.05) {
    const glowR = n.somaRadius * 6;
    const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
    grd.addColorStop(0, `rgba(139,92,246,${proximity * 0.16})`);
    grd.addColorStop(1, "rgba(139,92,246,0)");
    ctx.beginPath();
    ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  ctx.lineCap = "round";
  for (const arm of n.dendrites) {
    const wave = Math.sin(t * arm.waveFreq + arm.wavePhase) * arm.waveAmp;
    const perp = arm.angle + Math.PI / 2;
    const cpx = n.x + Math.cos(arm.angle) * arm.length * 0.5 + Math.cos(perp) * wave;
    const cpy = n.y + Math.sin(arm.angle) * arm.length * 0.5 + Math.sin(perp) * wave;
    const tipX = n.x + Math.cos(arm.angle) * arm.length + Math.cos(perp) * wave * 0.4;
    const tipY = n.y + Math.sin(arm.angle) * arm.length + Math.sin(perp) * wave * 0.4;

    ctx.beginPath();
    ctx.moveTo(n.x, n.y);
    ctx.quadraticCurveTo(cpx, cpy, tipX, tipY);
    ctx.strokeStyle = `rgba(${cr},${cg},246,${alpha * 0.65})`;
    ctx.lineWidth = arm.thickness;
    ctx.stroke();

    for (const sign of [1, -1] as const) {
      const fAngle = arm.angle + arm.forkAngle * sign;
      const fLen = arm.length * arm.forkRatio;
      const fwx = Math.sin(t * arm.waveFreq * 1.3 + arm.wavePhase + sign) * arm.waveAmp * 0.5;
      const fwy = Math.cos(t * arm.waveFreq * 1.3 + arm.wavePhase + sign) * arm.waveAmp * 0.5;
      const fx = tipX + Math.cos(fAngle) * fLen + fwx;
      const fy = tipY + Math.sin(fAngle) * fLen + fwy;

      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(fx, fy);
      ctx.strokeStyle = `rgba(${cr},${cg},246,${alpha * 0.38})`;
      ctx.lineWidth = arm.thickness * 0.55;
      ctx.stroke();

      if (n.isHub && fLen > 12) {
        for (const s2 of [0.6, -0.6]) {
          const tx2 = fx + Math.cos(fAngle + s2) * fLen * 0.5;
          const ty2 = fy + Math.sin(fAngle + s2) * fLen * 0.5;
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(tx2, ty2);
          ctx.strokeStyle = `rgba(${cr},${cg},246,${alpha * 0.2})`;
          ctx.lineWidth = arm.thickness * 0.3;
          ctx.stroke();
        }
      }
    }
  }

  const somaR = n.somaRadius * pulse;
  ctx.beginPath();
  ctx.arc(n.x, n.y, somaR, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${cr},${cg},246,${alpha})`;
  ctx.fill();

  const hl = ctx.createRadialGradient(
    n.x - somaR * 0.25, n.y - somaR * 0.25, 0,
    n.x, n.y, somaR
  );
  hl.addColorStop(0, `rgba(255,255,255,${alpha * 0.35})`);
  hl.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(n.x, n.y, somaR, 0, Math.PI * 2);
  ctx.fillStyle = hl;
  ctx.fill();
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  neurons: Neuron[],
  signals: Signal[],
  mouse: { x: number; y: number },
  t: number,
  w: number,
  h: number
) {
  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = "round";

  const CONNECT_DIST = 180;
  const MOUSE_GLOW = 160;

  for (let i = 0; i < neurons.length; i++) {
    for (let j = i + 1; j < neurons.length; j++) {
      const a = neurons[i];
      const b = neurons[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > CONNECT_DIST) continue;

      const mx = mouse.x - a.x;
      const my = mouse.y - a.y;
      const proj = Math.max(0, Math.min(1, (mx * dx + my * dy) / (dist * dist)));
      const cx2 = a.x + proj * dx;
      const cy2 = a.y + proj * dy;
      const mDist = Math.sqrt((mouse.x - cx2) ** 2 + (mouse.y - cy2) ** 2);

      const baseAlpha = (1 - dist / CONNECT_DIST) * 0.18;
      let alpha = baseAlpha;
      let cr = 59, cg = 130;

      if (mDist < MOUSE_GLOW) {
        const boost = 1 - mDist / MOUSE_GLOW;
        alpha = Math.min(baseAlpha + boost * 0.52, 0.82);
        cr = Math.round(59 + boost * 80);
        cg = Math.round(130 - boost * 38);
      }

      const ndx = dx / dist;
      const ndy = dy / dist;
      ctx.beginPath();
      ctx.moveTo(a.x + ndx * a.somaRadius, a.y + ndy * a.somaRadius);
      ctx.lineTo(b.x - ndx * b.somaRadius, b.y - ndy * b.somaRadius);
      ctx.strokeStyle = `rgba(${cr},${cg},246,${alpha})`;
      ctx.lineWidth = dist < 80 ? 1.0 : 0.5;
      ctx.stroke();

      if (mDist < MOUSE_GLOW * 0.6) {
        ctx.beginPath();
        ctx.arc(b.x - ndx * b.somaRadius, b.y - ndy * b.somaRadius, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,140,255,${alpha * 0.8})`;
        ctx.fill();
      }
    }
  }

  for (const sig of signals) {
    const from = neurons[sig.fromIdx];
    const to = neurons[sig.toIdx];
    if (!from || !to) continue;
    const sx = from.x + (to.x - from.x) * sig.progress;
    const sy = from.y + (to.y - from.y) * sig.progress;
    const fade = Math.sin(sig.progress * Math.PI);
    const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
    grd.addColorStop(0, `rgba(190,150,255,${sig.opacity * fade})`);
    grd.addColorStop(0.5, `rgba(139,92,246,${sig.opacity * fade * 0.4})`);
    grd.addColorStop(1, "rgba(139,92,246,0)");
    ctx.beginPath();
    ctx.arc(sx, sy, 6, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  for (const n of neurons) {
    const pulse = Math.sin(t * n.pulseSpeed + n.pulsePhase) * 0.08 + 0.92;
    const dx = mouse.x - n.x;
    const dy = mouse.y - n.y;
    const distM = Math.sqrt(dx * dx + dy * dy);
    const proximity = distM < MOUSE_GLOW ? 1 - distM / MOUSE_GLOW : 0;
    drawNeuron(ctx, n, t, proximity, pulse);
  }
}

// ── Component ──────────────────────────────────────────────────────────────

export const NeuralCanvas = () => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const offRef     = useRef<HTMLCanvasElement | null>(null);
  const mouseRef   = useRef({ x: -9999, y: -9999, inside: false });
  const lensRef    = useRef({ r: 0, zoom: 1 });
  const neuronsRef = useRef<Neuron[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const off = document.createElement("canvas");
    offRef.current = off;
    const offCtx = off.getContext("2d", { alpha: true })!;

    const CONNECT_DIST = 180;
    const MOUSE_ATTRACT = 120;
    const ATTRACT_FORCE = 0.016;
    const MAX_SPEED = 1.2;

    const initNeurons = (w: number, h: number) => {
      const count = Math.max(28, Math.floor((w * h) / 16000));
      neuronsRef.current = Array.from({ length: count }, () => {
        const isHub = Math.random() < 0.14;
        const dendCount = isHub
          ? Math.floor(Math.random() * 3) + 5
          : Math.floor(Math.random() * 3) + 3;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          somaRadius: isHub ? Math.random() * 2 + 4 : Math.random() * 1.5 + 2.5,
          dendrites: buildDendrites(dendCount, isHub),
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.4 + 0.2,
          baseOpacity: isHub ? Math.random() * 0.2 + 0.65 : Math.random() * 0.25 + 0.3,
          isHub,
        };
      });
      signalsRef.current = [];
    };

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const w = p.offsetWidth;
      const h = p.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      off.width = w;
      off.height = h;
      initNeurons(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = {
        x,
        y,
        inside: x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height,
      };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      const neurons = neuronsRef.current;
      const signals = signalsRef.current;
      const mouse   = mouseRef.current;
      const lens    = lensRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const t = performance.now() * 0.001;

      for (const n of neurons) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_ATTRACT && d > 1) {
          const f = ((MOUSE_ATTRACT - d) / MOUSE_ATTRACT) * ATTRACT_FORCE;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        n.vx *= 0.987;
        n.vy *= 0.987;
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > MAX_SPEED) { n.vx = (n.vx / spd) * MAX_SPEED; n.vy = (n.vy / spd) * MAX_SPEED; }
        n.x += n.vx;
        n.y += n.vy;
        const buf = 60;
        if (n.x < -buf) n.x = w + buf;
        if (n.x > w + buf) n.x = -buf;
        if (n.y < -buf) n.y = h + buf;
        if (n.y > h + buf) n.y = -buf;
      }

      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i], b = neurons[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          if (dx * dx + dy * dy > CONNECT_DIST * CONNECT_DIST) continue;
          if (signals.length < 55 && Math.random() < 0.0025) {
            signals.push({
              fromIdx: Math.random() < 0.5 ? i : j,
              toIdx:   Math.random() < 0.5 ? j : i,
              progress: 0,
              speed: Math.random() * 0.007 + 0.003,
              opacity: Math.random() * 0.45 + 0.4,
            });
          }
        }
      }
      for (let s = signals.length - 1; s >= 0; s--) {
        signals[s].progress += signals[s].speed;
        if (signals[s].progress >= 1) signals.splice(s, 1);
      }

      drawScene(offCtx, neurons, signals, mouse, t, w, h);

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(off, 0, 0);

      const targetR    = mouse.inside ? 115 : 0;
      const targetZoom = mouse.inside ? 2.4 : 1;
      const ease       = 0.1;
      lens.r    += (targetR    - lens.r)    * ease;
      lens.zoom += (targetZoom - lens.zoom) * ease;

      if (lens.r > 1) {
        const { x: mx, y: my } = mouse;
        const lR = lens.r;
        const lZ = lens.zoom;
        const prog = lR / 115;

        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, lR, 0, Math.PI * 2);
        ctx.clip();
        ctx.clearRect(mx - lR - 2, my - lR - 2, lR * 2 + 4, lR * 2 + 4);
        ctx.translate(mx, my);
        ctx.scale(lZ, lZ);
        ctx.translate(-mx, -my);
        ctx.drawImage(off, 0, 0);
        ctx.restore();

        ctx.save();
        const innerVig = ctx.createRadialGradient(mx, my, lR * 0.72, mx, my, lR);
        innerVig.addColorStop(0, "rgba(0,0,0,0)");
        innerVig.addColorStop(1, `rgba(8,10,20,${0.55 * prog})`);
        ctx.beginPath();
        ctx.arc(mx, my, lR, 0, Math.PI * 2);
        ctx.fillStyle = innerVig;
        ctx.fill();
        ctx.restore();

        ctx.save();
        const outerGlow = ctx.createRadialGradient(mx, my, lR - 4, mx, my, lR + 10);
        outerGlow.addColorStop(0, `rgba(139,92,246,${0.28 * prog})`);
        outerGlow.addColorStop(1, "rgba(139,92,246,0)");
        ctx.beginPath();
        ctx.arc(mx, my, lR + 10, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, lR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,92,246,${0.55 * prog})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, lR - 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,180,255,${0.18 * prog})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,255,${0.6 * prog})`;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};
