"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { jobs } from "@/data/content";

function TimelineItem({ job, index }: { job: typeof jobs[0]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.li
      ref={ref}
      key={job.company + job.period}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="period">{job.period}</p>
      <div>
        <h3>{job.title}, {job.company}</h3>
        <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </motion.li>
  );
}

export default function Experience() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="section">
      <motion.h2
        ref={headRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        Experience
      </motion.h2>
      <ol className="timeline">
        {jobs.map((j, i) => (
          <TimelineItem key={j.company + j.period} job={j} index={i} />
        ))}
      </ol>
    </section>
  );
}
