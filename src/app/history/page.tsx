"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
} from "lucide-react";

import Sidebar from "@/component/sidebar/Sidebar";
import { investigations } from "@/data/investigation";

const filters = ["All", "Low", "Medium", "High", "Critical"];

const ITEMS_PER_PAGE = 5;

function getRiskStyles(riskLevel: string) {
  if (riskLevel === "Low Risk") {
    return {
      borderColor:
        "color-mix(in srgb, var(--risk-low) 20%, transparent)",
      backgroundColor:
        "color-mix(in srgb, var(--risk-low) 10%, transparent)",
      color: "var(--risk-low)",
    };
  }

  if (riskLevel === "High Risk") {
    return {
      borderColor:
        "color-mix(in srgb, var(--risk-medium) 20%, transparent)",
      backgroundColor:
        "color-mix(in srgb, var(--risk-medium) 10%, transparent)",
      color: "var(--risk-medium)",
    };
  }

  if (riskLevel === "Critical") {
    return {
      borderColor:
        "color-mix(in srgb, var(--risk-high) 20%, transparent)",
      backgroundColor:
        "color-mix(in srgb, var(--risk-high) 10%, transparent)",
      color: "var(--risk-high)",
    };
  }

  return {
    borderColor:
      "color-mix(in srgb, var(--risk-medium) 20%, transparent)",
    backgroundColor:
      "color-mix(in srgb, var(--risk-medium) 10%, transparent)",
    color: "var(--risk-medium)",
  };
}

function getScoreStyles(score: number) {
  if (score >= 80) {
    return {
      borderColor: "var(--risk-high)",
      color: "var(--risk-high)",
    };
  }

  if (score >= 50) {
    return {
      borderColor: "var(--risk-medium)",
      color: "var(--risk-medium)",
    };
  }

  return {
    borderColor: "var(--risk-low)",
    color: "var(--risk-low)",
  };
}

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInvestigations = useMemo(() => {
    return investigations.filter((item) => {
      const normalizedSearch = search.toLowerCase();

      const matchesSearch =
        item.company.toLowerCase().includes(normalizedSearch) ||
        item.jobTitle.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        activeFilter === "All" ||
        item.riskLevel
          .toLowerCase()
          .startsWith(activeFilter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInvestigations.length / ITEMS_PER_PAGE),
  );

  const visiblePage = Math.min(currentPage, totalPages);
  const startIndex = (visiblePage - 1) * ITEMS_PER_PAGE;

  const paginatedInvestigations = filteredInvestigations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const firstVisibleItem =
    filteredInvestigations.length === 0 ? 0 : startIndex + 1;

  const lastVisibleItem = Math.min(
    startIndex + ITEMS_PER_PAGE,
    filteredInvestigations.length,
  );

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <main
      className="min-h-screen md:flex"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <Sidebar />

      <section className="min-w-0 flex-1 px-5 py-6 md:px-8 md:py-8">
        {/* Header */}
        <header>
          <div
            className="flex items-center gap-2"
            style={{ color: "var(--primary)" }}
          >
            <Clock3 size={17} />

            <span className="text-xs font-semibold uppercase tracking-wider">
              Job Investigations
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold md:text-3xl">
            Investigation History
          </h1>

          <p
            className="mt-2 max-w-xl text-sm leading-6"
            style={{ color: "var(--text-muted)" }}
          >
            View and continue your previous job and company investigations.
            Review risk scores and updates to stay informed.
          </p>
        </header>

        {/* Search and Filters */}
        <section
          className="mt-7 rounded-xl border p-4"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search company or job..."
                className="w-full rounded-md border py-2.5 pl-9 pr-3 text-xs outline-none transition-colors"
                style={{
                  backgroundColor: "var(--surface-secondary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      setActiveFilter(filter);
                      setCurrentPage(1);
                    }}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? "var(--primary)"
                        : "transparent",
                      borderColor: isActive
                        ? "var(--primary)"
                        : "var(--border)",
                      color: isActive
                        ? "var(--primary-foreground)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Desktop Table */}
        <section
          className="mt-5 hidden overflow-hidden rounded-xl border md:block"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead
                className="border-b"
                style={{
                  backgroundColor: "var(--surface-secondary)",
                  borderColor: "var(--border)",
                }}
              >
                <tr
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  <th className="px-4 py-4 font-semibold">Company</th>
                  <th className="px-4 py-4 font-semibold">Job Title</th>
                  <th className="px-4 py-4 font-semibold">Score</th>
                  <th className="px-4 py-4 font-semibold">Risk Level</th>
                  <th className="px-4 py-4 font-semibold">Last Updated</th>
                  <th className="px-4 py-4 font-semibold">Updates</th>
                  <th className="px-4 py-4 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedInvestigations.map((item) => {
                  const scoreStyles = getScoreStyles(item.score);
                  const riskStyles = getRiskStyles(item.riskLevel);

                  return (
                    <tr
                      key={`${item.userId}-${item.id}`}
                      className="border-b text-xs transition-colors last:border-b-0"
                      style={{
                        borderColor: "var(--border)",
                      }}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold"
                            style={{
                              backgroundColor: "var(--surface-secondary)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {item.company.charAt(0)}
                          </div>

                          <span
                            className="max-w-[130px] text-sm font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {item.company}
                          </span>
                        </div>
                      </td>

                      <td
                        className="px-4 py-4 text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.jobTitle}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold"
                          style={scoreStyles}
                        >
                          {item.score}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className="inline-flex rounded-full border px-2.5 py-1 text-xs"
                          style={riskStyles}
                        >
                          {item.riskLevel}
                        </span>
                      </td>

                      <td
                        className="px-4 py-4"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.lastUpdated}
                      </td>

                      <td
                        className="px-4 py-4 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {item.updates}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <Link
                          href={`/history/${item.userId}/${item.companySlug}`}
                          className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-xs font-medium transition-colors"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          Open
                          <ChevronRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {paginatedInvestigations.length === 0 && <EmptyState />}

          <HistoryFooter
            firstVisibleItem={firstVisibleItem}
            lastVisibleItem={lastVisibleItem}
            totalCount={filteredInvestigations.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </section>

        {/* Mobile Cards */}
        <section className="mt-5 space-y-3 md:hidden">
          {paginatedInvestigations.map((item) => {
            const scoreStyles = getScoreStyles(item.score);
            const riskStyles = getRiskStyles(item.riskLevel);

            return (
              <article
                key={`${item.userId}-${item.id}`}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold"
                      style={{
                        backgroundColor: "var(--surface-secondary)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item.company.charAt(0)}
                    </div>

                    <div>
                      <h2
                        className="text-base font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.company}
                      </h2>

                      <p
                        className="mt-1 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.jobTitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold"
                    style={scoreStyles}
                  >
                    {item.score}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className="rounded-full border px-2.5 py-1"
                    style={riskStyles}
                  >
                    {item.riskLevel}
                  </span>

                  <span style={{ color: "var(--text-muted)" }}>
                    Updated {item.lastUpdated}
                  </span>

                  <span style={{ color: "var(--text-muted)" }}>
                    {item.updates} updates
                  </span>
                </div>

                <Link
                  href={`/history/${item.userId}/${item.companySlug}`}
                  className="mt-4 flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  Open Investigation
                  <ChevronRight size={14} />
                </Link>
              </article>
            );
          })}

          {paginatedInvestigations.length === 0 && <EmptyState />}

          <HistoryFooter
            firstVisibleItem={firstVisibleItem}
            lastVisibleItem={lastVisibleItem}
            totalCount={filteredInvestigations.length}
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </section>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-5 py-12 text-center">
      <AlertCircle
        size={24}
        style={{ color: "var(--text-muted)" }}
      />

      <p
        className="text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        No investigations found.
      </p>

      <p
        className="text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        Try another company name or risk filter.
      </p>
    </div>
  );
}

type HistoryFooterProps = {
  firstVisibleItem: number;
  lastVisibleItem: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

function HistoryFooter({
  firstVisibleItem,
  lastVisibleItem,
  totalCount,
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: HistoryFooterProps) {
  return (
    <div
      className="flex flex-col gap-3 border-t px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-muted)",
      }}
    >
      <span>
        {totalCount === 0
          ? "Showing 0 investigations"
          : `Showing ${firstVisibleItem}-${lastVisibleItem} of ${totalCount} investigations`}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="flex items-center gap-1 rounded border px-2 py-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <ChevronLeft size={12} />
          Previous
        </button>

        <span
          className="rounded px-2.5 py-1.5"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary) 10%, transparent)",
            color: "var(--primary)",
          }}
        >
          {currentPage}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages || totalCount === 0}
          className="flex items-center gap-1 rounded border px-2 py-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          Next
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
