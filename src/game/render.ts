import { OFFICERS, TERRAIN_TINT } from "./content";
import type { ColumnSim, PathSample } from "./column";
import { samplePath } from "./column";
import type { SlotId } from "./types";

const BONE = "#e8e0d4";
const RUST = "#c45c3e";
const INK = "#0c0b09";

export function renderColumn(
  ctx: CanvasRenderingContext2D,
  sim: ColumnSim,
  w: number,
  h: number,
  now: number,
) {
  const tint = TERRAIN_TINT[sim.terrain];
  ctx.save();
  ctx.fillStyle = tint.ground;
  ctx.fillRect(0, 0, w, h);

  const shake = sim.shakeOn && !sim.reduced ? sim.trauma * sim.trauma : 0;
  const ox = shake ? (Math.random() * 2 - 1) * 14 * shake : 0;
  const oy = shake ? (Math.random() * 2 - 1) * 10 * shake : 0;
  const zoom = Math.min(w, h) / 520;
  ctx.translate(w / 2 + ox, h / 2 + oy);
  ctx.scale(zoom, zoom);
  ctx.translate(-sim.cam.x, -sim.cam.y);

  drawTerrain(ctx, sim, now);
  drawRoad(ctx, sim);
  drawEnemies(ctx, sim, now);
  drawFormationGhost(ctx, sim);
  drawUnits(ctx, sim, now);
  drawParticles(ctx, sim);
  drawFloaters(ctx, sim);

  ctx.restore();

  // vignette
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.72);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, tint.fog.replace("0.12", "0.55").replace("0.22", "0.6").replace("0.28", "0.62").replace("0.24", "0.6").replace("0.18", "0.55"));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  if (sim.paused) {
    ctx.fillStyle = "rgba(12,11,9,0.35)";
    ctx.fillRect(0, 0, w, h);
  }
}

function drawTerrain(ctx: CanvasRenderingContext2D, sim: ColumnSim, now: number) {
  const tint = TERRAIN_TINT[sim.terrain];
  const cam = sim.cam;
  const cell = 48;
  const x0 = Math.floor((cam.x - 520) / cell);
  const y0 = Math.floor((cam.y - 420) / cell);
  const x1 = Math.ceil((cam.x + 520) / cell);
  const y1 = Math.ceil((cam.y + 420) / cell);
  for (let gy = y0; gy <= y1; gy++) {
    for (let gx = x0; gx <= x1; gx++) {
      const n = hash2(gx, gy);
      const px = gx * cell + (n % 11) - 5;
      const py = gy * cell + ((n >> 3) % 11) - 5;
      if (sim.terrain === "forest" && n % 7 === 0) {
        ctx.fillStyle = tint.shadow;
        ctx.beginPath();
        ctx.ellipse(px + 3, py + 10, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = n % 2 ? "#1a3320" : "#244028";
        ctx.beginPath();
        ctx.moveTo(px, py + 12);
        ctx.lineTo(px - 11, py + 12);
        ctx.lineTo(px, py - 18 - (n % 8));
        ctx.lineTo(px + 11, py + 12);
        ctx.closePath();
        ctx.fill();
      } else if (sim.terrain === "plains" && n % 5 !== 0) {
        ctx.strokeStyle = tint.grass;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + ((n % 5) - 2), py - 6 - (n % 4));
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (sim.terrain === "wetlands" && n % 6 === 0) {
        ctx.fillStyle = "rgba(40,70,60,0.45)";
        ctx.beginPath();
        ctx.ellipse(px, py, 16 + (n % 10), 8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (sim.terrain === "mountains" && n % 8 === 0) {
        ctx.fillStyle = "#3a3834";
        ctx.beginPath();
        ctx.moveTo(px - 12, py + 8);
        ctx.lineTo(px, py - 14 - (n % 10));
        ctx.lineTo(px + 14, py + 8);
        ctx.closePath();
        ctx.fill();
      }
      if (n % 13 === 0) {
        ctx.fillStyle = tint.shadow;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(px, py, 2 + (n % 3), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }
  void now;
}

function drawRoad(ctx: CanvasRenderingContext2D, sim: ColumnSim) {
  const tint = TERRAIN_TINT[sim.terrain];
  const path = sim.path;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  // shoulder
  ctx.strokeStyle = tint.shadow;
  ctx.globalAlpha = 0.45;
  strokePath(ctx, path, (p) => p.width + 18);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = tint.road;
  strokePath(ctx, path, (p) => p.width);
  // ruts
  ctx.strokeStyle = "rgba(40,30,16,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const p = path[i]!;
    const x = p.x + p.nx * 8;
    const y = p.y + p.ny * 8;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const p = path[i]!;
    const x = p.x - p.nx * 8;
    const y = p.y - p.ny * 8;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // features
  for (let i = 0; i < path.length; i += 3) {
    const p = path[i]!;
    if (p.feature === "cover") {
      ctx.fillStyle = "rgba(20,30,16,0.55)";
      ctx.beginPath();
      ctx.ellipse(p.x + p.nx * (p.width * 0.7), p.y + p.ny * (p.width * 0.7), 16, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    if (p.feature === "hazard") {
      ctx.fillStyle = "rgba(80,40,20,0.5)";
      ctx.beginPath();
      ctx.arc(p.x + p.nx * (p.width * 0.2), p.y + p.ny * (p.width * 0.2), 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function strokePath(ctx: CanvasRenderingContext2D, path: PathSample[], width: (p: PathSample) => number) {
  // approximate with variable-width by drawing quads
  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const p = path[i]!;
    const w = width(p) * 0.5;
    const x = p.x + p.nx * w;
    const y = p.y + p.ny * w;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  for (let i = path.length - 1; i >= 0; i--) {
    const p = path[i]!;
    const w = width(p) * 0.5;
    ctx.lineTo(p.x - p.nx * w, p.y - p.ny * w);
  }
  ctx.closePath();
  ctx.fillStyle = ctx.strokeStyle as string;
  ctx.fill();
}

function drawFormationGhost(ctx: CanvasRenderingContext2D, sim: ColumnSim) {
  const p = samplePath(sim.path, sim.s);
  ctx.save();
  ctx.translate(p.x + p.nx * sim.lateral * p.width * 0.28, p.y + p.ny * sim.lateral * p.width * 0.28);
  ctx.rotate(Math.atan2(p.ty, p.tx) + Math.PI / 2);
  ctx.strokeStyle = sim.switchT < 1 ? "rgba(196,92,62,0.55)" : "rgba(232,224,212,0.28)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  const w = sim.formation === "skirmish" ? 90 : sim.formation === "column" ? 36 : sim.formation === "circle" ? 70 : 64;
  const d = sim.formation === "circle" ? 70 : sim.formation === "column" ? 100 : 86;
  if (sim.formation === "circle") {
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.5, d * 0.45, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (sim.formation === "wedge") {
    ctx.beginPath();
    ctx.moveTo(0, -d * 0.5);
    ctx.lineTo(w * 0.5, d * 0.4);
    ctx.lineTo(-w * 0.5, d * 0.4);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.strokeRect(-w * 0.5, -d * 0.5, w, d);
  }
  ctx.restore();
}

function drawUnits(ctx: CanvasRenderingContext2D, sim: ColumnSim, now: number) {
  const sorted = sim.units.slice().sort((a, b) => a.y - b.y);
  for (const u of sorted) {
    const officer = u.officerId && u.officerId !== "warlord" ? OFFICERS[u.officerId] : null;
    const isWarlord = u.officerId === "warlord";
    const r = isWarlord ? 8.5 : officer ? 7.2 : 4.4;
    ctx.save();
    ctx.translate(u.x, u.y);
    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(0, r * 0.7, r * 0.9, r * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    const body = isWarlord ? BONE : officer ? officer.color : "#b8a078";
    ctx.fillStyle = u.flash > 0 ? "#fff6e8" : body;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1;
    ctx.stroke();
    // helmet
    ctx.fillStyle = isWarlord ? "#c4a35a" : "#3a342c";
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.45, r * 0.7, r * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    if (officer || isWarlord) {
      const flutter = Math.sin(now * 0.006 + u.id) * 3;
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.moveTo(0, -r - 2);
      ctx.lineTo(0, -r - 16);
      ctx.lineTo(10 + flutter, -r - 12);
      ctx.lineTo(0, -r - 8);
      ctx.fill();
      ctx.strokeStyle = BONE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(0, -r - 16);
      ctx.stroke();
    }
    if (sim.selectedOfficer && u.officerId === sim.selectedOfficer) {
      ctx.strokeStyle = BONE;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, r + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawEnemies(ctx: CanvasRenderingContext2D, sim: ColumnSim, now: number) {
  for (const e of sim.enemies) {
    if (!e.alive) continue;
    if (e.hidden) {
      ctx.fillStyle = "rgba(12,11,9,0.35)";
      ctx.beginPath();
      ctx.ellipse(e.x, e.y, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 5, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    const col = e.kind === "swarm" ? "#c4a35a" : e.kind === "cavalry" ? "#6a3030" : "#5a3a32";
    ctx.fillStyle = e.flash > 0 ? "#f0d0c0" : col;
    if (e.kind === "swarm") {
      const wob = Math.sin(now * 0.01 + e.id) * 2;
      ctx.beginPath();
      ctx.ellipse(wob, 0, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (e.kind === "cavalry") {
      ctx.beginPath();
      ctx.ellipse(0, 2, 9, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3a2020";
      ctx.beginPath();
      ctx.arc(-2, -4, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, e.named ? 8 : 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = e.named ? RUST : INK;
    ctx.lineWidth = e.named ? 2 : 1;
    ctx.stroke();
    // hp pip
    const t = Math.max(0, e.hp / e.maxHp);
    ctx.fillStyle = "rgba(12,11,9,0.6)";
    ctx.fillRect(-8, -12, 16, 2);
    ctx.fillStyle = RUST;
    ctx.fillRect(-8, -12, 16 * t, 2);
    ctx.restore();
  }
}

function drawParticles(ctx: CanvasRenderingContext2D, sim: ColumnSim) {
  for (const p of sim.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawFloaters(ctx: CanvasRenderingContext2D, sim: ColumnSim) {
  ctx.font = "600 11px Figtree, sans-serif";
  ctx.textAlign = "center";
  for (const f of sim.floaters) {
    ctx.globalAlpha = Math.max(0, f.life);
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;
}

function hash2(x: number, y: number) {
  let n = x * 374761393 + y * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return (n ^ (n >> 16)) >>> 0;
}

export function worldFromScreen(
  sim: ColumnSim,
  sx: number,
  sy: number,
  w: number,
  h: number,
): { x: number; y: number } {
  const zoom = Math.min(w, h) / 520;
  const x = (sx - w / 2) / zoom + sim.cam.x;
  const y = (sy - h / 2) / zoom + sim.cam.y;
  return { x, y };
}

export function pickOfficerAt(sim: ColumnSim, x: number, y: number): string | null {
  let best: { id: string; d: number } | null = null;
  for (const u of sim.units) {
    if (!u.officerId || u.officerId === "warlord") continue;
    const d = Math.hypot(u.x - x, u.y - y);
    if (d < 16 && (!best || d < best.d)) best = { id: u.officerId, d };
  }
  return best?.id ?? null;
}

export function pickSlotAt(sim: ColumnSim, x: number, y: number): SlotId | null {
  const p = samplePath(sim.path, sim.s);
  const dx = x - p.x;
  const dy = y - p.y;
  const along = dx * p.tx + dy * p.ty;
  const side = dx * p.nx + dy * p.ny;
  if (Math.abs(along) > 70 || Math.abs(side) > 70) return null;
  if (along > 22) return "vanguard";
  if (along < -22) return "rear";
  if (side < -16) return "left";
  if (side > 16) return "right";
  return "command";
}
