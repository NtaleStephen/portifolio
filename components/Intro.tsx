"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import porsche from "@/content/assets/porsche.jpg";
import wheelFront from "@/content/assets/wheel-front.png";
import wheelRear from "@/content/assets/wheel-rear.png";
import { site } from "@/content/site";
import { Mark } from "./Icons";

const DRIVE_MS = 4200; // car crosses the whole screen
const HOLD_MS = 800; // the finished line stays up briefly before the site opens
// wheels cut out of the photo (centres and radius in the 736x290 car band) and spun over it
const IMG_W = 736, IMG_H = 290, WHEEL_R = 39, TYRE_R = 40;
const WHEELS = [
  { src: wheelFront, cx: 215, cy: 175 },
  { src: wheelRear, cx: 519, cy: 175.5 },
];
const REAR = 0.16; // where the car's tail sits inside the (mirrored) photo, as a fraction of its width

/** Opening scene, every load: a Porsche drives across the screen and the line is written in its wake. */
export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    const el = rootRef.current;
    if (!el || finishedRef.current) return;
    finishedRef.current = true;
    el.classList.add("leaving");
    setTimeout(() => {
      document.documentElement.classList.add("no-intro");
      document.body.style.overflow = "";
    }, 600);
  }, []);

  useEffect(() => {
    const root = rootRef.current, car = carRef.current, text = textRef.current;
    if (!root || !car || !text || document.documentElement.classList.contains("no-intro")) return;
    document.body.style.overflow = "hidden";

    let raf = 0, start = 0, hold: ReturnType<typeof setTimeout> | undefined;
    const frame = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / DRIVE_MS);
      const u = 0.3 * t * t + 0.7 * t; // pulls away, then holds speed
      const vw = root.clientWidth, cw = car.offsetWidth;
      const left = -cw + u * (vw + cw);
      car.style.transform = `translate3d(${left.toFixed(1)}px,0,0)`;
      // rolling without slipping: angle = distance / tyre radius. The photo is mirrored, so spin the other way.
      const spin = -((left + cw) / (TYRE_R * (cw / IMG_W))) * (180 / Math.PI);
      car.style.setProperty("--spin", `${spin.toFixed(1)}deg`);
      // the words appear behind the car's tail
      const r = left + REAR * cw - text.getBoundingClientRect().left;
      text.style.setProperty("--r", `${r.toFixed(1)}px`);
      if (t < 1) raf = requestAnimationFrame(frame);
      else hold = setTimeout(finish, HOLD_MS);
    };
    raf = requestAnimationFrame(frame);

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") finish(); };
    addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hold);
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [finish]);

  return (
    <div className="intro" ref={rootRef} role="dialog" aria-modal="true" aria-label="Intro">
      <noscript><style>{".intro{display:none!important}"}</style></noscript>
      <div className="intro-bar">
        <span className="intro-brand"><Mark />code&apos;s desktop</span>
        <button className="intro-skip" type="button" onClick={finish}>Skip intro ↗</button>
      </div>
      <div className="intro-lane">
        <span className="intro-road" aria-hidden="true" />
        <p className="intro-text" ref={textRef}>
          Working towards my <em>Porsche</em> funding.
        </p>
        <div className="intro-car" ref={carRef}>
          <div className="flip">
            <Image src={porsche} alt="A white Porsche 911 GT3 RS driving across the screen" priority sizes="(max-width: 860px) 128vw, 860px" />
            {WHEELS.map((w) => (
              <span
                key={w.cx}
                className="wheel"
                style={{ left: `${((w.cx - WHEEL_R) / IMG_W) * 100}%`, top: `${((w.cy - WHEEL_R) / IMG_H) * 100}%`, width: `${((2 * WHEEL_R) / IMG_W) * 100}%`, height: `${((2 * WHEEL_R) / IMG_H) * 100}%` }}
              >
                <Image src={w.src} alt="" fill sizes="90px" />
              </span>
            ))}
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
