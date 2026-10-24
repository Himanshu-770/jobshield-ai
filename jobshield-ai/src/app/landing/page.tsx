import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import PageBoundaries from "@/component/PageBoundaries";
import SectionDivider from "@/component/SectionDivider";

import Hero from "./fragments/Hero";
import HowItWorks from "./fragments/HowItWorks";
import About from "./fragments/About";
import FAQ from "./fragments/Faq";
import Testimonial from "./fragments/Testimonial";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      <div className="relative pt-20">
        <PageBoundaries />

        <Hero />

        <SectionDivider />

        <HowItWorks />

        <SectionDivider />

        <About />

        <SectionDivider />

        <Testimonial />

        <SectionDivider />

        <FAQ />
      </div>

      <Footer />
    </main>
  );
}