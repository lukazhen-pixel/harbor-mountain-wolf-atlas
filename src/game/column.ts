import { MATCHUP, OFFICERS, TERRAIN_TINT, THREAT_LABEL } from "./content";
import { clash, horn, thud } from "./audio";
import { mulberry32 } from "./rng";
import type {
  ColumnResult,
  FormationId,
  HudSnapshot,
  MapNode,
  OfficerState,
  PaceId,
  RunState,
  SlotId,
  TerrainId,
  ThreatKind,
} from "./types";
import { SECTORS } from "./content";

export interface Vec {
  x: number;
  y: number;
}

export interface PathSample {
  x: number;
  y: number;
  tx: number;
  ty: number;
  nx: number;
  ny: number;
  width: number;
  feature: "open" | "choke" | "cover" | "hazard";
}

export interface Unit {
  id: number;
  slot: SlotId;
  officerId: string | null;
  x: number;
  y: number;
  hp: number;
  flash: number;
}

export interface Enemy {
  id: number;
  kind: ThreatKind;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  hidden: boolean;
  alive: boolean;
  slotBias: SlotId;
  flash: number;
  named: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
}

export interface Floater {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
}

export interface ColumnSim {
  path: PathSample[];
  s: number;
  formation: FormationId;
  target: FormationId;
  switchT: number;
  switchDur: number;
  pace: PaceId;
  integrity: number;
  momentum: number;
  lateral: number;
  stamina: number;
  morale: number;
  supplies: number;
  warlordHp: number;
  warlordMax: number;
  warriors: number;
  warriorsMax: number;
  officers: OfficerState[];
  relics: string[];
  units: Unit[];
  enemies: Enemy[];
  particles: Particle[];
  floaters: Floater[];
  terrain: TerrainId;
  paused: boolean;
  selectedOfficer: string | null;
  toast: string;
  toastT: number;
  threatHint: string;
  trauma: number;
  hitstop: number;
  t: number;
  done: boolean;
  result: ColumnResult | null;
  reveal: number;
  cryT: number;
  holdT: number;
  fortT: number;
  cam: Vec;
  heading: number;
  speed: number;
  kills: number;
  warriorsLost: number;
  climaxArmed: boolean;
  climaxFired: boolean;
  microId: MapNode["micro"];
  nodeTitle: string;
  reduced: boolean;
  shakeOn: boolean;
}

const SLOT_ORDER: SlotId[] = ["vanguard", "left", "right", "rear", "command"];

export function createColumnSim(run: RunState, node: MapNode): ColumnSim {
  const terrain = SECTORS[node.sector]?.terrain ?? "plains";
  const rng = mulberry32(run.seed ^ hash(node.id));
  const path = buildPath(rng, terrain, node.kind === "boss" ? 1.15 : 1);
  const sim: ColumnSim = {
    path,
    s: 8,
    formation: "column",
    target: "column",
    switchT: 1,
    switchDur: 2.2,
    pace: "march",
    integrity: 1,
    momentum: 80,
    lateral: 0,
    stamina: run.stamina,
    morale: run.morale,
    supplies: run.supplies,
    warlordHp: run.warlordHp,
    warlordMax: run.warlordMax,
    warriors: run.warriors,
    warriorsMax: run.warriorsMax,
    officers: run.officers.map((o) => ({ ...o })),
    relics: run.relics.slice(),
    units: [],
    enemies: [],
    particles: [],
    floaters: [],
    terrain,
    paused: false,
    selectedOfficer: null,
    toast: node.title,
    toastT: 2.4,
    threatHint: "Road is quiet.",
    trauma: 0,
    hitstop: 0,
    t: 0,
    done: false,
    result: null,
    reveal: run.relics.includes("lens") ? 1 : 0,
    cryT: 0,
    holdT: 0,
    fortT: 0,
    cam: { x: path[8]!.x, y: path[8]!.y },
    heading: 0,
    speed: 0,
    kills: 0,
    warriorsLost: 0,
    climaxArmed: !!node.micro,
    climaxFired: false,
    microId: node.micro,
    nodeTitle: node.title,
    reduced: false,
    shakeOn: true,
  };
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    sim.reduced = true;
  }
  spawnUnits(sim);
  seedThreats(sim, rng, node);
  return sim;
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildPath(rng: () => number, terrain: TerrainId, scale: number): PathSample[] {
  const n = Math.floor(76 * scale);
  const out: PathSample[] = [];
  let x = 0;
  let y = 0;
  let heading = -Math.PI / 2;
  for (let i = 0; i < n; i++) {
    const bend =
      terrain === "mountains" ? 0.085 : terrain === "forest" ? 0.07 : terrain === "wetlands" ? 0.05 : 0.04;
    heading += (rng() - 0.5) * bend;
    heading += Math.sin(i * 0.03) * 0.01;
    const step = 28;
    x += Math.cos(heading) * step;
    y += Math.sin(heading) * step;
    const tx = Math.cos(heading);
    const ty = Math.sin(heading);
    const nx = -ty;
    const ny = tx;
    let width = terrain === "mountains" ? 70 : terrain === "forest" ? 90 : 110;
    let feature: PathSample["feature"] = "open";
    const r = rng();
    if (r < 0.08) {
      feature = "choke";
      width *= 0.55;
    } else if (r < 0.2) {
      feature = "cover";
    } else if (r < 0.26) {
      feature = "hazard";
      width *= 0.75;
    }
    out.push({ x, y, tx, ty, nx, ny, width, feature });
  }
  return out;
}

function spawnUnits(sim: ColumnSim) {
  let id = 1;
  const add = (slot: SlotId, officerId: string | null) => {
    sim.units.push({ id: id++, slot, officerId, x: 0, y: 0, hp: officerId ? 24 : 8, flash: 0 });
  };
  for (const o of sim.officers) {
    if (o.alive) add(o.slot, o.id);
  }
  add("command", "warlord");
  const extras = Math.max(6, sim.warriors);
  const cycle: SlotId[] = ["vanguard", "left", "right", "rear", "command"];
  for (let i = 0; i < extras; i++) add(cycle[i % cycle.length]!, null);
  placeUnits(sim, true);
}

function seedThreats(sim: ColumnSim, rng: () => number, node: MapNode) {
  const kind = node.threat ?? "ambush";
  const count = node.kind === "boss" ? 5 : 3 + (rng() > 0.5 ? 1 : 0);
  const start = Math.max(12, Math.floor(sim.path.length * 0.16));
  const span = Math.max(20, sim.path.length - start - 12);
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(start + ((i + 0.4) / count) * span + (rng() - 0.5) * 12);
    const p = sim.path[Math.max(0, Math.min(sim.path.length - 1, idx))]!;
    const side = rng() > 0.5 ? 1 : -1;
    const dist = p.width * 0.5 + 40 + rng() * 50;
    const hidden = kind === "ambush" || kind === "swarm" || kind === "archers";
    sim.enemies.push({
      id: 100 + i,
      kind: i === count - 1 && node.kind === "boss" ? "blockade" : kind,
      x: p.x + p.nx * side * dist,
      y: p.y + p.ny * side * dist,
      hp: kind === "cavalry" ? 22 : kind === "swarm" ? 10 : 16,
      maxHp: kind === "cavalry" ? 22 : kind === "swarm" ? 10 : 16,
      hidden: hidden && sim.reveal < 1,
      alive: true,
      slotBias: side > 0 ? "right" : "left",
      flash: 0,
      named: i === 0 && !!node.micro,
    });
  }
  if (kind === "pursuit") {
    const p = sim.path[10]!;
    sim.enemies.push({
      id: 199,
      kind: "pursuit",
      x: p.x - p.tx * 80,
      y: p.y - p.ty * 80,
      hp: 18,
      maxHp: 18,
      hidden: false,
      alive: true,
      slotBias: "rear",
      flash: 0,
      named: false,
    });
  }
}

function samplePath(path: PathSample[], s: number): PathSample {
  const i = Math.max(0, Math.min(path.length - 1.001, s));
  const a = path[Math.floor(i)]!;
  const b = path[Math.min(path.length - 1, Math.floor(i) + 1)]!;
  const t = i - Math.floor(i);
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    tx: a.tx + (b.tx - a.tx) * t,
    ty: a.ty + (b.ty - a.ty) * t,
    nx: a.nx + (b.nx - a.nx) * t,
    ny: a.ny + (b.ny - a.ny) * t,
    width: a.width + (b.width - a.width) * t,
    feature: t < 0.5 ? a.feature : b.feature,
  };
}

function slotOffset(form: FormationId, slot: SlotId, index: number, of: number): Vec {
  const spread = form === "skirmish" ? 1.35 : form === "column" ? 0.55 : form === "wedge" ? 0.9 : 0.8;
  const depth = form === "column" ? 1.25 : form === "circle" ? 0.7 : 1;
  const along: Record<SlotId, number> = {
    vanguard: 42 * depth,
    command: 4,
    left: form === "wedge" ? 6 : -6,
    right: form === "wedge" ? 6 : -6,
    rear: -44 * depth,
  };
  const side: Record<SlotId, number> = {
    vanguard: 0,
    command: 0,
    left: -38 * spread,
    right: 38 * spread,
    rear: 0,
  };
  const jitter = (index - (of - 1) / 2) * (form === "skirmish" ? 16 : 10);
  let ox = side[slot] + (slot === "left" || slot === "right" ? 0 : jitter * 0.4);
  let oy = along[slot] + (slot === "vanguard" || slot === "rear" || slot === "command" ? jitter * 0.35 : jitter * 0.2);
  if (form === "circle") {
    const ang = {
      vanguard: -Math.PI / 2,
      right: 0,
      rear: Math.PI / 2,
      left: Math.PI,
      command: 0,
    }[slot];
    const rad = slot === "command" ? 0 : 36;
    ox = Math.cos(ang) * rad + jitter * 0.15;
    oy = Math.sin(ang) * rad + (slot === "command" ? 0 : 0);
  }
  if (form === "wedge" && slot === "vanguard") {
    oy += 10;
    ox *= 0.3;
  }
  return { x: ox, y: oy };
}

function placeUnits(sim: ColumnSim, snap: boolean) {
  const p = samplePath(sim.path, sim.s);
  const form = sim.formation;
  const counts: Record<SlotId, number> = { vanguard: 0, left: 0, right: 0, rear: 0, command: 0 };
  const totals: Record<SlotId, number> = { vanguard: 0, left: 0, right: 0, rear: 0, command: 0 };
  for (const u of sim.units) totals[u.slot]++;
  for (const u of sim.units) {
    const idx = counts[u.slot]++;
    const off = slotOffset(form, u.slot, idx, totals[u.slot]);
    const lat = sim.lateral * p.width * 0.28;
    const wx = p.x + p.tx * off.y + p.nx * (off.x + lat);
    const wy = p.y + p.ty * off.y + p.ny * (off.x + lat);
    if (snap) {
      u.x = wx;
      u.y = wy;
    } else {
      u.x += (wx - u.x) * 0.12;
      u.y += (wy - u.y) * 0.12;
    }
  }
}

export function setFormation(sim: ColumnSim, id: FormationId) {
  if (sim.target === id && sim.formation === id) return;
  if (sim.fortT > 0 && id === "circle") {
    sim.formation = "circle";
    sim.target = "circle";
    sim.switchT = 1;
    sim.integrity = Math.min(1, sim.integrity + 0.2);
    toast(sim, "Fortified.");
    return;
  }
  sim.target = id;
  sim.switchT = 0;
  const cost = sim.relics.includes("drum") ? 14 : 22;
  sim.momentum = Math.max(0, sim.momentum - cost);
  sim.integrity = Math.max(0.15, sim.integrity - 0.45);
  toast(sim, FORM_NAME[id]);
}

const FORM_NAME: Record<FormationId, string> = {
  column: "Column",
  wedge: "Wedge",
  circle: "Shield wall",
  skirmish: "Skirmish line",
};

export function setPace(sim: ColumnSim, p: PaceId) {
  if (sim.pace === p) return;
  sim.pace = p;
  toast(sim, p === "rush" ? "Rush" : p === "halt" ? "Halt" : "March");
}

export function selectOfficer(sim: ColumnSim, id: string | null) {
  sim.selectedOfficer = id;
}

export function assignOfficer(sim: ColumnSim, slot: SlotId) {
  const id = sim.selectedOfficer;
  if (!id) return;
  const o = sim.officers.find((x) => x.id === id && x.alive);
  if (!o) return;
  o.slot = slot;
  for (const u of sim.units) {
    if (u.officerId === id) u.slot = slot;
  }
  toast(sim, `${OFFICERS[id]?.name ?? id} → ${slot}`);
}

export function fireAbility(sim: ColumnSim, id?: string) {
  const oid = id ?? sim.selectedOfficer ?? sim.officers.find((o) => o.alive && o.cooldown <= 0)?.id;
  if (!oid) return;
  const o = sim.officers.find((x) => x.id === oid && x.alive);
  if (!o || o.cooldown > 0) return;
  const def = OFFICERS[oid];
  if (!def) return;
  o.cooldown = o.maxCooldown;
  sim.selectedOfficer = oid;
  switch (def.abilityId) {
    case "battleCry":
      sim.cryT = 4.5;
      horn();
      toast(sim, "Battle cry!");
      addTrauma(sim, 0.35);
      break;
    case "eagleEye":
      sim.reveal = Math.max(sim.reveal, 1);
      for (const e of sim.enemies) e.hidden = false;
      toast(sim, "The verge is clear.");
      break;
    case "fieldMedicine": {
      const extra = sim.relics.includes("salve") ? 10 : 0;
      sim.stamina = Math.min(100, sim.stamina + 22 + extra);
      sim.warlordHp = Math.min(sim.warlordMax, sim.warlordHp + 5 + extra * 0.3);
      toast(sim, "Field medicine.");
      break;
    }
    case "rapidFort":
      sim.fortT = 0.4;
      setFormation(sim, "circle");
      sim.momentum = Math.min(100, sim.momentum + 18);
      toast(sim, "Rapid fortification.");
      break;
    case "parley": {
      const alive = sim.enemies.filter((e) => e.alive);
      const chance = 0.4 + (sim.relics.includes("colors") ? 0.2 : 0) + (o.slot === "command" ? 0.1 : 0);
      if (alive.length && Math.random() < chance) {
        for (const e of alive.slice(0, 2)) {
          e.alive = false;
          e.hp = 0;
        }
        toast(sim, "They take the terms.");
        sim.morale = Math.min(100, sim.morale + 4);
      } else {
        toast(sim, "Talk fails. Steel, then.");
        sim.morale = Math.max(0, sim.morale - 4);
      }
      break;
    }
    case "holdLine":
      sim.holdT = 5;
      toast(sim, "Hold the line.");
      break;
  }
}

function toast(sim: ColumnSim, s: string) {
  sim.toast = s;
  sim.toastT = 1.8;
}

function addTrauma(sim: ColumnSim, v: number) {
  if (!sim.shakeOn || sim.reduced) return;
  sim.trauma = Math.min(1, sim.trauma + v);
}

function emit(sim: ColumnSim, x: number, y: number, color: string, n = 8) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 20 + Math.random() * 70;
    sim.particles.push({
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: 0.35 + Math.random() * 0.4,
      max: 0.7,
      color,
      size: 1.5 + Math.random() * 2.5,
    });
  }
}

function float(sim: ColumnSim, x: number, y: number, text: string, color: string) {
  sim.floaters.push({ x, y, text, life: 0.9, color });
}

export function step(sim: ColumnSim, dt: number) {
  if (sim.done) return;
  if (sim.hitstop > 0) {
    sim.hitstop -= dt;
    tickFx(sim, dt);
    return;
  }
  sim.t += dt;
  const p = samplePath(sim.path, sim.s);
  sim.heading = Math.atan2(p.ty, p.tx);

  // switch
  if (sim.switchT < 1) {
    const rate = 0.35 + sim.momentum / 220;
    sim.switchT = Math.min(1, sim.switchT + dt * rate);
    if (sim.switchT >= 1) sim.formation = sim.target;
  } else if (sim.formation !== sim.target) {
    sim.formation = sim.target;
  }

  const switching = sim.switchT < 1;
  const integTarget = switching ? 0.25 : 1;
  sim.integrity += (integTarget - sim.integrity) * (1 - Math.exp(-2.2 * dt));
  const momRec = sim.relics.includes("drum") ? 10 : 6;
  if (!switching) sim.momentum = Math.min(100, sim.momentum + momRec * dt);

  // pace
  const base = sim.relics.includes("pennant") && sim.formation === "column" ? 26 : 22;
  const formMul =
    sim.formation === "column" ? 1.15 : sim.formation === "skirmish" ? 1.0 : sim.formation === "wedge" ? 0.92 : 0.62;
  const paceMul = sim.pace === "rush" ? 1.7 : sim.pace === "halt" ? 0 : 1;
  const choke = p.feature === "choke" && sim.formation !== "column" ? 0.7 : 1;
  sim.speed = base * formMul * paceMul * choke * (0.7 + sim.integrity * 0.3);
  sim.s += (sim.speed * dt) / 28;

  // resources
  const drain = sim.relics.includes("ration") ? 0.55 : 1;
  if (sim.pace === "rush") sim.stamina = Math.max(0, sim.stamina - 7.5 * dt);
  else if (sim.pace === "halt") sim.stamina = Math.min(100, sim.stamina + 5 * dt);
  else sim.stamina = Math.max(0, sim.stamina - 1.1 * dt);
  sim.supplies = Math.max(0, sim.supplies - 0.55 * drain * dt);
  if (sim.supplies <= 0) {
    sim.stamina = Math.max(0, sim.stamina - 4 * dt);
    sim.morale = Math.max(0, sim.morale - 1.5 * dt);
  }
  if (sim.stamina <= 0.1 && sim.pace !== "halt") {
    sim.pace = "halt";
    toast(sim, "The column staggers. Halt.");
  }
  if (sim.terrain === "wetlands" && !sim.relics.includes("river")) {
    sim.supplies = Math.max(0, sim.supplies - 0.25 * dt);
  }

  sim.cryT = Math.max(0, sim.cryT - dt);
  sim.holdT = Math.max(0, sim.holdT - dt);
  sim.fortT = Math.max(0, sim.fortT - dt);
  sim.reveal = Math.max(0, sim.reveal - dt * 0.08);
  for (const o of sim.officers) {
    if (o.alive) o.cooldown = Math.max(0, o.cooldown - dt);
  }

  placeUnits(sim, false);
  updateEnemies(sim, dt);
  tickFx(sim, dt);

  const centroid = centroidOf(sim);
  const look = 90;
  const tx = centroid.x + p.tx * look;
  const ty = centroid.y + p.ty * look;
  const k = 1 - Math.exp(-3.2 * dt);
  sim.cam.x += (tx - sim.cam.x) * k;
  sim.cam.y += (ty - sim.cam.y) * k;

  sim.toastT = Math.max(0, sim.toastT - dt);
  nearestHint(sim);

  if (sim.s >= sim.path.length - 6) finish(sim, true, "The mile is done.");
  else checkFail(sim);
}

function centroidOf(sim: ColumnSim): Vec {
  let x = 0,
    y = 0,
    n = 0;
  for (const u of sim.units) {
    x += u.x;
    y += u.y;
    n++;
  }
  if (!n) {
    const p = samplePath(sim.path, sim.s);
    return { x: p.x, y: p.y };
  }
  return { x: x / n, y: y / n };
}

function updateEnemies(sim: ColumnSim, dt: number) {
  const p = samplePath(sim.path, sim.s);
  const scoutFlank =
    sim.officers.some((o) => o.alive && o.id === "sera" && (o.slot === "left" || o.slot === "right")) ||
    sim.reveal > 0;
  for (const e of sim.enemies) {
    if (!e.alive) continue;
    e.flash = Math.max(0, e.flash - dt * 4);
    const dx = p.x - e.x;
    const dy = p.y - e.y;
    const dist = Math.hypot(dx, dy);
    if (e.hidden) {
      if (dist < (scoutFlank ? 160 : 70) || sim.formation === "skirmish" && dist < 200) {
        e.hidden = false;
        toast(sim, `${THREAT_LABEL[e.kind]}!`);
        addTrauma(sim, 0.25);
      } else continue;
    }
    const speed =
      e.kind === "cavalry" ? 78 : e.kind === "swarm" ? 70 : e.kind === "pursuit" ? 64 : 48;
    if (dist > 28) {
      e.x += (dx / dist) * speed * dt;
      e.y += (dy / dist) * speed * dt;
    }
    // contact
    let hitU: Unit | null = null;
    let best = 40;
    for (const u of sim.units) {
      const d = Math.hypot(u.x - e.x, u.y - e.y);
      if (d < best) {
        best = d;
        hitU = u;
      }
    }
    if (hitU && best < 34) resolveHit(sim, e, hitU, dt);
  }
}

function resolveHit(sim: ColumnSim, e: Enemy, u: Unit, dt: number) {
  const form = sim.formation;
  const m = MATCHUP[e.kind][form];
  let deal = m.deal;
  let take = m.take;
  if (sim.switchT < 1) take *= 1.45;
  if (sim.cryT > 0 && (u.slot === "vanguard" || sim.relics.includes("horn"))) deal *= 1.55;
  if (sim.holdT > 0 && u.slot === "rear") take *= 0.55;
  if (sim.relics.includes("whet") && u.slot === "vanguard") deal *= 1.2;
  if (sim.relics.includes("brooch") && e.kind === "swarm") deal *= 1.35;
  if (sim.relics.includes("pennant")) take *= 0.92;
  const warrior = sim.officers.find((o) => o.id === "kael" && o.alive);
  if (warrior && warrior.slot === "vanguard" && (e.kind === "cavalry" || e.kind === "blockade")) deal *= 1.25;
  const paceTake = sim.pace === "rush" ? 1.2 : sim.pace === "halt" ? 0.9 : 1;
  take *= paceTake * (1.35 - sim.integrity * 0.35);

  const dmgOut = 14 * deal * dt;
  const dmgIn = 9 * take * dt;
  e.hp -= dmgOut;
  e.flash = 1;
  if (u.officerId === "warlord") {
    sim.warlordHp -= dmgIn * 0.35;
  } else if (u.officerId) {
    const o = sim.officers.find((x) => x.id === u.officerId);
    if (o) {
      o.hp -= dmgIn * 0.8;
      if (o.hp <= 0) {
        o.alive = false;
        o.hp = 0;
        u.officerId = null;
        toast(sim, `${OFFICERS[o.id]?.name ?? "An officer"} is down.`);
        sim.morale = Math.max(0, sim.morale - 18);
        addTrauma(sim, 0.7);
        sim.hitstop = 0.12;
        emit(sim, u.x, u.y, "#c45c3e", 18);
      }
    }
  } else {
    sim.warriors -= dmgIn * 0.35;
    if (sim.warriors < 0) sim.warriors = 0;
  }
  u.flash = 1;

  if (Math.random() < dt * 8) {
    clash();
    emit(sim, (e.x + u.x) / 2, (e.y + u.y) / 2, "#e8e0d4", 5);
    addTrauma(sim, 0.08);
  }

  if (e.hp <= 0) {
    e.alive = false;
    sim.kills++;
    sim.hitstop = 0.06;
    addTrauma(sim, 0.4);
    thud();
    emit(sim, e.x, e.y, e.kind === "swarm" ? "#c4a35a" : "#6a4030", 16);
    float(sim, e.x, e.y, e.named ? "Leader down" : "Cut down", "#e8e0d4");
    sim.morale = Math.min(100, sim.morale + 2);
    if (e.named && sim.climaxArmed && !sim.climaxFired) {
      sim.climaxFired = true;
      finish(sim, true, "The leader is in the open.");
      return;
    }
  }

  if (e.named && e.hp < e.maxHp * 0.45 && sim.climaxArmed && !sim.climaxFired) {
    sim.climaxFired = true;
    finish(sim, true, "The leader is in the open.");
  }
}

function tickFx(sim: ColumnSim, dt: number) {
  sim.trauma = Math.max(0, sim.trauma - dt * 1.6);
  for (const u of sim.units) u.flash = Math.max(0, u.flash - dt * 5);
  sim.particles = sim.particles.filter((p) => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.96;
    p.vy *= 0.96;
    return p.life > 0;
  });
  sim.floaters = sim.floaters.filter((f) => {
    f.life -= dt;
    f.y -= 18 * dt;
    return f.life > 0;
  });
  if (sim.particles.length > 220) sim.particles.splice(0, sim.particles.length - 220);
}

function nearestHint(sim: ColumnSim) {
  const p = samplePath(sim.path, sim.s);
  let best = 9999;
  let e: Enemy | null = null;
  for (const x of sim.enemies) {
    if (!x.alive) continue;
    const d = Math.hypot(x.x - p.x, x.y - p.y);
    if (d < best) {
      best = d;
      e = x;
    }
  }
  if (!e || best > 260) {
    sim.threatHint =
      p.feature === "choke"
        ? "Narrow. Column."
        : p.feature === "cover"
          ? "Cover on the verge. Ambush ground."
          : p.feature === "hazard"
            ? "Bad ground. Watch the flanks."
            : "Road is open.";
    return;
  }
  if (e.hidden) {
    sim.threatHint = "The verge is wrong.";
    return;
  }
  const rec =
    e.kind === "cavalry" || e.kind === "ambush"
      ? "Shield wall"
      : e.kind === "blockade"
        ? "Wedge"
        : e.kind === "swarm"
          ? "Skirmish"
          : e.kind === "pursuit"
            ? "Rearguard"
            : "Close and cut";
  sim.threatHint = `${THREAT_LABEL[e.kind]} · ${rec}`;
}

function checkFail(sim: ColumnSim) {
  if (sim.warlordHp <= 0) finish(sim, false, "The warlord falls. The column is a mob.");
  else if (sim.morale <= 0) finish(sim, false, "Morale breaks. Officers desert in the dark.");
  else if (sim.warriors <= 0) finish(sim, false, "No warriors left to hold a shape.");
  else if (sim.integrity < 0.08 && sim.switchT < 0.5 && sim.enemies.some((e) => e.alive && !e.hidden)) {
    // only shatter if actually in contact
    const p = samplePath(sim.path, sim.s);
    const close = sim.enemies.some((e) => e.alive && Math.hypot(e.x - p.x, e.y - p.y) < 50);
    if (close && sim.momentum < 8) finish(sim, false, "Caught mid-switch. The formation shatters.");
  }
}

function finish(sim: ColumnSim, won: boolean, reason: string) {
  if (sim.done) return;
  sim.done = true;
  const deaths = sim.officers.filter((o) => !o.alive).map((o) => o.id);
  const lost = Math.max(0, Math.round(sim.warriorsLost || 0));
  sim.result = {
    won,
    reason,
    warriorsLost: lost,
    suppliesSpent: 0,
    moraleDelta: won ? 4 : -10,
    staminaLeft: sim.stamina,
    officerDeaths: deaths,
    climax: sim.climaxFired,
    micro: won ? sim.microId : undefined,
    kills: sim.kills,
  };
}

export function snapshot(sim: ColumnSim): HudSnapshot {
  return {
    progress: Math.min(1, sim.s / Math.max(1, sim.path.length - 6)),
    formation: sim.formation,
    targetFormation: sim.target,
    switching: sim.switchT < 1,
    switchT: sim.switchT,
    pace: sim.pace,
    integrity: sim.integrity,
    momentum: sim.momentum,
    stamina: sim.stamina,
    morale: sim.morale,
    supplies: sim.supplies,
    warlordHp: sim.warlordHp,
    warlordMax: sim.warlordMax,
    warriors: sim.warriors,
    warriorsMax: sim.warriorsMax,
    paused: sim.paused,
    threatHint: sim.threatHint,
    toast: sim.toastT > 0 ? sim.toast : "",
    officers: sim.officers,
    selectedOfficer: sim.selectedOfficer,
    lateral: sim.lateral,
    speed: sim.speed,
    heading: sim.heading,
  };
}

export function applyLateral(sim: ColumnSim, x: number, dt: number) {
  // x: -1 left, +1 right in player-screen terms along the road normal
  sim.lateral = Math.max(-1, Math.min(1, sim.lateral + x * dt * 1.8));
  if (x === 0) sim.lateral += (0 - sim.lateral) * (1 - Math.exp(-1.2 * dt));
}

export { samplePath, TERRAIN_TINT };
