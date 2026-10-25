"use client";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "@/data/content";

export default function Projects(){
 const target=useRef<HTMLElement>(null);
 const track=useRef<HTMLDivElement>(null);
 const [travel,setTravel]=useState(0);
 const {scrollYProgress}=useScroll({target,offset:["start start","end end"]});
 const reducedMotion=useReducedMotion();
 const x=useTransform(scrollYProgress,[0,1],[0,-travel]);

 useEffect(()=>{
  const measure=()=>{
   if(!track.current) return;
   // Layout widths stay stable while the track is translated.
   setTravel(Math.max(0,track.current.scrollWidth-track.current.clientWidth));
  };
  measure();
  const observer=new ResizeObserver(measure);
  if(track.current) observer.observe(track.current);
  window.addEventListener("resize",measure);
  return()=>{observer.disconnect();window.removeEventListener("resize",measure)};
 },[]);

 return <section id="projects" className="projects-horizontal" ref={target} aria-labelledby="projects-title" style={{ "--project-travel": `${travel}px` } as CSSProperties}>
  <div className="projects-sticky">
   <div className="projects-head"><p className="eyebrow">SELECTED WORK / SCROLL TO EXPLORE</p><h2 id="projects-title">Projects built to solve real problems.</h2><motion.div className="project-progress"><motion.i style={{scaleX:scrollYProgress}}/></motion.div></div>
   <motion.div ref={track} className="project-track" style={{x:reducedMotion?0:x}}>
    {projects.map((p,i)=><motion.article className="project-slide" key={p.name} whileHover={reducedMotion?undefined:{y:-6}}>
      <div className="project-preview" aria-hidden><div className="preview-browser"><span/><span/><span/></div><div className="preview-grid"><motion.div animate={{opacity:[.25,.8,.25]}} transition={{duration:2.5,repeat:Infinity,delay:i*.12}}/><div/><div/><div/></div><span className="preview-number">{String(i+1).padStart(2,"0")}</span></div>
      <div className="project-copy"><div className="project-top"><span className="project-kind">{p.kind}</span>{p.href&&<a className="project-link" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.name} (opens in a new tab)`}>↗</a>}</div><h3><Link href={`/projects/${p.slug}`}>{p.name}</Link></h3><p>{p.description}</p><Link className="project-details-link" href={`/projects/${p.slug}`}>View project details <span aria-hidden="true">↗</span></Link><div className="stack-pills">{p.stack.map(s=><span key={s}>{s}</span>)}</div></div>
    </motion.article>)}
   </motion.div>
  </div>
 </section>
}
