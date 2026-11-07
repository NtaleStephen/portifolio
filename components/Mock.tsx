import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";

/** placeholder "screenshots" for each project. Swap for next/image once real captures exist. */
export function Mock({ project: p }: { project: Project }) {
  const c = p.color;
  const vars = { "--c": c } as CSSProperties;
  switch (p.mock) {
    case "market": {
      const tiles = ["#F6D7B0", "#CFE6D8", "#D9DEF7", "#F7D0D6", "#E9E2C8", "#CDE3F2", "#F3DDB8", "#D6EAD0"];
      const prices = [45, 12, 80, 25, 60, 18, 33, 90];
      return (
        <div className="mock mk-market" style={vars}>
          <div className="mk-nav"><b className="mk-logo" />{p.name}<span className="mk-search" /><span className="mk-btn">Cart · 3</span></div>
          <div className="mk-banner">
            <div><b>New this week from local sellers</b><i style={{ background: "#fff", opacity: 0.5, width: "8em", marginTop: ".6em" }} /></div>
            <span className="mk-btn" style={{ background: "#fff", color: c }}>Shop now</span>
          </div>
          <div className="mk-grid">
            {tiles.map((t, i) => (
              <div className="mk-prod" key={t}><div className="im" style={{ "--t": t } as CSSProperties} /><em>UGX {prices[i]},000</em><i style={{ width: "80%" }} /></div>
            ))}
          </div>
        </div>
      );
    }
    case "dark":
      return (
        <div className="mock mk-dark" style={vars}>
          <div className="mk-nav"><b className="mk-logo" />{p.name}<span>Courses · Creators · Sign in</span></div>
          <h4>Learn from people who know your market</h4>
          <p>Short, practical courses from Ugandan creators. Pay with mobile money.</p>
          <div style={{ margin: "0 0 1em 1.4em", display: "flex", gap: ".5em" }}>
            <span className="mk-btn">Browse courses</span><span className="mk-btn" style={{ background: "rgba(255,255,255,.12)" }}>Teach</span>
          </div>
          <div className="row3">
            <div><i style={{ width: "60%" }} /><i style={{ width: "85%" }} /></div>
            <div><i style={{ width: "50%" }} /><i style={{ width: "75%" }} /></div>
            <div><i style={{ width: "70%" }} /><i style={{ width: "60%" }} /></div>
          </div>
        </div>
      );
    case "dash":
      return (
        <div className="mock mk-dash" style={vars}>
          <div className="mk-side">
            <b className="mk-logo" /><i style={{ width: "80%" }} /><i style={{ width: "60%", opacity: 0.7 }} /><i style={{ width: "70%" }} /><i style={{ width: "55%" }} /><i style={{ width: "65%" }} />
          </div>
          <div className="mk-main">
            <h5>{p.name} · this week</h5>
            <div className="kpis">
              <div><b>1,284</b><small>kg listed</small></div><div><b>46</b><small>active buyers</small></div><div><b>UGX 9.2M</b><small>orders</small></div>
            </div>
            <div className="bars">{[40, 62, 48, 80, 56, 90, 70, 95, 64, 78].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
          </div>
        </div>
      );
    case "phone":
      return (
        <div className="mock mk-phone" style={vars}>
          <div className="phone">
            <div className="top"><i />{p.name.toLowerCase()}</div>
            <div className="bub me">Can you check today&apos;s bookings?</div>
            <div className="bub ai">You have 6 bookings. The 2pm client asked to move to 4pm. Want me to confirm?</div>
            <div className="bub me">Yes, confirm it.</div>
            <span className="mic" />
          </div>
        </div>
      );
    case "table": {
      const rows = [["Nakato Stores", "UGX 450,000", "paid"], ["Mukwano Hardware", "UGX 1,200,000", "due"], ["Kasule Fresh", "UGX 86,000", "paid"], ["Boda Parts Ltd", "UGX 310,000", "due"], ["Amani Salon", "UGX 54,000", "paid"]];
      return (
        <div className="mock mk-table" style={vars}>
          <h5>Invoices <span className="mk-btn">+ New</span></h5>
          <div className="chips"><span>All</span><span>Paid</span><span>Due</span><span>Drafts</span></div>
          {rows.map((r) => (
            <div className="tr" key={r[0]}><b>{r[0]}</b><span>{r[1]}</span><em className={r[2]}>{r[2] === "paid" ? "Paid" : "Due"}</em></div>
          ))}
        </div>
      );
    }
    case "docs":
      return (
        <div className="mock mk-docs" style={vars}>
          <div className="mk-tree">
            <b>{p.name}</b><span>Getting started</span><span className="on">VLAN basics</span><span>Inter-VLAN routing</span><span>OSPF single area</span><span>ACLs</span><span>NAT &amp; PAT</span>
          </div>
          <div className="mk-doc">
            <h5>Lab 2 · VLAN basics</h5><i style={{ width: "90%", marginBottom: ".4em" }} /><i style={{ width: "70%" }} />
            <svg viewBox="0 0 220 90" aria-hidden="true">
              <g stroke="#B9B3A6" strokeWidth="1.4">
                <line x1="110" y1="20" x2="50" y2="62" /><line x1="110" y1="20" x2="170" y2="62" /><line x1="50" y1="62" x2="20" y2="84" />
                <line x1="50" y1="62" x2="80" y2="84" /><line x1="170" y1="62" x2="140" y2="84" /><line x1="170" y1="62" x2="200" y2="84" />
              </g>
              <rect x="94" y="8" width="32" height="20" rx="4" fill={c} /><rect x="36" y="54" width="28" height="16" rx="3" fill="#3E4A63" /><rect x="156" y="54" width="28" height="16" rx="3" fill="#3E4A63" />
              {[20, 80, 140, 200].map((x) => <circle key={x} cx={x} cy="84" r="5" fill="#9AA3B5" />)}
            </svg>
          </div>
        </div>
      );
  }
}
