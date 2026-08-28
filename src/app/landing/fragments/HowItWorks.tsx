import {
  ClipboardCheck,
  Database,
  Gauge,
  ScanText,
  Check,
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
    <section id="how-it-works" className="bg-[#0D1527] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl px-6 py-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2>

          <p className="mt-4 text-sm font-semibold leading-5 text-gray-500 sm:text-base">
            JobShield AI acts as your personal cyber-defense layer during your
            job hunt. Simple, fast, and completely anonymous.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-4">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-white/10 bg-[#111A2E] p-5">
          <h3 className="text-lg font-semibold">What We Check</h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((check) => (
              <div key={check} className="flex items-center gap-2">
                <Check size={15} className="text-blue-500" />
                <span className="text-sm text-gray-400">{check}</span>
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
}: (typeof steps)[number]) {
  return (
    <div className="mb-8 rounded-lg border border-white/10 bg-[#111A2E] p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <Icon size={20} />
        </div>

        <span className="text-lg font-bold text-blue-500">{number}</span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 text-[14px] font-medium leading-5 text-gray-500">
        {description}
      </p>
    </div>
  );
}