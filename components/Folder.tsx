"use client";

import { useRef, type RefObject } from "react";
import { ease, goTo, lerp, mouse, progressOf, reducedMotion, seg, useFrame, useResize } from "@/lib/engine";

const W = 520, H = 410;

/** the "Selected work" folder: travels from its desktop slot to the centre, grows, opens and the view dives in */
export function Folder({ stageRef, vpRef, slotRef }: {
  stageRef: RefObject<HTMLElement | null>;
  vpRef: RefObject<HTMLDivElement | null>;
  slotRef: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0, y: 0, s: 0.2 });

  // where the folder sits on the desktop (centre of the slot, relative to the viewport centre)
  useResize(() => {
    const vp = vpRef.current!, slot = slotRef.current!;
    const sx = slot.offsetLeft + slot.offsetWidth / 2, sy = slot.offsetTop + 46;
    start.current = { x: sx - vp.clientWidth / 2, y: sy - vp.clientHeight / 2, s: 110 / W };
  });

  useFrame(() => {
    if (reducedMotion()) return;
    const p = progressOf(stageRef.current!);
    const vw = vpRef.current!.clientWidth, vh = vpRef.current!.clientHeight;
    const fs = start.current;
    const s1 = Math.min((vw * 0.78) / W, ((vh - 120) * 0.82) / H);
    const f = ease(seg(p, 0.06, 0.45)), o = ease(seg(p, 0.45, 0.68)), d = ease(seg(p, 0.7, 1));
    const x = lerp(fs.x + mouse.x * -10, 0, f), y = lerp(fs.y + mouse.y * -10, 20, f);
    const s = lerp(fs.s, s1, f) * (1 + d * 3.4);
    const el = ref.current!;
    el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${s.toFixed(4)})`;
    el.style.opacity = (1 - seg(p, 0.86, 0.99)).toFixed(3);
    frontRef.current!.style.transform = `perspective(1300px) rotateX(${(-o * 46).toFixed(2)}deg)`;
    paperRef.current!.style.transform = `translateY(${(-o * 120).toFixed(1)}px)`;
  });

  return (
    <div
      className="folder"
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label="Open selected work"
      onClick={() => goTo("work")}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo("work"); } }}
    >
      <div className="f-tab" />
      <div className="f-back" />
      <div className="f-paper" ref={paperRef}><i /><i /><i /></div>
      <div className="f-front" ref={frontRef}><svg aria-hidden="true" viewBox="0 0 34 24"><use href="#mark" /></svg></div>
    </div>
  );
}
