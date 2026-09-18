import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const missionCards = [
  {
    icon: ShieldCheck,
    title: "Protect Job Seekers",
    description:
      "Help individuals recognize potential scams and make informed decisions before applying.",
  },
  {
    icon: Users,
    title: "Promote Safer Applications",
    description:
      "Encourage awareness and more thoughtful decisions throughout the job application process.",
  },
  {
    icon: Eye,
    title: "Make Safety Accessible",
    description:
      "Provide easy-to-use tools that help everyone understand potential job-related risks.",
  },
];

export default function AboutMission() {
  return (
    <>
      <section
        id="about"
        className="relative overflow-hidden px-4 py-16 sm:px-6 sm:pt-24 sm:pb-10 lg:px-10"
        style={{
          backgroundColor: "var(--surface-secondary)",
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-[600px] max-w-full -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, color-mix(in srgb, var(--primary) 5%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
              }}
            >
              <Sparkles size={14} />
              Our Mission
            </div>

            <h2
              className="mt-5 text-2xl font-bold sm:text-3xl"
              style={{ color: "var(--text-primary)" }}
            >
              Why We Built JobShield AI
            </h2>

            <p
              className="mt-4 text-sm leading-6 sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              Fake job postings can lead to financial loss, identity theft,
              and emotional stress. JobShield AI aims to make job hunting
              safer, smarter, and more transparent for everyone.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {missionCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-xl border p-5 transition-colors duration-200 hover:border-[var(--primary)]"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--primary) 10%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <h3
                    className="mt-5 text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="mt-2 text-sm leading-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="about-cta"
        className="bg-[var(--background)] px-4 py-8 sm:px-6 sm:pb-20"
      >
        <div className="mx-auto max-w-4xl rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-8 text-center sm:px-6 sm:py-10">
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
            Before you apply, check the job.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-xs leading-5 text-[var(--text-primary)] sm:text-[15px]">
            Protect your personal data and financial security. Our AI scanning
            system is free to use and delivers reports in under 10 seconds.
          </p>

          <Link
            href="/auth/signup"
            className="mt-8 inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)] px-4 py-2 text-[16px] font-semibold text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-hover)]"
          >
            Analyze a Job
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}