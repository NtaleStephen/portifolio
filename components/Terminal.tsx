"use client";

import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { reducedMotion } from "@/lib/engine";
import { WinBar } from "./Icons";

// [text, token class]
const PARTS: [string, string][] = [
  ["// a little about what I do", "tok-c"], ["\n", ""],
  ["const", "tok-k"], [" code = {\n  focus: ", ""],
  ["'software for African SMEs'", "tok-s"], [",\n  fuel: ", ""],
  ["'curiosity + chai'", "tok-s"], [",\n  status: ", ""],
  ["'shipping something'", "tok-s"], ["\n}", ""],
];
const TOTAL = PARTS.reduce((n, [t]) => n + t.length, 0);

/** the code window on the desktop; types itself out on load */
export function Terminal() {
  // null = everything shown (SSR and reduced motion)
  const [n, setN] = useState<number | null>(null);

  useLayoutEffect(() => { if (!reducedMotion()) setN(0); }, []);
  useEffect(() => {
    if (n === null || n >= TOTAL) return;
    const t = setTimeout(() => setN(n + 1), n === 0 ? 900 : 12);
    return () => clearTimeout(t);
  }, [n]);

  let left = n ?? TOTAL;
  return (
    <div className="win term tilt">
      <WinBar title="currently-building.ts" />
      <pre>
        {PARTS.map(([text, cls], i) => {
          const shown = text.slice(0, Math.max(0, left));
          left -= text.length;
          if (!shown) return null;
          return cls ? <span key={i} className={cls}>{shown}</span> : <Fragment key={i}>{shown}</Fragment>;
        })}
        {n !== null && <span className="caret" style={{ background: "#3A4154", width: 7 }} />}
      </pre>
    </div>
  );
}
