type AnalyzeHeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = ["Job Details", "Job URL", "Screenshot"];

export default function AnalyzeHeader({
  activeTab,
  setActiveTab,
}: AnalyzeHeaderProps) {
  return (
    <>
      <div>
        <h1
          className="text-2xl font-extrabold sm:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          Analyze a Job
        </h1>

        <p
          className="mt-1 text-sm font-semibold"
          style={{ color: "var(--text-secondary)" }}
        >
          Check a job posting, recruiter details or screenshot for scam
          indicators.
        </p>
      </div>

      <div
        className="mt-4 flex gap-6 border-b"
        style={{ borderColor: "var(--border)" }}
        role="tablist"
        aria-label="Analysis method"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={isActive}
              className="-mb-px border-b-2 px-0.5 py-2.5 text-sm transition-colors"
              style={{
                borderColor: isActive
                  ? "var(--primary)"
                  : "transparent",
                color: isActive
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </>
  );
}