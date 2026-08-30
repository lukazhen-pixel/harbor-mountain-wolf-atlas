import { ABILITY_CD, OFFICERS, SECTORS, STARTING_OFFICERS } from "./content";
import { mulberry32, pick, shuffle } from "./rng";
import type {
  LootOffer,
  LootPick,
  MapNode,
  NodeKind,
  OfficerState,
  RelicDef,
  RunState,
  TerrainId,
  ThreatKind,
} from "./types";
import { RELICS } from "./content";
import { preferredMicro } from "./content";

const SAVE_VERSION = 1;

export function newRun(seed = (Math.random() * 0xffffffff) >>> 0, skirmish = false): RunState {
  const rng = mulberry32(seed);
  const officers: OfficerState[] = STARTING_OFFICERS.map((id) => {
    const def = OFFICERS[id]!;
    return {
      id,
      slot: def.preferred,
      hp: 24,
      maxHp: 24,
      alive: true,
      cooldown: 0,
      maxCooldown: ABILITY_CD[def.abilityId],
    };
  });
  // Sera defaults to left; put Lys on command with Oren — Lys to right as a start mix
  const sera = officers.find((o) => o.id === "sera");
  if (sera) sera.slot = "left";
  const lys = officers.find((o) => o.id === "lys");
  if (lys) lys.slot = "right";

  const map = skirmish ? skirmishMap() : buildMap(rng);

  return {
    version: SAVE_VERSION,
    seed,
    day: 1,
    sector: 0,
    gold: 12,
    supplies: 70,
    morale: 80,
    stamina: 100,
    warlordHp: 40,
    warlordMax: 40,
    warriors: 16,
    warriorsMax: 16,
    officers,
    relics: [],
    map,
    currentNode: null,
    visited: [],
    available: map.filter((n) => n.row === 0).map((n) => n.id),
    kills: 0,
    marches: 0,
    microsWon: 0,
    bestStreak: 0,
    skirmish,
    pendingLoot: null,
    pendingMicro: null,
    lastResult: null,
    defeatReason: null,
  };
}

function skirmishMap(): MapNode[] {
  return [
    {
      id: "sk-0",
      sector: 0,
      row: 0,
      col: 1,
      kind: "march",
      title: "Open grass",
      body: "Riders on the ridge. The road is the only way through.",
      threat: "cavalry",
      micro: "ballista",
      next: [],
    },
  ];
}

function buildMap(rng: () => number): MapNode[] {
  const nodes: MapNode[] = [];
  const threatsByTerrain: Record<TerrainId, ThreatKind[]> = {
    plains: ["cavalry", "blockade", "ambush", "archers", "pursuit"],
    forest: ["ambush", "swarm", "archers", "pursuit"],
    wetlands: ["ambush", "swarm", "blockade", "pursuit"],
    mountains: ["rockslide", "blockade", "ambush", "archers"],
    city: ["blockade"],
  };
  const titles: Record<NodeKind, string[]> = {
    march: ["The Cut", "Dust Wake", "Long Mile", "Broken Milestone", "Cattle Track", "Old Legion Road"],
    rest: ["Wayside Camp", "Shepherd's Fold", "Dry Creek"],
    forage: ["Wild Orchard", "Reed Beds", "Game Trail"],
    event: ["A Stranger", "Standing Stones", "Burned Cart", "The Toll"],
    city: ["Market Town", "River Gate", "Wayfort"],
    boss: ["The Gate"],
  };

  let idn = 0;
  const nid = () => `n${idn++}`;

  // 4 sectors, 4 rows each (last row of last sector is boss)
  const prevRowIds: string[] = [];
  for (let sector = 0; sector < 4; sector++) {
    const terrain = SECTORS[sector]!.terrain;
    const rows = 4;
    let lastIds: string[] = [];
    for (let row = 0; row < rows; row++) {
      const isBoss = sector === 3 && row === rows - 1;
      const isCity = row === rows - 1 && !isBoss;
      const count = isBoss || isCity ? 1 : 2 + (rng() > 0.45 ? 1 : 0);
      const rowNodes: MapNode[] = [];
      for (let col = 0; col < count; col++) {
        let kind: NodeKind;
        if (isBoss) kind = "boss";
        else if (isCity) kind = "city";
        else {
          const r = rng();
          if (r < 0.55) kind = "march";
          else if (r < 0.7) kind = "event";
          else if (r < 0.82) kind = "forage";
          else kind = "rest";
        }
        if (sector === 0 && row === 0 && col === 0) kind = "march";
        const threat =
          kind === "march" || kind === "boss"
            ? pick(rng, threatsByTerrain[terrain]!)
            : undefined;
        const node: MapNode = {
          id: nid(),
          sector,
          row: sector * 4 + row,
          col,
          kind,
          title: isBoss
            ? "The Usurper's Gate"
            : pick(rng, titles[kind]!),
          body: flavor(kind, terrain, threat, rng),
          threat,
          micro: threat ? preferredMicro(threat) : undefined,
          next: [],
        };
        if (sector === 1 && row === 2 && kind === "event") node.recruitId = "vex";
        if (sector === 2 && row === 1 && kind === "rest") node.recruitId = "rook";
        rowNodes.push(node);
        nodes.push(node);
      }
      const sources = lastIds.length ? lastIds : prevRowIds;
      if (sources.length === 0) {
        // first row
      } else {
        for (const s of sources) {
          const src = nodes.find((n) => n.id === s)!;
          const picks = shuffle(rng, rowNodes.slice()).slice(0, Math.min(2, rowNodes.length));
          for (const p of picks) {
            if (!src.next.includes(p.id)) src.next.push(p.id);
          }
        }
        // ensure every new node is reachable
        for (const n of rowNodes) {
          if (!nodes.some((s) => s.next.includes(n.id))) {
            const s = nodes.find((x) => x.id === sources[0])!;
            s.next.push(n.id);
          }
        }
      }
      lastIds = rowNodes.map((n) => n.id);
    }
    prevRowIds.length = 0;
    prevRowIds.push(...lastIds);
  }
  return nodes;
}

function flavor(kind: NodeKind, terrain: TerrainId, threat: ThreatKind | undefined, rng: () => number): string {
  if (kind === "boss") {
    return "The pass narrows to a throat of stone. Banners of the usurper hang from the gate. This is the last mile.";
  }
  if (kind === "city") {
    return pick(rng, [
      "Smoke and bread. A place to spend gold and bury the dead.",
      "The gate-sergeant wants a toll. The market wants your stories.",
    ]);
  }
  if (kind === "rest") {
    return pick(rng, [
      "A hollow out of the wind. Stamina returns if you dare to stop.",
      "Old fire-ring. The men want to sit. The road wants you moving.",
    ]);
  }
  if (kind === "forage") {
    return pick(rng, [
      "Game sign in the mud. Supplies, if you are quick and quiet.",
      "Wild grain along the ditch. Take it and hope it is not blighted.",
    ]);
  }
  if (kind === "event") {
    return pick(rng, [
      "A cart on its side. Someone is still breathing.",
      "A hermit with a relic and a price that is not gold.",
      "Deserters from another column. They want a banner that holds.",
    ]);
  }
  const byThreat: Record<ThreatKind, string> = {
    ambush: "The verge is too quiet. Sera would not like this stretch.",
    blockade: "Wagons dragged across the road. Someone wants a fight or a purse.",
    cavalry: "Hoof-dust on the ridge. Riders who live off columns like yours.",
    swarm: "Amber shells click in the grass. The ground is wrong.",
    archers: "A copse with a sightline. You will be seen before you see them.",
    rockslide: "Scree and a hanging slope. One shout could bring it down.",
    pursuit: "Dust behind you that is not yours. They have your pace.",
  };
  return threat ? byThreat[threat] : "The road continues.";
}

export function applyLoot(run: RunState, pickId: string): RunState {
  const offer = run.pendingLoot;
  if (!offer) return { ...run, pendingLoot: null };
  const p = offer.picks.find((x) => x.id === pickId);
  const next = { ...run, pendingLoot: null };
  if (!p) return next;
  if (p.kind === "relic" && p.relicId && !next.relics.includes(p.relicId)) {
    next.relics = [...next.relics, p.relicId];
  }
  if (p.kind === "supplies") next.supplies = Math.min(100, next.supplies + (p.amount ?? 20));
  if (p.kind === "gold") next.gold += p.amount ?? 8;
  if (p.kind === "heal") {
    next.warlordHp = Math.min(next.warlordMax, next.warlordHp + (p.amount ?? 10));
    next.stamina = Math.min(100, next.stamina + 20);
  }
  if (p.kind === "warriors") {
    next.warriors = Math.min(next.warriorsMax + 4, next.warriors + (p.amount ?? 3));
    next.warriorsMax = Math.max(next.warriorsMax, next.warriors);
  }
  if (p.kind === "morale") next.morale = Math.min(100, next.morale + (p.amount ?? 12));
  if (p.kind === "recruit" && p.recruitId) {
    const def = OFFICERS[p.recruitId];
    if (def && !next.officers.some((o) => o.id === def.id)) {
      next.officers = [
        ...next.officers,
        {
          id: def.id,
          slot: def.preferred,
          hp: 24,
          maxHp: 24,
          alive: true,
          cooldown: 0,
          maxCooldown: ABILITY_CD[def.abilityId],
        },
      ];
    }
  }
  return next;
}

export function makeLoot(run: RunState, node: MapNode, won: boolean): LootOffer {
  const rng = mulberry32(run.seed ^ hash(node.id) ^ (won ? 1 : 3));
  const unused = Object.values(RELICS).filter((r) => !run.relics.includes(r.id));
  const picks: LootPick[] = [];
  if (won && unused.length && rng() > 0.35) {
    const r = pick(rng, unused);
    picks.push({
      id: "relic",
      kind: "relic",
      name: r.name,
      hint: r.hint,
      relicId: r.id,
    });
  }
  picks.push({
    id: "sup",
    kind: "supplies",
    name: "Foraged stores",
    hint: "+20 supplies",
    amount: 16 + Math.floor(rng() * 10),
  });
  picks.push({
    id: "gold",
    kind: "gold",
    name: "Purse",
    hint: `+${6 + Math.floor(rng() * 8)} gold`,
    amount: 6 + Math.floor(rng() * 8),
  });
  if (run.warlordHp < run.warlordMax * 0.8) {
    picks.push({ id: "heal", kind: "heal", name: "Bind the wounds", hint: "Blood and stamina return." });
  }
  if (node.recruitId && !run.officers.some((o) => o.id === node.recruitId)) {
    const d = OFFICERS[node.recruitId]!;
    picks.push({
      id: "rec",
      kind: "recruit",
      name: `Take in ${d.name}`,
      hint: d.blurb,
      recruitId: d.id,
    });
  }
  if (run.warriors < run.warriorsMax) {
    picks.push({
      id: "men",
      kind: "warriors",
      name: "Stragglers join",
      hint: "+3 warriors",
      amount: 3,
    });
  }
  return {
    title: won ? "The road yields" : "What you can salvage",
    body: won
      ? "Take one. The column cannot carry everything."
      : "You held. Barely. Take what you can and move.",
    picks: picks.slice(0, 3),
  };
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function restAt(run: RunState): RunState {
  const cost = 8;
  return {
    ...run,
    day: run.day + 1,
    supplies: Math.max(0, run.supplies - cost),
    stamina: Math.min(100, run.stamina + 35),
    morale: Math.min(100, run.morale + 8),
    warlordHp: Math.min(run.warlordMax, run.warlordHp + 6),
    officers: run.officers.map((o) =>
      o.alive ? { ...o, hp: Math.min(o.maxHp, o.hp + 6) } : o,
    ),
  };
}

export function forage(run: RunState, risky: boolean): RunState {
  const rng = mulberry32(run.seed + run.day * 97);
  const gain = risky ? 18 + Math.floor(rng() * 14) : 10 + Math.floor(rng() * 8);
  const hit = risky && rng() > 0.55;
  return {
    ...run,
    day: run.day + 1,
    supplies: Math.min(100, run.supplies + gain),
    stamina: Math.max(0, run.stamina - (risky ? 12 : 6)),
    warlordHp: hit ? Math.max(1, run.warlordHp - 6) : run.warlordHp,
    warriors: hit ? Math.max(4, run.warriors - 1) : run.warriors,
    morale: hit ? Math.max(0, run.morale - 6) : Math.min(100, run.morale + 2),
  };
}

export { type RelicDef };
