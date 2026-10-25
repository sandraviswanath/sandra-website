"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/content";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="section contact" ref={ref}>
      <motion.figure
        className="frame"
        initial={{ opacity: 0, x: -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero-drawing.png"
          alt="Sandra at her desk"
          width={900}
          height={1230}
          sizes="(max-width: 900px) 70vw, 28vw"
        />
      </motion.figure>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2>Let&apos;s work together</h2>
        <p>
          I&apos;m open to full stack and front-end roles, and to freelance projects. Write to me and I&apos;ll reply within a day.
        </p>
        <ul className="links">
          <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        </ul>
      </motion.div>
    </section>
  );
}
