import Landing from "./landing/page";
import About from "./about/page";
export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Landing />
    </main>
  );
}
