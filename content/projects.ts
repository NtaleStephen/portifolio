export type ProjectKind = "Platforms" | "AI & automation" | "Tools";
export type ProjectStatus = "Live" | "In progress" | "Prototype" | "Sample";
export type MockKind = "market" | "dark" | "dash" | "phone" | "table" | "docs";

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  status: ProjectStatus;
  color: string;
  mock: MockKind;
  tagline: string;
  headline: string;
  role: string;
  scope: string;
  builtFor: string;
  liveUrl?: string;
};

export const filters = ["All projects", "Platforms", "AI & automation", "Tools"] as const;
export type Filter = (typeof filters)[number];

export const statusColor: Record<ProjectStatus, string> = {
  Live: "var(--color-ok)",
  "In progress": "var(--color-warn)",
  Prototype: "var(--color-violet)",
  Sample: "var(--color-grey)",
};

export const projects: Project[] = [
  { slug: "soko", name: "Soko", kind: "Platforms", status: "In progress", color: "#0E9F6E", mock: "market",
    tagline: "Online stores and orders for African small businesses.",
    headline: "Every shop online. Every order in one place.",
    role: "Founder & lead engineer", scope: "Product, frontend, backend", builtFor: "Small and medium businesses" },
  { slug: "qiora", name: "Qiora", kind: "Platforms", status: "In progress", color: "#6D5BF0", mock: "dark",
    tagline: "A course marketplace for Ugandan creators and learners.",
    headline: "Learn from people who know the local market.",
    role: "Founder & product engineer", scope: "Marketplace, payments, video", builtFor: "Course creators and learners" },
  { slug: "agriconnect", name: "AgriConnect", kind: "Platforms", status: "Prototype", color: "#2F8F4E", mock: "dash",
    tagline: "Linking farmers to buyers, from harvest to market.",
    headline: "From the farm gate to the market stall.",
    role: "Database & backend engineer", scope: "Data model, APIs, dashboard", builtFor: "Farmers, buyers and co-ops" },
  { slug: "voice-desk", name: "Voice Desk", kind: "AI & automation", status: "Sample", color: "#F2A93B", mock: "phone",
    tagline: "A voice assistant that answers customer calls.",
    headline: "Every call answered, even after hours.",
    role: "AI engineer", scope: "Speech, LLM, integrations", builtFor: "Customer support teams" },
  { slug: "ledger-lite", name: "Ledger Lite", kind: "Tools", status: "Sample", color: "#3157E8", mock: "table",
    tagline: "Invoices and receipts for shops, straight from a phone.",
    headline: "Send an invoice before the customer leaves.",
    role: "Full-stack engineer", scope: "Mobile web, PDF, payments", builtFor: "Shop owners" },
  { slug: "lab-kit", name: "Lab Kit", kind: "Tools", status: "Sample", color: "#D9480F", mock: "docs",
    tagline: "Ready-made network labs for Packet Tracer practice.",
    headline: "Practise the lab before the exam does.",
    role: "Builder", scope: "Lab templates, guides", builtFor: "Networking students" },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
