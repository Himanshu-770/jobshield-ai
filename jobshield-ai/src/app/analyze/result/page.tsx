"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft, ArrowUpRight, BadgeAlert, BriefcaseBusiness, Building2,
  Check, ChevronDown, CircleAlert, CircleCheck, Clock3, ExternalLink,
  FileSearch, Globe2, ListChecks, Search, Shield, ShieldAlert,
  ShieldCheck, Sparkles, TriangleAlert,
} from "lucide-react";
import api, { apiErrorMessage } from "@/lib/api";
import { JobAnalysis, useAnalysisStore } from "@/store/analysisStore";
import InvestigationChat from "./InvestigationChat";

type Finding = { indicator: string; weight: number; evidence?: string; source?: string; contributionPercent?: number; severity?: string };
type Source = { category?: string; title?: string; url?: string; snippet?: string };
type Gap = { indicator: string; weight: number; evidence?: string; severity?: string };
type RecordValue = Record<string, unknown>;

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
const list = (value: unknown): string[] => Array.isArray(value) ? value.map((item) => typeof item === "string" ? item.trim() : "").filter(Boolean) : [];
function httpUrl(value: unknown): string | null {
  try { const url = new URL(text(value)); return ["http:", "https:"].includes(url.protocol) ? url.toString() : null; } catch { return null; }
}
function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border p-5 sm:p-6 ${className}`} style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>{children}</section>;
}
function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>{children}</p>;
}
function Heading({ icon, children, note }: { icon: ReactNode; children: ReactNode; note?: string }) {
  return <div className="mb-5 flex items-start gap-3"><span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ color: "var(--primary)", backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)" }}>{icon}</span><div><h2 className="text-base font-semibold sm:text-lg">{children}</h2>{note ? <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{note}</p> : null}</div></div>;
}
function External({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-current/40 underline-offset-4 hover:decoration-current" style={{ color: "var(--primary)" }}>{children}<ExternalLink size={13} /></a>;
}

export default function AnalysisResult() {
  const current = useAnalysisStore((state) => state.current);
  const setCurrent = useAnalysisStore((state) => state.setCurrent);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllSources, setShowAllSources] = useState(false);

  useEffect(() => {
    let active = true;
    const id = new URLSearchParams(window.location.search).get("id");
    const cachedRulebookVersion = (current?.scam_analysis.risk_rulebook as RecordValue | undefined)?.version;
    if (current && current.id === id && cachedRulebookVersion === "2.4") { setAnalysis(current); setLoading(false); return () => { active = false; }; }
    if (!id) { setError("No analysis was selected. Analyze a job to create a report."); setLoading(false); return () => { active = false; }; }
    api.get(`/job/${encodeURIComponent(id)}`).then(({ data }) => {
      if (active) { setAnalysis(data.analysis); setCurrent(data.analysis); }
    }).catch((err) => { if (active) setError(apiErrorMessage(err, "Could not load this analysis")); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [current, setCurrent]);

  const report = (analysis?.scam_analysis || {}) as RecordValue;
  const job = (analysis?.job || {}) as RecordValue;
  const findings = (analysis?.riskBreakdown || []) as Finding[];
  const gaps = (Array.isArray(report.profile_gaps) ? report.profile_gaps : Array.isArray(report.company_profile_gaps) ? report.company_profile_gaps : []) as Gap[];
  const sources = (Array.isArray(job["Company Research Sources"]) ? job["Company Research Sources"] : []) as Source[];
  const score = Math.max(0, Math.min(100, Number(analysis?.riskScore) || 0));
  const company = text(job.Company || job.company || job.companyName) || "Company not provided";
  const role = text(job["Job Title"] || job.jobTitle) || "Role not provided";
  const summary = analysis?.summary || "Review the evidence below and verify the employer through contact details you find independently.";
  const sourceType = analysis?.sourceType || "details";
  const gapPoints = gaps.reduce((sum, gap) => sum + (Number(gap.weight) || 0), 0);
  const signalFindings = findings.filter((item) => !["verification_gap", "positive_verification"].includes(item.source || ""));
  const riskColor = analysis?.riskLevel === "HIGH" || analysis?.riskLevel === "CRITICAL" ? "var(--risk-high)" : analysis?.riskLevel === "MEDIUM" ? "var(--risk-medium)" : "var(--risk-low)";
  const positiveSignals = list(report.positive_signals);
  const positive = positiveSignals.length ? positiveSignals : list(report.positive_legitimacy_signals);
  const recommendations = list(report.recommended_actions);
  const redFlags = list(report.red_flags).length ? list(report.red_flags) : analysis?.redFlags || [];
  const companyWebsite = httpUrl(job["Company Website"]);
  const sourcesByCategory = useMemo(() => sources.filter((source) => httpUrl(source.url)), [sources]);
  const reviewSources = sourcesByCategory.filter((source) => {
    try { const host = new URL(String(source.url)).hostname.toLowerCase().replace(/^www\./, ""); const tokens = company.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2 && !/^(inc|llc|ltd|limited|corp|corporation|company|private|pvt)$/.test(token)); const evidence = `${source.title || ""} ${source.snippet || ""} ${source.url || ""}`.toLowerCase(); return tokens.length > 0 && tokens.some((token) => evidence.includes(token)) && /(^|\.)glassdoor\.(com|co\.[a-z]{2}|[a-z]{2})$|(^|\.)ambitionbox\.com$|(^|\.)indeed\.(com|co\.[a-z]{2}|[a-z]{2})$/.test(host); } catch { return false; }
  });
  const reviewSearchStatus = text(job["Company Review Search Status"]);
  const researchAttempted = text(job["Company Research Status"]) === "search_attempted";

  const stages = [
    { title: "Recruiter contact", icon: <Search size={16} />, match: /recruitment fee|personal email|messaging.only|impersonation|suspicious domain|pressure|company identity/i, description: "Identity, contact channel, fees, and pressure tactics." },
    { title: "Interview and selection", icon: <BriefcaseBusiness size={16} />, match: /interview|evaluation|unpaid project|assignment|ghosting/i, description: "Interview process, unpaid assessments, and follow-up." },
    { title: "Offer and onboarding", icon: <FileSearch size={16} />, match: /fee|training|equipment|identity|financial|bank|deposit|payment|background check/i, description: "Offer terms, onboarding charges, and sensitive information." },
    { title: "After joining", icon: <Clock3 size={16} />, match: /role change|bait|withheld|wages|salary|onboarding|ghosting/i, description: "Role or pay changes, wage reports, and post-hire complaints." },
  ];

  if (loading) return <main className="grid min-h-screen place-items-center p-6" style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}><div role="status" className="flex items-center gap-3 rounded-2xl border p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}><span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" /><span className="text-sm">Loading your investigation…</span></div></main>;
  if (error || !analysis) return <main className="grid min-h-screen place-items-center p-6" style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}><Panel className="max-w-lg text-center"><span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-red-500/10 text-red-400"><CircleAlert /></span><h1 className="text-xl font-semibold">Report unavailable</h1><p role="alert" className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>{error || "Analysis not found"}</p><Link href="/analyze" className="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>Analyze a job <ArrowUpRight size={15} /></Link></Panel></main>;

  return <main className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}>
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-7 lg:px-10 lg:py-8">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <Link href="/analyze" className="inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white/5" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}><ArrowLeft size={16} /> Back to analysis</Link>
        <div className="flex items-center gap-2 text-sm font-semibold"><span className="grid h-8 w-8 place-items-center rounded-xl" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 16%, transparent)", color: "var(--primary)" }}><ShieldCheck size={18} /></span>JobShield <span style={{ color: "var(--text-muted)" }}>/ Investigation report</span></div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
        <Panel className="relative overflow-hidden !p-0">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${riskColor}, transparent)` }} />
          <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div className="order-2 md:order-1">
              <Label>Opportunity risk assessment</Label>
              <div className="mt-3 flex flex-wrap items-center gap-3"><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{analysis.riskLevel} risk</h1><span className="rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ color: gaps.length ? "#fbbf24" : riskColor, borderColor: gaps.length ? "rgba(251,191,36,.4)" : `color-mix(in srgb, ${riskColor} 40%, transparent)`, backgroundColor: gaps.length ? "rgba(251,191,36,.1)" : `color-mix(in srgb, ${riskColor} 10%, transparent)` }}>{gaps.length >= 3 ? "Key information missing" : gaps.length ? "Some details need verification" : analysis.riskLevel === "CRITICAL" ? "Pause and verify" : analysis.riskLevel === "HIGH" ? "Verify before proceeding" : analysis.riskLevel === "MEDIUM" ? "Proceed with care" : "No major signal found"}</span></div>
              <p className="mt-3 max-w-2xl text-sm leading-6 sm:text-base" style={{ color: "var(--text-secondary)" }}>{summary}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: "var(--text-muted)" }}><span className="inline-flex items-center gap-1.5"><Building2 size={14} />{company}</span><span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={14} />{role}</span><span className="inline-flex items-center gap-1.5"><FileSearch size={14} />{sourceType === "url" ? "Job link" : sourceType === "screenshot" ? "Screenshot" : "Job details"}</span></div>
            </div>
            <div className="order-1 mx-auto md:order-2 md:mr-1">
              <div className="grid h-36 w-36 place-items-center rounded-full p-[9px] sm:h-40 sm:w-40" style={{ background: `conic-gradient(${riskColor} ${score * 3.6}deg, var(--surface-secondary) 0deg)` }} aria-label={`Risk score ${score} out of 100`}>
                <div className="grid h-full w-full place-items-center rounded-full text-center" style={{ backgroundColor: "var(--surface)" }}><div><span className="block text-4xl font-bold tabular-nums" style={{ color: riskColor }}>{score}</span><span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>of 100 points</span></div></div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 border-t px-5 py-4 sm:grid-cols-3 sm:px-7" style={{ borderColor: "var(--border)", backgroundColor: "color-mix(in srgb, var(--surface-secondary) 55%, transparent)" }}>
            <Metric icon={<ShieldAlert size={15} />} label="Risk signals" value={String(signalFindings.length)} />
            <Metric icon={<TriangleAlert size={15} />} label="Verification gaps" value={`${gaps.length} · +${gapPoints} pts`} />
            <Metric icon={<Globe2 size={15} />} label="Research sources" value={String(sourcesByCategory.length)} />
          </div>
        </Panel>

        <Panel className="flex flex-col justify-between">
          <div><div className="flex items-center gap-2"><Sparkles size={17} style={{ color: "var(--primary)" }} /><Label>Recommended next steps</Label></div>
            <ul className="mt-4 space-y-3">{(recommendations.length ? recommendations.slice(0, 4) : ["Open the company’s official careers page using a website you find independently.", "Do not pay to apply, train, receive equipment, or unlock work.", "Share identity and payroll details only after verifying a formal offer and employer."]).map((item, index) => <li key={`${item}-${index}`} className="flex gap-3 text-sm leading-5"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 13%, transparent)", color: "var(--primary)" }}><Check size={12} /></span><span style={{ color: "var(--text-secondary)" }}>{item}</span></li>)}</ul>
          </div>
          <p className="mt-5 rounded-xl border px-3.5 py-3 text-xs leading-5" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>This screening is a signal review, not a guarantee or a finding of wrongdoing. Verify the employer independently.</p>
        </Panel>
      </section>

      <InvestigationChat analysisId={analysis.id} onAnalysis={(updated) => { setAnalysis(updated); setCurrent(updated); }} />

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel>
          <Heading icon={<ListChecks size={18} />} note="Missing company and job-posting details add capped uncertainty points; they are not proof of fraud.">Profile completeness</Heading>
          {gaps.length ? <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4"><BadgeAlert size={18} className="mt-0.5 shrink-0 text-amber-400" /><div><p className="text-sm font-semibold">{gaps.length} important detail{gaps.length === 1 ? " is" : "s are"} missing or unconfirmed <span className="text-amber-300">(+{gapPoints} points)</span></p><p className="mt-1 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>Missing details increase uncertainty according to their importance. They are not proof of fraud, so they cannot alone create a critical risk finding.</p></div></div> : <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4"><CircleCheck size={18} className="mt-0.5 shrink-0 text-emerald-400" /><div><p className="text-sm font-semibold">No weighted profile gaps found</p><p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>The checked details were present in structured profile information. Search-result candidates are not treated as verified company details.</p></div></div>}
          <div className="space-y-2">{gaps.length ? gaps.map((gap, index) => <div key={`${gap.indicator}-${index}`} className="flex items-start justify-between gap-4 rounded-xl border px-3.5 py-3" style={{ borderColor: "var(--border)" }}><div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium">{gap.indicator}</p><span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">{gap.severity || "medium"} importance</span></div><p className="mt-1 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{gap.evidence}</p></div><span className="shrink-0 rounded-lg bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">+{gap.weight}</span></div>) : <div className="grid gap-2 sm:grid-cols-2"><ProfileField label="Company website" value={companyWebsite || text(job["Company Website"])} /><ProfileField label="Registration" value={text(job["Company Registration"])} /><ProfileField label="Business profile" value={list(job.Company_Domain_Of_Work).join(", ") || text(job["Company Business Profile"])} /><ProfileField label="Role listing" value={role} /></div>}</div>
          {researchAttempted ? <p className="mt-4 text-[11px]" style={{ color: "var(--text-muted)" }}>Company searches were attempted. Search coverage varies; open the sources below to confirm details.</p> : <p className="mt-4 text-[11px]" style={{ color: "var(--text-muted)" }}>Company research was not run for this record. A company name may not have been supplied.</p>}
        </Panel>

        <Panel>
          <Heading icon={<Shield size={18} />} note="Signals are grouped by when they can appear in the hiring journey.">Hiring-stage checks</Heading>
          <div className="space-y-3">{stages.map((stage, index) => {
            const matched = signalFindings.filter((item) => stage.match.test(item.indicator));
            return <article key={stage.title} className="relative rounded-xl border p-3.5" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-secondary)" }}>
              <div className="flex items-start gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ color: matched.length ? "var(--risk-high)" : "var(--text-muted)", backgroundColor: matched.length ? "color-mix(in srgb, var(--risk-high) 12%, transparent)" : "color-mix(in srgb, var(--text-secondary) 8%, transparent)" }}>{stage.icon}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold">{index + 1}. {stage.title}</h3><span className="text-[11px] font-semibold" style={{ color: matched.length ? "var(--risk-high)" : "var(--text-muted)" }}>{matched.length ? `${matched.length} signal${matched.length === 1 ? "" : "s"}` : "No match"}</span></div><p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>{stage.description}</p>
                {matched.length ? <ul className="mt-3 space-y-2 border-t pt-3" style={{ borderColor: "var(--border)" }}>{matched.map((item, itemIndex) => <li key={`${item.indicator}-${itemIndex}`} className="text-xs"><span className="font-semibold">{item.indicator}</span>{item.evidence ? <p className="mt-0.5 leading-5" style={{ color: "var(--text-secondary)" }}>{item.evidence}</p> : null}<p className="mt-1 text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Source: {sourceLabel(item.source)}</p></li>)}</ul> : null}
              </div></div>
            </article>;
          })}</div>
          <p className="mt-3 text-[11px] leading-5" style={{ color: "var(--text-muted)" }}>“No match” means no supporting signal was found in the available job details or search evidence; it does not mean the employer is verified.</p>
        </Panel>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <Heading icon={<FileSearch size={18} />} note="Weighted evidence points explain how the score was formed.">Risk score breakdown</Heading>
          {findings.length ? <div className="space-y-3">{findings.map((item, index) => { const reducing = item.source === "positive_verification"; const pointColor = reducing ? "#34d399" : item.source === "verification_gap" ? "#fbbf24" : riskColor; return <div key={`${item.indicator}-${index}`} className="rounded-xl border p-3.5" style={{ borderColor: "var(--border)" }}><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold">{item.indicator}</p><div className="flex items-center gap-2"><span className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{sourceLabel(item.source)}</span><span className="rounded-lg px-2 py-1 text-xs font-bold" style={{ color: pointColor, backgroundColor: `color-mix(in srgb, ${pointColor} 10%, transparent)` }}>{item.weight < 0 ? "−" : "+"}{Math.abs(item.weight)} pts</span></div></div>{item.evidence ? <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{item.evidence}</p> : null}<div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: "var(--surface-secondary)" }}><div className="h-full rounded-full" style={{ width: `${Math.min(100, item.contributionPercent || 0)}%`, backgroundColor: pointColor }} /></div></div>; })}</div> : <Empty text="No risk signal matched the available evidence." />}
          <details className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">How JobShield scores an opportunity <ChevronDown size={15} style={{ color: "var(--text-muted)" }} /></summary><div className="mt-3 space-y-2 text-xs leading-5" style={{ color: "var(--text-secondary)" }}><p>JobShield Rulebook v2.4 uses fixed, deterministic rules. The model's numeric score and positive sentiment do not change the final score. Identical extracted job details and research evidence produce the same result. The score is not a probability of fraud.</p><p>Missing company-verification details are capped at 25 points, and missing job-posting details are capped at 12 points. Public research findings share a 20-point cap. Positive signals are displayed as context but never subtract points or cancel risk evidence.</p><p>LOW: 0–19 · MEDIUM: 20–39 · HIGH: 40–59 · CRITICAL: 60+; direct critical evidence is HIGH below 35 and CRITICAL at 35+.</p><p>Missing data is uncertainty, not proof of wrongdoing. Open the evidence above and verify each claim independently.</p></div></details>
        </Panel>

        <div className="space-y-5">
          <Panel><Heading icon={<TriangleAlert size={18} />} note="Review each concern and its evidence before acting.">Potential red flags</Heading>{redFlags.length ? <ul className="space-y-2.5">{redFlags.map((flag, index) => <li key={`${flag}-${index}`} className="flex gap-2.5 rounded-xl border p-3 text-sm leading-5" style={{ borderColor: "var(--border)" }}><CircleAlert size={16} className="mt-0.5 shrink-0 text-red-400" /><span>{flag}</span></li>)}</ul> : <Empty text="No explicit red flags were returned. Missing evidence does not establish legitimacy." />}</Panel>
          <Panel><Heading icon={<CircleCheck size={18} />} note="Evidence that may support legitimacy, followed by practical safety steps.">Positive signals & next steps</Heading>{positive.length ? <ul className="mb-4 space-y-2">{positive.map((item, index) => <li key={`${item}-${index}`} className="flex gap-2 text-sm"><Check size={15} className="mt-0.5 shrink-0 text-emerald-400" /><span style={{ color: "var(--text-secondary)" }}>{item}</span></li>)}</ul> : null}<ul className="space-y-2.5">{(recommendations.length ? recommendations : ["Verify the company and opening using contact details you find independently.", "Never pay a fee to get hired or pay to unlock work.", "Do not share passwords, one-time codes, or banking credentials."]).map((item, index) => <li key={`${item}-${index}`} className="flex gap-2.5 text-sm leading-5"><span className="mt-0.5 text-xs font-bold" style={{ color: "var(--primary)" }}>{String(index + 1).padStart(2, "0")}</span><span style={{ color: "var(--text-secondary)" }}>{item}</span></li>)}</ul></Panel>
        </div>
      </section>

      <section className="mt-5">
        <Panel><div className="flex flex-wrap items-start justify-between gap-3"><Heading icon={<Building2 size={18} />} note="Search results are leads to verify, not proof that an entity is legitimate.">Company intelligence</Heading><span className="rounded-full border px-2.5 py-1 text-[11px]" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>{sourcesByCategory.length} source{sourcesByCategory.length === 1 ? "" : "s"}</span></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><ProfileField label="Company" value={company} /><ProfileField label="Role" value={role} /><ProfileField label="Website candidate" value={companyWebsite || "Not identified"} link={companyWebsite || undefined} /><ProfileField label="Registration details" value={text(job["Company Registration"]) || "Not found in available profile"} /></div>
          <div className="mt-5 rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-secondary)" }}>
            <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2"><Search size={15} style={{ color: "var(--primary)" }} /><h3 className="text-sm font-semibold">Reviews and hiring experiences searched</h3></div><span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{reviewSources.length} linked result{reviewSources.length === 1 ? "" : "s"}</span></div>
            {reviewSources.length ? <><div className="mt-3 grid gap-3 md:grid-cols-2">{reviewSources.map((source, index) => { const url = httpUrl(source.url); if (!url) return null; return <article key={`${source.url}-review-${index}`} className="rounded-lg border p-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}><p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{source.category || "Review or hiring report"}</p><External href={url}>{source.title || "Open review source"}</External>{source.snippet ? <p className="mt-2 line-clamp-3 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{source.snippet}</p> : null}</article>; })}</div><p className="mt-3 text-[11px]" style={{ color: "var(--text-muted)" }}>These are search excerpts from public review pages. Open the source to read the full review and confirm it refers to this employer.</p></> : <p className="mt-3 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{reviewSearchStatus === "search_attempted" ? "No company-matched Glassdoor, AmbitionBox, or Indeed review pages were returned. This does not mean no reviews exist." : reviewSearchStatus === "skipped_no_company_name" ? "Company review searches were not run because no company name was available." : "Review search status was not saved for this older report. Reanalyze the job to search current review sources."}</p>}
          </div>
          {sourcesByCategory.length ? <div className="mt-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Globe2 size={15} style={{ color: "var(--primary)" }} /><h3 className="text-sm font-semibold">Search results and source links</h3></div>{sourcesByCategory.length > 4 ? <button type="button" onClick={() => setShowAllSources((visible) => !visible)} className="rounded-lg border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: "var(--border)", color: "var(--primary)" }}>{showAllSources ? "Show fewer" : `Show all ${sourcesByCategory.length} sources`}</button> : null}</div><div className="grid gap-3 md:grid-cols-2">{(showAllSources ? sourcesByCategory : sourcesByCategory.slice(0, 4)).map((source, index) => { const url = httpUrl(source.url); if (!url) return null; return <article key={`${source.url}-${index}`} className="rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-secondary)" }}><p className="mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{source.category || "Research"}</p><External href={url}>{source.title || "Open source"}</External>{source.snippet ? <p className="mt-2 line-clamp-3 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{source.snippet}</p> : null}</article>; })}</div></div> : <Empty text={researchAttempted ? "Searches were attempted but no linkable results were returned. This is not evidence that no reports exist." : "No company research sources were saved for this analysis."} />}
        </Panel>
      </section>

      <Panel className="mt-5"><Heading icon={<BriefcaseBusiness size={18} />} note="The submitted role details are kept with this private investigation.">Job details</Heading><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[["Salary / compensation", job.Salary || job.salary || job.Stipend], ["Recruiter", job["Recruiter Name"] || job.recruiterName], ["Recruiter email", job["Recruiter Email"] || job.recruiterEmail], ["Location", job.Location || job.location], ["Work mode", job["Work Mode"] || job.workMode], ["Source URL", analysis.sourceUrl || job.URL || job.url]].map(([label, value]) => <ProfileField key={String(label)} label={String(label)} value={text(value) || "Not provided"} link={String(label) === "Source URL" ? httpUrl(value) || undefined : undefined} />)}</div><div className="mt-4 rounded-xl p-4" style={{ backgroundColor: "var(--surface-secondary)" }}><Label>Job description</Label><p className="mt-2 whitespace-pre-wrap text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{text(job["Job Description"] || job.jobDescription || job.description) || "No job description was supplied."}</p></div></Panel>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5" style={{ borderColor: "var(--border)" }}><p className="max-w-2xl text-xs leading-5" style={{ color: "var(--text-muted)" }}>AI screening can be incomplete or wrong. Public complaints may refer to another company. Independently verify the employer before paying money or sharing sensitive information.</p><div className="flex gap-2"><Link href="/history" className="rounded-xl border px-4 py-2.5 text-sm font-medium" style={{ borderColor: "var(--border)" }}>History</Link><Link href="/analyze" className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>Analyze another job <ArrowUpRight size={15} /></Link></div></footer>
    </div>
  </main>;
}

function sourceLabel(source?: string) { return source === "verification_gap" ? "missing information" : source === "positive_verification" ? "positive verification" : source === "user_followup" ? "your hiring experience" : source === "company_research" ? "company research" : source === "job_posting" ? "job details" : "analysis evidence"; }
function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="flex items-center gap-2.5"><span style={{ color: "var(--text-muted)" }}>{icon}</span><div><p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</p><p className="text-sm font-semibold">{value}</p></div></div>; }
function ProfileField({ label, value, link }: { label: string; value: string; link?: string }) { return <div className="min-w-0 rounded-xl border p-3.5" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-secondary)" }}><p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</p><div className="mt-1 truncate text-sm font-medium">{link ? <External href={link}>{value}</External> : value}</div></div>; }
function Empty({ text }: { text: string }) { return <p className="rounded-xl border border-dashed p-4 text-sm leading-5" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>{text}</p>; }
