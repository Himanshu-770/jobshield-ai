"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import api from "@/lib/api";
import { JobAnalysis } from "@/store/analysisStore";
export default function RecentInvestigations() {
  const [items, setItems] = useState<JobAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/job/history?limit=5").then(({ data }) => setItems(data.items || [])).catch(() => setItems([])).finally(() => setLoading(false)); }, []);
  const jobTitle = (item: JobAnalysis) => String(item.job?.["Job Title"] || item.job?.jobTitle || "Untitled job");
  const company = (item: JobAnalysis) => String(item.job?.Company || item.job?.company || item.job?.companyName || "Unknown company");
  const riskColor = (risk: string) => risk === "HIGH" || risk === "CRITICAL" ? "var(--risk-high)" : risk === "MEDIUM" ? "var(--risk-medium)" : "var(--risk-low)";
  return <section className="min-w-0 rounded-xl border p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:p-6 lg:min-h-[438px]" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><div className="flex items-center justify-between gap-3"><h2 className="text-base font-semibold">Recent Investigations</h2><Link href="/history" className="text-xs" style={{ color: "var(--primary)" }}>View all</Link></div>{loading ? <p className="mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>Loading investigations…</p> : items.length === 0 ? <div className="mt-8 text-center"><p className="text-sm" style={{ color: "var(--text-secondary)" }}>No investigations yet.</p><Link href="/analyze" className="mt-3 inline-block text-sm underline" style={{ color: "var(--primary)" }}>Analyze your first job</Link></div> : <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead><tr className="border-b text-xs" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}><th className="py-3 pr-3">JOB TITLE</th><th className="py-3 pr-3">COMPANY</th><th className="py-3 pr-3">SCORE</th><th className="py-3 pr-3">RISK</th><th className="py-3">VIEW</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}><td className="max-w-36 truncate py-3 pr-3 font-medium">{jobTitle(item)}</td><td className="max-w-36 truncate py-3 pr-3" style={{ color: "var(--text-secondary)" }}>{company(item)}</td><td className="py-3 pr-3 font-semibold" style={{ color: riskColor(item.riskLevel) }}>{item.riskScore}/100</td><td className="py-3 pr-3"><span className="rounded-full px-2 py-1 text-xs" style={{ color: riskColor(item.riskLevel), backgroundColor: `color-mix(in srgb, ${riskColor(item.riskLevel)} 12%, transparent)` }}>{item.riskLevel}</span></td><td className="py-3"><Link href={`/analyze/result?id=${item.id}`} aria-label="View analysis"><ChevronRight size={16}/></Link></td></tr>)}</tbody></table></div>}</section>;
}
