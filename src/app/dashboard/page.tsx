import Sidebar from "@/component/sidebar/Sidebar";
import DashboardHeader from "./fragments/DashboardHeader";
import StatsCards from "./fragments/StatsCards";
import RecentInvestigations from "./fragments/RecentInvestigations";
import SuspiciousJobCard from "./fragments/SuspiciousJobCard";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white md:flex">
      <Sidebar />

      <section className="flex-1 p-5 md:p-8">
        <DashboardHeader />
        <StatsCards />

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_280px]">
          <RecentInvestigations />
          <SuspiciousJobCard />
        </div>
      </section>
    </main>
  );
}