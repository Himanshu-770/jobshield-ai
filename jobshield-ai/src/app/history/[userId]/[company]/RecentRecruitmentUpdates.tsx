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
    <section
      className="mt-5 rounded-xl border p-5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-semibold">
            Investigation Updates
          </h2>

          <p
            className="mt-1 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Add additional information about this investigation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding((previous) => !previous)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-colors hover:opacity-90"
          style={{
            backgroundColor: "var(--surface-secondary)",
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
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
        <div
          className="mt-5 rounded-lg border p-4"
          style={{
            backgroundColor: "var(--surface-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <label
            htmlFor="investigation-information"
            className="mb-2 block text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            Additional Information
          </label>

          <textarea
            id="investigation-information"
            value={information}
            onChange={(event) => setInformation(event.target.value)}
            placeholder="Enter new recruitment or investigation information..."
            rows={5}
            className="w-full resize-y rounded-lg border px-3 py-2.5 text-sm leading-6 outline-none transition-colors"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          />

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleSaveInformation}
              disabled={!information.trim()}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <Check size={15} />
              Save Information
            </button>
          </div>
        </div>
      )}

      {/* Update Count */}
      <div
        className="mt-5 flex items-center gap-2 text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        <FileText
          size={16}
          style={{ color: "var(--primary)" }}
        />

        <span>
          Total Updates:{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            {totalUpdates}
          </strong>
        </span>
      </div>

      {/* Saved Updates */}
      {updates.length > 0 && (
        <div className="mt-4 space-y-3">
          {updates.map((update) => (
            <article
              key={update.id}
              className="rounded-lg border p-4"
              style={{
                backgroundColor: "var(--surface-secondary)",
                borderColor: "var(--border)",
              }}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {update.createdAt}
                </span>

                <span
                  className="rounded-full border px-2 py-1 text-xs font-medium"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--risk-low) 10%, transparent)",
                    borderColor:
                      "color-mix(in srgb, var(--risk-low) 20%, transparent)",
                    color: "var(--risk-low)",
                  }}
                >
                  New Update
                </span>
              </div>

              <p
                className="whitespace-pre-wrap text-sm leading-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {update.information}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
