"use client";

import { useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Mark, WinBar } from "./Icons";

const TOPICS = [
  { id: "project", label: "A project", icon: <path d="M8 2 14 5 8 8 2 5zM2 8l6 3 6-3M2 11l6 3 6-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /> },
  { id: "collab", label: "Collaboration", icon: <><circle cx="5.5" cy="5.5" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.3" /><circle cx="11" cy="6.5" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 13c.6-2.3 2.1-3.4 4-3.4s3.4 1.1 4 3.4M10 10c2 0 3.6.9 4.2 3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></> },
  { id: "hi", label: "Just saying hi", icon: <path d="M3 6h8v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM11 7h1.3a1.7 1.7 0 0 1 0 3.4H11M6 2.5v1.8M8.5 2.5v1.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /> },
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** station 5: email composer. Not wired to a mail service yet. */
export function Contact() {
  const addrRef = useRef<HTMLSpanElement>(null);
  const [copy, setCopy] = useState("Copy");
  const [topic, setTopic] = useState("project");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState({ text: "Messages land straight in my inbox.", warn: false });

  const copyEmail = () => {
    const fallback = () => {
      const r = document.createRange();
      r.selectNodeContents(addrRef.current!);
      const s = getSelection()!;
      s.removeAllRanges();
      s.addRange(r);
      setCopy("Press Ctrl+C");
    };
    try {
      navigator.clipboard.writeText(site.email).then(() => { setCopy("Copied"); setTimeout(() => setCopy("Copy"), 1600); }, fallback);
    } catch { fallback(); }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name")).trim(), email = String(data.get("email")).trim(), m = msg.trim();
    const next = {
      name: name ? "" : "Add your name so I know who to reply to.",
      email: EMAIL_RE.test(email) ? "" : "Enter an email address like you@example.com.",
      msg: m ? "" : "Write a sentence or two about your idea.",
    };
    setErrors(next);
    if (next.name || next.email || next.msg) { setStatus({ text: "Fix the highlighted fields, then send again.", warn: false }); return; }
    setStatus({ text: `Preview only: this form isn't connected to email yet, so nothing was sent. Copy ${site.email} instead.`, warn: true });
  };

  return (
    <section className="contact" id="contact" data-station="contact" aria-labelledby="contactTitle">
      <div className="wrap contact-grid">
        <div className="contact-left">
          <div className="eyebrow">04 / Say hello</div>
          <h2 className="sec-h2" id="contactTitle">Got an idea?<br />Let&apos;s say <em>hello.</em></h2>
          <p>A product to build, a problem to untangle, or just a good conversation about tech in Africa. Write to me.</p>
          <div className="mail-line">
            <span className="addr" ref={addrRef}>{site.email}</span>
            <button className="copy-btn" type="button" onClick={copyEmail}>{copy}</button>
          </div>
          <div className="over"><Mark /><span className="hand">over to you ↗</span></div>
        </div>
        <div className="win compose">
          <WinBar title="new-message.eml" />
          <div className="to">To: <span>Code</span></div>
          <form noValidate onSubmit={submit}>
            <div className="two">
              <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" autoComplete="name" placeholder="What should I call you?" /><span className="err">{errors.name}</span></div>
              <div className="field"><label htmlFor="f-email">Email address</label><input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /><span className="err">{errors.email}</span></div>
            </div>
            <div className="field">
              <span className="lbl" id="topicLbl">I&apos;m here about…</span>
              <div className="topics" role="group" aria-labelledby="topicLbl">
                {TOPICS.map((t) => (
                  <button key={t.id} type="button" aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">{t.icon}</svg>{t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-msg">What&apos;s on your mind?</label>
              <textarea id="f-msg" name="message" maxLength={2000} placeholder="A little about your idea…" value={msg} onChange={(e) => setMsg(e.target.value)} />
              <div className="count"><span>A few sentences is plenty.</span><span>{msg.length.toLocaleString()} / 2,000</span></div>
              <span className="err">{errors.msg}</span>
            </div>
            <div className="send-row">
              <span className={`form-status${status.warn ? " warn" : ""}`} aria-live="polite">{status.text}</span>
              <button className="aqua" type="submit">
                Send message <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8 14 2 10 14 8 9z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
