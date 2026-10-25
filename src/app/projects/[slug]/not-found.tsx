import Link from "next/link";

export default function ProjectNotFound() {
  return <main className="project-detail detail-missing"><p className="eyebrow">PROJECT NOT FOUND</p><h1>This project isn&apos;t here.</h1><p>Browse the portfolio to find the project you&apos;re looking for.</p><Link className="btn primary" href="/#projects">Back to projects</Link></main>;
}
