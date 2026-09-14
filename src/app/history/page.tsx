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

function getRiskColor(riskLevel: string) {
  if (riskLevel === "Low Risk") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }

  if (riskLevel === "High Risk") {
    return "border-orange-500/20 bg-orange-500/10 text-orange-400";
  }

  if (riskLevel === "Critical") {
    return "border-red-500/20 bg-red-500/10 text-red-400";
  }

  return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
}

function getScoreColor(score: number) {
  if (score >= 80) return "border-red-400 text-red-400";
  if (score >= 50) return "border-orange-400 text-orange-400";

  return "border-emerald-400 text-emerald-400";
}

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInvestigations = useMemo(() => {
    return investigations.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.jobTitle.toLowerCase().includes(search.toLowerCase());

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
    <main className="min-h-screen bg-[#070B14] text-white md:flex">
      <Sidebar />

      <section className="min-w-0 flex-1 px-5 py-6 md:px-8 md:py-8">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-blue-500">
            <Clock3 size={17} />

            <span className="text-xs font-semibold uppercase tracking-wider">
              Job Investigations
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold md:text-3xl">
            Investigation History
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            View and continue your previous job and company investigations.
            Review risk scores and updates to stay informed.
          </p>
        </header>

        {/* Search and Filters */}
        <section className="mt-7 rounded-xl border border-white/10 bg-[#111A2E] p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search company or job..."
                className="w-full rounded-md border border-white/10 bg-[#080D17] py-2.5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${
                    activeFilter === filter
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop Table */}
        <section className="mt-5 hidden overflow-hidden rounded-xl border border-white/10 bg-[#111A2E] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-white/10 bg-[#0D1527]">
                <tr className="text-[10px] uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-4 font-medium">Company</th>
                  <th className="px-4 py-4 font-medium">Job Title</th>
                  <th className="px-4 py-4 font-medium">Score</th>
                  <th className="px-4 py-4 font-medium">Risk Level</th>
                  <th className="px-4 py-4 font-medium">Last Updated</th>
                  <th className="px-4 py-4 font-medium">Updates</th>
                  <th className="px-4 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {paginatedInvestigations.map((item) => (
                  <tr
                    key={`${item.userId}-${item.id}`}
                    className="text-xs transition hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1A2942] text-xs font-semibold text-gray-300">
                          {item.company.charAt(0)}
                        </div>

                        <span className="max-w-[130px] font-medium text-gray-200">
                          {item.company}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-gray-400">
                      {item.jobTitle}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-bold ${getScoreColor(
                          item.score,
                        )}`}
                      >
                        {item.score}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] ${getRiskColor(
                          item.riskLevel,
                        )}`}
                      >
                        {item.riskLevel}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-gray-500">
                      {item.lastUpdated}
                    </td>

                    <td className="px-4 py-4 text-gray-400">
                      {item.updates}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/history/${item.userId}/${item.companySlug}`}
                        className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-2 text-[11px] font-medium text-gray-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                      >
                        Open
                        <ChevronRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
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
          {paginatedInvestigations.map((item) => (
            <article
              key={`${item.userId}-${item.id}`}
              className="rounded-xl border border-white/10 bg-[#111A2E] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1A2942] text-sm font-semibold text-gray-300">
                    {item.company.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-200">
                      {item.company}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.jobTitle}
                    </p>
                  </div>
                </div>

                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${getScoreColor(
                    item.score,
                  )}`}
                >
                  {item.score}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
                <span
                  className={`rounded-full border px-2.5 py-1 ${getRiskColor(
                    item.riskLevel,
                  )}`}
                >
                  {item.riskLevel}
                </span>

                <span className="text-gray-500">
                  Updated {item.lastUpdated}
                </span>

                <span className="text-gray-500">
                  {item.updates} updates
                </span>
              </div>

              <Link
                href={`/history/${item.userId}/${item.companySlug}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-md bg-blue-500 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-400"
              >
                Open Investigation
                <ChevronRight size={14} />
              </Link>
            </article>
          ))}

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
      <AlertCircle size={24} className="text-gray-600" />

      <p className="text-sm text-gray-400">
        No investigations found.
      </p>

      <p className="text-xs text-gray-600">
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
    <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 text-[11px] text-gray-500 sm:flex-row sm:items-center sm:justify-between">
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
          className="flex items-center gap-1 rounded border border-white/10 px-2 py-1.5 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={12} />
          Previous
        </button>

        <span className="rounded bg-blue-500/10 px-2.5 py-1.5 text-blue-400">
          {currentPage}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages || totalCount === 0}
          className="flex items-center gap-1 rounded border border-white/10 px-2 py-1.5 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}