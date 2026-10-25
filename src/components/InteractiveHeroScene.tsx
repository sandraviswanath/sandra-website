"use client";

import "./interactive-hero-scene.css";

import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveHeroScene({ children, paused }: { children: ReactNode; paused: boolean }) {
  const pitch = useMotionValue(0);
  const yaw = useMotionValue(0);
  const rotateX = useSpring(pitch, { stiffness: 90, damping: 24 });
  const rotateY = useSpring(yaw, { stiffness: 90, damping: 24 });
  const [depth, setDepth] = useState(55);
  const [exploded, setExploded] = useState(false);
  const [pulse, setPulse] = useState(0);
  const drag = useRef<{ x: number; y: number; pitch: number; yaw: number; pointer: number } | null>(null);

  function start(event: PointerEvent<HTMLDivElement>) {
    if (paused || event.button !== 0 || !event.isPrimary || (event.target as HTMLElement).closest("button,a,input,label")) return;
    drag.current = { x: event.clientX, y: event.clientY, pitch: pitch.get(), yaw: yaw.get(), pointer: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointer !== event.pointerId || paused) return;
    yaw.set(drag.current.yaw + (event.clientX - drag.current.x) * 0.45);
    pitch.set(Math.max(-40, Math.min(40, drag.current.pitch - (event.clientY - drag.current.y) * 0.22)));
    event.stopPropagation();
  }
  function finish(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function reset() { pitch.set(0); yaw.set(0); setDepth(55); setExploded(false); setPulse(0); }

  return <div className="interactive-hero-scene" data-paused={paused} data-exploded={exploded && !paused} style={{ "--scene-depth": depth / 100, "--scene-perspective": `${1800 - depth * 12}px` } as CSSProperties}>
    <div className="interactive-scene-viewport" tabIndex={0} role="group" aria-label="Interactive 3D scene. Drag to rotate, use arrow keys, or Home to reset." onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={() => { drag.current = null; }} onKeyDown={event => {
      if (event.target !== event.currentTarget || paused) return;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) {
        event.preventDefault(); event.stopPropagation();
        if (event.key === "Home") { reset(); return; }
        if (event.key === "ArrowLeft") yaw.set(yaw.get() - 15);
        if (event.key === "ArrowRight") yaw.set(yaw.get() + 15);
        if (event.key === "ArrowUp") pitch.set(Math.min(40, pitch.get() + 10));
        if (event.key === "ArrowDown") pitch.set(Math.max(-40, pitch.get() - 10));
      }
    }}>
      <motion.div className="interactive-scene-rotation" style={{ rotateX: paused ? 0 : rotateX, rotateY: paused ? 0 : rotateY }}>
        <div className="interactive-scene-planes" aria-hidden="true"><i /><i /><i /></div>
        <div className="interactive-scene-content">{children}</div>
        <div className="scene-geometry geometry-a" aria-hidden="true"><div className="geometry-cube">{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</div></div>
        <div className="scene-geometry geometry-b" aria-hidden="true"><div className="geometry-gyroscope"><i /><i /><i /></div></div>
        {pulse > 0 && !paused && <div key={pulse} className="scene-energy-pulse" aria-hidden="true" />}
      </motion.div>
      <span className="scene-drag-hint" aria-hidden="true">↔ DRAG TO ROTATE IN 3D</span>
    </div>
    <div className="scene-interaction-controls" role="group" aria-label="3D scene controls">
      <div className="scene-control-buttons"><button type="button" disabled={paused} onClick={() => yaw.set(yaw.get() + 360)}>Spin 360°</button><button type="button" disabled={paused} aria-pressed={exploded} onClick={() => setExploded(value => !value)}>{exploded ? "Stack layers" : "Spread layers"}</button><button type="button" disabled={paused} onClick={() => setPulse(value => value + 1)}>Pulse ✧</button><button type="button" onClick={reset}>Reset</button></div>
      <label className="scene-depth-control">3D depth<input type="range" min="0" max="100" value={depth} disabled={paused} onChange={event => setDepth(Number(event.target.value))} /><output>{depth}%</output></label>
    </div>
  </div>;
}
