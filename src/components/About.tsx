"use client";
import AnimateIn from "./AnimateIn";

export default function About() {
  return (
    <section id="about" className="section about">
      <AnimateIn direction="left">
        <p className="eyebrow">Behind the work</p>
        <h2>About</h2>
      </AnimateIn>

      <div>
        <AnimateIn delay={0.1}>
          <p>
            I&apos;m a developer from Kerala with a background in electronics and communication engineering. I started with WordPress sites in 2022, moved through the MERN stack, and now spend most of my time in Next.js and TypeScript.
          </p>
          <p>
            I like work where design and engineering meet: a layout that matches the mockup exactly, a page that scores well on speed, and a component other developers can reuse without reading its source.
          </p>
        </AnimateIn>


      </div>
    </section>
  );
}
