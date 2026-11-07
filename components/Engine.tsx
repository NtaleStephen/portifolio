"use client";

import { useEffect } from "react";
import { finePointer, reducedMotion, useEngine } from "@/lib/engine";

/** starts the scroll engine and hover tilt. Render it after every stage so their callbacks are registered first. */
export function Engine() {
  useEngine();

  // hover tilt on every .tilt element
  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const offs = [...document.querySelectorAll<HTMLElement>(".tilt")].map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
      };
      const leave = () => { el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg"); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });
    return () => offs.forEach((off) => off());
  }, []);

  return null;
}
