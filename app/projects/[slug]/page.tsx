import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { WinBar } from "@/components/Icons";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline, alternates: { canonical: `/projects/${p.slug}` } };
}

/* A case study loaded directly (shared link, refresh): a full page in the same window chrome. */
export default async function CaseStudyPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <div className="cs-page">
      <div className="win sheet">
        <WinBar title={`case-study / ${project.slug}`}>
          <Link className="sheet-close" href="/#work">Close</Link>
        </WinBar>
        <div className="sheet-scroll"><div className="cs"><CaseStudy project={project} mode="page" /></div></div>
      </div>
    </div>
  );
}
