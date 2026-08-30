import { useEffect, useRef, useState } from "react";
import {
  applyLateral,
  assignOfficer,
  createColumnSim,
  fireAbility,
  selectOfficer,
  setFormation,
  setPace,
  snapshot,
  step,
  type ColumnSim,
} from "@/game/column";
import { Input } from "@/game/input";
import { pickOfficerAt, pickSlotAt, renderColumn, worldFromScreen } from "@/game/render";
import { FORMATIONS, type FormationId, type HudSnapshot, type MapNode, type PaceId, type RunState, type SlotId } from "@/game/types";
import { OFFICERS, SLOT_LABEL } from "@/game/content";
import { setMarchRate, startMarch, stopMarch, uiTick, unlockAudio } from "@/game/audio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, Play, Shield, Swords, Eye, Heart } from "lucide-react";

interface Props {
  run: RunState;
  node: MapNode;
  onDone: (sim: ColumnSim) => void;
}

export function ColumnView({ run, node, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<ColumnSim | null>(null);
  const inputRef = useRef(new Input());
  const [hud, setHud] = useState<HudSnapshot | null>(null);
  const hudTick = useRef(0);

  useEffect(() => {
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
      setKeys: (codes: string[]) => input.setKeys(codes),
    };
    window.__controlsTest = probe;

    let raf = 0;
    let acc = 0;
    let last = performance.now();
    const STEP = 1 / 60;
    let finished = false;

    const loop = (now: number) => {
      const raw = Math.min(0.1, (now - last) / 1000);
      last = now;
      input.poll();

      if (input.just.pause) {
        sim.paused = !sim.paused;
        if (sim.paused) stopMarch();
        else startMarch(sim.pace === "rush" ? 1.5 : sim.pace === "halt" ? 0.4 : 1);
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
        setMarchRate(sim.pace === "rush" ? 1.6 : sim.pace === "halt" ? 0.3 : 1);
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
      if (hudTick.current > 0.08) {
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
    // mount once per node
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.id]);

  const sim = simRef.current;

  return (
    <div ref={wrapRef} className="relative h-dvh w-full overflow-hidden bg-bg touch-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{ touchAction: "none" }}
      />
      {hud && sim && <Hud hud={hud} sim={sim} input={inputRef.current} />}
    </div>
  );
}

function Hud({ hud, sim, input }: { hud: HudSnapshot; sim: ColumnSim; input: Input }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
      <div className="pointer-events-auto flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 rounded-lg bg-bg/80 px-3 py-2 ring-1 ring-border">
            <p className="font-display text-lg leading-tight tracking-tight">{sim.nodeTitle}</p>
            <p className="text-xs text-muted tabular-nums">{hud.threatHint}</p>
          </div>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-md bg-bg/80 text-fg ring-1 ring-border"
            onClick={() => {
              sim.paused = !sim.paused;
            }}
            aria-label={hud.paused ? "Resume" : "Pause"}
          >
            {hud.paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Meter label="Stamina" value={hud.stamina} color="bg-warn" />
          <Meter label="Morale" value={hud.morale} color="bg-ok" />
          <Meter label="Supplies" value={hud.supplies} color="bg-fg/80" />
          <Meter
            label="Integrity"
            value={hud.integrity * 100}
            color={hud.switching ? "bg-accent" : "bg-fg/70"}
          />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted tabular-nums">
          <span className="flex items-center gap-1">
            <Heart className="size-3 text-accent" />
            {Math.ceil(hud.warlordHp)}/{hud.warlordMax}
          </span>
          <span>
            Warriors {Math.ceil(hud.warriors)}/{hud.warriorsMax}
          </span>
          <span>Momentum {Math.round(hud.momentum)}</span>
          <span className="ml-auto hidden sm:inline">Space pause · 1–4 form · A/D shift · F ability</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-raised">
          <div className="h-full bg-accent" style={{ width: `${hud.progress * 100}%` }} />
        </div>
        {hud.toast ? (
          <p className="font-display text-center text-xl text-fg drop-shadow">{hud.toast}</p>
        ) : null}
      </div>

      <div className="pointer-events-auto flex flex-col gap-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {hud.officers.map((o) => {
            const def = OFFICERS[o.id];
            if (!def) return null;
            const sel = hud.selectedOfficer === o.id;
            return (
              <button
                key={o.id}
                type="button"
                disabled={!o.alive}
                onClick={() => selectOfficer(sim, sel ? null : o.id)}
                className={cn(
                  "flex min-w-[9.5rem] items-center gap-2 rounded-md bg-bg/85 p-1.5 pr-3 text-left ring-1 ring-border",
                  sel && "ring-2 ring-fg",
                  !o.alive && "opacity-40",
                )}
              >
                <img
                  src={def.portrait}
                  alt=""
                  className="size-11 rounded-sm object-cover"
                  crossOrigin="anonymous"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium leading-tight">{def.name}</p>
                  <p className="truncate text-[11px] text-muted">{SLOT_LABEL[o.slot]}</p>
                  <div className="mt-1 h-1 rounded-full bg-raised">
                    <div
                      className="h-full bg-accent"
                      style={{
                        width: `${o.alive ? (1 - o.cooldown / o.maxCooldown) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {hud.selectedOfficer && (
          <div className="flex flex-wrap gap-1.5">
            {(["vanguard", "left", "right", "rear", "command"] as SlotId[]).map((s) => (
              <Button key={s} size="sm" variant="secondary" onClick={() => assignOfficer(sim, s)}>
                {SLOT_LABEL[s]}
              </Button>
            ))}
            <Button
              size="sm"
              variant="accent"
              onClick={() => fireAbility(sim, hud.selectedOfficer ?? undefined)}
            >
              {OFFICERS[hud.selectedOfficer]?.abilityName ?? "Ability"}
            </Button>
          </div>
        )}

        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="flex gap-1.5">
            {FORMATIONS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormation(sim, f.id as FormationId)}
                className={cn(
                  "flex h-12 min-w-12 flex-col items-center justify-center rounded-md px-2.5 text-[11px] ring-1 ring-border",
                  hud.targetFormation === f.id ? "bg-fg text-bg" : "bg-bg/80 text-fg",
                )}
              >
                <span className="font-medium">{f.name}</span>
                <span className="hidden text-muted sm:inline">{f.key}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            <PaceBtn
              id="halt"
              label="Halt"
              active={hud.pace === "halt"}
              onDown={() => {
                input.touchHalt = true;
                setPace(sim, "halt");
              }}
              onUp={() => {
                input.touchHalt = false;
              }}
            />
            <PaceBtn
              id="march"
              label="March"
              active={hud.pace === "march"}
              onDown={() => setPace(sim, "march")}
              onUp={() => undefined}
            />
            <PaceBtn
              id="rush"
              label="Rush"
              active={hud.pace === "rush"}
              onDown={() => {
                input.touchRush = true;
                setPace(sim, "rush");
              }}
              onUp={() => {
                input.touchRush = false;
              }}
            />
          </div>
        </div>
        <div className="flex justify-center gap-8 sm:hidden">
          <button
            type="button"
            className="size-14 rounded-full bg-bg/80 text-lg ring-1 ring-border"
            onPointerDown={() => {
              input.touchMove = -1;
            }}
            onPointerUp={() => {
              input.touchMove = 0;
            }}
            onPointerCancel={() => {
              input.touchMove = 0;
            }}
          >
            A
          </button>
          <button
            type="button"
            className="size-14 rounded-full bg-bg/80 text-lg ring-1 ring-border"
            onPointerDown={() => {
              input.touchMove = 1;
            }}
            onPointerUp={() => {
              input.touchMove = 0;
            }}
            onPointerCancel={() => {
              input.touchMove = 0;
            }}
          >
            D
          </button>
        </div>
      </div>

      {hud.paused && (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-bg/70 p-6">
          <div className="w-full max-w-sm rounded-xl bg-surface p-6 ring-1 ring-border">
            <h2 className="font-display text-3xl">Halted</h2>
            <p className="mt-2 text-sm text-muted">
              Issue orders while time is still. Formations, officers, abilities — then resume.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Swords className="size-3.5" /> 1 Column · 2 Wedge · 3 Shield · 4 Skirmish
              </li>
              <li className="flex items-center gap-2">
                <Shield className="size-3.5" /> Click an officer, then a zone
              </li>
              <li className="flex items-center gap-2">
                <Eye className="size-3.5" /> W rush · S halt · F ability
              </li>
            </ul>
            <Button className="mt-5 w-full" onClick={() => (sim.paused = false)}>
              Resume the march
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-md bg-bg/75 px-2 py-1.5 ring-1 ring-border">
      <div className="flex justify-between text-[10px] uppercase tracking-wide text-muted">
        <span>{label}</span>
        <span className="tabular-nums">{Math.round(value)}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-raised">
        <div className={cn("h-full", color)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

function PaceBtn({
  label,
  active,
  onDown,
  onUp,
}: {
  id: PaceId;
  label: string;
  active: boolean;
  onDown: () => void;
  onUp: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "h-12 min-w-14 rounded-md px-3 text-sm ring-1 ring-border",
        active ? "bg-fg text-bg" : "bg-bg/80",
      )}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {label}
    </button>
  );
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setKeys?: (codes: string[]) => void;
    };
  }
}
