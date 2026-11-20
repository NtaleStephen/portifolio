"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/content/projects";
import {
  BROWSE_A, BROWSE_B, ease, isCompact, progressOf, reducedMotion, seg, stageTop, useFrame,
} from "@/lib/engine";
import { Finder } from "./Finder";
import { MiniFolder } from "./Icons";
import { TypeHeading } from "./TypeHeading";

/** station 2: a tunnel of frames zooms out into the Finder; scroll position drives the active project */
export function Work() {
  const stageRef = useRef<HTMLElement>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  activeRef.current = active;

  const n = projects.length;

  useFrame(() => {
    if (reducedMotion()) return;
    const stage = stageRef.current!, vp = vpRef.current!, cam = camRef.current!;
    const p = progressOf(stage);
    const compact = isCompact();
    // only show the finder once its stage is pinned, so it never slides in over the folder
    vp.style.visibility = stage.getBoundingClientRect().top > 1 ? "hidden" : "";
    const intro = ease(seg(p, 0, 0.14));
    tunnelRef.current!.querySelectorAll<HTMLElement>("i").forEach((t, k) => {
      t.style.transform = `scale(${(0.55 + k * 0.16 + intro * 2.2).toFixed(3)})`;
      t.style.opacity = ((1 - intro) * (0.9 - k * 0.15)).toFixed(3);
    });
    const exit = ease(seg(p, 0.86, 1));
    let sc = (0.5 + 0.5 * intro) * (1 - exit * 0.45);
    const op = (0.25 + 0.75 * intro) * (1 - (compact ? 0 : seg(p, 0.9, 1)));
    if (compact) sc = Math.max(sc, 0.9);
    cam.style.transform = `translateX(${(-exit * innerWidth * (compact ? 0 : 0.2)).toFixed(1)}px) rotate(${(-exit * 3).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
    cam.style.opacity = op.toFixed(3);
    vp.style.pointerEvents = p < 0.05 || op < 0.3 ? "none" : "";
    vp.querySelectorAll<HTMLElement>(".clutter").forEach((c) => (c.style.transform = `translateY(${(-(p - 0.5) * +c.dataset.depth! * 220).toFixed(1)}px)`));
    if (n) {
      const i = Math.min(n - 1, Math.floor(seg(p, BROWSE_A, BROWSE_B) * n));
      if (i !== activeRef.current) { activeRef.current = i; setActive(i); }
    }
  });

  // map a project index to a scroll position inside the pinned finder
  const pick = (i: number) => {
    if (reducedMotion()) { setActive(i); return; }
    const stage = stageRef.current!;
    const total = stage.offsetHeight - innerHeight;
    scrollTo({ top: stageTop(stage) + total * (BROWSE_A + ((BROWSE_B - BROWSE_A) * (i + 0.5)) / n), behavior: "smooth" });
  };
  const open = (p: Project) => window.open(p.url, "_blank", "noopener,noreferrer");

  return (
    <section
      className="stage work-stage overlap"
      id="work"
      data-station="work"
      aria-labelledby="workTitle"
      ref={stageRef}
      style={{ height: `${150 + n * 55}vh` }}
    >
      <div className="vp work-vp" ref={vpRef}>
        <div className="tunnel" ref={tunnelRef} aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="clutter" data-depth="1.2" style={{ left: "2%", top: "62%" }} aria-hidden="true"><div className="paper-sheet" style={{ transform: "rotate(-8deg)" }} /></div>
        <div className="clutter" data-depth="2" style={{ left: "-2%", top: "14%" }} aria-hidden="true"><div className="mini-folder" style={{ transform: "rotate(-10deg) scale(1.1)" }}><MiniFolder /></div></div>
        <div className="clutter" data-depth="1.6" style={{ right: "3%", top: "58%" }} aria-hidden="true"><div className="mini-folder"><MiniFolder /></div></div>
        <div className="clutter hide-sm" data-depth=".8" style={{ right: "-2%", top: "30%" }} aria-hidden="true"><div className="ghost-frame" /></div>
        <div className="clutter" data-depth="1.1" style={{ right: "4%", bottom: "-6%" }} aria-hidden="true"><div className="paper-sheet" style={{ transform: "rotate(9deg)" }} /></div>
        <div className="clutter hide-sm" data-depth="2.4" style={{ right: "22%", top: "12%" }} aria-hidden="true"><div className="mini-note" style={{ transform: "rotate(6deg)" }} /></div>

        <div className="cam" ref={camRef}>
          <div className="sec-head">
            <div className="eyebrow">01 / Selected work</div>
            <TypeHeading className="sec-h2" id="workTitle" station="work" text="What I'm building." />
            <p className="sec-sub">Soko, an online store builder for growing businesses.</p>
            <span className="side-note hand">a peek inside my project folder ↗</span>
          </div>
          <Finder
            projects={projects}
            active={Math.min(active, Math.max(0, n - 1))}
            onPick={pick}
            onOpen={open}
          />
        </div>
      </div>
    </section>
  );
}
