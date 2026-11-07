import { site } from "@/content/site";
import { GoLink } from "./GoLink";
import { Mark } from "./Icons";

export function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div className="l"><Mark />Made in Kampala with care and a lot of chai.</div>
        <span>© 2026 {site.name}</span>
        <nav aria-label="Elsewhere">
          <a href={site.github} target="_blank" rel="noopener">GitHub ↗</a>
          <a href={site.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
          <GoLink to="top">Back to top ↑</GoLink>
        </nav>
      </div>
    </footer>
  );
}
