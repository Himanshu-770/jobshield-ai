"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Sidebar from "@/component/sidebar/Sidebar";
import AnalyzeHeader from "./fragments/AnalyzeHeader";
import JobDetailsForm from "./fragments/JobDetailsForm";
import WhatWeAnalyze from "./fragments/WhatWeAnalyze";

export default function Analyze() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Job Details");

  const handleAnalyze = () => {
    router.push("/analyze/result");
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-white md:flex">
      <Sidebar />

      <section className="flex-1 p-5 md:p-8">
        <AnalyzeHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_350px]">
          <JobDetailsForm
            activeTab={activeTab}
            onAnalyze={handleAnalyze}
          />

          <WhatWeAnalyze />
        </div>
      </section>
    </main>
  );
}