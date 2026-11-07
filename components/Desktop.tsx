"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { ease, finePointer, mouse, progressOf, reducedMotion, requestRender, seg, useFrame } from "@/lib/engine";
import { MOODS, nextMood, useMood } from "@/lib/stores";
import { projects } from "@/content/projects";
import { Folder } from "./Folder";
import { GoLink } from "./GoLink";
import { Mark, Portrait, WinBar } from "./Icons";
import { Terminal } from "./Terminal";

/** a floating desktop item. dx/dy = direction it flies on scroll, depth = mouse parallax strength */
function DeskItem({ dx, dy, depth, rot, delay, hideSm, style, children }: {
  dx: number; dy: number; depth: number; rot: number; delay: number; hideSm?: boolean; style: CSSProperties; children: ReactNode;
}) {
  return (
    <div
      className={`desk-item load-in${hideSm ? " hide-sm" : ""}`}
      data-dx={dx} data-dy={dy} data-depth={depth}
      style={{ ...style, "--rot": `${rot}deg`, "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Desktop() {
  const stageRef = useRef<HTMLElement>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const mood = useMood();

  useFrame(() => {
    if (reducedMotion()) return;
    const vp = vpRef.current!;
    const p = progressOf(stageRef.current!);
    const out = ease(seg(p, 0, 0.42));
    vp.querySelectorAll<HTMLElement>(".desk-item[data-dx]").forEach((el) => {
      const dx = +el.dataset.dx!, dy = +el.dataset.dy!;
      el.style.setProperty("--sx", (dx * out * 60).toFixed(2) + "vw");
      el.style.setProperty("--sy", (dy * out * 60).toFixed(2) + "vh");
      el.style.setProperty("--ss", (1 + out * 0.7).toFixed(3));
      el.style.opacity = (1 - seg(p, 0.06, 0.36)).toFixed(3);
    });
    const center = centerRef.current!;
    center.style.setProperty("--hs", (1 + out * 1.6).toFixed(3));
    center.style.setProperty("--hx", (-out * innerWidth * 0.2).toFixed(1) + "px");
    center.style.setProperty("--hr", (-out * 3).toFixed(2) + "deg");
    center.style.opacity = (1 - seg(p, 0.2, 0.42)).toFixed(3);
    vp.querySelectorAll<HTMLElement>(".hero-tagline,.hero-foot").forEach((el) => (el.style.opacity = (1 - seg(p, 0, 0.1)).toFixed(3)));
    slotRef.current!.style.opacity = (1 - seg(p, 0.02, 0.12)).toFixed(3);
    vp.style.pointerEvents = p > 0.95 ? "none" : "";
  });

  // mouse parallax
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const vp = vpRef.current!;
    const items = [...vp.querySelectorAll<HTMLElement>(".desk-item[data-dx]")];
    const move = (e: PointerEvent) => {
      mouse.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.y = (e.clientY / innerHeight) * 2 - 1;
      items.forEach((el) => {
        const k = +el.dataset.depth! * 12;
        el.style.setProperty("--px", (-mouse.x * k).toFixed(1) + "px");
        el.style.setProperty("--py", (-mouse.y * k).toFixed(1) + "px");
      });
      requestRender();
    };
    vp.addEventListener("pointermove", move);
    return () => vp.removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="stage hero-stage" id="top" data-station="top" aria-label="Desktop" ref={stageRef}>
      <div className="vp hero-vp" ref={vpRef}>
        <div className="hero-tagline load-in" style={d(0.1)}>
          <svg aria-hidden="true" viewBox="0 0 34 24"><use href="#mark" /></svg>
          Notes, projects and the things I&apos;m building.
        </div>

        <DeskItem dx={-1.1} dy={-0.5} depth={1.3} rot={-3} delay={0.25} style={{ left: "7%", top: "22%" }}>
          <GoLink className="win photo-win tilt" to="about" style={{ display: "block", textDecoration: "none" }}>
            <WinBar title="hello-world.jpg" />
            <div className="photo-ph"><Portrait /></div>
            <div className="photo-cap"><span>the person behind the code</span><span>↗</span></div>
          </GoLink>
        </DeskItem>

        <DeskItem dx={-0.6} dy={-1.1} depth={2} rot={5} delay={0.35} hideSm style={{ left: "21%", top: "11%" }}>
          <div className="name-sticker tilt"><b>HELLO</b><small>my name is</small><span>Code!</span></div>
        </DeskItem>

        <DeskItem dx={0.9} dy={-1} depth={0.8} rot={-6} delay={0.5} hideSm style={{ right: "24%", top: "15%" }}>
          <span className="hand" style={{ fontSize: 24, whiteSpace: "nowrap" }}>my best work ↘</span>
        </DeskItem>

        <DeskItem dx={-1.1} dy={0.7} depth={1.6} rot={2} delay={0.45} hideSm style={{ left: "5%", top: "58%" }}>
          <Terminal />
        </DeskItem>

        <div className="desk-item" ref={slotRef} style={{ right: "14%", top: "23%" }}>
          <div className="folder-slot"><div className="slot" /><b>Selected work</b><small>{projects.length} things I&apos;m proud of</small></div>
        </div>

        <DeskItem dx={1.1} dy={0.6} depth={1.4} rot={4} delay={0.55} style={{ right: "6%", top: "55%" }}>
          <div className="sticky-note tilt">make it useful.<br />make it fast.<br /><u>make it feel local.</u></div>
        </DeskItem>

        <DeskItem dx={0.7} dy={1.1} depth={1} rot={-6} delay={0.65} hideSm style={{ right: "27%", top: "72%" }}>
          <GoLink className="doc-ico tilt" to="experience"><div className="sheet"><i /><i /><i /><i /></div>resume.pdf</GoLink>
        </DeskItem>

        <DeskItem dx={-0.2} dy={1.2} depth={2.2} rot={-4} delay={0.7} hideSm style={{ left: "37%", top: "83%" }}>
          <Mark className="doodle" />
        </DeskItem>

        <div className="hero-center" ref={centerRef}>
          <div className="kicker load-in" style={d(0.2)}>Software engineer &amp; founder</div>
          <h1 className="hero-h1 load-in" style={d(0.3)}>
            hey, I&apos;m{" "}
            <span className="name">
              code.
              <svg className="uline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M4 13C70 6 160 4 296 8M30 17c60-4 140-6 230-4" /></svg>
            </span>
          </h1>
          <p className="hero-sub load-in" style={d(0.45)}>I build software for African businesses,<br />from first sketch to shipped product.</p>
          <div className="hero-actions load-in" style={d(0.55)}>
            <GoLink className="aqua" to="work">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3h5v5H2zM9 3h5v5H9zM2 10h5v4H2zM9 10h5v4H9z" fill="currentColor" opacity=".9" /></svg>Explore my work
            </GoLink>
            <GoLink className="aqua ghost" to="contact">Say hello <svg aria-hidden="true" viewBox="0 0 16 16"><use href="#arrow-ur" /></svg></GoLink>
          </div>
          <div className="hero-where load-in" style={d(0.65)}>
            <svg aria-hidden="true" viewBox="0 0 16 16"><use href="#pin" /></svg>Kampala, Uganda · building for the whole continent
          </div>
        </div>

        <Folder stageRef={stageRef} vpRef={vpRef} slotRef={slotRef} />

        <GoLink className="hero-foot l" to="work"><span className="scroll-cue" aria-hidden="true" /> Scroll to open the folder</GoLink>
        <button className="hero-foot r" type="button" aria-label="Change wallpaper" onClick={nextMood}>
          <span className="dot" aria-hidden="true" /><span>Wallpaper: {MOODS[mood][0]}</span>
        </button>
      </div>
    </section>
  );
}
