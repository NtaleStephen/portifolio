"use client";

import type { ComponentProps } from "react";
import { openContact } from "@/lib/stores";

/** every "Say hello" opens the contact options sheet (WhatsApp or email) */
export function HelloButton({ onClick, ...rest }: Omit<ComponentProps<"button">, "type">) {
  return <button type="button" onClick={(e) => { onClick?.(e); openContact(); }} {...rest} />;
}
