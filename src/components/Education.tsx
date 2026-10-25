"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "@/data/content";

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section edu" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        Education
      </motion.h2>
      <ul>
        {education.map((e, i) => (
          <motion.li
            key={e.title}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="period">{e.period}</p>
            <div>
              <h3>{e.title}</h3>
              <p>{e.place}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
