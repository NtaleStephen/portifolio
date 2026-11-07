"use client";

import { useStation, type Station } from "@/lib/engine";
import { MOODS, useMood } from "@/lib/stores";

const TINTS = ["blue", "peach", "lilac", "pink"] as const;
const TINT: Record<Station, (typeof TINTS)[number]> = { top: "blue", work: "blue", about: "peach", experience: "lilac", contact: "pink" };

export function Wallpaper() {
  const station = useStation();
  const mood = useMood();
  return (
    <div className="wallpaper" aria-hidden="true" style={{ backgroundColor: MOODS[mood][1] }}>
      {TINTS.map((t) => <div key={t} className={`tint tint-${t}${TINT[station] === t ? " on" : ""}`} />)}
    </div>
  );
}
