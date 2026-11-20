"use client";

import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { reducedMotion } from "@/lib/engine";
import { WinBar } from "./Icons";

// [text, token class]
const PARTS: [string, string][] = [
  ["// who I am", "tok-c"], ["\n", ""],
  ["const", "tok-k"], [" code = {\n  name: ", ""],
  ["'Stephen Ntale'", "tok-s"], [",\n  founder: ", ""],
  ["'Codevertex'", "tok-s"], [",\n  does: ", ""],
  ["'UI/UX, AI, ecommerce'", "tok-s"], [",\n  base: ", ""],
  ["'Kampala, UG'", "tok-s"], ["\n}", ""],
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
      <WinBar title="code-crafter.ts" />
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
