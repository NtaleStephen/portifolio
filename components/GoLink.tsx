"use client";

import type { ComponentProps } from "react";
import { goTo, type Station } from "@/lib/engine";

/** in-page link that scrolls to a station (and the right point inside its pinned stage) */
export function GoLink({ to, onClick, ...rest }: { to: Station } & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      href={`#${to}`}
      onClick={(e) => { onClick?.(e); e.preventDefault(); goTo(to); }}
      {...rest}
    />
  );
}
