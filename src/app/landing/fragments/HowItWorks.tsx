import {
  ClipboardCheck,
  Database,
  Gauge,
  ScanText,
  Check,
  Shield,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit Job Details",
    description:
      "Paste the job description, URL, company name, recruiter email, or upload a suspicious screenshot.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Extract & Process",
    description:
      "OCR extracts text from screenshots while job information is cleaned and prepared for analysis.",
    icon: ScanText,
  },
  {
    number: "03",
    title: "AI Analysis Engine",
    description:
      "Our model detects suspicious language, salary claims, payment requests, domains, and scam patterns.",
    icon: Database,
  },
  {
    number: "04",
    title: "Get Security Score",
    description:
      "Receive an immediate risk score with clear reasons explaining why the job may be suspicious.",
    icon: Gauge,
  },
];

const checks = [
  "Suspicious language and urgency",
  "Salary and payment requests",
  "Recruiter email and domain",
  "Company and recruiter mismatches",
  "Historical scam patterns",
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-4 py-20 sm:px-6"
      style={{
        backgroundColor: "var(--surface-secondary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-[0.04] blur-3xl"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <Shield
          className="absolute -bottom-20 -right-20 h-80 w-80 opacity-[0.03]"
          style={{ color: "var(--primary)" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl py-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2>
          <p
            className="mt-4 text-sm font-semibold leading-5 sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            JobShield AI acts as your personal cyber-defense layer during your
            job hunt. Simple, fast, and completely anonymous.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4 md:gap-3">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              {...step}
              index={index}
              total={steps.length}
            />
          ))}
        </div>

        <div
          className="mt-4 rounded-lg border p-5"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <h3 className="text-lg font-semibold">What We Check</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((check) => (
              <div key={check} className="flex items-center gap-2">
                <Check size={15} style={{ color: "var(--primary)" }} />
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {check}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  number,
  title,
  description,
  icon: Icon,
  index,
  total,
}: (typeof steps)[number] & { index: number; total: number }) {
  return (
    <div
      className="relative rounded-lg border p-4 transition-all duration-300 ease-in-out hover:shadow-md"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      {/* Connector line for desktop */}
      {index < total - 1 && (
        <div
          className="absolute -right-3 top-[34px] hidden h-0.5 w-3 md:block"
          style={{ backgroundColor: "var(--border)" }}
        />
      )}

      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--primary) 10%, transparent)",
            color: "var(--primary)",
          }}
        >
          <Icon size={20} />
        </div>
        <span
          className="text-lg font-bold"
          style={{ color: "var(--primary)" }}
        >
          {number}
        </span>
      </div>

      <h3
        className="mt-5 text-lg font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>

      <p
        className="mt-2 text-[14px] font-medium leading-5"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>
    </div>
  );
}