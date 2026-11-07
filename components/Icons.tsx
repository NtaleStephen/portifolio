import type { ReactNode } from "react";

/** shared <symbol>s, referenced with <use href="#mark" /> etc. Rendered once in the root layout. */
export function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="mfg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9AD3FA" /><stop offset="1" stopColor="#5AAEEC" /></linearGradient>
      </defs>
      <symbol id="mark" viewBox="0 0 34 24"><path d="M11 3.5 3 12l8 8.5M23 3.5 31 12l-8 8.5M19.5 2.5 14.5 21.5" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="folder-ic" viewBox="0 0 24 24"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" fill="none" stroke="currentColor" strokeWidth="1.6" /></symbol>
      <symbol id="arrow-ur" viewBox="0 0 16 16"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="pin" viewBox="0 0 16 16"><path d="M8 14s5-4.4 5-8A5 5 0 0 0 3 6c0 3.6 5 8 5 8z" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="6" r="1.7" fill="currentColor" /></symbol>
      <symbol id="check" viewBox="0 0 14 14"><path d="M2.5 7.4l2.8 2.8 6.2-6.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="doc" viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 3v4h4M9.5 12h6M9.5 15h6M9.5 18h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></symbol>
    </svg>
  );
}

export const Mark = ({ className }: { className?: string }) => (
  <svg className={className} aria-hidden="true" viewBox="0 0 34 24"><use href="#mark" /></svg>
);

/** macOS title bar */
export function WinBar({ title, children, className }: { title?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={className ? `win-bar ${className}` : "win-bar"}>
      <span className="lights"><i /><i /><i /></span>
      {title != null && <span className="win-title">{title}</span>}
      {children}
    </div>
  );
}

export function MiniFolder() {
  return (
    <svg viewBox="0 0 74 58" width="100%" height="100%" aria-hidden="true">
      <path d="M4 8a6 6 0 0 1 6-6h18l6 6h30a6 6 0 0 1 6 6v4H4z" fill="#8CC8F2" />
      <rect x="2" y="12" width="70" height="44" rx="8" fill="#5DB2F0" />
      <rect x="2" y="16" width="70" height="40" rx="8" fill="url(#mfg)" />
      <path d="M27 36l5-7 5 6 5-6 5 7" fill="none" stroke="#14213D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity=".8" />
    </svg>
  );
}

/** placeholder portrait until a real photo goes in */
export function Portrait({ variant = "a" }: { variant?: "a" | "wide" | "icon" }) {
  const id = `sky-${variant}`;
  return (
    <svg viewBox="0 0 200 210" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-label="Placeholder portrait">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F7D9B5" /><stop offset=".55" stopColor="#F2B98A" /><stop offset=".56" stopColor="#7FA9C9" /><stop offset="1" stopColor="#4E7FA8" /></linearGradient></defs>
      <rect width="200" height="210" fill={`url(#${id})`} />
      <path d="M0 118 C40 98 70 112 100 104 S160 92 200 108 V120 H0z" fill="#6E8E6A" opacity=".85" />
      <circle cx="150" cy="60" r="18" fill="#FFF1D6" opacity=".9" />
      <g fill="#2B2F3F"><circle cx="100" cy="96" r="30" /><path d="M42 210c4-46 28-72 58-72s54 26 58 72z" /></g>
      <path d="M74 86c4-22 46-28 54 0-10-8-42-10-54 0z" fill="#1A1D28" />
      {variant === "wide" && <text x="100" y="196" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#fff" opacity=".75">replace with your photo</text>}
    </svg>
  );
}
