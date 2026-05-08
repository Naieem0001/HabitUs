import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/habitus/Navbar";
import { Hero } from "@/components/habitus/Hero";
import { HowItWorks } from "@/components/habitus/HowItWorks";
import { Leaderboard } from "@/components/habitus/Leaderboard";
import { Testimonials } from "@/components/habitus/Testimonials";
import { FinalCTA } from "@/components/habitus/FinalCTA";
import { Footer } from "@/components/habitus/Footer";
import { BackgroundDecor } from "@/components/habitus/BackgroundDecor";

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
        <SectionDivider />
        <HowItWorks />
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
      className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-border to-transparent"
    />
  );
}
