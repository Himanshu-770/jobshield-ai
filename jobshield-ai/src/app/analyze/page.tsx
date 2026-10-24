"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Search, ShieldCheck } from "lucide-react";
import Sidebar from "@/component/sidebar/Sidebar";
import AnalyzeHeader from "./fragments/AnalyzeHeader";
import JobDetailsForm from "./fragments/JobDetailsForm";
import WhatWeAnalyze from "./fragments/WhatWeAnalyze";
import api, { apiErrorMessage } from "@/lib/api";
import { useAnalysisStore } from "@/store/analysisStore";
import CheckAuth from "@/component/CheckAuth";

export default function Analyze() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Job Details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisStage, setAnalysisStage] = useState(0);
  const setCurrent = useAnalysisStore((state) => state.setCurrent);
  useEffect(() => {
    if (!loading) { setAnalysisStage(0); return; }
    const timer = window.setInterval(() => setAnalysisStage((stage) => Math.min(stage + 1, 3)), 2400);
    return () => window.clearInterval(timer);
  }, [loading]);
  const handleAnalyze = async (form: FormData) => {
    if (activeTab === "Screenshot") {
      const screenshot = form.get("screenshot");
      if (!(screenshot instanceof File) || screenshot.size === 0) {
        setError("Choose a job screenshot before starting the analysis.");
        return;
      }
      if (!["image/png", "image/jpeg", "image/webp"].includes(screenshot.type)) {
        setError("Use a PNG, JPG, or WEBP image.");
        return;
      }
      if (screenshot.size > 8 * 1024 * 1024) {
        setError("This screenshot is larger than 8 MB. Choose a smaller image.");
        return;
      }
    }
    setLoading(true);
    setError("");
    try {
      let response;
      if (activeTab === "Job URL")
        response = await api.post("/job/url/get-data", {
          url: form.get("url"),
        });
      else if (activeTab === "Screenshot")
        response = await api.post("/job/screenshot", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      else
        response = await api.post(
          "/job/analyze",
          Object.fromEntries(form.entries()),
        );
      setCurrent(response.data.analysis);
      router.push(`/analyze/result?id=${response.data.analysis.id}`);
    } catch (err) {
      setError(apiErrorMessage(err, "Unable to analyze this job"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <CheckAuth/>
      <main
        className="min-h-screen md:flex"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        <Sidebar />
        <section className="flex-1 p-5 md:p-8">
          <AnalyzeHeader
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setError("");
            }}
          />
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
            >
              {error}
            </p>
          )}
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_350px]">
            <JobDetailsForm
              activeTab={activeTab}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
            <WhatWeAnalyze />
          </div>
        </section>
      </main>
      {loading && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Analyzing job and researching hiring risks">
        <section role="status" aria-live="polite" aria-label="Analyzing job and researching hiring risks" className="w-full max-w-md rounded-2xl border p-6 shadow-2xl sm:p-8" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          <div className="flex items-center gap-4">
            <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-blue-400/30 bg-blue-500/10">
              <span className="absolute inset-0 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
              <ShieldCheck size={25} className="text-blue-400" />
              <span className="absolute -right-1 -top-1 rounded-full bg-blue-500 p-1 text-white"><Search size={12} /></span>
            </div>
            <div><p className="text-lg font-semibold">Checking this opportunity</p><p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Reviewing the posting, company signals, and hiring risks.</p></div>
          </div>
          <ol className="mt-6 space-y-3">
            {["Reading job details and recruiter signals", "Checking payment, identity, and interview risks", "Searching company and hiring-stage reports", "Building an evidence-based risk score"].map((label, index) => <li key={label} className="flex items-center gap-3 text-sm" style={{ color: index <= analysisStage ? "var(--text-primary)" : "var(--text-muted)" }}>
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${index < analysisStage ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : index === analysisStage ? "border-blue-400/50 bg-blue-500/10 text-blue-400" : ""}`} style={{ borderColor: index > analysisStage ? "var(--border)" : undefined }}>{index < analysisStage ? <Check size={13} /> : index === analysisStage ? <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" /> : <span className="text-[10px]">{index + 1}</span>}</span>{label}
            </li>)}</ol>
          <p className="mt-6 border-t pt-4 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>Search results may be incomplete or refer to a similarly named company. The report will show the evidence and sources found.</p>
        </section>
      </div>}
    </>
  );
}
