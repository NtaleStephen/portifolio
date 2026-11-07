"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { isCompact, useResize } from "@/lib/engine";
import { Mock } from "./Mock";

export function CoverFlow({ projects, active, onCard, onOpen }: {
  projects: Project[];
  active: number;
  onCard: (i: number) => void;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(360);

  const measure = () => {
    const w = ref.current!.clientWidth, h = ref.current!.clientHeight;
    setCardW(Math.min(380, w * (isCompact() ? 0.62 : 0.4), h * 0.78 * 1.6));
  };
  useResize(measure);
  useEffect(measure, [projects]);

  return (
    <div className="flow" ref={ref} aria-label="Project previews" style={{ "--cw": `${cardW}px` } as CSSProperties}>
      {projects.map((p, i) => {
        const k = i - active, a = Math.abs(k), s = Math.sign(k);
        const tx = k === 0 ? 0 : s * (cardW * 0.66 + (a - 1) * cardW * 0.2);
        const tz = k === 0 ? 70 : -a * 70;
        const ry = k === 0 ? 0 : -s * 52;
        return (
          <div
            key={p.slug}
            className={`flow-card${k === 0 ? " is-active" : ""}`}
            role="button"
            tabIndex={k === 0 ? 0 : -1}
            aria-label={p.name}
            style={{ transform: `translate(-50%,-50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg)`, zIndex: 100 - a, opacity: a > 3 ? 0 : 1 }}
            onClick={() => (k === 0 ? onOpen(p) : onCard(i))}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p); } }}
          >
            <div className="shot"><Mock project={p} /></div>
            <span className="flow-open">
              {p.status === "Sample" ? "Explore project" : "Read the case study"} <svg width="12" height="12" aria-hidden="true" viewBox="0 0 16 16"><use href="#arrow-ur" /></svg>
            </span>
          </div>
        );
      })}
    </div>
  );
}
