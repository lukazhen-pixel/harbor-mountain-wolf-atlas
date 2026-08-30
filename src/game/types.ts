export type FormationId = "column" | "wedge" | "circle" | "skirmish";
export type PaceId = "halt" | "march" | "rush";
export type SlotId = "vanguard" | "left" | "right" | "rear" | "command";
export type TerrainId = "plains" | "forest" | "wetlands" | "mountains" | "city";
export type NodeKind = "march" | "rest" | "forage" | "event" | "city" | "boss";
export type ThreatKind =
  | "ambush"
  | "blockade"
  | "cavalry"
  | "swarm"
  | "archers"
  | "rockslide"
  | "pursuit";
export type MicroId = "ballista" | "interrogate" | "brace" | "spot";
export type Phase =
  | "title"
  | "briefing"
  | "map"
  | "encounter"
  | "column"
  | "micro"
  | "loot"
  | "rest"
  | "event"
  | "city"
  | "defeat"
  | "victory"
  | "how";

export type OfficerRole = "warrior" | "scout" | "physician" | "strategist" | "diplomat" | "veteran";

export interface OfficerDef {
  id: string;
  name: string;
  role: OfficerRole;
  title: string;
  portrait: string;
  color: string;
  abilityId: AbilityId;
  abilityName: string;
  abilityHint: string;
  blurb: string;
  preferred: SlotId;
}

export type AbilityId =
  | "battleCry"
  | "eagleEye"
  | "fieldMedicine"
  | "rapidFort"
  | "parley"
  | "holdLine";

export interface OfficerState {
  id: string;
  slot: SlotId;
  hp: number;
  maxHp: number;
  alive: boolean;
  cooldown: number;
  maxCooldown: number;
}

export interface RelicDef {
  id: string;
  name: string;
  hint: string;
}

export interface SectorDef {
  id: number;
  name: string;
  terrain: TerrainId;
  epithet: string;
  threat: string;
}

export interface MapNode {
  id: string;
  sector: number;
  row: number;
  col: number;
  kind: NodeKind;
  title: string;
  body: string;
  threat?: ThreatKind;
  micro?: MicroId;
  next: string[];
  recruitId?: string;
}

export interface RunState {
  version: number;
  seed: number;
  day: number;
  sector: number;
  gold: number;
  supplies: number;
  morale: number;
  stamina: number;
  warlordHp: number;
  warlordMax: number;
  warriors: number;
  warriorsMax: number;
  officers: OfficerState[];
  relics: string[];
  map: MapNode[];
  currentNode: string | null;
  visited: string[];
  available: string[];
  kills: number;
  marches: number;
  microsWon: number;
  bestStreak: number;
  skirmish: boolean;
  pendingLoot: LootOffer | null;
  pendingMicro: PendingMicro | null;
  lastResult: ColumnResult | null;
  defeatReason: string | null;
}

export interface LootOffer {
  title: string;
  body: string;
  picks: LootPick[];
}

export interface LootPick {
  id: string;
  kind: "relic" | "supplies" | "gold" | "heal" | "recruit" | "warriors" | "morale";
  name: string;
  hint: string;
  relicId?: string;
  recruitId?: string;
  amount?: number;
}

export interface PendingMicro {
  id: MicroId;
  title: string;
  body: string;
  onWin: string;
  onLose: string;
}

export interface ColumnResult {
  won: boolean;
  reason: string;
  warriorsLost: number;
  suppliesSpent: number;
  moraleDelta: number;
  staminaLeft: number;
  officerDeaths: string[];
  climax: boolean;
  micro?: MicroId;
  kills: number;
}

export interface HudSnapshot {
  progress: number;
  formation: FormationId;
  targetFormation: FormationId;
  switching: boolean;
  switchT: number;
  pace: PaceId;
  integrity: number;
  momentum: number;
  stamina: number;
  morale: number;
  supplies: number;
  warlordHp: number;
  warlordMax: number;
  warriors: number;
  warriorsMax: number;
  paused: boolean;
  threatHint: string;
  toast: string;
  officers: OfficerState[];
  selectedOfficer: string | null;
  lateral: number;
  speed: number;
  heading: number;
}

export const SLOTS: SlotId[] = ["vanguard", "left", "right", "rear", "command"];

export const FORMATIONS: { id: FormationId; name: string; key: string; hint: string }[] = [
  { id: "column", name: "Column", key: "1", hint: "Fast march. Covers ground. Weak flanks." },
  { id: "wedge", name: "Wedge", key: "2", hint: "Breaks blockades. Exposed rear." },
  { id: "circle", name: "Shield Wall", key: "3", hint: "Holds ambushes. Slow." },
  { id: "skirmish", name: "Skirmish", key: "4", hint: "Scouts wide. Weak to charges." },
];
