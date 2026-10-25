import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return { title: "Project not found | Sandra Viswanath" };
  return { title: `${project.name} | Sandra Viswanath`, description: project.description };
}

export default async function ProjectDetails({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(item => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <div className="project-detail-shell">
      <header className="detail-nav">
        <Link href="/" className="brand premium-brand">Sandra.</Link>
        <Link href="/#projects">← All projects</Link>
      </header>
      <main id="project-main" className="project-detail">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/#projects">Projects</Link><span aria-hidden="true">/</span><span aria-current="page">{project.name}</span></nav>
        <section className="detail-banner" aria-labelledby="project-title">
          <p className="eyebrow">PROJECT {String(index + 1).padStart(2, "0")} / {project.kind}</p>
          <h1 id="project-title">{project.name}</h1>
          <p className="detail-summary">{project.description}</p>
          <div className="detail-actions flex flex-wrap gap-3">
            {project.href && <a className="btn primary" href={project.href} target="_blank" rel="noopener noreferrer">Visit live website <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
            <a className="btn ghost" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's talk about ${project.name}`)}`}>Discuss this project <span aria-hidden="true">↗</span></a>
          </div>
          <span className="detail-watermark" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </section>
        <div className="detail-body">
          <section className="detail-features" aria-labelledby="features-title">
            <p className="eyebrow">THE EXPERIENCE</p>
            <h2 id="features-title">What it brings together.</h2>
            <ul>{project.features.map((feature, featureIndex) => <li key={feature}><span aria-hidden="true">{String(featureIndex + 1).padStart(2, "0")}</span><h3>{feature}</h3></li>)}</ul>
          </section>
          <aside className="detail-stack" aria-labelledby="stack-title">
            <p className="eyebrow">BUILT WITH</p>
            <h2 id="stack-title">Technology stack</h2>
            <div className="stack-pills">{project.stack.map(technology => <span key={technology}>{technology}</span>)}</div>
            <dl><div><dt>Project type</dt><dd>{project.kind}</dd></div><div><dt>Technologies</dt><dd>{project.stack.length}</dd></div></dl>
            <a href={`mailto:${profile.email}`} className="detail-contact">Have something similar in mind?<br /><strong>Let&apos;s build it together ↗</strong></a>
          </aside>
        </div>
        <nav className="detail-next" aria-label="Project navigation">
          <Link href="/#projects">← Back to all projects</Link>
          <Link href={`/projects/${nextProject.slug}`}><span>Next project</span><strong>{nextProject.name} <span aria-hidden="true">↗</span></strong></Link>
        </nav>
      </main>
      <footer className="detail-footer">© {new Date().getFullYear()} Sandra Viswanath</footer>
    </div>
  );
}
