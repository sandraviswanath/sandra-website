import Image from "next/image";
import "./orbital-portrait.css";

export default function OrbitalPortrait() {
  return <div className="preview-orbital">
    <div className="preview-orbit orbit-a" aria-hidden="true" />
    <div className="preview-orbit orbit-b" aria-hidden="true" />
    <Image className="preview-portrait" src="/images/hero-cutout.webp" alt="Portrait of Sandra Viswanath" width={800} height={800} sizes="(max-width: 700px) 85vw, 45vw" priority />
    <span className="preview-orbit-label">CREATE / BUILD / REFINE</span>
  </div>;
}
