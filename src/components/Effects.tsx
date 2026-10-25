"use client";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

export function CursorSpotlight(){
 const x=useMotionValue(-500),y=useMotionValue(-500); const sx=useSpring(x,{stiffness:180,damping:28}),sy=useSpring(y,{stiffness:180,damping:28});
 useEffect(()=>{const move=(e:PointerEvent)=>{x.set(e.clientX);y.set(e.clientY)};window.addEventListener("pointermove",move);return()=>window.removeEventListener("pointermove",move)},[x,y]);
 return <motion.div className="cursor-spotlight" style={{left:sx,top:sy}} aria-hidden/>;
}
export function Magnetic({children,className=""}:{children:ReactNode,className?:string}){
 const x=useSpring(0,{stiffness:220,damping:16}),y=useSpring(0,{stiffness:220,damping:16});
 const move=(e:MouseEvent<HTMLElement>)=>{const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.18);y.set((e.clientY-r.top-r.height/2)*.18)};
 return <motion.span className={`magnetic ${className}`} style={{x,y}} onMouseMove={move} onMouseLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.span>
}
export function TextReveal({text,className=""}:{text:string,className?:string}){
 const ref=useRef<HTMLSpanElement>(null);
 // Trigger the whole line once instead of giving every clipped word its own
 // IntersectionObserver. A low threshold is much more reliable in sticky/
 // horizontal-scroll sections, and the timeout guarantees visible fallback.
 const inView=useInView(ref,{once:true,amount:.15});
 const [fallbackVisible,setFallbackVisible]=useState(false);
 useEffect(()=>{const id=window.setTimeout(()=>setFallbackVisible(true),900);return()=>window.clearTimeout(id)},[]);
 const visible=inView||fallbackVisible;
 return <span ref={ref} className={`text-reveal ${className}`} aria-label={text}>{text.split(" ").map((word,i)=><span className="reveal-word" aria-hidden key={`${word}-${i}`}><motion.span initial={false} animate={{y:visible?"0%":"115%",rotate:visible?0:2}} transition={{duration:.7,delay:visible?i*.035:0,ease:[.22,1,.36,1]}}>{word}&nbsp;</motion.span></span>)}</span>
}
export function ScrambleText({text}:{text:string}){
 const [shown,setShown]=useState(text); useEffect(()=>{const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";let frame=0;const total=text.length*3;const id=setInterval(()=>{frame++;setShown(text.split("").map((c,i)=>c===" "?" ":i<frame/3?c:chars[Math.floor(Math.random()*chars.length)]).join(""));if(frame>=total)clearInterval(id)},28);return()=>clearInterval(id)},[text]);return <>{shown}</>
}
