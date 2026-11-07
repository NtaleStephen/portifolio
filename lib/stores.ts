"use client";

import { useEffect, useSyncExternalStore } from "react";

/* Tiny external stores for state shared across distant components. */
function store<T>(initial: T) {
  let value = initial;
  const subs = new Set<() => void>();
  return {
    get: () => value,
    set(v: T) { value = v; subs.forEach((cb) => cb()); },
    use: () =>
      useSyncExternalStore(
        (cb) => { subs.add(cb); return () => { subs.delete(cb); }; },
        () => value,
        () => initial,
      ),
  };
}

/* ---------- wallpaper moods ---------- */
export const MOODS = [["Morning", "#F3F6FB"], ["Sand", "#F7F3EC"], ["Mint", "#EEF6F2"], ["Dusk", "#F1EEF8"]] as const;
const moodStore = store(0);
let moodLoaded = false;
export function useMood() {
  useEffect(() => {
    if (moodLoaded) return;
    moodLoaded = true;
    try { moodStore.set(+(localStorage.getItem("mood") || 0) % MOODS.length); } catch {}
  }, []);
  return moodStore.use();
}
export function nextMood() {
  const m = (moodStore.get() + 1) % MOODS.length;
  moodStore.set(m);
  try { localStorage.setItem("mood", String(m)); } catch {}
}

/* ---------- toast ---------- */
const toastStore = store<string | null>(null);
let toastT: ReturnType<typeof setTimeout>;
export const useToast = toastStore.use;
export function toast(text: string) {
  toastStore.set(text);
  clearTimeout(toastT);
  toastT = setTimeout(() => toastStore.set(null), 2600);
}
