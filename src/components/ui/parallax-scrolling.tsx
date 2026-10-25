"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Layer existing sections instead of inserting a separate landscape/demo. */
export function ParallaxComponent({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 901px)",
    }, context => {
      if (!context.conditions?.motion) return;
      const heroLayer = root.current?.querySelector<HTMLElement>("[data-transition-hero]");
      const aboutLayer = root.current?.querySelector<HTMLElement>("[data-transition-about]");
      if (!heroLayer || !aboutLayer) return;
      const desktop = context.conditions.desktop;
      // Distinct speeds create depth during the hand-off without pinning or
      // adding scroll height. The inner hero keeps its own scoped animations.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutLayer,
          start: "top bottom",
          end: "top 20%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(heroLayer, { y: desktop ? 100 : 35, ease: "none" }, 0);
      timeline.fromTo(aboutLayer,
        { y: desktop ? 65 : 25 },
        { y: 0, ease: "none", immediateRender: false }, 0);
    }, root);
    return () => media.revert();
  }, []);

  return <div className="section-parallax" ref={root}>
    <div className="section-parallax__hero" data-transition-hero>{hero}</div>
    <div className="section-parallax__about" data-transition-about>{children}</div>
  </div>;
}
