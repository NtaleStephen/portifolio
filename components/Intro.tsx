"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import porsche from "@/content/assets/porsche.jpg";
import { site } from "@/content/site";
import { Mark } from "./Icons";

const WORDS = ["Working", "towards", "my", "Porsche", "funding."];

/** Opening scene: a Porsche drives itself in while the line is set. Shown once per tab session; skippable. */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  const finish = useCallback(() => {
    const el = ref.current;
    if (!el || el.classList.contains("leaving")) return;
    el.classList.add("leaving");
    setTimeout(() => {
      document.documentElement.classList.add("no-intro");
      document.body.style.overflow = "";
      try { sessionStorage.setItem("intro-seen", "1"); } catch {}
    }, 700);
  }, []);

  useEffect(() => {
    if (document.documentElement.classList.contains("no-intro")) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(finish, 7000);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") finish(); };
    addEventListener("keydown", onKey);
    return () => { clearTimeout(t); removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [finish]);

  return (
    <div className="intro" ref={ref} role="dialog" aria-modal="true" aria-label="Intro">
      <noscript><style>{".intro{display:none!important}"}</style></noscript>
      <div className="intro-bar">
        <span className="intro-brand"><Mark />code&apos;s desktop</span>
        <button className="intro-skip" type="button" onClick={finish}>Skip intro ↗</button>
      </div>
      <div className="intro-stage">
        <h1 className="intro-h">
          {WORDS.map((w, i) => (
            <span key={w}>
              <span className="w" style={{ "--i": i } as React.CSSProperties}>{w === "Porsche" ? <em>{w}</em> : w}</span>{" "}
            </span>
          ))}
        </h1>
        <div className="intro-car">
          <span className="intro-road" aria-hidden="true" />
          <div className="intro-drive">
            <Image src={porsche} alt="A white Porsche 911 GT3 RS driving in" priority sizes="(max-width: 860px) 90vw, 780px" />
          </div>
        </div>
      </div>
      <div className="intro-bar intro-foot">
        <span>{site.location}</span>
        <span>Loading the desktop</span>
      </div>
    </div>
  );
}
