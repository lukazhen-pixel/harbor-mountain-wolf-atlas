import type { RunState } from "./types";

const KEY = "the-column-save-v1";
const SETTINGS = "the-column-settings-v1";
const SAVE_VERSION = 1;

export interface Settings {
  version: number;
  muted: boolean;
  shake: boolean;
  seenHow: boolean;
}

const defaultSettings: Settings = {
  version: 1,
  muted: false,
  shake: true,
  seenHow: false,
};

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS);
    if (!raw) return { ...defaultSettings };
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return { ...defaultSettings, ...parsed, version: 1 };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(s: Settings) {
  try {
    localStorage.setItem(SETTINGS, JSON.stringify(s));
  } catch {
    /* private mode */
  }
}

export function loadRun(): RunState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RunState;
    if (!parsed || parsed.version !== SAVE_VERSION) return null;
    if (!Array.isArray(parsed.officers) || !Array.isArray(parsed.map)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveRun(run: RunState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(run));
  } catch {
    /* ignore */
  }
}

export function clearRun() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
