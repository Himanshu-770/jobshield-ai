import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using JobShield AI, you agree to these Terms of
        Service. If you do not agree with these terms, please do not use
        the platform.
      </p>
    ),
  },
  {
    title: "2. Description of the Service",
    content: (
      <p>
        JobShield AI provides AI-powered analysis of job postings and
        related information to help users identify potentially suspicious
        or fraudulent employment opportunities.
      </p>
    ),
  },
  {
    title: "3. User Accounts",
    content: (
      <>
        <p>
          Some features may require you to create an account. You are
          responsible for keeping your account credentials secure.
        </p>

        <ul>
          <li>Provide accurate account information.</li>
          <li>Keep your login credentials confidential.</li>
          <li>Notify us if you believe your account has been compromised.</li>
          <li>Do not use another person's account without permission.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Job Analysis Results",
    content: (
      <p>
        JobShield AI provides automated security assessments based on the
        information submitted for analysis. Results are intended to be
        informational and should not be considered a guarantee that a job
        opportunity is legitimate or fraudulent.
      </p>
    ),
  },
  {
    title: "5. Acceptable Use",
    content: (
      <>
        <p>
          You agree to use JobShield AI only for lawful purposes and in a
          way that does not interfere with the operation of the platform.
        </p>

        <ul>
          <li>Do not attempt to gain unauthorized access to the service.</li>
          <li>Do not upload malicious or harmful content.</li>
          <li>Do not misuse the analysis system.</li>
          <li>Do not use the platform for illegal activities.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Intellectual Property",
    content: (
      <p>
        The JobShield AI platform, including its design, branding,
        software, and original content, is protected by applicable
        intellectual property laws. You may not reproduce, modify, or
        distribute our materials without appropriate permission.
      </p>
    ),
  },
  {
    title: "7. Third-Party Services",
    content: (
      <p>
        JobShield AI may rely on third-party services or infrastructure to
        provide certain functionality. We are not responsible for
        interruptions, errors, or changes to third-party services.
      </p>
    ),
  },
  {
    title: "8. Disclaimer",
    content: (
      <p>
        JobShield AI is designed as a security assistance tool. We do not
        guarantee the accuracy, completeness, or reliability of every
        analysis result. Users should independently verify important
        employment opportunities before sharing personal information,
        sending money, or accepting an offer.
      </p>
    ),
  },
  {
    title: "9. Limitation of Liability",
    content: (
      <p>
        To the extent permitted by applicable law, JobShield AI and its
        operators will not be responsible for losses resulting from
        reliance on analysis results or from the use or inability to use
        the platform.
      </p>
    ),
  },
  {
    title: "10. Changes to These Terms",
    content: (
      <p>
        We may update these Terms of Service from time to time. Updated
        terms will be posted on this page along with a revised effective
        date.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#070B14]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.35)]">
              <ShieldCheck size={17} />
            </div>

            <span className="font-bold">
              JobShield{" "}
              <span className="text-blue-500">AI</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Terms */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Heading */}
          <div className="border-b border-white/10 pb-8">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <FileText size={20} />
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Terms of Service
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              These terms explain the rules and conditions for using
              JobShield AI and its job security analysis services.
            </p>

            <p className="mt-4 text-xs text-gray-600">
              Effective date: September 9, 2026
            </p>
          </div>

          {/* Sections */}
          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="text-base font-semibold text-white">
                  {section.title}
                </h2>

                <div className="mt-3 space-y-3 text-sm leading-6 text-gray-500 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {section.content}
                </div>
              </article>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-10 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <h2 className="text-sm font-semibold">
              Questions about these terms?
            </h2>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              If you have questions about these Terms of Service or how
              JobShield AI operates, please contact our support team.
            </p>

            <a
              href="mailto:support@jobshield.ai"
              className="mt-4 inline-block text-xs font-semibold text-blue-500 hover:text-blue-400"
            >
              support@jobshield.ai
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}