import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type JobAnalysis = {
  id: string;
  sourceType: "url" | "details" | "screenshot";
  sourceUrl?: string;
  job: Record<string, unknown>;
  scam_analysis: Record<string, unknown>;
  riskScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "UNKNOWN";
  summary: string;
  redFlags: string[];
  riskBreakdown?: { indicator: string; weight: number; contributionPercent: number; evidence?: string; source?: string }[];
  createdAt: string;
};
type AnalysisState = { current: JobAnalysis | null; setCurrent: (analysis: JobAnalysis | null) => void };
export const useAnalysisStore = create<AnalysisState>()(persist((set) => ({ current: null, setCurrent: (current) => set({ current }) }), { name: "jobshield-analysis", storage: createJSONStorage(() => sessionStorage) }));
