"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { statusColor, type Project } from "@/content/projects";
import { CoverFlow } from "./CoverFlow";
import { WinBar } from "./Icons";

/** Finder window: Cover Flow, caption and list view */
export function Finder({ projects, active, onPick, onOpen }: {
  projects: Project[];
  active: number;
  onPick: (i: number) => void;
  onOpen: (p: Project) => void;
}) {
  const rowsRef = useRef<HTMLDivElement>(null);
  const current = projects[active];

  // keep the selected row in view inside the list
  useEffect(() => {
    const rows = rowsRef.current!, row = rows.children[active] as HTMLElement | undefined;
    if (!row) return;
    const top = row.offsetTop, bot = top + row.offsetHeight;
    if (top < rows.scrollTop) rows.scrollTop = top;
    else if (bot > rows.scrollTop + rows.clientHeight) rows.scrollTop = bot - rows.clientHeight;
  }, [active, projects]);

  return (
    <div className="win finder">
      <WinBar title="selected-work"><span className="win-meta">{projects.length} {projects.length === 1 ? "project" : "projects"}</span></WinBar>
      <div className="f-toolbar">
        <div className="crumb"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#folder-ic" /></svg>Code / Projects</div>
        {current && <a className="visit" href={current.url} target="_blank" rel="noopener">Visit {new URL(current.url).host} <svg width="12" height="12" aria-hidden="true" viewBox="0 0 16 16"><use href="#arrow-ur" /></svg></a>}
      </div>
      <CoverFlow projects={projects} active={active} onCard={onPick} onOpen={onOpen} />
      <div className="flow-cap" aria-live="polite">
        {current && <div className="swap" key={current.slug}><b className="flex items-center justify-center gap-2"><Image src={current.logo} alt="" width={22} height={22} className="rounded-md" />{current.name}</b><span>{current.tagline}</span></div>}
      </div>
      <div className="list-head" aria-hidden="true"><span>Name</span><span>What it does</span><span className="k">Kind</span><span>Status</span></div>
      <div className="rows" ref={rowsRef} role="listbox" aria-label="Projects">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            className={`row${i === active ? " on" : ""}`}
            type="button"
            role="option"
            aria-selected={i === active}
            onClick={() => (i === active ? onOpen(p) : onPick(i))}
          >
            <b><Image src={p.logo} alt="" width={16} height={16} className="shrink-0 rounded-[4px]" />{p.name}</b>
            <span>{p.tagline}</span>
            <span className="k">{p.kind}</span>
            <span className="status" style={{ "--sc": statusColor[p.status] } as CSSProperties}>{p.status}</span>
          </button>
        ))}
      </div>
      <div className="f-foot">
        <span>{current ? `${active + 1} of ${projects.length} · built with intention` : ""}</span>
        <span>Click the highlighted project to visit it</span>
      </div>
    </div>
  );
}
