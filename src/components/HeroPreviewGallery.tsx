"use client";

import Image from "next/image";
import Link from "next/link";
import OrbitalPortrait from "./OrbitalPortrait";
import InteractiveHeroScene from "./InteractiveHeroScene";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { profile, projects } from "@/data/content";

const concepts = [
  { name: "Orbital", tag: "Depth + orbit", hint: "Move your mouse to shift the portrait and its orbiting rings.", title: "Ideas with", accent: "dimension.", description: "Thoughtful web and mobile products, crafted with a different perspective." },
  { name: "Type playground", tag: "Kinetic typography", hint: "Move across the headline to push the lettering through space.", title: "Code meets", accent: "character.", description: "Clean engineering. Considered design. A little unexpected personality." },
  { name: "Glass studio", tag: "3D card tilt", hint: "Move over the preview to tilt the floating glass workspace.", title: "Built with care.", accent: "Made to move.", description: "From reusable components to the final interaction, every detail has a purpose." },
  { name: "After dark", tag: "Cursor spotlight", hint: "Move your pointer to illuminate the portrait and background.", title: "Good ideas", accent: "deserve the light.", description: "I turn complex requirements into clear, accessible digital experiences." },
  { name: "Developer mode", tag: "Live typewriter", hint: "Run the introduction, then move your mouse to tilt the terminal.", title: "Hello, world.", accent: "I'm Sandra.", description: "A full stack developer connecting thoughtful interfaces with the systems behind them." },
  { name: "In motion", tag: "Interactive marquee", hint: "Move left or right to change the speed of the moving typography.", title: "Always curious.", accent: "Always building.", description: "Web applications, mobile experiences, and the ideas in between." },
  { name: "Work in layers", tag: "Floating project fan", hint: "Move your mouse to spread the project cards. Shuffle to change the featured work.", title: "A few ideas.", accent: "Many possibilities.", description: "Explore the products I've worked on, from e-commerce to mobile platforms." },
  { name: "Soft signal", tag: "Fluid gradient mesh", hint: "Move your cursor to sculpt the glowing gradient shapes.", title: "Human ideas.", accent: "Digital expression.", description: "Interfaces that bring together clarity, craft, and just the right amount of motion." },
  { name: "The blueprint", tag: "Interactive crosshair", hint: "Move your pointer across the blueprint to reposition its guides.", title: "Designed to fit.", accent: "Engineered to last.", description: "Strong foundations, reusable components, and thoughtful product interfaces." },
  { name: "Two perspectives", tag: "Portrait reveal", hint: "Move across the portrait or use the slider to compare both treatments.", title: "Technical mind.", accent: "Creative perspective.", description: "One developer. Many ways to bring an idea to life." },
];

function Portrait({ className = "" }: { className?: string }) {
  return <Image className={`preview-portrait ${className}`} src="/images/hero-cutout.webp" alt="Portrait of Sandra Viswanath" width={800} height={800} sizes="(max-width: 700px) 85vw, 45vw" priority />;
}

function Terminal({ paused }: { paused: boolean }) {
  const [run, setRun] = useState(0);
  const [length, setLength] = useState(0);
  const script = `const developer = {\n  name: "Sandra Viswanath",\n  role: "Full Stack Developer",\n  tools: ["Next.js", "React", "React Native"],\n  location: "Kerala, India"\n};\n\n> Ready to build something thoughtful.`;
  useEffect(() => {
    setLength(0);
  }, [run]);
  useEffect(() => {
    if (paused) { setLength(script.length); return; }
    const timer = window.setInterval(() => setLength(value => {
      if (value >= script.length) window.clearInterval(timer);
      return Math.min(value + 2, script.length);
    }), 28);
    return () => window.clearInterval(timer);
  }, [paused, run, script.length]);
  return <div className="preview-terminal"><div className="preview-terminal-bar"><span /><span /><span /><small>sandra.ts</small></div><pre aria-hidden="true">{script.slice(0, length)}<span className="terminal-caret">▍</span></pre><p className="sr-only">Sandra Viswanath, full stack developer based in Kerala. Technologies: Next.js, React, and React Native.</p><button type="button" onClick={() => setRun(value => value + 1)}>↻ Run introduction</button></div>;
}

function ConceptVisual({ index, paused, split, setSplit }: { index: number; paused: boolean; split: number; setSplit: (value: number) => void }) {
  const [featured, setFeatured] = useState(0);
  switch (index) {
    case 0: return <OrbitalPortrait />;
    case 1: return <div className="preview-type-art" aria-hidden="true"><span>S</span><span>V</span><small>Design × Development</small></div>;
    case 2: return <div className="preview-glass"><div className="glass-toolbar"><span /><span /><span /></div><span className="glass-label">THE WORKSPACE</span><h3>From idea<br />to interface.</h3><div className="glass-blocks"><span /><span /><span /></div><div className="glass-status"><i />Next.js · TypeScript · React Native</div></div>;
    case 3: return <div className="preview-noir"><Portrait /><div className="noir-beam" /></div>;
    case 4: return <Terminal paused={paused} />;
    case 5: return <div className="preview-marquee" aria-hidden="true">{["BUILD", "CREATE", "REFINE"].map((text, index) => <div key={text} className={`marquee-row row-${index}`}><span>{`${text} / ${text} / ${text} / `}</span><span>{`${text} / ${text} / ${text} / `}</span></div>)}</div>;
    case 6: return <div className="preview-fan"><div className="preview-fan-cards">{[0, 1, 2].map((offset) => {
      const project = projects[(featured + offset) % projects.length];
      return <div className={`fan-card fan-${offset}`} key={offset}><span>0{(featured + offset) % projects.length + 1} / SELECTED WORK</span><div className="fan-art"><i /><i /><i /></div><h3>{project.name}</h3><p>{project.kind}</p></div>;
    })}</div><button type="button" onClick={() => setFeatured(value => (value + 1) % projects.length)}>Shuffle projects ↗</button></div>;
    case 7: return <div className="preview-mesh" aria-hidden="true"><span /><span /><span /><div className="mesh-core">SV<small>IDEAS INTO INTERFACES</small></div></div>;
    case 8: return <div className="preview-blueprint"><span className="blueprint-dimension">INTERFACE / SYSTEM / EXPERIENCE</span><div className="blueprint-window"><span>01 — Structure</span><div className="blueprint-blocks"><i /><i /><i /></div><strong>Built with intention.</strong></div><span className="blueprint-corner">SANDRA.V / PORTFOLIO</span></div>;
    default: return <div className="preview-split-wrap"><div className="preview-split"><div className="split-treatment split-mono"><Portrait /></div><div className="split-treatment split-color" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}><Portrait /></div><span className="split-divider" style={{ left: `${split}%` }} aria-hidden="true">↔</span></div><label className="split-range">Portrait reveal<input type="range" min="0" max="100" value={split} onChange={event => setSplit(Number(event.target.value))} /></label></div>;
  }
}

export default function HeroPreviewGallery() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [split, setSplit] = useState(50);
  const reducedMotion = useReducedMotion();
  const stage = useRef<HTMLElement>(null);
  const coordinates = useRef({ x: 0, y: 0 });
  const still = paused || !!reducedMotion;
  const concept = concepts[selected];

  function updatePointer(x: number, y: number) {
    const node = stage.current;
    if (!node || still) return;
    coordinates.current = { x, y };
    node.style.setProperty("--mx", String(x));
    node.style.setProperty("--my", String(y));
    node.style.setProperty("--px", `${(x + 1) * 50}%`);
    node.style.setProperty("--py", `${(y + 1) * 50}%`);
    node.style.setProperty("--marquee-duration", `${14 - x * 8}s`);
  }
  function movePointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || still) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    updatePointer(x, y);
    if (selected === 9 && (event.target as HTMLElement).closest(".preview-split")) setSplit(Math.round((x + 1) * 50));
  }
  function keyboardPointer(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") { updatePointer(0, 0); return; }
    updatePointer(Math.max(-1, Math.min(1, coordinates.current.x + (event.key === "ArrowLeft" ? -0.2 : event.key === "ArrowRight" ? 0.2 : 0))), Math.max(-1, Math.min(1, coordinates.current.y + (event.key === "ArrowUp" ? -0.2 : event.key === "ArrowDown" ? 0.2 : 0))));
  }
  function choose(index: number) { setSelected((index + concepts.length) % concepts.length); setSplit(50); coordinates.current = { x: 0, y: 0 }; }

  return <main className="hero-preview-gallery">
    <header className="preview-gallery-header"><Link href="/" className="preview-wordmark">Sandra.</Link><Link href="/">← Back to portfolio</Link></header>
    <div className="preview-gallery-intro"><div><p>THE HERO COLLECTION / 10 CONCEPTS</p><h1>A different first impression.</h1></div><p>Ten directions. Your story.<br />Drag, spin, spread layers, and explore in 3D.</p></div>
    <div className="preview-layout">
      <nav className="preview-picker" aria-label="Hero design previews">{concepts.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} aria-controls="hero-preview-stage" onClick={() => choose(index)}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.name}</strong><small>{item.tag}</small></div><i aria-hidden="true">↗</i></button>)}</nav>
      <div className="preview-main">
        <div className="preview-toolbar"><span aria-live="polite">{String(selected + 1).padStart(2, "0")} / {concept.name}</span><div><button type="button" aria-label="Previous hero preview" onClick={() => choose(selected - 1)}>←</button><button type="button" aria-label="Next hero preview" onClick={() => choose(selected + 1)}>→</button><button type="button" aria-pressed={paused} disabled={!!reducedMotion} onClick={() => setPaused(value => !value)}>{reducedMotion ? "Reduced motion" : paused ? "Resume motion" : "Pause motion"}</button></div></div>
        <section key={selected} ref={stage} id="hero-preview-stage" className={`hero-concept concept-${selected + 1}`} data-still={still} tabIndex={0} aria-label={`${concept.name} interactive hero preview`} aria-describedby="preview-interaction-hint" onPointerMove={movePointer} onPointerLeave={() => updatePointer(0, 0)} onKeyDown={keyboardPointer} style={{ "--mx": 0, "--my": 0, "--px": "50%", "--py": "50%" } as CSSProperties}>
          <div className="concept-top"><span>SANDRA VISWANATH</span><span>FULL STACK DEVELOPER</span></div>
          <div className="concept-copy"><p className="concept-eyebrow">KERALA, INDIA / AVAILABLE FOR OPPORTUNITIES</p><h2>{concept.title}<br /><em>{concept.accent}</em></h2><p className="concept-description">{concept.description}</p><div className="concept-actions"><Link href="/#projects">Explore my work <span aria-hidden="true">↗</span></Link><a href={`mailto:${profile.email}`}>Let&apos;s talk</a></div></div>
          <div className="concept-visual"><InteractiveHeroScene key={selected} paused={still}><ConceptVisual index={selected} paused={still} split={split} setSplit={setSplit} /></InteractiveHeroScene></div>
          <div className="concept-bottom"><span>DESIGN + DEVELOPMENT</span><span>{String(selected + 1).padStart(2, "0")} — INTERACTIVE CONCEPT</span></div>
        </section>
        <div className="preview-notes" id="preview-interaction-hint"><span aria-hidden="true">↗</span><p>{concept.hint}<small>Drag the visual to rotate in 3D. Focus the visual and use arrow keys; Home resets it. Try Spin, Spread layers, Pulse, and the depth slider.</small></p></div>
      </div>
    </div>
  </main>;
}
