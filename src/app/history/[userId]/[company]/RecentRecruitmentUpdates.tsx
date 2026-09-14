"use client";

import { useState } from "react";
import { Check, FileText, Plus, X } from "lucide-react";

type RecruitmentUpdate = {
  id: number;
  information: string;
  createdAt: string;
};

type RecentRecruitmentUpdatesProps = {
  initialUpdates: number;
};

export default function RecentRecruitmentUpdates({
  initialUpdates,
}: RecentRecruitmentUpdatesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [information, setInformation] = useState("");
  const [updates, setUpdates] = useState<RecruitmentUpdate[]>([]);

  const totalUpdates = initialUpdates + updates.length;

  const handleSaveInformation = () => {
    const trimmedInformation = information.trim();

    if (!trimmedInformation) {
      return;
    }

    const newUpdate: RecruitmentUpdate = {
      id: Date.now(),
      information: trimmedInformation,
      createdAt: new Date().toLocaleDateString(),
    };

    setUpdates((previousUpdates) => [
      ...previousUpdates,
      newUpdate,
    ]);

    setInformation("");
    setIsAdding(false);
  };

  return (
    <section className="mt-5 rounded-xl border border-white/10 bg-[#111A2E] p-5">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold text-white">
            Investigation Updates
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add additional information about this investigation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding((previous) => !previous)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#080D17] px-4 py-2 text-xs font-medium text-gray-300 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-400"
        >
          {isAdding ? (
            <>
              <X size={15} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={15} />
              Add More Information
            </>
          )}
        </button>
      </div>

      {/* Add Information Form */}
      {isAdding && (
        <div className="mt-5 rounded-lg border border-white/10 bg-[#080D17] p-4">
          <label
            htmlFor="investigation-information"
            className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-gray-500"
          >
            Additional Information
          </label>

          <textarea
            id="investigation-information"
            value={information}
            onChange={(event) => setInformation(event.target.value)}
            placeholder="Enter new recruitment or investigation information..."
            rows={5}
            className="w-full resize-y rounded-lg border border-white/10 bg-[#111A2E] px-3 py-2.5 text-sm leading-6 text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/10"
          />

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleSaveInformation}
              disabled={!information.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={15} />
              Save Information
            </button>
          </div>
        </div>
      )}

      {/* Update Count */}
      <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
        <FileText size={16} className="text-blue-400" />

        <span>
          Total Updates:{" "}
          <strong className="text-gray-200">{totalUpdates}</strong>
        </span>
      </div>

      {/* Saved Updates */}
      {updates.length > 0 && (
        <div className="mt-4 space-y-3">
          {updates.map((update) => (
            <article
              key={update.id}
              className="rounded-lg border border-white/10 bg-[#080D17] p-4"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-gray-500">
                  {update.createdAt}
                </span>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                  New Update
                </span>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-300">
                {update.information}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}