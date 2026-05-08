import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/habitus/Navbar";
import { Hero } from "@/components/habitus/Hero";
import { SocialProof } from "@/components/habitus/SocialProof";
import { Problem } from "@/components/habitus/Problem";
import { Solution } from "@/components/habitus/Solution";
import { HowItWorks } from "@/components/habitus/HowItWorks";
import { FeatureShowcase } from "@/components/habitus/FeatureShowcase";
import { TargetUsers } from "@/components/habitus/TargetUsers";
import { Leaderboard } from "@/components/habitus/Leaderboard";
import { Testimonials } from "@/components/habitus/Testimonials";
import { Roadmap } from "@/components/habitus/Roadmap";
import { FinalCTA } from "@/components/habitus/FinalCTA";
import { Footer } from "@/components/habitus/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <HowItWorks />
        <FeatureShowcase />
        <TargetUsers />
        <Leaderboard />
        <Testimonials />
        <Roadmap />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
