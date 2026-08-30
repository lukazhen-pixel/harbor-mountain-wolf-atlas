import type {
  AbilityId,
  FormationId,
  MicroId,
  OfficerDef,
  RelicDef,
  SectorDef,
  SlotId,
  TerrainId,
  ThreatKind,
} from "./types";

export const OFFICERS: Record<string, OfficerDef> = {
  kael: {
    id: "kael",
    name: "Kael",
    role: "warrior",
    title: "the Breaker",
    portrait: "/art/kael.jpg",
    color: "#c45c3e",
    abilityId: "battleCry",
    abilityName: "Battle Cry",
    abilityHint: "Vanguard damage spike. Best from the front.",
    blurb: "Breaks charges. Put him in the vanguard and keep him there.",
    preferred: "vanguard",
  },
  sera: {
    id: "sera",
    name: "Sera",
    role: "scout",
    title: "of the Pale",
    portrait: "/art/sera.jpg",
    color: "#6b8f71",
    abilityId: "eagleEye",
    abilityName: "Eagle Eye",
    abilityHint: "Reveals hidden threats along the road.",
    blurb: "Sees ambushes early. A flank without her is a grave.",
    preferred: "left",
  },
  oren: {
    id: "oren",
    name: "Oren",
    role: "physician",
    title: "Vale",
    portrait: "/art/oren.jpg",
    color: "#c4a35a",
    abilityId: "fieldMedicine",
    abilityName: "Field Medicine",
    abilityHint: "Restores stamina and a little warlord blood.",
    blurb: "Keeps the column on its feet. Command is his post.",
    preferred: "command",
  },
  lys: {
    id: "lys",
    name: "Lys",
    role: "strategist",
    title: "Quill",
    portrait: "/art/lys.jpg",
    color: "#8a9bb0",
    abilityId: "rapidFort",
    abilityName: "Rapid Fortification",
    abilityHint: "Snap to shield wall with no momentum cost.",
    blurb: "Integrity is her craft. She makes a formation hold.",
    preferred: "command",
  },
  vex: {
    id: "vex",
    name: "Vex",
    role: "diplomat",
    title: "of Three Tongues",
    portrait: "/art/vex.jpg",
    color: "#b08a9a",
    abilityId: "parley",
    abilityName: "Parley",
    abilityHint: "Chance to talk a fight down. Better from command.",
    blurb: "A tongue sharper than most blades. Recruited on the road.",
    preferred: "command",
  },
  rook: {
    id: "rook",
    name: "Rook",
    role: "veteran",
    title: "Holdfast",
    portrait: "/art/rook.jpg",
    color: "#9a8b74",
    abilityId: "holdLine",
    abilityName: "Hold the Line",
    abilityHint: "Rearguard becomes a wall. Stops pursuits cold.",
    blurb: "Has buried more friends than most have made. Put him at the rear.",
    preferred: "rear",
  },
};

export const STARTING_OFFICERS = ["kael", "sera", "oren", "lys"];

export const SECTORS: SectorDef[] = [
  {
    id: 0,
    name: "The Amber Road",
    terrain: "plains",
    epithet: "Open grass. Cavalry country.",
    threat: "Bandit riders",
  },
  {
    id: 1,
    name: "The Green Veil",
    terrain: "forest",
    epithet: "Canopy, roots, and things that wait.",
    threat: "Amber scarabs",
  },
  {
    id: 2,
    name: "The Sinking March",
    terrain: "wetlands",
    epithet: "Water that does not forgive.",
    threat: "Fever and cult-fires",
  },
  {
    id: 3,
    name: "The Spine",
    terrain: "mountains",
    epithet: "A pass that remembers every army.",
    threat: "The usurper's gate",
  },
];

export const RELICS: Record<string, RelicDef> = {
  pennant: { id: "pennant", name: "Iron Pennant", hint: "Column speed and integrity up." },
  brooch: { id: "brooch", name: "Scarab Brooch", hint: "Hits poison. Swarms fear you." },
  river: { id: "river", name: "River Stone", hint: "Wetlands no longer rot supplies." },
  colors: { id: "colors", name: "False Colors", hint: "Parley and events lean your way." },
  ration: { id: "ration", name: "Last Ration", hint: "Supplies drain slower on the march." },
  horn: { id: "horn", name: "War Horn", hint: "Battle Cry hits every zone." },
  lens: { id: "lens", name: "Scout's Lens", hint: "Threats start revealed." },
  whet: { id: "whet", name: "Whetstone", hint: "Vanguard cuts deeper." },
  drum: { id: "drum", name: "March Drum", hint: "Momentum recovers faster." },
  salve: { id: "salve", name: "Bitter Salve", hint: "Oren's medicine heals more." },
};

export const TERRAIN_TINT: Record<
  TerrainId,
  { ground: string; grass: string; road: string; shadow: string; fog: string }
> = {
  plains: {
    ground: "#6a5a32",
    grass: "#7a8a3a",
    road: "#8a7048",
    shadow: "#3a3018",
    fog: "rgba(200,170,90,0.12)",
  },
  forest: {
    ground: "#2a3a24",
    grass: "#1e3a22",
    road: "#5a4a32",
    shadow: "#0e1810",
    fog: "rgba(40,70,40,0.22)",
  },
  wetlands: {
    ground: "#2a3a32",
    grass: "#3a5a48",
    road: "#4a4a38",
    shadow: "#101818",
    fog: "rgba(60,90,80,0.28)",
  },
  mountains: {
    ground: "#4a463e",
    grass: "#3a4234",
    road: "#6a5e4e",
    shadow: "#1a1814",
    fog: "rgba(80,80,90,0.24)",
  },
  city: {
    ground: "#4a4238",
    grass: "#3a4a32",
    road: "#6a5a48",
    shadow: "#1a1612",
    fog: "rgba(40,30,20,0.18)",
  },
};

export const MATCHUP: Record<ThreatKind, Record<FormationId, { deal: number; take: number }>> = {
  ambush: {
    column: { deal: 0.55, take: 1.45 },
    wedge: { deal: 0.7, take: 1.2 },
    circle: { deal: 1.35, take: 0.55 },
    skirmish: { deal: 0.95, take: 0.95 },
  },
  blockade: {
    column: { deal: 0.5, take: 1.3 },
    wedge: { deal: 1.45, take: 0.65 },
    circle: { deal: 0.8, take: 1.0 },
    skirmish: { deal: 0.4, take: 1.25 },
  },
  cavalry: {
    column: { deal: 0.45, take: 1.55 },
    wedge: { deal: 0.95, take: 1.05 },
    circle: { deal: 1.4, take: 0.5 },
    skirmish: { deal: 0.3, take: 1.65 },
  },
  swarm: {
    column: { deal: 0.8, take: 1.1 },
    wedge: { deal: 0.55, take: 1.3 },
    circle: { deal: 0.5, take: 1.4 },
    skirmish: { deal: 1.45, take: 0.55 },
  },
  archers: {
    column: { deal: 0.7, take: 1.2 },
    wedge: { deal: 0.6, take: 1.3 },
    circle: { deal: 1.25, take: 0.65 },
    skirmish: { deal: 1.1, take: 0.85 },
  },
  rockslide: {
    column: { deal: 0.4, take: 1.5 },
    wedge: { deal: 0.5, take: 1.35 },
    circle: { deal: 1.2, take: 0.7 },
    skirmish: { deal: 0.9, take: 1.0 },
  },
  pursuit: {
    column: { deal: 0.7, take: 1.15 },
    wedge: { deal: 0.5, take: 1.4 },
    circle: { deal: 1.15, take: 0.7 },
    skirmish: { deal: 0.6, take: 1.3 },
  },
};

export const THREAT_LABEL: Record<ThreatKind, string> = {
  ambush: "Ambush",
  blockade: "Blockade",
  cavalry: "Cavalry charge",
  swarm: "Scarab swarm",
  archers: "Archer nest",
  rockslide: "Rockslide",
  pursuit: "Pursuit",
};

export const SLOT_LABEL: Record<SlotId, string> = {
  vanguard: "Vanguard",
  left: "Left flank",
  right: "Right flank",
  rear: "Rearguard",
  command: "Command",
};

export const ABILITY_CD: Record<AbilityId, number> = {
  battleCry: 14,
  eagleEye: 16,
  fieldMedicine: 18,
  rapidFort: 20,
  parley: 22,
  holdLine: 16,
};

export function preferredMicro(threat: ThreatKind): MicroId {
  if (threat === "blockade" || threat === "cavalry") return "ballista";
  if (threat === "ambush" || threat === "archers") return "spot";
  if (threat === "pursuit" || threat === "rockslide") return "brace";
  return "interrogate";
}

export const HOW_TO = [
  {
    title: "Read the road",
    body: "The column marches itself. You command it. Terrain and dust-clouds tell you what is coming. Commit to a formation before the clash, not during it.",
  },
  {
    title: "Formation is the weapon",
    body: "Column covers ground. Wedge breaks a blockade. Shield wall holds an ambush. Skirmish line finds what hides in trees. Switching costs momentum — getting caught mid-switch is how columns die.",
  },
  {
    title: "Officers are people",
    body: "Drag them between vanguard, flanks, rearguard, and command. A warrior in front breaks charges. A scout on a flank reveals ambushes. Lose one and they are gone for the run.",
  },
  {
    title: "Pace is a bet",
    body: "Rush to outrun a closing net, and stamina burns. Halt to recover, and the road may find you. March is the honest middle.",
  },
  {
    title: "Five ways to fail",
    body: "The warlord falls. Morale collapses and officers desert. Supplies run out and the march starves. Warriors are spent and you cannot hold a shape. Integrity shatters mid-switch. Any one ends the run.",
  },
];
