import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Check,
  CircleAlert,
  CircleX,
  Clock3,
  Globe,
  Mail,
  MessageCircle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function InvestigationPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <section className="mx-auto max-w-6xl px-5 py-6 md:px-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/analyze/result"
            className="flex items-center gap-2 text-xs text-gray-500 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Analysis
          </Link>

          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <ShieldCheck size={14} className="text-blue-500" />
            Investigation ID: #8402
          </div>
        </div>

        {/* Company Header */}
        <section className="mt-6 flex flex-col gap-5 rounded-xl border border-white/10 bg-[#111A2E] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Building2 size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Apex Global Tech
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Software Developer
              </p>

              <p className="mt-1 text-[10px] text-gray-600">
                Last updated 2 hours ago
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-semibold text-red-400">
            <CircleAlert size={13} />
            78/100 HIGH RISK
          </div>
        </section>

        {/* Investigation Overview */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_380px]">

          {/* Left */}
          <div className="space-y-5">

            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <h2 className="text-sm font-semibold">
                Investigation Overview
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Info
                  label="Recruiter Name"
                  value="Rajesh Kumar"
                />

                <Info
                  label="Recruiter Email"
                  value="rajesh.careers.tech@gmail.com"
                />

                <Info
                  label="Job Title"
                  value="Software Developer"
                />

                <Info
                  label="First Analyzed"
                  value="Aug 28, 2026"
                />
              </div>
            </section>

            {/* Risk Indicators */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <h2 className="text-sm font-semibold">
                Detected Risk Indicators
              </h2>

              <div className="mt-5 space-y-3">
                <RiskItem
                  icon={<CircleAlert size={14} />}
                  title="Payment Requested"
                  description="Recruiter requested a security deposit for equipment before issuing a contract."
                />

                <RiskItem
                  icon={<Mail size={14} />}
                  title="Unofficial Email Domain"
                  description="Communication originated from a generic Gmail account instead of a corporate domain."
                />

                <RiskItem
                  icon={<CircleX size={14} />}
                  title="Unverifiable Physical Address"
                  description="Company headquarters address could not be independently verified."
                />
              </div>
            </section>

            {/* Timeline */}
            <section className="rounded-xl border border-white/10 bg-[#111A2E] p-5">
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-blue-500" />

                <h2 className="text-sm font-semibold">
                  Investigation Timeline
                </h2>
              </div>

              <div className="mt-5 border-l border-white/10 pl-5">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 h-3 w-3 rounded-full bg-blue-500" />

                  <p className="text-[10px] text-gray-500">
                    Aug 31
                  </p>

                  <h3 className="mt-1 text-xs font-semibold">
                    Bank details requested
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-gray-500">
                    User reported being asked for direct deposit information
                    via a non-secure Google Form.
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-5">
                  <div className="relative">
                    <div className="absolute -left-[25px] top-1 h-3 w-3 rounded-full bg-red-500" />

                    <p className="text-[10px] text-gray-500">
                      Sep 1
                    </p>

                    <h3 className="mt-1 text-xs font-semibold">
                      High-risk indicator detected
                    </h3>

                    <p className="mt-1 text-[10px] leading-4 text-gray-500">
                      Recruiter communication was flagged for suspicious
                      payment-related language.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right - AI Assistant */}
          <section className="flex min-h-[550px] flex-col rounded-xl border border-white/10 bg-[#111A2E] p-5">

            {/* Assistant Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                  <MessageCircle
                    size={15}
                    className="text-red-400"
                  />
                </div>

                <div>
                  <h2 className="text-xs font-semibold">
                    AI Investigation Assistant
                  </h2>

                  <p className="text-[9px] text-gray-600">
                    Analyzing company activity
                  </p>
                </div>
              </div>

              <span className="text-gray-600">•••</span>
            </div>

            {/* Chat */}
            <div className="flex-1 space-y-5 py-5">

              <ChatMessage
                type="ai"
                text="Hello. I've reviewed the risk profile for Apex Global Technologies. I found several suspicious indicators, particularly the request for a security deposit. How can I help you investigate this further?"
              />

              <ChatMessage
                type="user"
                text="They just sent me this link asking me to fill out my banking information. I haven't entered any information yet."
              />

              <ChatMessage
                type="ai"
                text="Do not provide any banking information. Legitimate companies will never ask for direct deposit details before a formal offer or onboarding process. This is a significant indicator of an advanced scam."
              />

              <ChatMessage
                type="ai"
                text="Would you like me to summarize the strongest warning signs found during this investigation?"
              />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 pt-4">
              <div className="rounded-lg border border-white/10 bg-[#080D17] p-3">
                <textarea
                  rows={2}
                  placeholder="Tell me what happened..."
                  className="w-full resize-none bg-transparent text-xs text-gray-300 outline-none placeholder:text-gray-600"
                />

                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    className="text-gray-600 transition hover:text-gray-300"
                  >
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-md bg-blue-500 px-4 py-2 text-[10px] font-semibold transition hover:bg-blue-400"
                  >
                    Send
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-center text-[9px] text-gray-600">
                Your conversation and investigation history are stored securely.
              </p>
            </div>
          </section>
        </div>

        {/* Bottom Summary */}
        <section className="mt-5 grid gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={<Globe size={15} />}
            label="Domain Status"
            value="Needs Review"
            danger
          />

          <SummaryCard
            icon={<Mail size={15} />}
            label="Email Verification"
            value="Failed"
            danger
          />

          <SummaryCard
            icon={<ShieldCheck size={15} />}
            label="Security Recommendation"
            value="Avoid Contact"
            danger
          />

        </section>
      </section>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase text-gray-600">
        {label}
      </p>

      <p className="mt-1 text-xs text-gray-300">
        {value}
      </p>
    </div>
  );
}

function RiskItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-[#080D17] p-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-red-400">
          {icon}
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-300">
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({
  type,
  text,
}: {
  type: "ai" | "user";
  text: string;
}) {
  const isAI = type === "ai";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[90%] rounded-lg px-3 py-2.5 text-[10px] leading-4 ${
          isAI
            ? "border border-white/5 bg-[#080D17] text-gray-400"
            : "bg-blue-500/10 text-blue-100"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111A2E] p-4">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}

        <span className="text-[10px] uppercase">
          {label}
        </span>
      </div>

      <p
        className={`mt-2 text-sm font-semibold ${
          danger ? "text-red-400" : "text-emerald-400"
        }`}
      >
        {value}
      </p>
    </div>
  );
}