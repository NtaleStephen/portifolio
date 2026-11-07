"use client";

import type { CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { reducedMotion } from "@/lib/engine";
import { toast } from "@/lib/stores";
import { WinBar } from "./Icons";
import { Mock } from "./Mock";

const TABS = [["cs-1", "01 Overview"], ["cs-2", "02 Product"], ["cs-3", "03 Engineering"], ["cs-4", "04 Outcome"]];

/** case-study body. `sheet` = opened over the desktop (intercepted route), `page` = /projects/[slug] loaded directly */
export function CaseStudy({ project: p, mode, onClose, onHello }: { project: Project; mode: "sheet" | "page"; onClose?: () => void; onHello?: () => void }) {
  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const t = document.getElementById(id)!;
    const behavior = reducedMotion() ? "auto" : "smooth";
    const sc = t.closest<HTMLElement>(".sheet-scroll");
    if (mode === "sheet" && sc) sc.scrollTo({ top: t.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 10, behavior });
    else scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior });
  };

  return (
    <>
      {mode === "sheet"
        ? <button className="cs-back" type="button" onClick={onClose}>← Back to selected work</button>
        : <Link className="cs-back" href="/#work">← Back to selected work</Link>}
      <div className="cs-hero" style={{ "--c": p.color } as CSSProperties}>
        <span className="cs-badge"><i />{p.name}</span>
        <div className="eyebrow" style={{ marginTop: 14 }}>{p.kind} · {p.status}</div>
        <h1 id="csTitle">{p.headline}</h1>
        <p>{p.tagline} <span className="ph">Write two sentences on who it&apos;s for and what it does for them.</span></p>
        <a
          className="aqua"
          href={p.liveUrl ?? "#"}
          target={p.liveUrl ? "_blank" : undefined}
          rel={p.liveUrl ? "noopener" : undefined}
          onClick={(e) => { if (!p.liveUrl) { e.preventDefault(); toast("Add the live link for this project in content/projects.ts."); } }}
        >
          See the live product <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16"><use href="#arrow-ur" /></svg>
        </a>
      </div>
      <div className="cs-meta"><div><span>My role</span>{p.role}</div><div><span>The scope</span>{p.scope}</div><div><span>Built for</span>{p.builtFor}</div></div>
      <div className="cs-shot"><WinBar title={`${p.slug} / overview`} /><div className="frame"><Mock project={p} /></div></div>
      <p className="cs-capt">Placeholder screenshot. Swap in a real capture of {p.name}.</p>
      <nav className="cs-tabs" aria-label="Case study sections">
        {TABS.map(([id, label]) => <a key={id} href={`#${id}`} onClick={(e) => jump(e, id)}>{label}</a>)}
      </nav>
      <section className="cs-sec" id="cs-1">
        <div className="eyebrow">01 / The problem &amp; my role</div>
        <h2>Name the problem in one line.</h2>
        <div className="cs-two">
          <div><p>Who had the problem, how they handled it before, and what it cost them.</p></div>
          <div>
            <p><span className="ph">Explain what you were responsible for and the constraints you worked under: budget, connectivity, devices, time.</span></p>
            <div className="eyebrow" style={{ marginTop: 18 }}>What I owned</div>
            <ul className="checks"><li>Product scope and roadmap</li><li>Data model and APIs</li><li>Frontend and release</li></ul>
          </div>
        </div>
      </section>
      <section className="cs-sec" id="cs-2">
        <div className="eyebrow">02 / Inside the product</div>
        <h2>{"From first tap\nto finished task."}</h2>
        <div className="steps"><div><small>01</small>Sign up</div><div><small>02</small>Set up</div><div><small>03</small>Do the job</div><div><small>04</small>Get paid</div></div>
        <div className="cs-two">
          <div><h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-.02em" }}>Describe one key feature.</h3></div>
          <div>
            <p>What the user sees, what the system does behind it, and why it matters.</p>
            <ul className="checks"><li>One visible behaviour</li><li>One rule the system enforces</li><li>One export or integration</li></ul>
          </div>
        </div>
      </section>
      <section className="cs-sec" id="cs-3">
        <div className="eyebrow">03 / Under the surface</div>
        <h2>How it&apos;s built.</h2>
        <div className="stack">
          <div><h3>Frontend</h3><p>Framework, design system, offline handling.</p></div>
          <div><h3>Backend</h3><p>API style, database, background jobs.</p></div>
          <div><h3>Payments</h3><p>Mobile money, cards, reconciliation.</p></div>
          <div><h3>Hosting</h3><p>Where it runs and how it&apos;s deployed.</p></div>
        </div>
        <div className="decisions">
          <div className="decision"><small>Engineering decision / 01</small><h3>A choice you made.</h3><p>What you picked, what you rejected, and why.</p></div>
          <div className="decision"><small>Engineering decision / 02</small><h3>A trade-off you accepted.</h3><p>What it cost and what it bought you.</p></div>
          <div className="decision"><small>Engineering decision / 03</small><h3>A risk you designed for.</h3><p>The failure you planned around.</p></div>
        </div>
      </section>
      <section className="cs-sec" id="cs-4">
        <div className="eyebrow">04 / What shipped</div>
        <h2>The outcome, in numbers.</h2>
        <div className="cs-two">
          <div><p>Users, orders, uptime, time saved. Pick the two numbers that matter most.</p></div>
          <div><ul className="checks"><li>Shipped to <span className="ph">N</span> users</li><li><span className="ph">X%</span> faster than the old way</li><li>What you would build next</li></ul></div>
        </div>
      </section>
      <div className="cs-cta">
        <h2>Building something ambitious?</h2>
        {mode === "sheet"
          ? <button className="aqua" type="button" onClick={onHello}>Say hello</button>
          : <Link className="aqua" href="/#contact">Say hello</Link>}
      </div>
    </>
  );
}
