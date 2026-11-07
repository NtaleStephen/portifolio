"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/content/projects";
import { goTo } from "@/lib/engine";
import { CaseStudy } from "./CaseStudy";
import { WinBar } from "./Icons";

/** the case study as a sheet over the desktop. The parent owns open/close and keeps the URL in step. */
export function CaseStudySheet({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const helloRef = useRef(false);

  useEffect(() => {
    const lastFocus = document.activeElement as HTMLElement | null;
    const y = scrollY;
    document.body.style.overflow = "hidden";
    closeRef.current!.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus?.focus?.({ preventScroll: true });
      // onClose() restores an older scroll position; put the desktop back where the visitor left it
      const settle = () => (helloRef.current ? goTo("contact") : scrollTo(0, y));
      settle();
      requestAnimationFrame(settle);
    };
  }, [onClose]);
  const hello = () => { helloRef.current = true; onClose(); };

  // switching between case studies reuses the sheet: start each one at the top
  useEffect(() => { scrollRef.current!.scrollTop = 0; }, [project.slug]);

  return (
    <div className="sheet-back" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="win sheet" role="dialog" aria-modal="true" aria-labelledby="csTitle">
        <WinBar title={`case-study / ${project.slug}`}>
          <button className="sheet-close" ref={closeRef} type="button" onClick={() => onClose()}>Close</button>
        </WinBar>
        <div className="sheet-scroll" ref={scrollRef}><div className="cs"><CaseStudy project={project} mode="sheet" onClose={onClose} onHello={hello} /></div></div>
      </div>
    </div>
  );
}
