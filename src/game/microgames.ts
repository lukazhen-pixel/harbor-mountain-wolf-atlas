import { blip, clash, thud, uiBad, uiOk } from "./audio";
import type { MicroId } from "./types";

export interface MicroResult {
  won: boolean;
  score: number;
}

export interface MicroGame {
  id: MicroId;
  title: string;
  hint: string;
  t: number;
  dur: number;
  done: boolean;
  result: MicroResult | null;
  step: (dt: number, input: MicroInput) => void;
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
}

export interface MicroInput {
  x: number;
  y: number;
  down: boolean;
  clicked: boolean;
  confirm: boolean;
}

export function createMicro(id: MicroId, w: number, h: number): MicroGame {
  if (id === "ballista") return ballista(w, h);
  if (id === "interrogate") return interrogate(w, h);
  if (id === "brace") return brace(w, h);
  return spot(w, h);
}

function ballista(W: number, H: number): MicroGame {
  let angle = -0.4;
  let power = 0;
  let charging = false;
  let shot: { x: number; y: number; vx: number; vy: number } | null = null;
  let targetX = W * 0.72;
  let targetY = H * 0.42;
  let tv = 40;
  let won = false;
  const originX = W * 0.18;
  const originY = H * 0.72;
  const g: MicroGame = {
    id: "ballista",
    title: "Ballista",
    hint: "Hold to draw. Release to kill the leader.",
    t: 0,
    dur: 8,
    done: false,
    result: null,
    step(dt, input) {
      if (g.done) return;
      g.t += dt;
      targetY += tv * dt;
      if (targetY < H * 0.22 || targetY > H * 0.62) tv *= -1;
      if (input.down && !shot) {
        charging = true;
        power = Math.min(1, power + dt * 0.9);
      }
      if (!input.down && charging && !shot) {
        charging = false;
        const spd = 280 + power * 420;
        shot = {
          x: originX,
          y: originY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
        };
        thud();
      }
      if (!shot && !input.down) {
        const dx = input.x - originX;
        const dy = input.y - originY;
        angle = Math.atan2(dy, dx);
      }
      if (shot) {
        shot.vy += 420 * dt;
        shot.x += shot.vx * dt;
        shot.y += shot.vy * dt;
        const d = Math.hypot(shot.x - targetX, shot.y - targetY);
        if (d < 28) {
          won = true;
          finish(g, true, 1);
          clash();
          uiOk();
        } else if (shot.y > H + 20 || shot.x > W + 20) {
          finish(g, false, 0);
          uiBad();
        }
      }
      if (g.t >= g.dur && !g.done) {
        finish(g, won, won ? 1 : 0);
        if (!won) uiBad();
      }
    },
    draw(ctx, w, h) {
      ctx.fillStyle = "#1a1814";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#3a4a28";
      ctx.fillRect(0, h * 0.62, w, h * 0.38);
      ctx.fillStyle = "#6a5a38";
      ctx.fillRect(0, h * 0.62, w, 8);
      // target
      ctx.fillStyle = "#5a3030";
      ctx.beginPath();
      ctx.arc(targetX, targetY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c45c3e";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#e8e0d4";
      ctx.font = "600 12px Figtree, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("LEADER", targetX, targetY - 24);
      // ballista
      ctx.strokeStyle = "#e8e0d4";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + Math.cos(angle) * 48, originY + Math.sin(angle) * 48);
      ctx.stroke();
      ctx.fillStyle = "#8a7048";
      ctx.fillRect(originX - 18, originY - 8, 28, 16);
      if (charging) {
        ctx.fillStyle = "#c45c3e";
        ctx.fillRect(originX - 18, originY + 14, 80 * power, 6);
      }
      if (shot) {
        ctx.fillStyle = "#e8e0d4";
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      meter(ctx, w, g);
    },
  };
  return g;
}

function interrogate(W: number, H: number): MicroGame {
  const lines = [
    { t: "He came from the east gate at dusk.", lie: false },
    { t: "The scarabs were already in the grain.", lie: false },
    { t: "I never saw the captain's red cloak.", lie: true },
  ];
  // lie is the inconsistent one — captain's cloak is mentioned as seen in briefing; keep simple: the lie is marked
  let picked: number | null = null;
  const g: MicroGame = {
    id: "interrogate",
    title: "Retinue",
    hint: "The spy lies. Tap the false word.",
    t: 0,
    dur: 7,
    done: false,
    result: null,
    step(dt, input) {
      if (g.done) return;
      g.t += dt;
      if (input.clicked && picked === null) {
        const i = hitLine(input.y, H);
        if (i >= 0) {
          picked = i;
          const won = lines[i]!.lie;
          finish(g, won, won ? 1 : 0);
          if (won) uiOk();
          else uiBad();
        }
      }
      if (g.t >= g.dur && !g.done) {
        finish(g, false, 0);
        uiBad();
      }
    },
    draw(ctx, w, h) {
      ctx.fillStyle = "#12100c";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#e8e0d4";
      ctx.font = "600 18px Cormorant Garamond, serif";
      ctx.textAlign = "center";
      ctx.fillText("Which is the lie?", w / 2, 48);
      ctx.font = "500 14px Figtree, sans-serif";
      lines.forEach((ln, i) => {
        const y = 100 + i * 72;
        const hot = picked === i;
        ctx.fillStyle = hot ? (ln.lie ? "#2a3a28" : "#3a2020") : "#1e1b16";
        round(ctx, 24, y - 28, w - 48, 56, 12);
        ctx.fill();
        ctx.strokeStyle = "#2a2620";
        ctx.stroke();
        ctx.fillStyle = "#e8e0d4";
        ctx.fillText(ln.t, w / 2, y + 4);
      });
      meter(ctx, w, g);
    },
  };
  void W;
  return g;
}

function hitLine(y: number, h: number) {
  for (let i = 0; i < 3; i++) {
    const cy = 100 + i * 72;
    if (y > cy - 28 && y < cy + 28) return i;
  }
  void h;
  return -1;
}

function brace(W: number, H: number): MicroGame {
  let pos = 0;
  let dir = 1;
  let locked: number | null = null;
  const zone = 0.72;
  const g: MicroGame = {
    id: "brace",
    title: "Brace",
    hint: "Tap when the charge hits the mark.",
    t: 0,
    dur: 5,
    done: false,
    result: null,
    step(dt, input) {
      if (g.done) return;
      g.t += dt;
      if (locked === null) {
        pos += dir * dt * 1.15;
        if (pos > 1) {
          pos = 1;
          dir = -1;
        }
        if (pos < 0) {
          pos = 0;
          dir = 1;
        }
        if (input.clicked || input.confirm) {
          locked = pos;
          const won = Math.abs(pos - zone) < 0.1;
          finish(g, won, won ? 1 : Math.max(0, 1 - Math.abs(pos - zone) * 4));
          if (won) {
            uiOk();
            thud();
          } else uiBad();
        }
      }
      if (g.t >= g.dur && !g.done) {
        finish(g, false, 0);
        uiBad();
      }
    },
    draw(ctx, w, h) {
      ctx.fillStyle = "#141210";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#e8e0d4";
      ctx.font = "600 20px Cormorant Garamond, serif";
      ctx.textAlign = "center";
      ctx.fillText("BRACE", w / 2, 56);
      const y = h * 0.55;
      ctx.fillStyle = "#1e1b16";
      round(ctx, 40, y - 16, w - 80, 32, 8);
      ctx.fill();
      const zx = 40 + (w - 80) * zone;
      ctx.fillStyle = "rgba(107,143,113,0.45)";
      ctx.fillRect(zx - 18, y - 16, 36, 32);
      const px = 40 + (w - 80) * (locked ?? pos);
      ctx.fillStyle = "#c45c3e";
      ctx.fillRect(px - 3, y - 22, 6, 44);
      meter(ctx, w, g);
    },
  };
  void W;
  void H;
  return g;
}

function spot(W: number, H: number): MicroGame {
  const bugs: { x: number; y: number; decoy: boolean }[] = [];
  for (let i = 0; i < 7; i++) {
    bugs.push({
      x: 60 + Math.random() * (W - 120),
      y: 80 + Math.random() * (H - 160),
      decoy: true,
    });
  }
  const real = { x: 60 + Math.random() * (W - 120), y: 80 + Math.random() * (H - 160), decoy: false };
  bugs.push(real);
  const g: MicroGame = {
    id: "spot",
    title: "Eagle Eye",
    hint: "Find the living scarab. The rest are husks.",
    t: 0,
    dur: 6,
    done: false,
    result: null,
    step(dt, input) {
      if (g.done) return;
      g.t += dt;
      if (input.clicked) {
        let hit = -1;
        bugs.forEach((b, i) => {
          if (Math.hypot(b.x - input.x, b.y - input.y) < 22) hit = i;
        });
        if (hit >= 0) {
          const won = !bugs[hit]!.decoy;
          finish(g, won, won ? 1 : 0);
          if (won) uiOk();
          else uiBad();
        }
      }
      if (g.t >= g.dur && !g.done) {
        finish(g, false, 0);
        uiBad();
      }
    },
    draw(ctx, w, h) {
      ctx.fillStyle = "#1a2418";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#e8e0d4";
      ctx.font = "600 16px Cormorant Garamond, serif";
      ctx.textAlign = "center";
      ctx.fillText("The living one glows.", w / 2, 36);
      const t = g.t;
      bugs.forEach((b) => {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.fillStyle = b.decoy ? "#6a5a32" : `rgba(196,163,90,${0.55 + Math.sin(t * 8) * 0.35})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = b.decoy ? "#3a3020" : "#c4a35a";
        ctx.stroke();
        ctx.restore();
      });
      meter(ctx, w, g);
    },
  };
  void blip;
  return g;
}

function finish(g: MicroGame, won: boolean, score: number) {
  g.done = true;
  g.result = { won, score };
}

function meter(ctx: CanvasRenderingContext2D, w: number, g: MicroGame) {
  const t = Math.max(0, 1 - g.t / g.dur);
  ctx.fillStyle = "rgba(12,11,9,0.7)";
  ctx.fillRect(0, 0, w, 6);
  ctx.fillStyle = t < 0.3 ? "#c45c3e" : "#e8e0d4";
  ctx.fillRect(0, 0, w * t, 6);
}

function round(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
