/** Device → actions. Gameplay reads only this. */

export interface Actions {
  moveX: number;
  rush: boolean;
  halt: boolean;
  pause: boolean;
  form1: boolean;
  form2: boolean;
  form3: boolean;
  form4: boolean;
  ability: boolean;
  slotV: boolean;
  slotL: boolean;
  slotR: boolean;
  slotRear: boolean;
  slotC: boolean;
  confirm: boolean;
}

const empty = (): Actions => ({
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
  confirm: false,
});

export class Input {
  keys = new Set<string>();
  injected = new Set<string>();
  prev: Actions = empty();
  cur: Actions = empty();
  just: Actions = empty();
  pointer = { x: 0, y: 0, down: false, clicked: false, id: -1 };
  private clickLatch = false;
  touchMove = 0;
  touchRush = false;
  touchHalt = false;

  attach(el: HTMLElement) {
    const down = (e: KeyboardEvent) => {
      this.keys.add(e.code);
      if (GAME.has(e.code)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => this.keys.delete(e.code);
    const clear = () => this.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clear();
    });

    const pd = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      this.pointer.down = true;
      this.pointer.id = e.pointerId;
      this.syncPointer(e, el);
      this.clickLatch = true;
    };
    const pm = (e: PointerEvent) => {
      if (this.pointer.down && e.pointerId !== this.pointer.id) return;
      this.syncPointer(e, el);
    };
    const pu = (e: PointerEvent) => {
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

  private syncPointer(e: PointerEvent, el: HTMLElement) {
    const r = el.getBoundingClientRect();
    this.pointer.x = ((e.clientX - r.left) / r.width) * el.clientWidth;
    this.pointer.y = ((e.clientY - r.top) / r.height) * el.clientHeight;
  }

  setKeys(codes: string[]) {
    this.injected = new Set(codes);
  }

  poll() {
    this.prev = this.cur;
    const held = (c: string) => this.keys.has(c) || this.injected.has(c);
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
      confirm: held("Enter"),
    };
    const just = empty();
    (Object.keys(just) as (keyof Actions)[]).forEach((k) => {
      if (k === "moveX") return;
      (just as unknown as Record<string, boolean>)[k] = this.cur[k] === true && this.prev[k] !== true;
    });
    this.just = just;
    this.pointer.clicked = this.clickLatch;
    this.clickLatch = false;
  }
}

const GAME = new Set([
  "Space",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);
