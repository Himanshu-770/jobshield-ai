import Navbar from "@/component/navbar/Navbar";
import Footer from "@/component/footer/Footer";
import Hero from "./fragments/Hero"
import HowItWorks from "./fragments/HowItWorks"
import About from "./fragments/About"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <About />
      <Footer />
    </main>
  );
}