import Link from "next/link";
import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>
          When you use JobShield AI, we may collect information that
          you voluntarily provide while using our services.
        </p>

        <ul>
          <li>Account information such as your name and email address.</li>
          <li>Job details submitted for analysis.</li>
          <li>Job posting URLs submitted for analysis.</li>
          <li>Screenshots uploaded for analysis.</li>
          <li>Basic usage and interaction information.</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>
          Information submitted to JobShield AI is used to provide,
          maintain, and improve our job security analysis services.
        </p>

        <ul>
          <li>Analyze potentially fraudulent job opportunities.</li>
          <li>Generate security and risk assessments.</li>
          <li>Improve the accuracy of our detection systems.</li>
          <li>Maintain and improve the application.</li>
          <li>Respond to support requests.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Job Analysis Data",
    content: (
      <p>
        Job descriptions, URLs, recruiter information, and screenshots
        submitted for analysis may be processed by our analysis systems.
        We use this information only as necessary to provide the
        requested analysis and improve the service.
      </p>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <p>
        We take reasonable technical and organizational measures to
        protect information handled by JobShield AI. However, no
        internet-based service can guarantee complete security of
        information.
      </p>
    ),
  },
  {
    title: "5. Third-Party Services",
    content: (
      <p>
        JobShield AI may use trusted third-party infrastructure or
        services to operate certain parts of the platform. Such
        services may process information only as required to provide
        their functionality.
      </p>
    ),
  },
  {
    title: "6. Data Retention",
    content: (
      <p>
        We retain information only for as long as reasonably necessary
        to provide our services, maintain security, comply with legal
        obligations, or improve the platform.
      </p>
    ),
  },
  {
    title: "7. Your Rights",
    content: (
      <p>
        Depending on your location, you may have rights regarding your
        personal information, including the right to access, correct,
        or request deletion of your information.
      </p>
    ),
  },
  {
    title: "8. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. Any
        significant changes will be reflected on this page with an
        updated effective date.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow:
                  "0 0 20px color-mix(in srgb, var(--primary) 35%, transparent)",
              }}
            >
              <ShieldCheck size={17} />
            </div>

            <span className="font-bold">
              JobShield{" "}
              <span style={{ color: "var(--primary)" }}>AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Privacy Policy */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Heading */}
          <div
            className="border-b pb-8"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                color: "var(--primary)",
              }}
            >
              <LockKeyhole size={20} />
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Privacy Policy
            </h1>

            <p
              className="mt-3 text-sm leading-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Your privacy and security are important to us. This policy
              explains how JobShield AI collects, uses, and protects
              information when you use our platform.
            </p>

            <p
              className="mt-4 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Effective date: September 9, 2026
            </p>
          </div>

          {/* Policy Sections */}
          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="text-base font-semibold">
                  {section.title}
                </h2>

                <div
                  className="mt-3 space-y-3 text-sm leading-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {section.content}
                </div>
              </article>
            ))}
          </div>

          {/* Contact */}
          <div
            className="mt-10 rounded-xl border p-5"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--primary) 5%, transparent)",
              borderColor:
                "color-mix(in srgb, var(--primary) 20%, transparent)",
            }}
          >
            <h2 className="text-base font-semibold">
              Questions about your privacy?
            </h2>

            <p
              className="mt-2 text-xs leading-5"
              style={{ color: "var(--text-secondary)" }}
            >
              If you have questions about this Privacy Policy or how
              your information is handled, please contact our support
              team.
            </p>

            <a
              href="mailto:support@jobshield.ai"
              className="mt-4 inline-block text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              support@jobshield.ai
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
