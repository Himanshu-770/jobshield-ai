"use client";

import { useState } from "react";
import Sidebar from "@/component/sidebar/Sidebar";
import AnalyzeHeader from "./fragments/AnalyzeHeader";
import JobDetailsForm from "./fragments/JobDetailsForm";
import WhatWeAnalyze from "./fragments/WhatWeAnalyze";

export default function Analyze() {
  const [activeTab, setActiveTab] = useState("Job Details");
  const [analyzing, setAnalyzing] = useState(false);

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
            onAnalyze={() => setAnalyzing(true)}
          />

          {analyzing && <WhatWeAnalyze />}
        </div>
      </section>
    </main>
  );
}