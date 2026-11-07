"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/* Scroll engine.
   Every pinned stage registers a frame callback with useFrame(). On scroll, resize or pointer move the engine
   runs all callbacks in one requestAnimationFrame, then works out the current station. Callbacks write styles
   straight to the DOM (no React state per frame), exactly like the prototype's render(). */

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const reducedMotion = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => typeof window !== "undefined" && matchMedia("(pointer: fine)").matches;

let compact = false;
export const isCompact = () => compact;
function setCompact() {
  compact = innerWidth < 860 || innerHeight < 560;
  document.documentElement.classList.toggle("compact", compact);
}

/** progress (0 to 1) of a pinned stage */
export function progressOf(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const total = el.offsetHeight - innerHeight;
  return total > 0 ? clamp(-r.top / total) : 0;
}
export function stageTop(el: HTMLElement) {
  let y = 0;
  let n: HTMLElement | null = el;
  while (n) { y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
  return y;
}

/** mouse position on the desktop, -1 to 1 */
export const mouse = { x: 0, y: 0 };

// the finder's browse window: project i owns a slice of [BROWSE_A, BROWSE_B] of the work stage
export const BROWSE_A = 0.16, BROWSE_B = 0.84;

/* ---------- stations ---------- */
export type Station = "top" | "work" | "about" | "experience" | "contact";
let station: Station = "top";
const stationSubs = new Set<() => void>();
const subscribeStation = (cb: () => void) => { stationSubs.add(cb); return () => { stationSubs.delete(cb); }; };
export const useStation = () => useSyncExternalStore(subscribeStation, () => station, () => "top" as Station);

/* ---------- callbacks ---------- */
type Cb = () => void;
const frameCbs = new Set<Cb>();
const resizeCbs = new Set<Cb>();

/** run `cb` on every engine frame; the latest closure is always used */
export function useFrame(cb: Cb) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    const run = () => ref.current();
    frameCbs.add(run);
    return () => { frameCbs.delete(run); };
  }, []);
}
/** run `cb` on resize (and once fonts load), before the frame is rendered */
export function useResize(cb: Cb) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    const run = () => ref.current();
    resizeCbs.add(run);
    return () => { resizeCbs.delete(run); };
  }, []);
}

let stations: HTMLElement[] = [];
function render() {
  frameCbs.forEach((cb) => cb());
  const mid = innerHeight * 0.5;
  let cur: Station = "top";
  stations.forEach((s) => { if (s.getBoundingClientRect().top <= mid) cur = s.dataset.station as Station; });
  if (cur !== station) { station = cur; stationSubs.forEach((cb) => cb()); }
}

let ticking = false;
export function requestRender() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; render(); });
}

/** the prototype's sizeStages(): re-measure everything, then render */
export function resize() {
  setCompact();
  stations = [...document.querySelectorAll<HTMLElement>("[data-station]")];
  resizeCbs.forEach((cb) => cb());
  render();
}

/* ---------- navigation ---------- */
export function goTo(name: Station, instant = false) {
  const sec = document.querySelector<HTMLElement>(`[data-station="${name}"]`);
  if (!sec) return;
  const reduce = reducedMotion();
  let top = stageTop(sec);
  if (!reduce) {
    if (name === "work") top += (sec.offsetHeight - innerHeight) * (BROWSE_A + 0.005);
    if (name === "about" && !compact) top += (sec.offsetHeight - innerHeight) * 0.5;
    if (name === "experience" || name === "contact") top -= 20;
  }
  scrollTo({ top: Math.max(0, top), behavior: reduce || instant ? "auto" : "smooth" });
}

/** mount once, after every stage (effects run in tree order, so render <Engine /> last) */
export function useEngine() {
  useEffect(() => {
    if (reducedMotion()) document.documentElement.classList.add("calm");
    resize();
    // deep links like /#about land on the right point inside the pinned stage
    const hash = location.hash.slice(1) as Station;
    if (hash) goTo(hash, true);

    let alive = true;
    document.fonts?.ready.then(() => { if (alive) resize(); });
    const onScroll = () => requestRender();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", resize);
    return () => {
      alive = false;
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", resize);
    };
  }, []);
}
