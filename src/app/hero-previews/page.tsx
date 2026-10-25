import type { Metadata } from "next";
import HeroPreviewGallery from "@/components/HeroPreviewGallery";
import "./previews.css";

export const metadata: Metadata = {
  title: "10 Interactive Hero Previews | Sandra Viswanath",
  description: "Explore ten animated, mouse-interactive portfolio hero concepts for Sandra Viswanath.",
};

export default function HeroPreviewsPage() {
  return <HeroPreviewGallery />;
}
