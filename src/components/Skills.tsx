"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/data/content";

const descriptions: Record<string, string> = {
  "Next.js": "Routing, rendering, and application structure for React web experiences.",
  "React.js": "Reusable components and state-driven interfaces for the web.",
  "React Native": "Mobile interfaces built with React components and native platform capabilities.",
  "Node.js": "JavaScript outside the browser, from backend services to development tooling.",
  "Express.js": "HTTP routing and middleware for Node.js APIs and web services.",
  Bootstrap: "Responsive layouts and reusable interface components.",
  TypeScript: "Typed application logic that helps keep growing codebases maintainable.",
  JavaScript: "Application logic, browser interactions, and dynamic user experiences.",
  HTML5: "Semantic page structure and accessible content foundations.",
  CSS: "Responsive layouts, visual styling, transitions, and dimensional interfaces.",
  MongoDB: "Document-based storage for application data.",
  Odoo: "Business applications and backend workflows for connected products.",
  "Git / GitHub": "Version control, collaboration, and code review workflows.",
  WordPress: "Content-managed websites, themes, and plugin-based functionality.",
  "Microsoft tools": "Everyday documentation, communication, and productivity workflows.",
};
const symbols = ["</>", "{ }", "[ ]", "⌘"];
const normalize = (value: number) => ((Math.round(value) % skills.length) + skills.length) % skills.length;

export default function Skills() {
  const [position, setPosition] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const drag = useRef<{ x: number; position: number; pointer: number } | null>(null);
  const reducedMotion = useReducedMotion();
  const active = normalize(position);
  const group = skills[active];
  const selected = selections[active] ?? group.items[0];

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary) return;
    drag.current = { x: event.clientX, position, pointer: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    setPosition(drag.current.position + (drag.current.x - event.clientX) / 140);
  }
  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    drag.current = null;
    setPosition(value => Math.round(value));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function chooseGroup(index: number) {
    // Keep a nearby equivalent rotation instead of rewinding the entire cube.
    setPosition(value => {
      const current = Math.round(value);
      const delta = (index - normalize(current) + skills.length) % skills.length;
      return current + (delta > skills.length / 2 ? delta - skills.length : delta);
    });
  }

  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
      <div className="skills-intro"><p className="eyebrow">THE TOOLKIT / EXPLORE IN 3D</p><h2 id="skills-title">Different tools.<br /><span>One thoughtful experience.</span></h2><p>From interface details to the systems behind them. Turn the cube to explore the technologies I work with.</p></div>
      <div className="skills-explorer">
        <div className="skills-scene-column">
          <div className="skills-scene" role="group" tabIndex={0} aria-label="3D skill cube. Drag or use left and right arrow keys to change category." onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={() => { drag.current = null; setPosition(value => Math.round(value)); }} onKeyDown={event => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); setPosition(value => Math.round(value) + (event.key === "ArrowRight" ? 1 : -1)); }
            if (event.key === "Home") { event.preventDefault(); setPosition(0); }
          }}>
            <div className="skills-scene-grid" aria-hidden="true" />
            <motion.div className="skills-cube" aria-hidden="true" animate={{ rotateY: -position * 90, rotateX: reducedMotion ? 0 : -12 }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>
              {skills.map((category, index) => <div key={category.group} className={`skills-cube-face${index === active ? " is-active" : ""}`} style={{ "--face-angle": `${index * 90}deg` } as CSSProperties}>
                <div className="skills-face-top"><span>0{index + 1} / TOOLKIT</span><span>{symbols[index]}</span></div>
                <h3>{category.group}</h3>
                <div className="skills-face-items">{category.items.map(item => <span key={item}>{item}</span>)}</div>
                <span className="skills-face-bottom">{category.items.length} technologies · Sandra Viswanath</span>
              </div>)}
              <div className="skills-cube-cap skills-cube-top" /><div className="skills-cube-cap skills-cube-bottom" />
            </motion.div>
          </div>
          <div className="skills-rotation-controls"><button type="button" onClick={() => setPosition(value => Math.round(value) - 1)} aria-label="Previous skill category">←</button><span>Drag to rotate <span aria-hidden="true">·</span> {active + 1} / {skills.length}</span><button type="button" onClick={() => setPosition(value => Math.round(value) + 1)} aria-label="Next skill category">→</button></div>
        </div>
        <div className="skills-browser">
          <div className="skills-category-buttons" role="group" aria-label="Skill categories">{skills.map((category, index) => <button type="button" key={category.group} aria-pressed={active === index} onClick={() => chooseGroup(index)}>{category.group}</button>)}</div>
          <div className="skills-active-content">
            <p className="eyebrow">EXPLORE A TECHNOLOGY</p>
            <h3>{group.group}</h3>
            <div className="skills-technology-buttons" role="group" aria-label={`${group.group} technologies`}>{group.items.map(item => <button type="button" key={item} aria-pressed={selected === item} onClick={() => setSelections(previous => ({ ...previous, [active]: item }))}>{item}</button>)}</div>
            <div className="skills-description" aria-live="polite" aria-atomic="true"><span aria-hidden="true">{symbols[active]}</span><div><h4>{selected}</h4><p>{descriptions[selected] ?? "Part of the toolkit I use to build digital products."}</p></div></div>
          </div>
          <a className="skills-work-link" href="#projects">See the tools in action <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
