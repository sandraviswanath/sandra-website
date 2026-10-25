"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/data/content";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: .001 });
  return <>
    <motion.div className="progress" style={{ scaleX }} />
    <header className="nav premium-nav">
      <a href="#top" className="brand premium-brand" aria-label="Sandra — home">Sandra.</a>
      <nav aria-label="Primary">
        <a href="#top">Home</a><a href="#about">About</a><a href="#work">Experience</a><a href="#skills">Skills</a><a href="#projects">Projects</a>
      </nav>
      <a className="premium-contact" href={`mailto:${profile.email}`}>Let&apos;s talk <span aria-hidden="true">↗</span></a>
    </header>
  </>;
}
