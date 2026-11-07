"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { reducedMotion, useStation, type Station } from "@/lib/engine";

/** heading that types itself out the first time its station becomes active. Server-renders the full text. */
export function TypeHeading({ as: Tag = "h2", station, text, id, className }: {
  as?: "h2" | "h1"; station: Station; text: string; id?: string; className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const current = useStation();
  // null = show the full text (SSR, reduced motion, or finished)
  const [shown, setShown] = useState<string | null>(null);
  const [caret, setCaret] = useState(false);
  const status = useRef<"idle" | "running" | "done">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // reserve the height, then clear the text before first paint
  useLayoutEffect(() => {
    if (reducedMotion()) { status.current = "done"; return; }
    const el = ref.current!;
    el.style.minHeight = el.offsetHeight + "px";
    setShown("");
  }, []);

  // the timer chain outlives station changes; it is only cancelled on unmount
  useEffect(() => () => {
    clearTimeout(timer.current);
    if (status.current === "running") { status.current = "idle"; setShown(""); }
  }, []);

  useEffect(() => {
    if (current !== station || status.current !== "idle") return;
    status.current = "running";
    let i = 0;
    setCaret(true);
    const step = () => {
      i++;
      setShown(text.slice(0, i));
      if (i < text.length) { timer.current = setTimeout(step, text[i - 1] === "\n" ? 140 : 34); return; }
      status.current = "done";
      timer.current = setTimeout(() => setCaret(false), 1600);
    };
    timer.current = setTimeout(step, 180);
  }, [current, station, text]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {shown ?? text}
      {caret && <span className="caret" />}
    </Tag>
  );
}
