"use client";

import { useRef } from "react";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { clamp, useFrame } from "@/lib/engine";
import { GoLink } from "./GoLink";
import { WinBar } from "./Icons";
import { TypeHeading } from "./TypeHeading";

/** station 4: sticky left column, timeline whose fill line follows scroll */
export function ExperienceLog() {
  const logRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLElement>(null);

  // runs with reduced motion too, like the prototype
  useFrame(() => {
    const log = logRef.current!, r = log.getBoundingClientRect();
    fillRef.current!.style.height = (clamp((innerHeight * 0.62 - r.top) / r.height) * 100).toFixed(1) + "%";
    log.querySelectorAll(".entry").forEach((en) => en.classList.toggle("lit", en.getBoundingClientRect().top < innerHeight * 0.74));
  });

  return (
    <section className="exp" id="experience" data-station="experience" aria-labelledby="expTitle">
      <div className="wrap exp-grid">
        <div className="exp-left">
          <div className="eyebrow">03 / The journey so far</div>
          <TypeHeading className="sec-h2" id="expTitle" station="experience" text={"Good work.\nGood people."} />
          <p>Products I&apos;ve built, teams I&apos;ve worked with, and what I learned along the way.</p>
          <GoLink className="aqua ghost" to="contact"><svg aria-hidden="true" viewBox="0 0 24 24"><use href="#doc" /></svg>Request my résumé</GoLink>
          <div className="skills">
            <h3>Things I bring to the table</h3>
            <ul>
              {site.skills.map((s) => <li key={s}><svg aria-hidden="true" viewBox="0 0 14 14"><use href="#check" /></svg>{s}</li>)}
            </ul>
          </div>
        </div>
        <div className="win log" ref={logRef}>
          <WinBar title="experience.log"><span className="win-meta">{experience.length} chapters</span></WinBar>
          <div className="log-body">
            <div className="log-line" aria-hidden="true"><i ref={fillRef} /></div>
            <div>
              {experience.map((e, i) => (
                <article className="entry" key={e.org + e.role}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div><span className="when">{e.when}</span><h3>{e.role}</h3><span className="org">{e.org}</span><span className="where">{e.where}</span><p>{e.text}</p></div>
                  <span className="logo" aria-hidden="true">{e.logo}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
