import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, c as Heart, i as Swords, l as Eye, n as Volume2, o as Play, s as Pause, t as VolumeX } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-MRlrRTmj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OFFICERS = {
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
		preferred: "vanguard"
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
		preferred: "left"
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
		preferred: "command"
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
		preferred: "command"
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
		preferred: "command"
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
		preferred: "rear"
	}
};
var STARTING_OFFICERS = [
	"kael",
	"sera",
	"oren",
	"lys"
];
var SECTORS = [
	{
		id: 0,
		name: "The Amber Road",
		terrain: "plains",
		epithet: "Open grass. Cavalry country.",
		threat: "Bandit riders"
	},
	{
		id: 1,
		name: "The Green Veil",
		terrain: "forest",
		epithet: "Canopy, roots, and things that wait.",
		threat: "Amber scarabs"
	},
	{
		id: 2,
		name: "The Sinking March",
		terrain: "wetlands",
		epithet: "Water that does not forgive.",
		threat: "Fever and cult-fires"
	},
	{
		id: 3,
		name: "The Spine",
		terrain: "mountains",
		epithet: "A pass that remembers every army.",
		threat: "The usurper's gate"
	}
];
var RELICS = {
	pennant: {
		id: "pennant",
		name: "Iron Pennant",
		hint: "Column speed and integrity up."
	},
	brooch: {
		id: "brooch",
		name: "Scarab Brooch",
		hint: "Hits poison. Swarms fear you."
	},
	river: {
		id: "river",
		name: "River Stone",
		hint: "Wetlands no longer rot supplies."
	},
	colors: {
		id: "colors",
		name: "False Colors",
		hint: "Parley and events lean your way."
	},
	ration: {
		id: "ration",
		name: "Last Ration",
		hint: "Supplies drain slower on the march."
	},
	horn: {
		id: "horn",
		name: "War Horn",
		hint: "Battle Cry hits every zone."
	},
	lens: {
		id: "lens",
		name: "Scout's Lens",
		hint: "Threats start revealed."
	},
	whet: {
		id: "whet",
		name: "Whetstone",
		hint: "Vanguard cuts deeper."
	},
	drum: {
		id: "drum",
		name: "March Drum",
		hint: "Momentum recovers faster."
	},
	salve: {
		id: "salve",
		name: "Bitter Salve",
		hint: "Oren's medicine heals more."
	}
};
var TERRAIN_TINT = {
	plains: {
		ground: "#6a5a32",
		grass: "#7a8a3a",
		road: "#8a7048",
		shadow: "#3a3018",
		fog: "rgba(200,170,90,0.12)"
	},
	forest: {
		ground: "#2a3a24",
		grass: "#1e3a22",
		road: "#5a4a32",
		shadow: "#0e1810",
		fog: "rgba(40,70,40,0.22)"
	},
	wetlands: {
		ground: "#2a3a32",
		grass: "#3a5a48",
		road: "#4a4a38",
		shadow: "#101818",
		fog: "rgba(60,90,80,0.28)"
	},
	mountains: {
		ground: "#4a463e",
		grass: "#3a4234",
		road: "#6a5e4e",
		shadow: "#1a1814",
		fog: "rgba(80,80,90,0.24)"
	},
	city: {
		ground: "#4a4238",
		grass: "#3a4a32",
		road: "#6a5a48",
		shadow: "#1a1612",
		fog: "rgba(40,30,20,0.18)"
	}
};
var MATCHUP = {
	ambush: {
		column: {
			deal: .55,
			take: 1.45
		},
		wedge: {
			deal: .7,
			take: 1.2
		},
		circle: {
			deal: 1.35,
			take: .55
		},
		skirmish: {
			deal: .95,
			take: .95
		}
	},
	blockade: {
		column: {
			deal: .5,
			take: 1.3
		},
		wedge: {
			deal: 1.45,
			take: .65
		},
		circle: {
			deal: .8,
			take: 1
		},
		skirmish: {
			deal: .4,
			take: 1.25
		}
	},
	cavalry: {
		column: {
			deal: .45,
			take: 1.55
		},
		wedge: {
			deal: .95,
			take: 1.05
		},
		circle: {
			deal: 1.4,
			take: .5
		},
		skirmish: {
			deal: .3,
			take: 1.65
		}
	},
	swarm: {
		column: {
			deal: .8,
			take: 1.1
		},
		wedge: {
			deal: .55,
			take: 1.3
		},
		circle: {
			deal: .5,
			take: 1.4
		},
		skirmish: {
			deal: 1.45,
			take: .55
		}
	},
	archers: {
		column: {
			deal: .7,
			take: 1.2
		},
		wedge: {
			deal: .6,
			take: 1.3
		},
		circle: {
			deal: 1.25,
			take: .65
		},
		skirmish: {
			deal: 1.1,
			take: .85
		}
	},
	rockslide: {
		column: {
			deal: .4,
			take: 1.5
		},
		wedge: {
			deal: .5,
			take: 1.35
		},
		circle: {
			deal: 1.2,
			take: .7
		},
		skirmish: {
			deal: .9,
			take: 1
		}
	},
	pursuit: {
		column: {
			deal: .7,
			take: 1.15
		},
		wedge: {
			deal: .5,
			take: 1.4
		},
		circle: {
			deal: 1.15,
			take: .7
		},
		skirmish: {
			deal: .6,
			take: 1.3
		}
	}
};
var THREAT_LABEL = {
	ambush: "Ambush",
	blockade: "Blockade",
	cavalry: "Cavalry charge",
	swarm: "Scarab swarm",
	archers: "Archer nest",
	rockslide: "Rockslide",
	pursuit: "Pursuit"
};
var SLOT_LABEL = {
	vanguard: "Vanguard",
	left: "Left flank",
	right: "Right flank",
	rear: "Rearguard",
	command: "Command"
};
var ABILITY_CD = {
	battleCry: 14,
	eagleEye: 16,
	fieldMedicine: 18,
	rapidFort: 20,
	parley: 22,
	holdLine: 16
};
function preferredMicro(threat) {
	if (threat === "blockade" || threat === "cavalry") return "ballista";
	if (threat === "ambush" || threat === "archers") return "spot";
	if (threat === "pursuit" || threat === "rockslide") return "brace";
	return "interrogate";
}
var HOW_TO = [
	{
		title: "Read the road",
		body: "The column marches itself. You command it. Terrain and dust-clouds tell you what is coming. Commit to a formation before the clash, not during it."
	},
	{
		title: "Formation is the weapon",
		body: "Column covers ground. Wedge breaks a blockade. Shield wall holds an ambush. Skirmish line finds what hides in trees. Switching costs momentum — getting caught mid-switch is how columns die."
	},
	{
		title: "Officers are people",
		body: "Drag them between vanguard, flanks, rearguard, and command. A warrior in front breaks charges. A scout on a flank reveals ambushes. Lose one and they are gone for the run."
	},
	{
		title: "Pace is a bet",
		body: "Rush to outrun a closing net, and stamina burns. Halt to recover, and the road may find you. March is the honest middle."
	},
	{
		title: "Five ways to fail",
		body: "The warlord falls. Morale collapses and officers desert. Supplies run out and the march starves. Warriors are spent and you cannot hold a shape. Integrity shatters mid-switch. Any one ends the run."
	}
];
/** Procedural mixer. Unlock on first gesture. */
var ctx = null;
var master = null;
var sfx = null;
var music = null;
var muted = false;
var marching = null;
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const C = window.AudioContext || window.webkitAudioContext;
		if (!C) return null;
		ctx = new C({ latencyHint: "interactive" });
		master = ctx.createGain();
		sfx = ctx.createGain();
		music = ctx.createGain();
		sfx.gain.value = .55;
		music.gain.value = .18;
		master.gain.value = muted ? 0 : .7;
		sfx.connect(master);
		music.connect(master);
		master.connect(ctx.destination);
	}
	return ctx;
}
function unlockAudio() {
	const c = ac();
	if (!c) return;
	if (c.state === "suspended") c.resume();
}
function setMuted(v) {
	muted = v;
	if (master && ctx) master.gain.setTargetAtTime(v ? 0 : .7, ctx.currentTime, .03);
	if (v) stopMarch();
}
function envGain(duration, peak = .2, attack = .01) {
	const c = ac();
	if (!c || !sfx) return null;
	const g = c.createGain();
	g.gain.setValueAtTime(0, c.currentTime);
	g.gain.linearRampToValueAtTime(peak, c.currentTime + attack);
	g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + duration);
	g.connect(sfx);
	return g;
}
function noiseBuffer(seconds) {
	const c = ac();
	if (!c) return null;
	const n = Math.floor(c.sampleRate * seconds);
	const buf = c.createBuffer(1, n, c.sampleRate);
	const d = buf.getChannelData(0);
	for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
	return buf;
}
function blip(freq, dur = .08, type = "square", peak = .08) {
	const c = ac();
	const g = envGain(dur, peak);
	if (!c || !g) return;
	const o = c.createOscillator();
	o.type = type;
	o.frequency.setValueAtTime(freq, c.currentTime);
	o.connect(g);
	o.start();
	o.stop(c.currentTime + dur);
}
function thud() {
	const c = ac();
	const g = envGain(.22, .22, .005);
	if (!c || !g) return;
	const o = c.createOscillator();
	o.type = "sine";
	o.frequency.setValueAtTime(90, c.currentTime);
	o.frequency.exponentialRampToValueAtTime(40, c.currentTime + .18);
	o.connect(g);
	o.start();
	o.stop(c.currentTime + .22);
	const buf = noiseBuffer(.12);
	if (!buf) return;
	const src = c.createBufferSource();
	src.buffer = buf;
	const ng = envGain(.1, .08, .002);
	if (!ng) return;
	const f = c.createBiquadFilter();
	f.type = "lowpass";
	f.frequency.value = 400;
	src.connect(f);
	f.connect(ng);
	src.start();
}
function clash() {
	thud();
	const c = ac();
	const g = envGain(.15, .1, .001);
	if (!c || !g) return;
	const buf = noiseBuffer(.12);
	if (!buf) return;
	const src = c.createBufferSource();
	src.buffer = buf;
	const f = c.createBiquadFilter();
	f.type = "highpass";
	f.frequency.value = 1800;
	src.connect(f);
	f.connect(g);
	src.playbackRate.value = .9 + Math.random() * .3;
	src.start();
}
function uiTick() {
	blip(520 + Math.random() * 40, .05, "triangle", .05);
}
function uiOk() {
	blip(440, .07, "triangle", .06);
	setTimeout(() => blip(660, .09, "triangle", .05), 70);
}
function uiBad() {
	blip(180, .16, "sawtooth", .07);
}
function horn() {
	const c = ac();
	const g = envGain(.55, .12, .04);
	if (!c || !g) return;
	const o = c.createOscillator();
	o.type = "sawtooth";
	o.frequency.setValueAtTime(220, c.currentTime);
	o.frequency.linearRampToValueAtTime(280, c.currentTime + .2);
	const f = c.createBiquadFilter();
	f.type = "lowpass";
	f.frequency.value = 700;
	o.connect(f);
	f.connect(g);
	o.start();
	o.stop(c.currentTime + .55);
}
function startMarch(rate = 1) {
	if (muted) return;
	const c = ac();
	if (!c || !music) return;
	stopMarch();
	const o = c.createOscillator();
	o.type = "sine";
	o.frequency.value = 62;
	const g = c.createGain();
	g.gain.value = .04;
	const lfo = c.createOscillator();
	lfo.frequency.value = 1.6 * rate;
	const lg = c.createGain();
	lg.gain.value = .03;
	lfo.connect(lg);
	lg.connect(g.gain);
	o.connect(g);
	g.connect(music);
	o.start();
	lfo.start();
	marching = {
		osc: o,
		gain: g,
		lfo
	};
}
function setMarchRate(rate) {
	if (marching && ctx) marching.lfo.frequency.setTargetAtTime(1.6 * rate, ctx.currentTime, .08);
}
function stopMarch() {
	if (!marching) return;
	try {
		marching.osc.stop();
		marching.lfo.stop();
	} catch {}
	marching = null;
}
if (typeof window !== "undefined") document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") {
		const c = ac();
		if (c?.state === "suspended") c.resume();
	}
});
/** Mulberry32 — tiny seeded PRNG. */
function mulberry32(seed) {
	let a = seed >>> 0;
	return function rand() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pick(rng, arr) {
	return arr[Math.floor(rng() * arr.length)];
}
function shuffle(rng, arr) {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function createColumnSim(run, node) {
	const terrain = SECTORS[node.sector]?.terrain ?? "plains";
	const rng = mulberry32(run.seed ^ hash$1(node.id));
	const path = buildPath(rng, terrain, node.kind === "boss" ? 1.15 : 1);
	const sim = {
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
		cam: {
			x: path[8].x,
			y: path[8].y
		},
		heading: 0,
		speed: 0,
		kills: 0,
		warriorsLost: 0,
		climaxArmed: !!node.micro,
		climaxFired: false,
		microId: node.micro,
		nodeTitle: node.title,
		reduced: false,
		shakeOn: true
	};
	if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) sim.reduced = true;
	spawnUnits(sim);
	seedThreats(sim, rng, node);
	return sim;
}
function hash$1(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function buildPath(rng, terrain, scale) {
	const n = Math.floor(280 * scale);
	const out = [];
	let x = 0;
	let y = 0;
	let heading = -Math.PI / 2;
	for (let i = 0; i < n; i++) {
		const bend = terrain === "mountains" ? .085 : terrain === "forest" ? .07 : terrain === "wetlands" ? .05 : .04;
		heading += (rng() - .5) * bend;
		heading += Math.sin(i * .03) * .01;
		const step = 28;
		x += Math.cos(heading) * step;
		y += Math.sin(heading) * step;
		const tx = Math.cos(heading);
		const ty = Math.sin(heading);
		const nx = -ty;
		const ny = tx;
		let width = terrain === "mountains" ? 70 : terrain === "forest" ? 90 : 110;
		let feature = "open";
		const r = rng();
		if (r < .08) {
			feature = "choke";
			width *= .55;
		} else if (r < .2) feature = "cover";
		else if (r < .26) {
			feature = "hazard";
			width *= .75;
		}
		out.push({
			x,
			y,
			tx,
			ty,
			nx,
			ny,
			width,
			feature
		});
	}
	return out;
}
function spawnUnits(sim) {
	let id = 1;
	const add = (slot, officerId) => {
		sim.units.push({
			id: id++,
			slot,
			officerId,
			x: 0,
			y: 0,
			hp: officerId ? 24 : 8,
			flash: 0
		});
	};
	for (const o of sim.officers) if (o.alive) add(o.slot, o.id);
	add("command", "warlord");
	const extras = Math.max(6, sim.warriors);
	const cycle = [
		"vanguard",
		"left",
		"right",
		"rear",
		"command"
	];
	for (let i = 0; i < extras; i++) add(cycle[i % cycle.length], null);
	placeUnits(sim, true);
}
function seedThreats(sim, rng, node) {
	const kind = node.threat ?? "ambush";
	const count = node.kind === "boss" ? 5 : 3 + (rng() > .5 ? 1 : 0);
	const start = 40;
	const span = sim.path.length - 70;
	for (let i = 0; i < count; i++) {
		const idx = Math.floor(start + (i + .4) / count * span + (rng() - .5) * 12);
		const p = sim.path[Math.max(0, Math.min(sim.path.length - 1, idx))];
		const side = rng() > .5 ? 1 : -1;
		const dist = p.width * .5 + 40 + rng() * 50;
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
			named: i === 0 && !!node.micro
		});
	}
	if (kind === "pursuit") {
		const p = sim.path[10];
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
			named: false
		});
	}
}
function samplePath(path, s) {
	const i = Math.max(0, Math.min(path.length - 1.001, s));
	const a = path[Math.floor(i)];
	const b = path[Math.min(path.length - 1, Math.floor(i) + 1)];
	const t = i - Math.floor(i);
	return {
		x: a.x + (b.x - a.x) * t,
		y: a.y + (b.y - a.y) * t,
		tx: a.tx + (b.tx - a.tx) * t,
		ty: a.ty + (b.ty - a.ty) * t,
		nx: a.nx + (b.nx - a.nx) * t,
		ny: a.ny + (b.ny - a.ny) * t,
		width: a.width + (b.width - a.width) * t,
		feature: t < .5 ? a.feature : b.feature
	};
}
function slotOffset(form, slot, index, of) {
	const spread = form === "skirmish" ? 1.35 : form === "column" ? .55 : form === "wedge" ? .9 : .8;
	const depth = form === "column" ? 1.25 : form === "circle" ? .7 : 1;
	const along = {
		vanguard: 42 * depth,
		command: 4,
		left: form === "wedge" ? 6 : -6,
		right: form === "wedge" ? 6 : -6,
		rear: -44 * depth
	};
	const side = {
		vanguard: 0,
		command: 0,
		left: -38 * spread,
		right: 38 * spread,
		rear: 0
	};
	const jitter = (index - (of - 1) / 2) * (form === "skirmish" ? 16 : 10);
	let ox = side[slot] + (slot === "left" || slot === "right" ? 0 : jitter * .4);
	let oy = along[slot] + (slot === "vanguard" || slot === "rear" || slot === "command" ? jitter * .35 : jitter * .2);
	if (form === "circle") {
		const ang = {
			vanguard: -Math.PI / 2,
			right: 0,
			rear: Math.PI / 2,
			left: Math.PI,
			command: 0
		}[slot];
		const rad = slot === "command" ? 0 : 36;
		ox = Math.cos(ang) * rad + jitter * .15;
		oy = Math.sin(ang) * rad + (slot === "command" ? 0 : 0);
	}
	if (form === "wedge" && slot === "vanguard") {
		oy += 10;
		ox *= .3;
	}
	return {
		x: ox,
		y: oy
	};
}
function placeUnits(sim, snap) {
	const p = samplePath(sim.path, sim.s);
	const form = sim.formation;
	const counts = {
		vanguard: 0,
		left: 0,
		right: 0,
		rear: 0,
		command: 0
	};
	const totals = {
		vanguard: 0,
		left: 0,
		right: 0,
		rear: 0,
		command: 0
	};
	for (const u of sim.units) totals[u.slot]++;
	for (const u of sim.units) {
		const idx = counts[u.slot]++;
		const off = slotOffset(form, u.slot, idx, totals[u.slot]);
		const lat = sim.lateral * p.width * .28;
		const wx = p.x + p.tx * off.y + p.nx * (off.x + lat);
		const wy = p.y + p.ty * off.y + p.ny * (off.x + lat);
		if (snap) {
			u.x = wx;
			u.y = wy;
		} else {
			u.x += (wx - u.x) * .12;
			u.y += (wy - u.y) * .12;
		}
	}
}
function setFormation(sim, id) {
	if (sim.target === id && sim.formation === id) return;
	if (sim.fortT > 0 && id === "circle") {
		sim.formation = "circle";
		sim.target = "circle";
		sim.switchT = 1;
		sim.integrity = Math.min(1, sim.integrity + .2);
		toast(sim, "Fortified.");
		return;
	}
	sim.target = id;
	sim.switchT = 0;
	const cost = sim.relics.includes("drum") ? 14 : 22;
	sim.momentum = Math.max(0, sim.momentum - cost);
	sim.integrity = Math.max(.15, sim.integrity - .45);
	toast(sim, FORM_NAME[id]);
}
var FORM_NAME = {
	column: "Column",
	wedge: "Wedge",
	circle: "Shield wall",
	skirmish: "Skirmish line"
};
function setPace(sim, p) {
	if (sim.pace === p) return;
	sim.pace = p;
	toast(sim, p === "rush" ? "Rush" : p === "halt" ? "Halt" : "March");
}
function selectOfficer(sim, id) {
	sim.selectedOfficer = id;
}
function assignOfficer(sim, slot) {
	const id = sim.selectedOfficer;
	if (!id) return;
	const o = sim.officers.find((x) => x.id === id && x.alive);
	if (!o) return;
	o.slot = slot;
	for (const u of sim.units) if (u.officerId === id) u.slot = slot;
	toast(sim, `${OFFICERS[id]?.name ?? id} → ${slot}`);
}
function fireAbility(sim, id) {
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
			addTrauma(sim, .35);
			break;
		case "eagleEye":
			sim.reveal = Math.max(sim.reveal, 1);
			for (const e of sim.enemies) e.hidden = false;
			toast(sim, "The verge is clear.");
			break;
		case "fieldMedicine": {
			const extra = sim.relics.includes("salve") ? 10 : 0;
			sim.stamina = Math.min(100, sim.stamina + 22 + extra);
			sim.warlordHp = Math.min(sim.warlordMax, sim.warlordHp + 5 + extra * .3);
			toast(sim, "Field medicine.");
			break;
		}
		case "rapidFort":
			sim.fortT = .4;
			setFormation(sim, "circle");
			sim.momentum = Math.min(100, sim.momentum + 18);
			toast(sim, "Rapid fortification.");
			break;
		case "parley": {
			const alive = sim.enemies.filter((e) => e.alive);
			const chance = .4 + (sim.relics.includes("colors") ? .2 : 0) + (o.slot === "command" ? .1 : 0);
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
	}
}
function toast(sim, s) {
	sim.toast = s;
	sim.toastT = 1.8;
}
function addTrauma(sim, v) {
	if (!sim.shakeOn || sim.reduced) return;
	sim.trauma = Math.min(1, sim.trauma + v);
}
function emit(sim, x, y, color, n = 8) {
	for (let i = 0; i < n; i++) {
		const a = Math.random() * Math.PI * 2;
		const sp = 20 + Math.random() * 70;
		sim.particles.push({
			x,
			y,
			vx: Math.cos(a) * sp,
			vy: Math.sin(a) * sp,
			life: .35 + Math.random() * .4,
			max: .7,
			color,
			size: 1.5 + Math.random() * 2.5
		});
	}
}
function float(sim, x, y, text, color) {
	sim.floaters.push({
		x,
		y,
		text,
		life: .9,
		color
	});
}
function step(sim, dt) {
	if (sim.done) return;
	if (sim.hitstop > 0) {
		sim.hitstop -= dt;
		tickFx(sim, dt);
		return;
	}
	sim.t += dt;
	const p = samplePath(sim.path, sim.s);
	sim.heading = Math.atan2(p.ty, p.tx);
	if (sim.switchT < 1) {
		const rate = .35 + sim.momentum / 220;
		sim.switchT = Math.min(1, sim.switchT + dt * rate);
		if (sim.switchT >= 1) sim.formation = sim.target;
	} else if (sim.formation !== sim.target) sim.formation = sim.target;
	const switching = sim.switchT < 1;
	sim.integrity += ((switching ? .25 : 1) - sim.integrity) * (1 - Math.exp(-2.2 * dt));
	const momRec = sim.relics.includes("drum") ? 10 : 6;
	if (!switching) sim.momentum = Math.min(100, sim.momentum + momRec * dt);
	const base = sim.relics.includes("pennant") && sim.formation === "column" ? 26 : 22;
	const formMul = sim.formation === "column" ? 1.15 : sim.formation === "skirmish" ? 1 : sim.formation === "wedge" ? .92 : .62;
	const paceMul = sim.pace === "rush" ? 1.7 : sim.pace === "halt" ? 0 : 1;
	const choke = p.feature === "choke" && sim.formation !== "column" ? .7 : 1;
	sim.speed = base * formMul * paceMul * choke * (.7 + sim.integrity * .3);
	sim.s += sim.speed * dt / 28;
	const drain = sim.relics.includes("ration") ? .55 : 1;
	if (sim.pace === "rush") sim.stamina = Math.max(0, sim.stamina - 7.5 * dt);
	else if (sim.pace === "halt") sim.stamina = Math.min(100, sim.stamina + 5 * dt);
	else sim.stamina = Math.max(0, sim.stamina - 1.1 * dt);
	sim.supplies = Math.max(0, sim.supplies - .55 * drain * dt);
	if (sim.supplies <= 0) {
		sim.stamina = Math.max(0, sim.stamina - 4 * dt);
		sim.morale = Math.max(0, sim.morale - 1.5 * dt);
	}
	if (sim.stamina <= .1 && sim.pace !== "halt") {
		sim.pace = "halt";
		toast(sim, "The column staggers. Halt.");
	}
	if (sim.terrain === "wetlands" && !sim.relics.includes("river")) sim.supplies = Math.max(0, sim.supplies - .25 * dt);
	sim.cryT = Math.max(0, sim.cryT - dt);
	sim.holdT = Math.max(0, sim.holdT - dt);
	sim.fortT = Math.max(0, sim.fortT - dt);
	sim.reveal = Math.max(0, sim.reveal - dt * .08);
	for (const o of sim.officers) if (o.alive) o.cooldown = Math.max(0, o.cooldown - dt);
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
	if (sim.s >= sim.path.length - 6) finish$1(sim, true, "The mile is done.");
	else checkFail(sim);
}
function centroidOf(sim) {
	let x = 0, y = 0, n = 0;
	for (const u of sim.units) {
		x += u.x;
		y += u.y;
		n++;
	}
	if (!n) {
		const p = samplePath(sim.path, sim.s);
		return {
			x: p.x,
			y: p.y
		};
	}
	return {
		x: x / n,
		y: y / n
	};
}
function updateEnemies(sim, dt) {
	const p = samplePath(sim.path, sim.s);
	const scoutFlank = sim.officers.some((o) => o.alive && o.id === "sera" && (o.slot === "left" || o.slot === "right")) || sim.reveal > 0;
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
				addTrauma(sim, .25);
			} else continue;
		}
		const speed = e.kind === "cavalry" ? 78 : e.kind === "swarm" ? 70 : e.kind === "pursuit" ? 64 : 48;
		if (dist > 28) {
			e.x += dx / dist * speed * dt;
			e.y += dy / dist * speed * dt;
		}
		let hitU = null;
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
function resolveHit(sim, e, u, dt) {
	const form = sim.formation;
	const m = MATCHUP[e.kind][form];
	let deal = m.deal;
	let take = m.take;
	if (sim.switchT < 1) take *= 1.45;
	if (sim.cryT > 0 && (u.slot === "vanguard" || sim.relics.includes("horn"))) deal *= 1.55;
	if (sim.holdT > 0 && u.slot === "rear") take *= .55;
	if (sim.relics.includes("whet") && u.slot === "vanguard") deal *= 1.2;
	if (sim.relics.includes("brooch") && e.kind === "swarm") deal *= 1.35;
	if (sim.relics.includes("pennant")) take *= .92;
	const warrior = sim.officers.find((o) => o.id === "kael" && o.alive);
	if (warrior && warrior.slot === "vanguard" && (e.kind === "cavalry" || e.kind === "blockade")) deal *= 1.25;
	const paceTake = sim.pace === "rush" ? 1.2 : sim.pace === "halt" ? .9 : 1;
	take *= paceTake * (1.35 - sim.integrity * .35);
	const dmgOut = 14 * deal * dt;
	const dmgIn = 9 * take * dt;
	e.hp -= dmgOut;
	e.flash = 1;
	if (u.officerId === "warlord") sim.warlordHp -= dmgIn * .35;
	else if (u.officerId) {
		const o = sim.officers.find((x) => x.id === u.officerId);
		if (o) {
			o.hp -= dmgIn * .8;
			if (o.hp <= 0) {
				o.alive = false;
				o.hp = 0;
				u.officerId = null;
				toast(sim, `${OFFICERS[o.id]?.name ?? "An officer"} is down.`);
				sim.morale = Math.max(0, sim.morale - 18);
				addTrauma(sim, .7);
				sim.hitstop = .12;
				emit(sim, u.x, u.y, "#c45c3e", 18);
			}
		}
	} else {
		sim.warriors -= dmgIn * .35;
		if (sim.warriors < 0) sim.warriors = 0;
	}
	u.flash = 1;
	if (Math.random() < dt * 8) {
		clash();
		emit(sim, (e.x + u.x) / 2, (e.y + u.y) / 2, "#e8e0d4", 5);
		addTrauma(sim, .08);
	}
	if (e.hp <= 0) {
		e.alive = false;
		sim.kills++;
		sim.hitstop = .06;
		addTrauma(sim, .4);
		thud();
		emit(sim, e.x, e.y, e.kind === "swarm" ? "#c4a35a" : "#6a4030", 16);
		float(sim, e.x, e.y, e.named ? "Leader down" : "Cut down", "#e8e0d4");
		sim.morale = Math.min(100, sim.morale + 2);
		if (e.named && sim.climaxArmed && !sim.climaxFired) {
			sim.climaxFired = true;
			finish$1(sim, true, "The leader is in the open.");
			return;
		}
	}
	if (e.named && e.hp < e.maxHp * .45 && sim.climaxArmed && !sim.climaxFired) {
		sim.climaxFired = true;
		finish$1(sim, true, "The leader is in the open.");
	}
}
function tickFx(sim, dt) {
	sim.trauma = Math.max(0, sim.trauma - dt * 1.6);
	for (const u of sim.units) u.flash = Math.max(0, u.flash - dt * 5);
	sim.particles = sim.particles.filter((p) => {
		p.life -= dt;
		p.x += p.vx * dt;
		p.y += p.vy * dt;
		p.vx *= .96;
		p.vy *= .96;
		return p.life > 0;
	});
	sim.floaters = sim.floaters.filter((f) => {
		f.life -= dt;
		f.y -= 18 * dt;
		return f.life > 0;
	});
	if (sim.particles.length > 220) sim.particles.splice(0, sim.particles.length - 220);
}
function nearestHint(sim) {
	const p = samplePath(sim.path, sim.s);
	let best = 9999;
	let e = null;
	for (const x of sim.enemies) {
		if (!x.alive) continue;
		const d = Math.hypot(x.x - p.x, x.y - p.y);
		if (d < best) {
			best = d;
			e = x;
		}
	}
	if (!e || best > 260) {
		sim.threatHint = p.feature === "choke" ? "Narrow. Column." : p.feature === "cover" ? "Cover on the verge. Ambush ground." : p.feature === "hazard" ? "Bad ground. Watch the flanks." : "Road is open.";
		return;
	}
	if (e.hidden) {
		sim.threatHint = "The verge is wrong.";
		return;
	}
	const rec = e.kind === "cavalry" || e.kind === "ambush" ? "Shield wall" : e.kind === "blockade" ? "Wedge" : e.kind === "swarm" ? "Skirmish" : e.kind === "pursuit" ? "Rearguard" : "Close and cut";
	sim.threatHint = `${THREAT_LABEL[e.kind]} · ${rec}`;
}
function checkFail(sim) {
	if (sim.warlordHp <= 0) finish$1(sim, false, "The warlord falls. The column is a mob.");
	else if (sim.morale <= 0) finish$1(sim, false, "Morale breaks. Officers desert in the dark.");
	else if (sim.warriors <= 0) finish$1(sim, false, "No warriors left to hold a shape.");
	else if (sim.integrity < .08 && sim.switchT < .5 && sim.enemies.some((e) => e.alive && !e.hidden)) {
		const p = samplePath(sim.path, sim.s);
		if (sim.enemies.some((e) => e.alive && Math.hypot(e.x - p.x, e.y - p.y) < 50) && sim.momentum < 8) finish$1(sim, false, "Caught mid-switch. The formation shatters.");
	}
}
function finish$1(sim, won, reason) {
	if (sim.done) return;
	sim.done = true;
	const deaths = sim.officers.filter((o) => !o.alive).map((o) => o.id);
	sim.result = {
		won,
		reason,
		warriorsLost: Math.max(0, Math.round(sim.warriorsLost || 0)),
		suppliesSpent: 0,
		moraleDelta: won ? 4 : -10,
		staminaLeft: sim.stamina,
		officerDeaths: deaths,
		climax: sim.climaxFired,
		micro: sim.climaxFired ? sim.microId : void 0,
		kills: sim.kills
	};
}
function snapshot(sim) {
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
		heading: sim.heading
	};
}
function applyLateral(sim, x, dt) {
	sim.lateral = Math.max(-1, Math.min(1, sim.lateral + x * dt * 1.8));
	if (x === 0) sim.lateral += (0 - sim.lateral) * (1 - Math.exp(-1.2 * dt));
}
var empty = () => ({
	moveX: 0,
	rush: false,
	halt: false,
	pause: false,
	form1: false,
	form2: false,
	form3: false,
	form4: false,
	ability: false,
	slotV: false,
	slotL: false,
	slotR: false,
	slotRear: false,
	slotC: false,
	confirm: false
});
var Input = class {
	keys = /* @__PURE__ */ new Set();
	injected = /* @__PURE__ */ new Set();
	prev = empty();
	cur = empty();
	just = empty();
	pointer = {
		x: 0,
		y: 0,
		down: false,
		clicked: false,
		id: -1
	};
	clickLatch = false;
	touchMove = 0;
	touchRush = false;
	touchHalt = false;
	attach(el) {
		const down = (e) => {
			this.keys.add(e.code);
			if (GAME.has(e.code)) e.preventDefault();
		};
		const up = (e) => this.keys.delete(e.code);
		const clear = () => this.keys.clear();
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		window.addEventListener("blur", clear);
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) clear();
		});
		const pd = (e) => {
			if (e.button !== 0 && e.pointerType === "mouse") return;
			this.pointer.down = true;
			this.pointer.id = e.pointerId;
			this.syncPointer(e, el);
			this.clickLatch = true;
		};
		const pm = (e) => {
			if (this.pointer.down && e.pointerId !== this.pointer.id) return;
			this.syncPointer(e, el);
		};
		const pu = (e) => {
			if (e.pointerId !== this.pointer.id && this.pointer.id !== -1) return;
			this.syncPointer(e, el);
			this.pointer.down = false;
			this.pointer.id = -1;
		};
		el.addEventListener("pointerdown", pd);
		el.addEventListener("pointermove", pm);
		el.addEventListener("pointerup", pu);
		el.addEventListener("pointercancel", pu);
		el.addEventListener("contextmenu", (e) => e.preventDefault());
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
			window.removeEventListener("blur", clear);
			el.removeEventListener("pointerdown", pd);
			el.removeEventListener("pointermove", pm);
			el.removeEventListener("pointerup", pu);
			el.removeEventListener("pointercancel", pu);
		};
	}
	syncPointer(e, el) {
		const r = el.getBoundingClientRect();
		this.pointer.x = (e.clientX - r.left) / r.width * el.clientWidth;
		this.pointer.y = (e.clientY - r.top) / r.height * el.clientHeight;
	}
	setKeys(codes) {
		this.injected = new Set(codes);
	}
	poll() {
		this.prev = this.cur;
		const held = (c) => this.keys.has(c) || this.injected.has(c);
		let moveX = 0;
		if (held("KeyA") || held("ArrowLeft")) moveX -= 1;
		if (held("KeyD") || held("ArrowRight")) moveX += 1;
		moveX += this.touchMove;
		moveX = Math.max(-1, Math.min(1, moveX));
		this.cur = {
			moveX,
			rush: held("KeyW") || held("ShiftLeft") || held("ShiftRight") || this.touchRush,
			halt: held("KeyS") || held("ControlLeft") || held("ControlRight") || this.touchHalt,
			pause: held("Space") || held("KeyP"),
			form1: held("Digit1") || held("Numpad1"),
			form2: held("Digit2") || held("Numpad2"),
			form3: held("Digit3") || held("Numpad3"),
			form4: held("Digit4") || held("Numpad4"),
			ability: held("KeyF"),
			slotV: held("KeyV"),
			slotL: held("KeyQ"),
			slotR: held("KeyE"),
			slotRear: held("KeyR"),
			slotC: held("KeyC"),
			confirm: held("Enter")
		};
		const just = empty();
		Object.keys(just).forEach((k) => {
			if (k === "moveX") return;
			just[k] = this.cur[k] === true && this.prev[k] !== true;
		});
		this.just = just;
		this.pointer.clicked = this.clickLatch;
		this.clickLatch = false;
	}
};
var GAME = /* @__PURE__ */ new Set([
	"Space",
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"ArrowDown",
	"KeyW",
	"KeyA",
	"KeyS",
	"KeyD"
]);
var BONE = "#e8e0d4";
var RUST = "#c45c3e";
var INK = "#0c0b09";
function renderColumn(ctx, sim, w, h, now) {
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
	const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .25, w / 2, h / 2, Math.max(w, h) * .72);
	g.addColorStop(0, "rgba(0,0,0,0)");
	g.addColorStop(1, tint.fog.replace("0.12", "0.55").replace("0.22", "0.6").replace("0.28", "0.62").replace("0.24", "0.6").replace("0.18", "0.55"));
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
	if (sim.paused) {
		ctx.fillStyle = "rgba(12,11,9,0.35)";
		ctx.fillRect(0, 0, w, h);
	}
}
function drawTerrain(ctx, sim, now) {
	const tint = TERRAIN_TINT[sim.terrain];
	const cam = sim.cam;
	const cell = 48;
	const x0 = Math.floor((cam.x - 520) / cell);
	const y0 = Math.floor((cam.y - 420) / cell);
	const x1 = Math.ceil((cam.x + 520) / cell);
	const y1 = Math.ceil((cam.y + 420) / cell);
	for (let gy = y0; gy <= y1; gy++) for (let gx = x0; gx <= x1; gx++) {
		const n = hash2(gx, gy);
		const px = gx * cell + n % 11 - 5;
		const py = gy * cell + (n >> 3) % 11 - 5;
		if (sim.terrain === "forest" && n % 7 === 0) {
			ctx.fillStyle = tint.shadow;
			ctx.beginPath();
			ctx.ellipse(px + 3, py + 10, 10, 5, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = n % 2 ? "#1a3320" : "#244028";
			ctx.beginPath();
			ctx.moveTo(px, py + 12);
			ctx.lineTo(px - 11, py + 12);
			ctx.lineTo(px, py - 18 - n % 8);
			ctx.lineTo(px + 11, py + 12);
			ctx.closePath();
			ctx.fill();
		} else if (sim.terrain === "plains" && n % 5 !== 0) {
			ctx.strokeStyle = tint.grass;
			ctx.globalAlpha = .35;
			ctx.beginPath();
			ctx.moveTo(px, py);
			ctx.lineTo(px + (n % 5 - 2), py - 6 - n % 4);
			ctx.stroke();
			ctx.globalAlpha = 1;
		} else if (sim.terrain === "wetlands" && n % 6 === 0) {
			ctx.fillStyle = "rgba(40,70,60,0.45)";
			ctx.beginPath();
			ctx.ellipse(px, py, 16 + n % 10, 8, 0, 0, Math.PI * 2);
			ctx.fill();
		} else if (sim.terrain === "mountains" && n % 8 === 0) {
			ctx.fillStyle = "#3a3834";
			ctx.beginPath();
			ctx.moveTo(px - 12, py + 8);
			ctx.lineTo(px, py - 14 - n % 10);
			ctx.lineTo(px + 14, py + 8);
			ctx.closePath();
			ctx.fill();
		}
		if (n % 13 === 0) {
			ctx.fillStyle = tint.shadow;
			ctx.globalAlpha = .4;
			ctx.beginPath();
			ctx.arc(px, py, 2 + n % 3, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalAlpha = 1;
		}
	}
}
function drawRoad(ctx, sim) {
	const tint = TERRAIN_TINT[sim.terrain];
	const path = sim.path;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.strokeStyle = tint.shadow;
	ctx.globalAlpha = .45;
	strokePath(ctx, path, (p) => p.width + 18);
	ctx.globalAlpha = 1;
	ctx.strokeStyle = tint.road;
	strokePath(ctx, path, (p) => p.width);
	ctx.strokeStyle = "rgba(40,30,16,0.35)";
	ctx.lineWidth = 2;
	ctx.beginPath();
	for (let i = 0; i < path.length; i++) {
		const p = path[i];
		const x = p.x + p.nx * 8;
		const y = p.y + p.ny * 8;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
	ctx.beginPath();
	for (let i = 0; i < path.length; i++) {
		const p = path[i];
		const x = p.x - p.nx * 8;
		const y = p.y - p.ny * 8;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
	for (let i = 0; i < path.length; i += 3) {
		const p = path[i];
		if (p.feature === "cover") {
			ctx.fillStyle = "rgba(20,30,16,0.55)";
			ctx.beginPath();
			ctx.ellipse(p.x + p.nx * (p.width * .7), p.y + p.ny * (p.width * .7), 16, 10, 0, 0, Math.PI * 2);
			ctx.fill();
		}
		if (p.feature === "hazard") {
			ctx.fillStyle = "rgba(80,40,20,0.5)";
			ctx.beginPath();
			ctx.arc(p.x + p.nx * (p.width * .2), p.y + p.ny * (p.width * .2), 5, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}
function strokePath(ctx, path, width) {
	ctx.beginPath();
	for (let i = 0; i < path.length; i++) {
		const p = path[i];
		const w = width(p) * .5;
		const x = p.x + p.nx * w;
		const y = p.y + p.ny * w;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	for (let i = path.length - 1; i >= 0; i--) {
		const p = path[i];
		const w = width(p) * .5;
		ctx.lineTo(p.x - p.nx * w, p.y - p.ny * w);
	}
	ctx.closePath();
	ctx.fillStyle = ctx.strokeStyle;
	ctx.fill();
}
function drawFormationGhost(ctx, sim) {
	const p = samplePath(sim.path, sim.s);
	ctx.save();
	ctx.translate(p.x + p.nx * sim.lateral * p.width * .28, p.y + p.ny * sim.lateral * p.width * .28);
	ctx.rotate(Math.atan2(p.ty, p.tx) + Math.PI / 2);
	ctx.strokeStyle = sim.switchT < 1 ? "rgba(196,92,62,0.55)" : "rgba(232,224,212,0.28)";
	ctx.lineWidth = 1.5;
	ctx.setLineDash([5, 5]);
	const w = sim.formation === "skirmish" ? 90 : sim.formation === "column" ? 36 : sim.formation === "circle" ? 70 : 64;
	const d = sim.formation === "circle" ? 70 : sim.formation === "column" ? 100 : 86;
	if (sim.formation === "circle") {
		ctx.beginPath();
		ctx.ellipse(0, 0, w * .5, d * .45, 0, 0, Math.PI * 2);
		ctx.stroke();
	} else if (sim.formation === "wedge") {
		ctx.beginPath();
		ctx.moveTo(0, -d * .5);
		ctx.lineTo(w * .5, d * .4);
		ctx.lineTo(-w * .5, d * .4);
		ctx.closePath();
		ctx.stroke();
	} else ctx.strokeRect(-w * .5, -d * .5, w, d);
	ctx.restore();
}
function drawUnits(ctx, sim, now) {
	const sorted = sim.units.slice().sort((a, b) => a.y - b.y);
	for (const u of sorted) {
		const officer = u.officerId && u.officerId !== "warlord" ? OFFICERS[u.officerId] : null;
		const isWarlord = u.officerId === "warlord";
		const r = isWarlord ? 8.5 : officer ? 7.2 : 4.4;
		ctx.save();
		ctx.translate(u.x, u.y);
		ctx.fillStyle = "rgba(0,0,0,0.35)";
		ctx.beginPath();
		ctx.ellipse(0, r * .7, r * .9, r * .4, 0, 0, Math.PI * 2);
		ctx.fill();
		const body = isWarlord ? BONE : officer ? officer.color : "#b8a078";
		ctx.fillStyle = u.flash > 0 ? "#fff6e8" : body;
		ctx.beginPath();
		ctx.arc(0, 0, r, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = INK;
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.fillStyle = isWarlord ? "#c4a35a" : "#3a342c";
		ctx.beginPath();
		ctx.ellipse(0, -r * .45, r * .7, r * .4, 0, 0, Math.PI * 2);
		ctx.fill();
		if (officer || isWarlord) {
			const flutter = Math.sin(now * .006 + u.id) * 3;
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
function drawEnemies(ctx, sim, now) {
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
			const wob = Math.sin(now * .01 + e.id) * 2;
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
		const t = Math.max(0, e.hp / e.maxHp);
		ctx.fillStyle = "rgba(12,11,9,0.6)";
		ctx.fillRect(-8, -12, 16, 2);
		ctx.fillStyle = RUST;
		ctx.fillRect(-8, -12, 16 * t, 2);
		ctx.restore();
	}
}
function drawParticles(ctx, sim) {
	for (const p of sim.particles) {
		ctx.globalAlpha = Math.max(0, p.life / p.max);
		ctx.fillStyle = p.color;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.globalAlpha = 1;
}
function drawFloaters(ctx, sim) {
	ctx.font = "600 11px Figtree, sans-serif";
	ctx.textAlign = "center";
	for (const f of sim.floaters) {
		ctx.globalAlpha = Math.max(0, f.life);
		ctx.fillStyle = f.color;
		ctx.fillText(f.text, f.x, f.y);
	}
	ctx.globalAlpha = 1;
}
function hash2(x, y) {
	let n = x * 374761393 + y * 668265263;
	n = (n ^ n >> 13) * 1274126177;
	return (n ^ n >> 16) >>> 0;
}
function worldFromScreen(sim, sx, sy, w, h) {
	const zoom = Math.min(w, h) / 520;
	return {
		x: (sx - w / 2) / zoom + sim.cam.x,
		y: (sy - h / 2) / zoom + sim.cam.y
	};
}
function pickOfficerAt(sim, x, y) {
	let best = null;
	for (const u of sim.units) {
		if (!u.officerId || u.officerId === "warlord") continue;
		const d = Math.hypot(u.x - x, u.y - y);
		if (d < 16 && (!best || d < best.d)) best = {
			id: u.officerId,
			d
		};
	}
	return best?.id ?? null;
}
function pickSlotAt(sim, x, y) {
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
var FORMATIONS = [
	{
		id: "column",
		name: "Column",
		key: "1",
		hint: "Fast march. Covers ground. Weak flanks."
	},
	{
		id: "wedge",
		name: "Wedge",
		key: "2",
		hint: "Breaks blockades. Exposed rear."
	},
	{
		id: "circle",
		name: "Shield Wall",
		key: "3",
		hint: "Holds ambushes. Slow."
	},
	{
		id: "skirmish",
		name: "Skirmish",
		key: "4",
		hint: "Scouts wide. Weak to charges."
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-opacity duration-150 disabled:opacity-40 disabled:pointer-events-none select-none", {
	variants: {
		variant: {
			primary: "bg-fg text-bg hover:opacity-90",
			secondary: "bg-raised text-fg border border-border hover:bg-surface",
			ghost: "bg-transparent text-fg hover:bg-raised",
			accent: "bg-accent text-accent-fg hover:opacity-90",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 px-3 text-sm rounded-sm",
			md: "h-11 px-4 text-sm rounded-md",
			lg: "h-12 px-5 text-base rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function ColumnView({ run, node, onDone }) {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const simRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(new Input());
	const [hud, setHud] = (0, import_react.useState)(null);
	const hudTick = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		unlockAudio();
		const sim = createColumnSim(run, node);
		sim.shakeOn = true;
		simRef.current = sim;
		const input = inputRef.current;
		const detach = input.attach(canvas);
		startMarch(1);
		const probe = {
			getYaw: () => -sim.lateral,
			getSpeed: () => sim.speed,
			setKeys: (codes) => input.setKeys(codes)
		};
		window.__controlsTest = probe;
		let raf = 0;
		let acc = 0;
		let last = performance.now();
		const STEP = 1 / 60;
		let finished = false;
		const loop = (now) => {
			const raw = Math.min(.1, (now - last) / 1e3);
			last = now;
			input.poll();
			if (input.just.pause) {
				sim.paused = !sim.paused;
				if (sim.paused) stopMarch();
				else startMarch(sim.pace === "rush" ? 1.5 : sim.pace === "halt" ? .4 : 1);
			}
			if (!sim.paused && !sim.done) {
				if (input.just.form1) setFormation(sim, "column");
				if (input.just.form2) setFormation(sim, "wedge");
				if (input.just.form3) setFormation(sim, "circle");
				if (input.just.form4) setFormation(sim, "skirmish");
				if (input.cur.rush && !input.cur.halt) setPace(sim, "rush");
				else if (input.cur.halt) setPace(sim, "halt");
				else if (sim.pace !== "march" && !input.cur.rush) setPace(sim, "march");
				if (input.just.ability) fireAbility(sim);
				if (sim.selectedOfficer) {
					if (input.just.slotV) assignOfficer(sim, "vanguard");
					if (input.just.slotL) assignOfficer(sim, "left");
					if (input.just.slotR) assignOfficer(sim, "right");
					if (input.just.slotRear) assignOfficer(sim, "rear");
					if (input.just.slotC) assignOfficer(sim, "command");
				}
				applyLateral(sim, input.cur.moveX, raw);
				if (input.pointer.clicked) {
					const w = canvas.width;
					const h = canvas.height;
					const world = worldFromScreen(sim, input.pointer.x, input.pointer.y, w, h);
					const oid = pickOfficerAt(sim, world.x, world.y);
					if (oid) {
						selectOfficer(sim, oid);
						uiTick();
					} else if (sim.selectedOfficer) {
						const slot = pickSlotAt(sim, world.x, world.y);
						if (slot) {
							assignOfficer(sim, slot);
							uiTick();
						} else selectOfficer(sim, null);
					}
				}
				acc += raw;
				while (acc >= STEP) {
					step(sim, STEP);
					acc -= STEP;
				}
				setMarchRate(sim.pace === "rush" ? 1.6 : sim.pace === "halt" ? .3 : 1);
			}
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const cw = wrap.clientWidth;
			const ch = wrap.clientHeight;
			if (canvas.width !== Math.floor(cw * dpr) || canvas.height !== Math.floor(ch * dpr)) {
				canvas.width = Math.floor(cw * dpr);
				canvas.height = Math.floor(ch * dpr);
				canvas.style.width = `${cw}px`;
				canvas.style.height = `${ch}px`;
			}
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				renderColumn(ctx, sim, cw, ch, now);
			}
			hudTick.current += raw;
			if (hudTick.current > .08) {
				hudTick.current = 0;
				setHud(snapshot(sim));
			}
			if (sim.done && !finished) {
				finished = true;
				stopMarch();
				window.setTimeout(() => onDone(sim), 700);
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		setHud(snapshot(sim));
		return () => {
			cancelAnimationFrame(raf);
			detach();
			stopMarch();
			if (window.__controlsTest === probe) delete window.__controlsTest;
		};
	}, [node.id]);
	const sim = simRef.current;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative h-dvh w-full overflow-hidden bg-bg touch-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "absolute inset-0 h-full w-full touch-none",
			style: { touchAction: "none" }
		}), hud && sim && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {
			hud,
			sim,
			input: inputRef.current
		})]
	});
}
function Hud({ hud, sim, input }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 flex flex-col justify-between p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 rounded-lg bg-bg/80 px-3 py-2 ring-1 ring-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-tight tracking-tight",
								children: sim.nodeTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted tabular-nums",
								children: hud.threatHint
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center rounded-md bg-bg/80 text-fg ring-1 ring-border",
							onClick: () => {
								sim.paused = !sim.paused;
							},
							"aria-label": hud.paused ? "Resume" : "Pause",
							children: hud.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "Stamina",
								value: hud.stamina,
								color: "bg-warn"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "Morale",
								value: hud.morale,
								color: "bg-ok"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "Supplies",
								value: hud.supplies,
								color: "bg-fg/80"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								label: "Integrity",
								value: hud.integrity * 100,
								color: hud.switching ? "bg-accent" : "bg-fg/70"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs text-muted tabular-nums",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3 text-accent" }),
									Math.ceil(hud.warlordHp),
									"/",
									hud.warlordMax
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Warriors ",
								Math.ceil(hud.warriors),
								"/",
								hud.warriorsMax
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Momentum ", Math.round(hud.momentum)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto hidden sm:inline",
								children: "Space pause · 1–4 form · A/D shift · F ability"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent",
							style: { width: `${hud.progress * 100}%` }
						})
					}),
					hud.toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-center text-xl text-fg drop-shadow",
						children: hud.toast
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-1",
						children: hud.officers.map((o) => {
							const def = OFFICERS[o.id];
							if (!def) return null;
							const sel = hud.selectedOfficer === o.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: !o.alive,
								onClick: () => selectOfficer(sim, sel ? null : o.id),
								className: cn("flex min-w-[9.5rem] items-center gap-2 rounded-md bg-bg/85 p-1.5 pr-3 text-left ring-1 ring-border", sel && "ring-2 ring-fg", !o.alive && "opacity-40"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: def.portrait,
									alt: "",
									className: "size-11 rounded-sm object-cover",
									crossOrigin: "anonymous"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium leading-tight",
											children: def.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[11px] text-muted",
											children: SLOT_LABEL[o.slot]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 h-1 rounded-full bg-raised",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-accent",
												style: { width: `${o.alive ? (1 - o.cooldown / o.maxCooldown) * 100 : 0}%` }
											})
										})
									]
								})]
							}, o.id);
						})
					}),
					hud.selectedOfficer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [[
							"vanguard",
							"left",
							"right",
							"rear",
							"command"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => assignOfficer(sim, s),
							children: SLOT_LABEL[s]
						}, s)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "accent",
							onClick: () => fireAbility(sim, hud.selectedOfficer ?? void 0),
							children: OFFICERS[hud.selectedOfficer]?.abilityName ?? "Ability"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1.5",
							children: FORMATIONS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setFormation(sim, f.id),
								className: cn("flex h-12 min-w-12 flex-col items-center justify-center rounded-md px-2.5 text-[11px] ring-1 ring-border", hud.targetFormation === f.id ? "bg-fg text-bg" : "bg-bg/80 text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: f.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-muted sm:inline",
									children: f.key
								})]
							}, f.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaceBtn, {
									id: "halt",
									label: "Halt",
									active: hud.pace === "halt",
									onDown: () => {
										input.touchHalt = true;
										setPace(sim, "halt");
									},
									onUp: () => {
										input.touchHalt = false;
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaceBtn, {
									id: "march",
									label: "March",
									active: hud.pace === "march",
									onDown: () => setPace(sim, "march"),
									onUp: () => void 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaceBtn, {
									id: "rush",
									label: "Rush",
									active: hud.pace === "rush",
									onDown: () => {
										input.touchRush = true;
										setPace(sim, "rush");
									},
									onUp: () => {
										input.touchRush = false;
									}
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-center gap-8 sm:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-14 rounded-full bg-bg/80 text-lg ring-1 ring-border",
							onPointerDown: () => {
								input.touchMove = -1;
							},
							onPointerUp: () => {
								input.touchMove = 0;
							},
							onPointerCancel: () => {
								input.touchMove = 0;
							},
							children: "A"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-14 rounded-full bg-bg/80 text-lg ring-1 ring-border",
							onPointerDown: () => {
								input.touchMove = 1;
							},
							onPointerUp: () => {
								input.touchMove = 0;
							},
							onPointerCancel: () => {
								input.touchMove = 0;
							},
							children: "D"
						})]
					})
				]
			}),
			hud.paused && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto absolute inset-0 flex items-center justify-center bg-bg/70 p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl bg-surface p-6 ring-1 ring-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Halted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Issue orders while time is still. Formations, officers, abilities — then resume."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-1 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-3.5" }), " 1 Column · 2 Wedge · 3 Shield · 4 Skirmish"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }), " Click an officer, then a zone"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), " W rush · S halt · F ability"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-5 w-full",
							onClick: () => sim.paused = false,
							children: "Resume the march"
						})
					]
				})
			})
		]
	});
}
function Meter({ label, value, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-bg/75 px-2 py-1.5 ring-1 ring-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between text-[10px] uppercase tracking-wide text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: Math.round(value)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 h-1.5 overflow-hidden rounded-full bg-raised",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full", color),
				style: { width: `${Math.max(0, Math.min(100, value))}%` }
			})
		})]
	});
}
function PaceBtn({ label, active, onDown, onUp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("h-12 min-w-14 rounded-md px-3 text-sm ring-1 ring-border", active ? "bg-fg text-bg" : "bg-bg/80"),
		onPointerDown: onDown,
		onPointerUp: onUp,
		onPointerCancel: onUp,
		children: label
	});
}
function createMicro(id, w, h) {
	if (id === "ballista") return ballista(w, h);
	if (id === "interrogate") return interrogate(w, h);
	if (id === "brace") return brace(w, h);
	return spot(w, h);
}
function ballista(W, H) {
	let angle = -.4;
	let power = 0;
	let charging = false;
	let shot = null;
	let targetX = W * .72;
	let targetY = H * .42;
	let tv = 40;
	let won = false;
	const originX = W * .18;
	const originY = H * .72;
	const g = {
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
			if (targetY < H * .22 || targetY > H * .62) tv *= -1;
			if (input.down && !shot) {
				charging = true;
				power = Math.min(1, power + dt * .9);
			}
			if (!input.down && charging && !shot) {
				charging = false;
				const spd = 280 + power * 420;
				shot = {
					x: originX,
					y: originY,
					vx: Math.cos(angle) * spd,
					vy: Math.sin(angle) * spd
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
				if (Math.hypot(shot.x - targetX, shot.y - targetY) < 28) {
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
			ctx.fillRect(0, h * .62, w, h * .38);
			ctx.fillStyle = "#6a5a38";
			ctx.fillRect(0, h * .62, w, 8);
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
		}
	};
	return g;
}
function interrogate(W, H) {
	const lines = [
		{
			t: "He came from the east gate at dusk.",
			lie: false
		},
		{
			t: "The scarabs were already in the grain.",
			lie: false
		},
		{
			t: "I never saw the captain's red cloak.",
			lie: true
		}
	];
	let picked = null;
	const g = {
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
					const won = lines[i].lie;
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
				ctx.fillStyle = picked === i ? ln.lie ? "#2a3a28" : "#3a2020" : "#1e1b16";
				round(ctx, 24, y - 28, w - 48, 56, 12);
				ctx.fill();
				ctx.strokeStyle = "#2a2620";
				ctx.stroke();
				ctx.fillStyle = "#e8e0d4";
				ctx.fillText(ln.t, w / 2, y + 4);
			});
			meter(ctx, w, g);
		}
	};
	return g;
}
function hitLine(y, h) {
	for (let i = 0; i < 3; i++) {
		const cy = 100 + i * 72;
		if (y > cy - 28 && y < cy + 28) return i;
	}
	return -1;
}
function brace(W, H) {
	let pos = 0;
	let dir = 1;
	let locked = null;
	const zone = .72;
	const g = {
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
					const won = Math.abs(pos - zone) < .1;
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
			const y = h * .55;
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
		}
	};
	return g;
}
function spot(W, H) {
	const bugs = [];
	for (let i = 0; i < 7; i++) bugs.push({
		x: 60 + Math.random() * (W - 120),
		y: 80 + Math.random() * (H - 160),
		decoy: true
	});
	const real = {
		x: 60 + Math.random() * (W - 120),
		y: 80 + Math.random() * (H - 160),
		decoy: false
	};
	bugs.push(real);
	const g = {
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
					const won = !bugs[hit].decoy;
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
				ctx.fillStyle = b.decoy ? "#6a5a32" : `rgba(196,163,90,${.55 + Math.sin(t * 8) * .35})`;
				ctx.beginPath();
				ctx.ellipse(0, 0, 10, 7, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.strokeStyle = b.decoy ? "#3a3020" : "#c4a35a";
				ctx.stroke();
				ctx.restore();
			});
			meter(ctx, w, g);
		}
	};
	return g;
}
function finish(g, won, score) {
	g.done = true;
	g.result = {
		won,
		score
	};
}
function meter(ctx, w, g) {
	const t = Math.max(0, 1 - g.t / g.dur);
	ctx.fillStyle = "rgba(12,11,9,0.7)";
	ctx.fillRect(0, 0, w, 6);
	ctx.fillStyle = t < .3 ? "#c45c3e" : "#e8e0d4";
	ctx.fillRect(0, 0, w * t, 6);
}
function round(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
function MicroView({ id, title, body, onDone }) {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		unlockAudio();
		const input = new Input();
		const detach = input.attach(canvas);
		let game = createMicro(id, wrap.clientWidth, wrap.clientHeight);
		let raf = 0;
		let last = performance.now();
		let sent = false;
		const loop = (now) => {
			const dt = Math.min(.1, (now - last) / 1e3);
			last = now;
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = wrap.clientWidth;
			const h = wrap.clientHeight;
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
				canvas.style.width = `${w}px`;
				canvas.style.height = `${h}px`;
				if (!game.t) game = createMicro(id, w, h);
			}
			input.poll();
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				game.step(dt, {
					x: input.pointer.x,
					y: input.pointer.y,
					down: input.pointer.down,
					clicked: input.pointer.clicked,
					confirm: input.just.confirm || input.just.pause
				});
				game.draw(ctx, w, h);
			}
			if (game.done && game.result && !sent) {
				sent = true;
				window.setTimeout(() => onDone(game.result), 500);
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => {
			cancelAnimationFrame(raf);
			detach();
		};
	}, [id, onDone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-x-0 top-0 z-10 p-4 pt-[max(1rem,env(safe-area-inset-top))] text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.2em] text-muted",
					children: "Climax"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-1 max-w-md text-sm text-muted",
					children: body
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: wrapRef,
			className: "h-full w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "h-full w-full touch-none",
				style: { touchAction: "none" }
			})
		})]
	});
}
var SAVE_VERSION$1 = 1;
function newRun(seed = Math.random() * 4294967295 >>> 0, skirmish = false) {
	const rng = mulberry32(seed);
	const officers = STARTING_OFFICERS.map((id) => {
		const def = OFFICERS[id];
		return {
			id,
			slot: def.preferred,
			hp: 24,
			maxHp: 24,
			alive: true,
			cooldown: 0,
			maxCooldown: ABILITY_CD[def.abilityId]
		};
	});
	const sera = officers.find((o) => o.id === "sera");
	if (sera) sera.slot = "left";
	const lys = officers.find((o) => o.id === "lys");
	if (lys) lys.slot = "right";
	const map = skirmish ? skirmishMap() : buildMap(rng);
	return {
		version: SAVE_VERSION$1,
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
		defeatReason: null
	};
}
function skirmishMap() {
	return [{
		id: "sk-0",
		sector: 0,
		row: 0,
		col: 1,
		kind: "march",
		title: "Open grass",
		body: "Riders on the ridge. The road is the only way through.",
		threat: "cavalry",
		micro: "ballista",
		next: []
	}];
}
function buildMap(rng) {
	const nodes = [];
	const threatsByTerrain = {
		plains: [
			"cavalry",
			"blockade",
			"ambush",
			"archers",
			"pursuit"
		],
		forest: [
			"ambush",
			"swarm",
			"archers",
			"pursuit"
		],
		wetlands: [
			"ambush",
			"swarm",
			"blockade",
			"pursuit"
		],
		mountains: [
			"rockslide",
			"blockade",
			"ambush",
			"archers"
		],
		city: ["blockade"]
	};
	const titles = {
		march: [
			"The Cut",
			"Dust Wake",
			"Long Mile",
			"Broken Milestone",
			"Cattle Track",
			"Old Legion Road"
		],
		rest: [
			"Wayside Camp",
			"Shepherd's Fold",
			"Dry Creek"
		],
		forage: [
			"Wild Orchard",
			"Reed Beds",
			"Game Trail"
		],
		event: [
			"A Stranger",
			"Standing Stones",
			"Burned Cart",
			"The Toll"
		],
		city: [
			"Market Town",
			"River Gate",
			"Wayfort"
		],
		boss: ["The Gate"]
	};
	let idn = 0;
	const nid = () => `n${idn++}`;
	const prevRowIds = [];
	for (let sector = 0; sector < 4; sector++) {
		const terrain = SECTORS[sector].terrain;
		const rows = 4;
		let lastIds = [];
		for (let row = 0; row < rows; row++) {
			const isBoss = sector === 3 && row === 3;
			const isCity = row === 3 && !isBoss;
			const count = isBoss || isCity ? 1 : 2 + (rng() > .45 ? 1 : 0);
			const rowNodes = [];
			for (let col = 0; col < count; col++) {
				let kind;
				if (isBoss) kind = "boss";
				else if (isCity) kind = "city";
				else {
					const r = rng();
					if (r < .55) kind = "march";
					else if (r < .7) kind = "event";
					else if (r < .82) kind = "forage";
					else kind = "rest";
				}
				if (sector === 0 && row === 0 && col === 0) kind = "march";
				const threat = kind === "march" || kind === "boss" ? pick(rng, threatsByTerrain[terrain]) : void 0;
				const node = {
					id: nid(),
					sector,
					row: sector * 4 + row,
					col,
					kind,
					title: isBoss ? "The Usurper's Gate" : pick(rng, titles[kind]),
					body: flavor(kind, terrain, threat, rng),
					threat,
					micro: threat ? preferredMicro(threat) : void 0,
					next: []
				};
				if (sector === 1 && row === 2 && kind === "event") node.recruitId = "vex";
				if (sector === 2 && row === 1 && kind === "rest") node.recruitId = "rook";
				rowNodes.push(node);
				nodes.push(node);
			}
			const sources = lastIds.length ? lastIds : prevRowIds;
			if (sources.length === 0) {} else {
				for (const s of sources) {
					const src = nodes.find((n) => n.id === s);
					const picks = shuffle(rng, rowNodes.slice()).slice(0, Math.min(2, rowNodes.length));
					for (const p of picks) if (!src.next.includes(p.id)) src.next.push(p.id);
				}
				for (const n of rowNodes) if (!nodes.some((s) => s.next.includes(n.id))) nodes.find((x) => x.id === sources[0]).next.push(n.id);
			}
			lastIds = rowNodes.map((n) => n.id);
		}
		prevRowIds.length = 0;
		prevRowIds.push(...lastIds);
	}
	return nodes;
}
function flavor(kind, terrain, threat, rng) {
	if (kind === "boss") return "The pass narrows to a throat of stone. Banners of the usurper hang from the gate. This is the last mile.";
	if (kind === "city") return pick(rng, ["Smoke and bread. A place to spend gold and bury the dead.", "The gate-sergeant wants a toll. The market wants your stories."]);
	if (kind === "rest") return pick(rng, ["A hollow out of the wind. Stamina returns if you dare to stop.", "Old fire-ring. The men want to sit. The road wants you moving."]);
	if (kind === "forage") return pick(rng, ["Game sign in the mud. Supplies, if you are quick and quiet.", "Wild grain along the ditch. Take it and hope it is not blighted."]);
	if (kind === "event") return pick(rng, [
		"A cart on its side. Someone is still breathing.",
		"A hermit with a relic and a price that is not gold.",
		"Deserters from another column. They want a banner that holds."
	]);
	return threat ? {
		ambush: "The verge is too quiet. Sera would not like this stretch.",
		blockade: "Wagons dragged across the road. Someone wants a fight or a purse.",
		cavalry: "Hoof-dust on the ridge. Riders who live off columns like yours.",
		swarm: "Amber shells click in the grass. The ground is wrong.",
		archers: "A copse with a sightline. You will be seen before you see them.",
		rockslide: "Scree and a hanging slope. One shout could bring it down.",
		pursuit: "Dust behind you that is not yours. They have your pace."
	}[threat] : "The road continues.";
}
function applyLoot(run, pickId) {
	const offer = run.pendingLoot;
	if (!offer) return {
		...run,
		pendingLoot: null
	};
	const p = offer.picks.find((x) => x.id === pickId);
	const next = {
		...run,
		pendingLoot: null
	};
	if (!p) return next;
	if (p.kind === "relic" && p.relicId && !next.relics.includes(p.relicId)) next.relics = [...next.relics, p.relicId];
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
		if (def && !next.officers.some((o) => o.id === def.id)) next.officers = [...next.officers, {
			id: def.id,
			slot: def.preferred,
			hp: 24,
			maxHp: 24,
			alive: true,
			cooldown: 0,
			maxCooldown: ABILITY_CD[def.abilityId]
		}];
	}
	return next;
}
function makeLoot(run, node, won) {
	const rng = mulberry32(run.seed ^ hash(node.id) ^ (won ? 1 : 3));
	const unused = Object.values(RELICS).filter((r) => !run.relics.includes(r.id));
	const picks = [];
	if (won && unused.length && rng() > .35) {
		const r = pick(rng, unused);
		picks.push({
			id: "relic",
			kind: "relic",
			name: r.name,
			hint: r.hint,
			relicId: r.id
		});
	}
	picks.push({
		id: "sup",
		kind: "supplies",
		name: "Foraged stores",
		hint: "+20 supplies",
		amount: 16 + Math.floor(rng() * 10)
	});
	picks.push({
		id: "gold",
		kind: "gold",
		name: "Purse",
		hint: `+${6 + Math.floor(rng() * 8)} gold`,
		amount: 6 + Math.floor(rng() * 8)
	});
	if (run.warlordHp < run.warlordMax * .8) picks.push({
		id: "heal",
		kind: "heal",
		name: "Bind the wounds",
		hint: "Blood and stamina return."
	});
	if (node.recruitId && !run.officers.some((o) => o.id === node.recruitId)) {
		const d = OFFICERS[node.recruitId];
		picks.push({
			id: "rec",
			kind: "recruit",
			name: `Take in ${d.name}`,
			hint: d.blurb,
			recruitId: d.id
		});
	}
	if (run.warriors < run.warriorsMax) picks.push({
		id: "men",
		kind: "warriors",
		name: "Stragglers join",
		hint: "+3 warriors",
		amount: 3
	});
	return {
		title: won ? "The road yields" : "What you can salvage",
		body: won ? "Take one. The column cannot carry everything." : "You held. Barely. Take what you can and move.",
		picks: picks.slice(0, 3)
	};
}
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function restAt(run) {
	const cost = 8;
	return {
		...run,
		day: run.day + 1,
		supplies: Math.max(0, run.supplies - cost),
		stamina: Math.min(100, run.stamina + 35),
		morale: Math.min(100, run.morale + 8),
		warlordHp: Math.min(run.warlordMax, run.warlordHp + 6),
		officers: run.officers.map((o) => o.alive ? {
			...o,
			hp: Math.min(o.maxHp, o.hp + 6)
		} : o)
	};
}
function forage(run, risky) {
	const rng = mulberry32(run.seed + run.day * 97);
	const gain = risky ? 18 + Math.floor(rng() * 14) : 10 + Math.floor(rng() * 8);
	const hit = risky && rng() > .55;
	return {
		...run,
		day: run.day + 1,
		supplies: Math.min(100, run.supplies + gain),
		stamina: Math.max(0, run.stamina - (risky ? 12 : 6)),
		warlordHp: hit ? Math.max(1, run.warlordHp - 6) : run.warlordHp,
		warriors: hit ? Math.max(4, run.warriors - 1) : run.warriors,
		morale: hit ? Math.max(0, run.morale - 6) : Math.min(100, run.morale + 2)
	};
}
var KEY = "the-column-save-v1";
var SETTINGS = "the-column-settings-v1";
var SAVE_VERSION = 1;
var defaultSettings = {
	version: 1,
	muted: false,
	shake: true,
	seenHow: false
};
function loadSettings() {
	try {
		const raw = localStorage.getItem(SETTINGS);
		if (!raw) return { ...defaultSettings };
		const parsed = JSON.parse(raw);
		return {
			...defaultSettings,
			...parsed,
			version: 1
		};
	} catch {
		return { ...defaultSettings };
	}
}
function saveSettings(s) {
	try {
		localStorage.setItem(SETTINGS, JSON.stringify(s));
	} catch {}
}
function loadRun() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || parsed.version !== SAVE_VERSION) return null;
		if (!Array.isArray(parsed.officers) || !Array.isArray(parsed.map)) return null;
		return parsed;
	} catch {
		return null;
	}
}
function saveRun(run) {
	try {
		localStorage.setItem(KEY, JSON.stringify(run));
	} catch {}
}
function clearRun() {
	try {
		localStorage.removeItem(KEY);
	} catch {}
}
function GameApp() {
	const [phase, setPhase] = (0, import_react.useState)("title");
	const [run, setRun] = (0, import_react.useState)(null);
	const [node, setNode] = (0, import_react.useState)(null);
	const [settings, setSettings] = (0, import_react.useState)(() => typeof window === "undefined" ? {
		version: 1,
		muted: false,
		shake: true,
		seenHow: false
	} : loadSettings());
	const [hasSave, setHasSave] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHasSave(!!loadRun());
		setMuted(settings.muted);
	}, [settings.muted]);
	const persist = (0, import_react.useCallback)((next) => {
		setRun(next);
		if (!next.skirmish) saveRun(next);
	}, []);
	const start = (skirmish) => {
		unlockAudio();
		uiOk();
		const r = newRun(void 0, skirmish);
		persist(r);
		if (skirmish) {
			const n = r.map[0];
			setNode(n);
			setPhase("column");
		} else setPhase(settings.seenHow ? "map" : "briefing");
	};
	const continueRun = () => {
		unlockAudio();
		const r = loadRun();
		if (!r) return;
		setRun(r);
		setPhase("map");
	};
	const enterNode = (n) => {
		if (!run) return;
		uiTick();
		setNode(n);
		if (n.kind === "march" || n.kind === "boss") setPhase("encounter");
		else if (n.kind === "rest") setPhase("rest");
		else if (n.kind === "forage") setPhase("event");
		else if (n.kind === "city") setPhase("city");
		else setPhase("event");
	};
	const markVisited = (r, n) => {
		const visited = [...r.visited, n.id];
		const available = n.next.filter((id) => !visited.includes(id));
		const fallback = r.map.filter((x) => x.row === n.row + 1 && !visited.includes(x.id)).map((x) => x.id);
		return {
			...r,
			currentNode: n.id,
			visited,
			available: available.length ? available : fallback,
			sector: n.sector,
			day: r.day + 1
		};
	};
	const onColumnDone = (sim) => {
		if (!run || !node) return;
		const res = sim.result;
		let next = {
			...run,
			stamina: Math.round(sim.stamina),
			morale: Math.max(0, Math.min(100, Math.round(sim.morale + res.moraleDelta))),
			supplies: Math.round(sim.supplies),
			warlordHp: Math.max(0, sim.warlordHp),
			warriors: Math.max(0, Math.round(sim.warriors)),
			officers: sim.officers.map((o) => ({ ...o })),
			kills: run.kills + res.kills,
			marches: run.marches + 1,
			lastResult: res
		};
		if (!res.won) {
			next.defeatReason = res.reason;
			persist(next);
			clearRun();
			setPhase("defeat");
			return;
		}
		next = markVisited(next, node);
		if (node.kind === "boss") {
			persist(next);
			clearRun();
			setPhase("victory");
			return;
		}
		if (res.micro) {
			next.pendingMicro = {
				id: res.micro,
				title: res.micro === "ballista" ? "The leader shows" : res.micro === "spot" ? "Something in the verge" : res.micro === "brace" ? "The charge" : "A prisoner talks",
				body: res.micro === "ballista" ? "One shot. The rest of the fight hangs on it." : res.micro === "spot" ? "Husks and a living shell. Find the one that still ticks." : res.micro === "brace" ? "The line will hold if you time the brace." : "Three statements. One is a lie.",
				onWin: "The climax is yours.",
				onLose: "They slip the net. The column pays."
			};
			persist(next);
			setPhase("micro");
			return;
		}
		next.pendingLoot = makeLoot(next, node, true);
		persist(next);
		setPhase("loot");
	};
	const onMicro = (won) => {
		if (!run || !node) return;
		let next = {
			...run,
			pendingMicro: null,
			microsWon: run.microsWon + (won ? 1 : 0)
		};
		if (!won) {
			next.warlordHp = Math.max(1, next.warlordHp - 6);
			next.morale = Math.max(0, next.morale - 8);
		} else next.morale = Math.min(100, next.morale + 6);
		if (node.kind === "boss") {
			persist(next);
			clearRun();
			setPhase("victory");
			return;
		}
		next.pendingLoot = makeLoot(next, node, true);
		persist(next);
		setPhase("loot");
	};
	const pickLoot = (id) => {
		if (!run) return;
		uiOk();
		const next = applyLoot(run, id);
		persist(next);
		if (next.skirmish) {
			setPhase("victory");
			return;
		}
		setPhase("map");
	};
	const finishSoft = (mut) => {
		if (!run || !node) return;
		uiOk();
		persist(markVisited(mut(run), node));
		setPhase("map");
	};
	if (phase === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		hasSave,
		settings,
		setSettings: (s) => {
			setSettings(s);
			saveSettings(s);
			setMuted(s.muted);
		},
		onNew: () => start(false),
		onContinue: continueRun,
		onSkirmish: () => start(true),
		onHow: () => setPhase("how")
	});
	if (phase === "how") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.25em] text-muted",
			children: "Command"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: "How the column lives"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-6",
			children: HOW_TO.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: h.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: h.body
			})] }, h.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-10",
			onClick: () => {
				const s = {
					...settings,
					seenHow: true
				};
				setSettings(s);
				saveSettings(s);
				setPhase("title");
			},
			children: "Understood"
		})
	] });
	if (phase === "briefing" && run) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.25em] text-muted",
			children: "The Amber Road"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl sm:text-5xl",
			children: "A house without a hall"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-lg text-muted",
			children: "The citadel in the Spine is yours by blood and lost by steel. Between here and the gate: grass, canopy, fever-water, and a pass that has buried better columns than yours."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-lg text-muted",
			children: "You do not manage a ship. You command people. Formation is the weapon. The road is the antagonist."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: run.officers.map((o) => {
				const d = OFFICERS[o.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-lg bg-raised ring-1 ring-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: d.portrait,
						alt: "",
						className: "aspect-square w-full object-cover",
						crossOrigin: "anonymous"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: d.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted",
							children: d.title
						})]
					})]
				}, o.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-8",
			onClick: () => setPhase("map"),
			children: "Take the road"
		})
	] });
	if (phase === "map" && run) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapScreen, {
		run,
		onPick: enterNode,
		onTitle: () => setPhase("title")
	});
	if (phase === "encounter" && run && node) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[11px] uppercase tracking-[0.25em] text-muted",
			children: [
				SECTORS[node.sector]?.name,
				" · ",
				node.threat ? THREAT_LABEL[node.threat] : "March"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl",
			children: node.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-lg text-muted",
			children: node.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-col gap-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setPhase("column"),
					children: "Fight — command the column"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => {
						const chance = .28 + (run.officers.some((o) => o.id === "vex" && o.alive) ? .25 : 0) + (run.relics.includes("colors") ? .15 : 0);
						if (Math.random() < chance) {
							const next = markVisited({
								...run,
								morale: Math.min(100, run.morale + 4),
								gold: run.gold + 4
							}, node);
							next.pendingLoot = makeLoot(next, node, true);
							persist(next);
							setPhase("loot");
						} else {
							persist({
								...run,
								morale: Math.max(0, run.morale - 4)
							});
							setPhase("column");
						}
					},
					children: "Parley"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						if (Math.random() < .4) {
							persist(markVisited({
								...run,
								stamina: Math.max(0, run.stamina - 12),
								morale: Math.max(0, run.morale - 6)
							}, node));
							setPhase("map");
						} else {
							persist({
								...run,
								stamina: Math.max(0, run.stamina - 8)
							});
							setPhase("column");
						}
					},
					children: "Flee"
				})
			]
		})
	] });
	if (phase === "column" && run && node) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnView, {
		run,
		node,
		onDone: onColumnDone
	});
	if (phase === "micro" && run?.pendingMicro) {
		const m = run.pendingMicro;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicroView, {
			id: m.id,
			title: m.title,
			body: m.body,
			onDone: (r) => onMicro(r.won)
		});
	}
	if (phase === "loot" && run?.pendingLoot) {
		const loot = run.pendingLoot;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.25em] text-muted",
				children: "Spoils"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: loot.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: loot.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-3",
				children: loot.picks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => pickLoot(p.id),
					className: "rounded-xl bg-raised p-4 text-left ring-1 ring-border transition-opacity hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: p.hint
					})]
				}, p.id))
			})
		] });
	}
	if (phase === "rest" && run && node) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: node.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: node.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Rest costs supplies. The men will thank you."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => finishSoft(restAt),
				children: "Make camp"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => finishSoft((r) => r),
				children: "Push on"
			})]
		})
	] });
	if (phase === "city" && run && node) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: node.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: node.body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"Gold ",
				run.gold,
				" · Supplies ",
				run.supplies
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-col gap-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: run.gold < 8,
					onClick: () => finishSoft((r) => ({
						...r,
						gold: r.gold - 8,
						supplies: Math.min(100, r.supplies + 28)
					})),
					children: "Buy stores (8g)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					disabled: run.gold < 10,
					onClick: () => finishSoft((r) => ({
						...r,
						gold: r.gold - 10,
						warlordHp: Math.min(r.warlordMax, r.warlordHp + 14),
						stamina: Math.min(100, r.stamina + 20)
					})),
					children: "Physician (10g)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => finishSoft((r) => ({
						...r,
						morale: Math.min(100, r.morale + 6)
					})),
					children: "Leave"
				})
			]
		})
	] });
	if (phase === "event" && run && node) {
		const forageNode = node.kind === "forage";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: node.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: node.body
			}),
			forageNode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => finishSoft((r) => forage(r, false)),
					children: "Forage carefully"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => finishSoft((r) => forage(r, true)),
					children: "Strip the verge"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-2 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							const aided = {
								...run,
								morale: Math.min(100, run.morale + 8),
								supplies: Math.max(0, run.supplies - 6)
							};
							if (node.recruitId && !run.officers.some((o) => o.id === node.recruitId)) {
								const next = markVisited(aided, node);
								next.pendingLoot = {
									title: "A debt of blood",
									body: "They will march if you will have them.",
									picks: [{
										id: "rec",
										kind: "recruit",
										name: `Take in ${OFFICERS[node.recruitId]?.name}`,
										hint: OFFICERS[node.recruitId]?.blurb ?? "",
										recruitId: node.recruitId
									}, {
										id: "sup",
										kind: "supplies",
										name: "Ask for stores instead",
										hint: "+16 supplies",
										amount: 16
									}]
								};
								persist(next);
								setPhase("loot");
							} else finishSoft(() => aided);
						},
						children: "Aid them"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => finishSoft((r) => ({
							...r,
							gold: r.gold + 6
						})),
						children: "Take what is left"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => finishSoft((r) => r),
						children: "Walk on"
					})
				]
			})
		] });
	}
	if (phase === "defeat" && run) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(End, {
		title: "The column is broken",
		body: run.defeatReason ?? "The road took them.",
		run,
		onAgain: () => start(run.skirmish),
		onTitle: () => setPhase("title")
	});
	if (phase === "victory" && run) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(End, {
		title: run.skirmish ? "The mile is done" : "The gate is yours",
		body: run.skirmish ? "A single clash. The campaign is longer, and worse." : "The usurper's banners come down. The hall remembers your name.",
		run,
		onAgain: () => start(run.skirmish),
		onTitle: () => setPhase("title")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "The road is empty."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: "mt-4",
		onClick: () => setPhase("title"),
		children: "Return"
	})] });
}
function Title({ hasSave, settings, setSettings, onNew, onContinue, onSkirmish, onHow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/title.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-50",
				crossOrigin: "anonymous"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-12 pt-16 sm:px-12 sm:pb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.35em] text-muted",
						children: "Real-time formation command"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-6xl leading-none tracking-tight sm:text-8xl",
						children: "The Column"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-muted",
						children: "March a retinue through hostile country. Formation, officers, pace. The road is the antagonist."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								onClick: onNew,
								children: "Raise the column"
							}),
							hasSave && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "secondary",
								onClick: onContinue,
								children: "Continue the march"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "secondary",
								onClick: onSkirmish,
								children: "Skirmish"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "ghost",
								onClick: onHow,
								children: "How to command"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-6 flex size-11 items-center justify-center rounded-md text-muted ring-1 ring-border",
						onClick: () => setSettings({
							...settings,
							muted: !settings.muted
						}),
						"aria-label": settings.muted ? "Unmute" : "Mute",
						children: settings.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
					})
				]
			})
		]
	});
}
function MapScreen({ run, onPick, onTitle }) {
	const rows = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const n of run.map) {
			const arr = m.get(n.row) ?? [];
			arr.push(n);
			m.set(n.row, arr);
		}
		return [...m.entries()].sort((a, b) => a[0] - b[0]);
	}, [run.map]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg px-4 py-6 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] uppercase tracking-[0.25em] text-muted",
					children: [
						"Day ",
						run.day,
						" · ",
						SECTORS[run.sector]?.name
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "The road ahead"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: onTitle,
					children: "Camp"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-4 flex max-w-3xl flex-wrap gap-3 text-xs tabular-nums text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Stamina ", Math.round(run.stamina)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Morale ", Math.round(run.morale)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Supplies ", Math.round(run.supplies)] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Gold ", run.gold] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Blood ",
						Math.ceil(run.warlordHp),
						"/",
						run.warlordMax
					] })
				]
			}),
			run.relics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto mt-2 max-w-3xl text-xs text-muted",
				children: ["Relics: ", run.relics.map((id) => RELICS[id]?.name ?? id).join(" · ")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-8 flex max-w-3xl flex-col gap-6",
				children: rows.map(([row, nodes]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center gap-3",
					children: nodes.map((n) => {
						const open = run.available.includes(n.id);
						const done = run.visited.includes(n.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !open,
							onClick: () => onPick(n),
							className: cn("w-[9.5rem] rounded-lg p-3 text-left ring-1 ring-border sm:w-44", open && "bg-raised hover:opacity-90", done && "bg-surface opacity-50", !open && !done && "bg-bg opacity-35", n.kind === "boss" && open && "ring-accent"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-wide text-muted",
									children: n.kind
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl leading-tight",
									children: n.title
								}),
								n.threat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-accent",
									children: THREAT_LABEL[n.threat]
								})
							]
						}, n.id);
					})
				}, row))
			})
		]
	});
}
function Screen({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg px-6 py-12 sm:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-2xl",
			children
		})
	});
}
function End({ title, body, run, onAgain, onTitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-5xl",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: body
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-8 grid grid-cols-2 gap-3 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Days",
					v: run.day
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Kills",
					v: run.kills
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Marches",
					v: run.marches
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Climaxes",
					v: run.microsWon
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onAgain,
				children: "March again"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: onTitle,
				children: "Title"
			})]
		})
	] });
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-raised px-3 py-2 ring-1 ring-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] uppercase tracking-wide text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-2xl tabular-nums",
			children: v
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
