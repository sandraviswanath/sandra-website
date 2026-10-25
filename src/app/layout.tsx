import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandra Viswanath | Full Stack Developer",
  description: "Portfolio of Sandra Viswanath — full stack developer building polished web, mobile and PWA experiences with Next.js, React and React Native.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
