"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShieldAlert, ShieldCheck } from "lucide-react";
import Sidebar from "@/component/sidebar/Sidebar";
import api from "@/lib/api";
import { JobAnalysis } from "@/store/analysisStore";
import CheckAuth from "@/component/CheckAuth";
export default function HistoryPage() {
  const [items, setItems] = useState<JobAnalysis[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    api
      .get("/job/history?limit=50")
      .then(({ data }) => setItems(data.items || []))
      .catch((err) =>
        setError(
          err?.response?.data?.message || "Could not load analysis history",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  const filtered = items.filter((item) =>
    `${item.job?.Company || item.job?.company || ""} ${item.job?.["Job Title"] || item.job?.jobTitle || ""}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
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
      <section className="min-w-0 flex-1 p-5 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">Analysis History</h1>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Your saved job-posting investigations.
            </p>
          </div>
          <Link
            href="/analyze"
            className="rounded-md px-4 py-2.5 text-sm font-semibold"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Analyze a Job
          </Link>
        </div>
        <div
          className="mt-6 flex items-center gap-2 rounded-lg border px-3"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <Search size={17} style={{ color: "var(--text-secondary)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search job title or company"
            className="w-full bg-transparent py-3 text-sm outline-none"
            aria-label="Search history"
          />
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}
        {loading ? (
          <p className="mt-6 text-sm">Loading history…</p>
        ) : filtered.length === 0 ? (
          <div
            className="mt-6 rounded-xl border p-8 text-center"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <p style={{ color: "var(--text-secondary)" }}>
              {items.length
                ? "No matching investigations."
                : "No saved investigations yet."}
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {filtered.map((item) => {
              const title = String(
                item.job?.["Job Title"] || item.job?.jobTitle || "Untitled job",
              );
              const company = String(
                item.job?.Company ||
                  item.job?.company ||
                  item.job?.companyName ||
                  "Unknown company",
              );
              const color =
                item.riskLevel === "HIGH" || item.riskLevel === "CRITICAL"
                  ? "var(--risk-high)"
                  : item.riskLevel === "MEDIUM"
                    ? "var(--risk-medium)"
                    : "var(--risk-low)";
              return (
                <article
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 sm:p-5"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className="rounded-lg p-2"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                        color,
                      }}
                    >
                      <ShieldAlert size={20} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">{title}</h2>
                      <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {company}
                      </p>
                      <p
                        className="mt-2 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color }}>
                        {item.riskScore}/100
                      </p>
                      <p className="text-xs font-semibold" style={{ color }}>
                        {item.riskLevel} RISK
                      </p>
                    </div>
                    <Link
                      href={`/analyze/result?id=${item.id}`}
                      className="rounded-md border px-3 py-2 text-sm"
                      style={{ borderColor: "var(--border)" }}
                    >
                      View
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
    </>
  );
}
