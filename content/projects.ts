import type { StaticImageData } from "next/image";
import sokoLogo from "./assets/soko-logo.png";
import sokoShot from "./assets/soko-shot.jpg";

export type ProjectStatus = "Live" | "In progress" | "Prototype" | "Sample";

export type Project = {
  slug: string;
  name: string;
  kind: string;
  status: ProjectStatus;
  tagline: string;
  url: string;
  logo: StaticImageData;
  shot: StaticImageData;
};

export const statusColor: Record<ProjectStatus, string> = {
  Live: "var(--color-ok)",
  "In progress": "var(--color-warn)",
  Prototype: "var(--color-violet)",
  Sample: "var(--color-grey)",
};

export const projects: Project[] = [
  {
    slug: "soko",
    name: "Soko",
    kind: "Ecommerce",
    status: "Live",
    tagline: "Online store builder for growing businesses.",
    url: "https://getsoko.co",
    logo: sokoLogo,
    shot: sokoShot,
  },
];
