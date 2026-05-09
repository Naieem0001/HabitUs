import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/habitus/Navbar";
import { Hero } from "@/components/habitus/Hero";
import { HowItWorks } from "@/components/habitus/HowItWorks";
import { FeatureShowcase } from "@/components/habitus/FeatureShowcase";
import { Leaderboard } from "@/components/habitus/Leaderboard";
import { Testimonials } from "@/components/habitus/Testimonials";
import { FinalCTA } from "@/components/habitus/FinalCTA";
import { Footer } from "@/components/habitus/Footer";
import { BackgroundDecor } from "@/components/habitus/BackgroundDecor";
import { SocialProofTicker } from "@/components/habitus/SocialProofTicker";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <BackgroundDecor />
      <Navbar />
      <main className="relative">
        <Hero />
        <SocialProofTicker />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <FeatureShowcase />
        <SectionDivider />
        <Leaderboard />
        <SectionDivider />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-px max-w-5xl"
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
    </div>
  );
}
