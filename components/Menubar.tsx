"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useStation, type Station } from "@/lib/engine";
import { GoLink } from "./GoLink";

const TITLES: Record<Station, string> = { top: "code's desktop", work: "selected-work", about: "about-me.txt", experience: "experience.log", contact: "new-message.eml" };
const NAV: [Station, string][] = [["work", "Work"], ["about", "About"], ["experience", "Experience"]];

function formatTime() {
  try {
    return new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: site.timeZone }).format(new Date()).toLowerCase();
  } catch {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
}

/** rolls the old title up and the new one in from below whenever the station changes */
function BrandTitle({ station }: { station: Station }) {
  const [titles, setTitles] = useState([{ key: 0, text: TITLES[station], cls: "" }]);
  const seq = useRef(0);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const key = ++seq.current;
    setTitles((t) => [...t, { key, text: TITLES[station], cls: "in" }]);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setTitles((t) => t.map((x) => (x.key === key ? { ...x, cls: "" } : x.key < key ? { ...x, cls: "out" } : x)))),
    );
    const done = setTimeout(() => setTitles((t) => t.filter((x) => x.key >= key)), 500);
    return () => { cancelAnimationFrame(raf); clearTimeout(done); };
  }, [station]);
  return (
    <span className="brand-title">
      {titles.map((t) => <span key={t.key} className={t.cls || undefined}>{t.text}</span>)}
    </span>
  );
}

export function Menubar() {
  const station = useStation();
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => setTime(formatTime());
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="menubar">
      <GoLink className="brand" to="top" aria-label="Back to the desktop">
        <svg aria-hidden="true" viewBox="0 0 34 24"><use href="#mark" /></svg>
        <BrandTitle station={station} />
      </GoLink>
      <nav aria-label="Sections">
        {NAV.map(([st, label]) => <GoLink key={st} to={st} className={station === st ? "on" : undefined}>{label}</GoLink>)}
      </nav>
      <div className="mb-right">
        <svg className="wifi" viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 6a9.5 9.5 0 0 1 13 0M3.8 8.5a6.2 6.2 0 0 1 8.4 0M6 11a3 3 0 0 1 4 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="13.3" r="1" fill="currentColor" /></svg>
        <span className="mb-time" title="Local time in Kampala"><span>{time}</span></span>
        <GoLink className="mb-hello" to="contact">Say hello ↗</GoLink>
      </div>
    </header>
  );
}
