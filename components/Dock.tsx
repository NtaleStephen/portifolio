"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { finePointer, reducedMotion, useFrame, useStation, type Station } from "@/lib/engine";
import { GoLink } from "./GoLink";
import { HelloButton } from "./HelloButton";
import { MiniFolder } from "./Icons";
import { Portrait } from "./Portrait";

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
      <GoLink className={btn("about")} to="about"><span className="ic ic-me relative"><Portrait sizes="46px" /></span><span className="tip">About me</span></GoLink>
      <span className="dock-sep" aria-hidden="true" />
      <a className="dock-btn" href={site.github} target="_blank" rel="noopener"><span className="ic ic-code"><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12.297c0-6.627-5.373-12-12-12" /></svg></span><span className="tip">GitHub</span></a>
      <HelloButton className="dock-btn" aria-label="Say hello"><span className="ic ic-mail"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="m4.5 7.5 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span><span className="tip">Say hello</span></HelloButton>
      <span className="dock-progress" aria-hidden="true"><i ref={progressRef} /></span>
    </nav>
  );
}
