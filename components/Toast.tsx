"use client";

import { useToast } from "@/lib/stores";

export function Toast() {
  const text = useToast();
  return <div className="toast" role="status" hidden={!text}>{text}</div>;
}
