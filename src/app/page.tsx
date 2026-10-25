import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { CursorSpotlight } from "@/components/Effects";

export default function Home() {
  return <div className="site-shell">
    <CursorSpotlight /><div className="noise" aria-hidden />
    <Navbar />
    <main id="top"><ParallaxComponent hero={<Hero />}><About /></ParallaxComponent><Skills /><Experience /><Projects /><Education /><Contact /></main>
    <footer className="footer"><span>© {new Date().getFullYear()} Sandra Viswanath</span><span>Designed & built with care · Next.js + TypeScript</span><a href="/hero-previews">10 hero previews ↗</a><a href="#top">Back to top ↑</a></footer>
  </div>;
}
