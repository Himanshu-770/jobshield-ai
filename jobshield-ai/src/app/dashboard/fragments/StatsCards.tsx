"use client";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, ShieldAlert, ShieldCheck } from "lucide-react";
import api from "@/lib/api";
const statsMeta = [
  { label: "JOBS CHECKED", key: "total", icon: BriefcaseBusiness, type: "blue" },
  { label: "HIGH / CRITICAL RISK", key: "highRisk", icon: ShieldAlert, type: "red" },
  { label: "MEDIUM RISK", key: "mediumRisk", icon: ShieldAlert, type: "yellow" },
  { label: "LOW RISK", key: "lowRisk", icon: ShieldCheck, type: "green" },
] as const;
const colors = { blue: "var(--primary)", red: "var(--risk-high)", yellow: "var(--risk-medium)", green: "var(--risk-low)" };
export default function StatsCards() {
  const [stats, setStats] = useState<Record<string, number>>({ total: 0, highRisk: 0, mediumRisk: 0, lowRisk: 0 });
  useEffect(() => { api.get("/job/stats").then(({ data }) => setStats(data)).catch(() => undefined); }, []);
  return <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">{statsMeta.map(({ label, key, icon: Icon, type }) => <div key={label} className="rounded-xl border p-4 transition-all duration-300 hover:shadow-lg sm:p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><div className="flex items-center justify-between"><p className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>{label}</p><Icon size={18} style={{ color: colors[type] }}/></div><p className="mt-3 text-2xl font-extrabold" style={{ color: colors[type] }}>{stats[key] ?? 0}</p></div>)}</div>;
}
