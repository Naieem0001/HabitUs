import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/habitus/Navbar";
import { Hero } from "@/components/habitus/Hero";
import { HowItWorks } from "@/components/habitus/HowItWorks";
import { Leaderboard } from "@/components/habitus/Leaderboard";
import { Testimonials } from "@/components/habitus/Testimonials";
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
        <HowItWorks />
        <Leaderboard />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
