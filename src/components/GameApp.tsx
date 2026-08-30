import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ColumnView } from "@/components/ColumnView";
import { MicroView } from "@/components/MicroView";
import { Button } from "@/components/ui/button";
import { applyLoot, forage, makeLoot, newRun, restAt } from "@/game/campaign";
import { HOW_TO, OFFICERS, RELICS, SECTORS, THREAT_LABEL } from "@/game/content";
import { clearRun, loadRun, loadSettings, saveRun, saveSettings, type Settings } from "@/game/save";
import { setMuted, uiOk, uiTick, unlockAudio } from "@/game/audio";
import type { ColumnSim } from "@/game/column";
import type { MapNode, Phase, RunState } from "@/game/types";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

export function GameApp() {
  const [phase, setPhase] = useState<Phase>("title");
  const [run, setRun] = useState<RunState | null>(null);
  const [node, setNode] = useState<MapNode | null>(null);
  const [settings, setSettings] = useState<Settings>(() =>
    typeof window === "undefined" ? { version: 1, muted: false, shake: true, seenHow: false } : loadSettings(),
  );
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    setHasSave(!!loadRun());
    setMuted(settings.muted);
  }, [settings.muted]);

  const persist = useCallback((next: RunState) => {
    setRun(next);
    if (!next.skirmish) saveRun(next);
  }, []);

  const start = (skirmish: boolean) => {
    unlockAudio();
    uiOk();
    const r = newRun(undefined, skirmish);
    persist(r);
    if (skirmish) {
      const n = r.map[0]!;
      setNode(n);
      setPhase("column");
    } else {
      setPhase("briefing");
    }
  };

  const continueRun = () => {
    unlockAudio();
    const r = loadRun();
    if (!r) return;
    setRun(r);
    setPhase("map");
  };

  const enterNode = (n: MapNode) => {
    if (!run) return;
    uiTick();
    setNode(n);
    if (n.kind === "march" || n.kind === "boss") setPhase("encounter");
    else if (n.kind === "rest") setPhase("rest");
    else if (n.kind === "forage") setPhase("event");
    else if (n.kind === "city") setPhase("city");
    else setPhase("event");
  };

  const markVisited = (r: RunState, n: MapNode): RunState => {
    const visited = [...r.visited, n.id];
    const available = n.next.filter((id) => !visited.includes(id));
    const fallback = r.map.filter((x) => x.row === n.row + 1 && !visited.includes(x.id)).map((x) => x.id);
    return {
      ...r,
      currentNode: n.id,
      visited,
      available: available.length ? available : fallback,
      sector: n.sector,
      day: r.day + 1,
    };
  };

  const onColumnDone = (sim: ColumnSim) => {
    if (!run || !node) return;
    const res = sim.result!;
    let next: RunState = {
      ...run,
      stamina: Math.round(sim.stamina),
      morale: Math.max(0, Math.min(100, Math.round(sim.morale + res.moraleDelta))),
      supplies: Math.round(sim.supplies),
      warlordHp: Math.max(0, sim.warlordHp),
      warriors: Math.max(0, Math.round(sim.warriors)),
      officers: sim.officers.map((o) => ({ ...o })),
      kills: run.kills + res.kills,
      marches: run.marches + 1,
      lastResult: res,
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
        body:
          res.micro === "ballista"
            ? "One shot. The rest of the fight hangs on it."
            : res.micro === "spot"
              ? "Husks and a living shell. Find the one that still ticks."
              : res.micro === "brace"
                ? "The line will hold if you time the brace."
                : "Three statements. One is a lie.",
        onWin: "The climax is yours.",
        onLose: "They slip the net. The column pays.",
      };
      persist(next);
      setPhase("micro");
      return;
    }
    next.pendingLoot = makeLoot(next, node, true);
    persist(next);
    setPhase("loot");
  };

  const onMicro = (won: boolean) => {
    if (!run || !node) return;
    let next = { ...run, pendingMicro: null, microsWon: run.microsWon + (won ? 1 : 0) };
    if (!won) {
      next.warlordHp = Math.max(1, next.warlordHp - 6);
      next.morale = Math.max(0, next.morale - 8);
    } else {
      next.morale = Math.min(100, next.morale + 6);
    }
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

  const pickLoot = (id: string) => {
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

  const finishSoft = (mut: (r: RunState) => RunState) => {
    if (!run || !node) return;
    uiOk();
    persist(markVisited(mut(run), node));
    setPhase("map");
  };

  if (phase === "title") {
    return (
      <Title
        hasSave={hasSave}
        settings={settings}
        setSettings={(s) => {
          setSettings(s);
          saveSettings(s);
          setMuted(s.muted);
        }}
        onNew={() => start(false)}
        onContinue={continueRun}
        onSkirmish={() => start(true)}
        onHow={() => setPhase("how")}
      />
    );
  }

  if (phase === "how") {
    return (
      <Screen>
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted">Command</p>
        <h1 className="mt-2 font-display text-4xl">How the column lives</h1>
        <div className="mt-8 space-y-6">
          {HOW_TO.map((h) => (
            <div key={h.title}>
              <h2 className="font-display text-2xl">{h.title}</h2>
              <p className="mt-1 text-muted">{h.body}</p>
            </div>
          ))}
        </div>
        <Button
          className="mt-10"
          onClick={() => {
            const s = { ...settings, seenHow: true };
            setSettings(s);
            saveSettings(s);
            setPhase("title");
          }}
        >
          Understood
        </Button>
      </Screen>
    );
  }

  if (phase === "briefing" && run) {
    return (
      <Screen>
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted">The Amber Road</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">A house without a hall</h1>
        <p className="mt-4 max-w-lg text-muted">
          The citadel in the Spine is yours by blood and lost by steel. Between here and the gate: grass, canopy,
          fever-water, and a pass that has buried better columns than yours.
        </p>
        <p className="mt-3 max-w-lg text-muted">
          You do not manage a ship. You command people. Formation is the weapon. The road is the antagonist.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {run.officers.map((o) => {
            const d = OFFICERS[o.id]!;
            return (
              <figure key={o.id} className="overflow-hidden rounded-lg bg-raised ring-1 ring-border">
                <img src={d.portrait} alt="" className="aspect-square w-full object-cover" crossOrigin="anonymous" />
                <figcaption className="p-2">
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-[11px] text-muted">{d.title}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <Button className="mt-8" onClick={() => setPhase("map")}>
          Take the road
        </Button>
      </Screen>
    );
  }

  if (phase === "map" && run) {
    return <MapScreen run={run} onPick={enterNode} onTitle={() => setPhase("title")} />;
  }

  if (phase === "encounter" && run && node) {
    return (
      <Screen>
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
          {SECTORS[node.sector]?.name} · {node.threat ? THREAT_LABEL[node.threat] : "March"}
        </p>
        <h1 className="mt-2 font-display text-4xl">{node.title}</h1>
        <p className="mt-4 max-w-lg text-muted">{node.body}</p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => setPhase("column")}>Fight — command the column</Button>
          <Button
            variant="secondary"
            onClick={() => {
              const hasVex = run.officers.some((o) => o.id === "vex" && o.alive);
              const chance = 0.28 + (hasVex ? 0.25 : 0) + (run.relics.includes("colors") ? 0.15 : 0);
              if (Math.random() < chance) {
                const next = markVisited(
                  { ...run, morale: Math.min(100, run.morale + 4), gold: run.gold + 4 },
                  node,
                );
                next.pendingLoot = makeLoot(next, node, true);
                persist(next);
                setPhase("loot");
              } else {
                persist({ ...run, morale: Math.max(0, run.morale - 4) });
                setPhase("column");
              }
            }}
          >
            Parley
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (Math.random() < 0.4) {
                persist(
                  markVisited(
                    { ...run, stamina: Math.max(0, run.stamina - 12), morale: Math.max(0, run.morale - 6) },
                    node,
                  ),
                );
                setPhase("map");
              } else {
                persist({ ...run, stamina: Math.max(0, run.stamina - 8) });
                setPhase("column");
              }
            }}
          >
            Flee
          </Button>
        </div>
      </Screen>
    );
  }

  if (phase === "column" && run && node) {
    return <ColumnView run={run} node={node} onDone={onColumnDone} />;
  }

  if (phase === "micro" && run?.pendingMicro) {
    const m = run.pendingMicro;
    return (
      <MicroView
        id={m.id}
        title={m.title}
        body={m.body}
        onDone={(r) => onMicro(r.won)}
      />
    );
  }

  if (phase === "loot" && run?.pendingLoot) {
    const loot = run.pendingLoot;
    return (
      <Screen>
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted">Spoils</p>
        <h1 className="mt-2 font-display text-4xl">{loot.title}</h1>
        <p className="mt-3 text-muted">{loot.body}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {loot.picks.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => pickLoot(p.id)}
              className="rounded-xl bg-raised p-4 text-left ring-1 ring-border transition-opacity hover:opacity-90"
            >
              <p className="font-display text-2xl">{p.name}</p>
              <p className="mt-2 text-sm text-muted">{p.hint}</p>
            </button>
          ))}
        </div>
      </Screen>
    );
  }

  if (phase === "rest" && run && node) {
    return (
      <Screen>
        <h1 className="font-display text-4xl">{node.title}</h1>
        <p className="mt-3 text-muted">{node.body}</p>
        <p className="mt-2 text-sm text-muted">Rest costs supplies. The men will thank you.</p>
        <div className="mt-8 flex gap-2">
          <Button onClick={() => finishSoft(restAt)}>Make camp</Button>
          <Button variant="secondary" onClick={() => finishSoft((r) => r)}>
            Push on
          </Button>
        </div>
      </Screen>
    );
  }

  if (phase === "city" && run && node) {
    return (
      <Screen>
        <h1 className="font-display text-4xl">{node.title}</h1>
        <p className="mt-3 text-muted">{node.body}</p>
        <p className="mt-2 text-sm text-muted">Gold {run.gold} · Supplies {run.supplies}</p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Button
            disabled={run.gold < 8}
            onClick={() =>
              finishSoft((r) => ({
                ...r,
                gold: r.gold - 8,
                supplies: Math.min(100, r.supplies + 28),
              }))
            }
          >
            Buy stores (8g)
          </Button>
          <Button
            variant="secondary"
            disabled={run.gold < 10}
            onClick={() =>
              finishSoft((r) => ({
                ...r,
                gold: r.gold - 10,
                warlordHp: Math.min(r.warlordMax, r.warlordHp + 14),
                stamina: Math.min(100, r.stamina + 20),
              }))
            }
          >
            Physician (10g)
          </Button>
          <Button variant="ghost" onClick={() => finishSoft((r) => ({ ...r, morale: Math.min(100, r.morale + 6) }))}>
            Leave
          </Button>
        </div>
      </Screen>
    );
  }

  if (phase === "event" && run && node) {
    const forageNode = node.kind === "forage";
    return (
      <Screen>
        <h1 className="font-display text-4xl">{node.title}</h1>
        <p className="mt-3 text-muted">{node.body}</p>
        {forageNode ? (
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Button onClick={() => finishSoft((r) => forage(r, false))}>Forage carefully</Button>
            <Button variant="secondary" onClick={() => finishSoft((r) => forage(r, true))}>
              Strip the verge
            </Button>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => {
                const aided = {
                  ...run,
                  morale: Math.min(100, run.morale + 8),
                  supplies: Math.max(0, run.supplies - 6),
                };
                if (node.recruitId && !run.officers.some((o) => o.id === node.recruitId)) {
                  const next = markVisited(aided, node);
                  next.pendingLoot = {
                    title: "A debt of blood",
                    body: "They will march if you will have them.",
                    picks: [
                      {
                        id: "rec",
                        kind: "recruit",
                        name: `Take in ${OFFICERS[node.recruitId]?.name}`,
                        hint: OFFICERS[node.recruitId]?.blurb ?? "",
                        recruitId: node.recruitId,
                      },
                      {
                        id: "sup",
                        kind: "supplies",
                        name: "Ask for stores instead",
                        hint: "+16 supplies",
                        amount: 16,
                      },
                    ],
                  };
                  persist(next);
                  setPhase("loot");
                } else {
                  finishSoft(() => aided);
                }
              }}
            >
              Aid them
            </Button>
            <Button variant="secondary" onClick={() => finishSoft((r) => ({ ...r, gold: r.gold + 6 }))}>
              Take what is left
            </Button>
            <Button variant="ghost" onClick={() => finishSoft((r) => r)}>
              Walk on
            </Button>
          </div>
        )}
      </Screen>
    );
  }

  if (phase === "defeat" && run) {
    return (
      <End
        title="The column is broken"
        body={run.defeatReason ?? "The road took them."}
        run={run}
        onAgain={() => start(run.skirmish)}
        onTitle={() => setPhase("title")}
      />
    );
  }

  if (phase === "victory" && run) {
    return (
      <End
        title={run.skirmish ? "The mile is done" : "The gate is yours"}
        body={
          run.skirmish
            ? "A single clash. The campaign is longer, and worse."
            : "The usurper's banners come down. The hall remembers your name."
        }
        run={run}
        onAgain={() => start(run.skirmish)}
        onTitle={() => setPhase("title")}
      />
    );
  }

  return (
    <Screen>
      <p className="text-muted">The road is empty.</p>
      <Button className="mt-4" onClick={() => setPhase("title")}>
        Return
      </Button>
    </Screen>
  );
}

function Title({
  hasSave,
  settings,
  setSettings,
  onNew,
  onContinue,
  onSkirmish,
  onHow,
}: {
  hasSave: boolean;
  settings: Settings;
  setSettings: (s: Settings) => void;
  onNew: () => void;
  onContinue: () => void;
  onSkirmish: () => void;
  onHow: () => void;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <img
        src="/art/title.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-12 pt-16 sm:px-12 sm:pb-16">
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted">Real-time formation command</p>
        <h1 className="mt-2 font-display text-6xl leading-none tracking-tight sm:text-8xl">The Column</h1>
        <p className="mt-4 max-w-md text-muted">
          March a retinue through hostile country. Formation, officers, pace. The road is the antagonist.
        </p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button size="lg" onClick={onNew}>
            Raise the column
          </Button>
          {hasSave && (
            <Button size="lg" variant="secondary" onClick={onContinue}>
              Continue the march
            </Button>
          )}
          <Button size="lg" variant="secondary" onClick={onSkirmish}>
            Skirmish
          </Button>
          <Button size="lg" variant="ghost" onClick={onHow}>
            How to command
          </Button>
        </div>
        <button
          type="button"
          className="mt-6 flex size-11 items-center justify-center rounded-md text-muted ring-1 ring-border"
          onClick={() => setSettings({ ...settings, muted: !settings.muted })}
          aria-label={settings.muted ? "Unmute" : "Mute"}
        >
          {settings.muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
      </div>
    </div>
  );
}

function MapScreen({
  run,
  onPick,
  onTitle,
}: {
  run: RunState;
  onPick: (n: MapNode) => void;
  onTitle: () => void;
}) {
  const rows = useMemo(() => {
    const m = new Map<number, MapNode[]>();
    for (const n of run.map) {
      const arr = m.get(n.row) ?? [];
      arr.push(n);
      m.set(n.row, arr);
    }
    return [...m.entries()].sort((a, b) => a[0] - b[0]);
  }, [run.map]);

  return (
    <div className="min-h-dvh bg-bg px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-3xl items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
            Day {run.day} · {SECTORS[run.sector]?.name}
          </p>
          <h1 className="font-display text-4xl">The road ahead</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={onTitle}>
          Camp
        </Button>
      </div>
      <div className="mx-auto mt-4 flex max-w-3xl flex-wrap gap-3 text-xs tabular-nums text-muted">
        <span>Stamina {Math.round(run.stamina)}</span>
        <span>Morale {Math.round(run.morale)}</span>
        <span>Supplies {Math.round(run.supplies)}</span>
        <span>Gold {run.gold}</span>
        <span>
          Blood {Math.ceil(run.warlordHp)}/{run.warlordMax}
        </span>
      </div>
      {run.relics.length > 0 && (
        <p className="mx-auto mt-2 max-w-3xl text-xs text-muted">
          Relics: {run.relics.map((id) => RELICS[id]?.name ?? id).join(" · ")}
        </p>
      )}
      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-6">
        {rows.map(([row, nodes]) => {
          const sector = nodes[0]?.sector ?? 0;
          const prev = rows.find((r) => r[0] === row - 1)?.[1]?.[0]?.sector;
          return (
            <div key={row}>
              {prev !== sector && (
                <p className="mb-3 text-center text-[11px] uppercase tracking-[0.25em] text-muted">
                  {SECTORS[sector]?.name} · {SECTORS[sector]?.epithet}
                </p>
              )}
              <div className="flex justify-center gap-3">
                {nodes.map((n) => {
                  const open = run.available.includes(n.id);
                  const done = run.visited.includes(n.id);
                  return (
                    <button
                      key={n.id}
                      type="button"
                      disabled={!open}
                      onClick={() => onPick(n)}
                      className={cn(
                        "w-[9.5rem] rounded-lg p-3 text-left ring-1 ring-border sm:w-44",
                        open && "bg-raised hover:opacity-90",
                        done && "bg-surface opacity-50",
                        !open && !done && "bg-bg opacity-35",
                        n.kind === "boss" && open && "ring-accent",
                      )}
                    >
                      <p className="text-[10px] uppercase tracking-wide text-muted">{n.kind}</p>
                      <p className="font-display text-xl leading-tight">{n.title}</p>
                      {n.threat && <p className="mt-1 text-[11px] text-accent">{THREAT_LABEL[n.threat]}</p>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg px-6 py-12 sm:px-12">
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  );
}

function End({
  title,
  body,
  run,
  onAgain,
  onTitle,
}: {
  title: string;
  body: string;
  run: RunState;
  onAgain: () => void;
  onTitle: () => void;
}) {
  return (
    <Screen>
      <h1 className="font-display text-5xl">{title}</h1>
      <p className="mt-4 text-muted">{body}</p>
      <dl className="mt-8 grid grid-cols-2 gap-3 text-sm">
        <Stat k="Days" v={run.day} />
        <Stat k="Kills" v={run.kills} />
        <Stat k="Marches" v={run.marches} />
        <Stat k="Climaxes" v={run.microsWon} />
      </dl>
      <div className="mt-8 flex gap-2">
        <Button onClick={onAgain}>March again</Button>
        <Button variant="secondary" onClick={onTitle}>
          Title
        </Button>
      </div>
    </Screen>
  );
}

function Stat({ k, v }: { k: string; v: number }) {
  return (
    <div className="rounded-md bg-raised px-3 py-2 ring-1 ring-border">
      <dt className="text-[11px] uppercase tracking-wide text-muted">{k}</dt>
      <dd className="font-display text-2xl tabular-nums">{v}</dd>
    </div>
  );
}
