import Navbar from "@/components/Navbar";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedCharity from "@/components/home/FeaturedCharity";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/home/Footer";
import Stats from "@/components/home/Stats";
export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <Hero />
<Stats />
      <Features />

      <HowItWorks />

      <FeaturedCharity />

      <Pricing />

      <Footer />

    </div>
  );
}