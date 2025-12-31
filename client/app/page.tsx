"use client";

import HeroSection from "@/components/landing/HeroSection";
import LogoMarquee from "@/components/landing/LogoMarquee";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}
