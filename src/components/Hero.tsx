"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/data/content";
import InteractiveHeroScene from "./InteractiveHeroScene";
import OrbitalPortrait from "./OrbitalPortrait";
import "./orbital-hero.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const still = paused || !!reducedMotion;

  function move(event: PointerEvent<HTMLElement>) {
    if (still || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    event.currentTarget.style.setProperty("--mx", String(x));
    event.currentTarget.style.setProperty("--my", String(y));
  }
  function resetPointer() {
    heroRef.current?.style.setProperty("--mx", "0");
    heroRef.current?.style.setProperty("--my", "0");
  }

  return <section ref={heroRef} className="home-orbital" data-still={still} aria-labelledby="hero-title" onPointerMove={move} onPointerLeave={resetPointer} style={{ "--mx": 0, "--my": 0 } as CSSProperties}>
    <div className="orbital-home-copy">
      <p className="orbital-home-identity">Sandra Viswanath <span>{profile.role}</span></p>
      <p className="orbital-home-eyebrow">KERALA, INDIA / AVAILABLE FOR OPPORTUNITIES</p>
      <h1 id="hero-title">Ideas with<br /><span>dimension.</span></h1>
      <p className="orbital-home-description">Thoughtful web and mobile products, crafted with a different perspective.</p>
      <div className="orbital-home-actions"><a className="btn primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a><a className="btn ghost" href={`mailto:${profile.email}`}>Let&apos;s talk</a></div>
    </div>
    <div className="orbital-home-visual"><InteractiveHeroScene paused={still}><OrbitalPortrait /></InteractiveHeroScene></div>
    <div className="orbital-home-footer"><a href="#about">Get to know me <span aria-hidden="true">↓</span></a><span>DESIGN + DEVELOPMENT</span><button type="button" disabled={!!reducedMotion} aria-pressed={paused} onClick={() => { resetPointer(); setPaused(value => !value); }}>{reducedMotion ? "Reduced motion" : paused ? "Resume motion" : "Pause motion"}</button></div>
  </section>;
}
