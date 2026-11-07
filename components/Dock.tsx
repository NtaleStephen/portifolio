"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { finePointer, reducedMotion, useFrame, useStation, type Station } from "@/lib/engine";
import { GoLink } from "./GoLink";
import { MiniFolder, Portrait } from "./Icons";

export function Dock() {
  const station = useStation();
  const dockRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLElement>(null);

  useFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressRef.current!.style.width = (max > 0 ? (scrollY / max) * 100 : 0).toFixed(1) + "%";
  });

  // magnification
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const dock = dockRef.current!;
    const btns = [...dock.querySelectorAll<HTMLElement>(".dock-btn")];
    const move = (e: PointerEvent) => btns.forEach((b) => {
      const r = b.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const s = 1 + 0.55 * Math.max(0, 1 - d / 110);
      b.style.transform = `scale(${s.toFixed(3)})`;
    });
    const leave = () => btns.forEach((b) => (b.style.transform = ""));
    dock.addEventListener("pointermove", move);
    dock.addEventListener("pointerleave", leave);
    return () => { dock.removeEventListener("pointermove", move); dock.removeEventListener("pointerleave", leave); };
  }, []);

  const btn = (st: Station) => `dock-btn${station === st ? " on" : ""}`;
  return (
    <nav className="dock" ref={dockRef} aria-label="Dock">
      <GoLink className={btn("top")} to="top"><span className="ic ic-mark"><svg aria-hidden="true" viewBox="0 0 34 24"><use href="#mark" /></svg></span><span className="tip">Desktop</span></GoLink>
      <GoLink className={btn("work")} to="work"><span className="ic ic-folder"><MiniFolder /></span><span className="tip">Selected work</span></GoLink>
      <GoLink className={btn("about")} to="about"><span className="ic ic-me"><Portrait variant="icon" /></span><span className="tip">About me</span></GoLink>
      <GoLink className={btn("experience")} to="experience"><span className="ic ic-doc"><svg width="24" height="24" aria-hidden="true" style={{ color: "#3157E8" }} viewBox="0 0 24 24"><use href="#doc" /></svg></span><span className="tip">Experience</span></GoLink>
      <span className="dock-sep" aria-hidden="true" />
      <a className="dock-btn" href={site.github} target="_blank" rel="noopener"><span className="ic ic-code"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7 3 12l5 5M16 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span className="tip">GitHub</span></a>
      <GoLink className={btn("contact")} to="contact"><span className="ic ic-mail"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="m4.5 7.5 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span><span className="tip">Say hello</span></GoLink>
      <span className="dock-progress" aria-hidden="true"><i ref={progressRef} /></span>
    </nav>
  );
}
