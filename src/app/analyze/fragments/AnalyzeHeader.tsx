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
        <h1 className="text-2xl font-extrabold sm:text-3xl">
          Analyze a Job
        </h1>

        <p className="mt-1 text-sm font-semibold text-gray-500">
          Check a job posting, recruiter details or screenshot for scam
          indicators.
        </p>
      </div>

      <div
        className="mt-4 flex gap-6 border-b border-white/10"
        role="tablist"
        aria-label="Analysis method"
      >
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            className={`-mb-px border-b-2 px-0.5 py-2.5 text-sm transition-colors ${
              activeTab === tab
                ? "border-blue-500 font-semibold text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
}
