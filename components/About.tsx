"use client";

import { useRef } from "react";
import { clamp, ease, isCompact, progressOf, reducedMotion, seg, useFrame } from "@/lib/engine";
import { GoLink } from "./GoLink";
import { Mark, MiniFolder, Portrait, WinBar } from "./Icons";
import { TypeHeading } from "./TypeHeading";

const PARAGRAPHS = [
  "I'm Code, a computer science student at Kampala International University and a founder building software for small businesses across Africa.",
  "I like problems where good software changes how a shop, a farm or a classroom runs day to day. I care as much about how a product feels on a cheap phone as about the database behind it.",
  "Between lectures I design, build and ship. I finish my B.Sc. in August 2027.",
];

/** paragraph split into words so scroll can reveal them one by one */
const Reveal = ({ text }: { text: string }) => (
  <p>
    {text.split(/(\s+)/).map((w, i) => (/\s+/.test(w) ? w : <span className="w" key={i}>{w}</span>))}
  </p>
);

/** station 3: zoom-in entrance, word-by-word reveal, polaroid */
export function About() {
  const stageRef = useRef<HTMLElement>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (reducedMotion()) return;
    const words = textRef.current!.querySelectorAll<HTMLElement>(".w");
    if (isCompact()) { words.forEach((w) => (w.style.opacity = "1")); return; }
    const stage = stageRef.current!;
    const p = progressOf(stage);
    vpRef.current!.style.visibility = stage.getBoundingClientRect().top > 1 ? "hidden" : "";
    const enter = ease(seg(p, 0, 0.24));
    camRef.current!.style.transform = `scale(${(1.22 - 0.22 * enter).toFixed(3)})`;
    camRef.current!.style.opacity = seg(p, 0, 0.14).toFixed(3);
    const r = seg(p, 0.14, 0.62), N = words.length;
    words.forEach((w, i) => (w.style.opacity = (0.2 + 0.8 * clamp(r * N * 1.15 - i)).toFixed(2)));
    vpRef.current!.querySelectorAll<HTMLElement>(".clutter").forEach((c) => (c.style.transform = `translateY(${(-(p - 0.5) * +c.dataset.depth! * 260).toFixed(1)}px)`));
  });

  return (
    <section className="stage about-stage overlap" id="about" data-station="about" aria-labelledby="aboutTitle" ref={stageRef}>
      <div className="vp about-vp" ref={vpRef}>
        <div className="clutter" data-depth="1.4" style={{ left: "3%", top: "68%" }} aria-hidden="true"><div className="mini-folder" style={{ transform: "scale(1.25) rotate(-4deg)" }}><MiniFolder /></div></div>
        <div className="clutter hide-sm" data-depth="1" style={{ left: "10%", top: "30%" }} aria-hidden="true"><div className="ghost-frame" /></div>
        <div className="clutter" data-depth="1.8" style={{ right: "2%", top: "76%" }} aria-hidden="true"><div className="paper-sheet" style={{ transform: "rotate(7deg)" }} /></div>
        <div className="about-cam" ref={camRef}>
          <div className="about-grid">
            <div className="polaroid-wrap">
              <figure className="polaroid tilt" style={{ margin: 0 }}>
                <span className="tape" aria-hidden="true" />
                <div className="pic"><Portrait variant="wide" /></div>
                <figcaption>the human behind the commits :)</figcaption>
              </figure>
              <div className="avatar-badge" aria-hidden="true"><Mark /></div>
              <div className="loc"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#pin" /></svg>Kampala, Uganda</div>
              <GoLink className="resume-note tilt" to="experience">
                <svg aria-hidden="true" viewBox="0 0 24 24"><use href="#doc" /></svg><span>the longer story<b>resume.pdf ↗</b></span>
              </GoLink>
            </div>
            <div className="win textwin">
              <WinBar title="a-little-about-me.txt" />
              <div className="textwin-body" ref={textRef}>
                <div className="eyebrow">02 / About</div>
                <TypeHeading id="aboutTitle" station="about" text={"Student by day.\nFounder by night."} />
                {PARAGRAPHS.map((t) => <Reveal key={t} text={t} />)}
                <div className="sign"><span className="hand">always shipping, always learning.</span><Mark /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
