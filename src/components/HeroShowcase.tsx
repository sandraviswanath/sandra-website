"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/content";

const step = 360 / projects.length;
const normalize = (value: number) => ((Math.round(value) % projects.length) + projects.length) % projects.length;

export default function HeroShowcase() {
  const [position, setPosition] = useState(0);
  const drag = useRef<{ x: number; start: number; pointer: number } | null>(null);
  const reducedMotion = useReducedMotion();
  const active = normalize(position);
  const project = projects[active];

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    drag.current = { x: event.clientX, start: position, pointer: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    setPosition(drag.current.start + (drag.current.x - event.clientX) / 90);
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    drag.current = null;
    setPosition(value => Math.round(value));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="hero-showcase" role="region" aria-roledescription="carousel" aria-label="360 degree project showcase">
      <div className="showcase-heading flex items-center justify-between"><span>Selected work</span><span className="showcase-degree">360°</span></div>
      <div className="showcase-stage" tabIndex={0} aria-label="Rotate projects with left and right arrow keys, or drag" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { drag.current = null; setPosition(value => Math.round(value)); }} onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setPosition(value => Math.round(value) + (event.key === "ArrowRight" ? 1 : -1));
        } else if (event.key === "Home") { event.preventDefault(); setPosition(0); }
      }}>
        <div className="showcase-floor" aria-hidden="true" />
        <motion.div className="showcase-ring" aria-hidden="true" animate={{ rotateY: -position * step }} transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}>
          {projects.map((item, index) => <div key={item.name} className={`showcase-card${index === active ? " is-active" : ""}`} style={{ "--card-angle": `${index * step}deg` } as CSSProperties}>
            <span className="showcase-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="showcase-mini-ui"><i /><i /><i /></div>
            <strong>{item.name}</strong><span className="showcase-kind">{item.kind}</span>
          </div>)}
        </motion.div>
      </div>
      <div className="showcase-controls flex items-center justify-between gap-3">
        <button type="button" aria-label="Previous project" onClick={() => setPosition(value => Math.round(value) - 1)}>←</button>
        <p aria-live="polite" aria-atomic="true"><strong>{project.name}</strong><span>{active + 1} / {projects.length} · {project.stack.join(" / ")}</span></p>
        <button type="button" aria-label="Next project" onClick={() => setPosition(value => Math.round(value) + 1)}>→</button>
      </div>
      <Link className="showcase-details-link" href={`/projects/${project.slug}`}>Explore {project.name} <span aria-hidden="true">↗</span></Link>
      <p className="showcase-hint">Drag to explore · Use ← → keys</p>
    </div>
  );
}
