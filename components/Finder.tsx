"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { filters, projects as allProjects, statusColor, type Filter, type Project } from "@/content/projects";
import { CoverFlow } from "./CoverFlow";
import { WinBar } from "./Icons";

/** Finder window: filter bar, Cover Flow, caption and list view */
export function Finder({ filter, onFilter, projects, active, onPick, onOpen }: {
  filter: Filter;
  onFilter: (f: Filter) => void;
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
      <WinBar title="selected-work"><span className="win-meta">{allProjects.length} projects</span></WinBar>
      <div className="f-toolbar">
        <div className="crumb"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#folder-ic" /></svg>Code / Projects</div>
        <div className="seg" role="group" aria-label="Filter projects">
          {filters.map((f) => <button key={f} type="button" aria-pressed={f === filter} onClick={() => onFilter(f)}>{f}</button>)}
        </div>
      </div>
      <CoverFlow projects={projects} active={active} onCard={onPick} onOpen={onOpen} />
      <div className="flow-cap" aria-live="polite">
        {current && <div className="swap" key={current.slug}><b>{current.name}</b><span>{current.tagline}</span></div>}
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
            <b><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#folder-ic" /></svg>{p.name}</b>
            <span>{p.tagline}</span>
            <span className="k">{p.kind}</span>
            <span className="status" style={{ "--sc": statusColor[p.status] } as CSSProperties}>{p.status}</span>
          </button>
        ))}
      </div>
      <div className="f-foot">
        <span>{current ? `${active + 1} of ${projects.length} projects · built with intention` : ""}</span>
        <span>Click the highlighted project to open its case study</span>
      </div>
    </div>
  );
}
