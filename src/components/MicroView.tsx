import { useEffect, useRef } from "react";
import { createMicro, type MicroResult } from "@/game/microgames";
import type { MicroId } from "@/game/types";
import { Input } from "@/game/input";
import { unlockAudio } from "@/game/audio";

export function MicroView({
  id,
  title,
  body,
  onDone,
}: {
  id: MicroId;
  title: string;
  body: string;
  onDone: (r: MicroResult) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
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
          confirm: input.just.confirm || input.just.pause,
        });
        game.draw(ctx, w, h);
      }
      if (game.done && game.result && !sent) {
        sent = true;
        window.setTimeout(() => onDone(game.result!), 500);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      detach();
    };
  }, [id, onDone]);

  return (
    <div className="relative h-dvh w-full bg-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-4 pt-[max(1rem,env(safe-area-inset-top))] text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Climax</p>
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">{body}</p>
      </div>
      <div ref={wrapRef} className="h-full w-full">
        <canvas ref={canvasRef} className="h-full w-full touch-none" style={{ touchAction: "none" }} />
      </div>
    </div>
  );
}
