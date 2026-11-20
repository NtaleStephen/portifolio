"use client";

import { useEffect, useRef } from "react";
import { mailUrl, site, whatsappUrl } from "@/content/site";
import { closeContact, useContactOpen } from "@/lib/stores";
import { WinBar } from "./Icons";

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

/** "Say hello" options: WhatsApp or email */
export function ContactSheet() {
  const open = useContactOpen();
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const lastFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    firstRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeContact(); };
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="hello-back" onClick={(e) => { if (e.target === e.currentTarget) closeContact(); }}>
      <div className="win hello-sheet" role="dialog" aria-modal="true" aria-labelledby="helloTitle">
        <WinBar title="say-hello">
          <button className="sheet-close" type="button" onClick={closeContact}>Close</button>
        </WinBar>
        <div className="hello-body">
          <div className="eyebrow">Get in touch</div>
          <h2 id="helloTitle">Say hello.</h2>
          <p>Pick whichever is easiest for you. I&apos;ll reply as soon as I can.</p>
          <a className="hello-opt wa" ref={firstRef} href={whatsappUrl} target="_blank" rel="noopener" onClick={closeContact}>
            <span className="ico"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d={WA_PATH} /></svg></span>
            <span className="txt"><b>WhatsApp me</b><small>{site.phoneDisplay}</small></span>
            <svg className="go" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><use href="#arrow-ur" /></svg>
          </a>
          <a className="hello-opt mail" href={mailUrl} onClick={closeContact}>
            <span className="ico"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="m4.5 7.5 7.5 6 7.5-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span>
            <span className="txt"><b>Email me</b><small>{site.email}</small></span>
            <svg className="go" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><use href="#arrow-ur" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
