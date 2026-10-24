"use client";

import {
  AlertTriangle,
  CreditCard,
  FileText,
  Link2,
  Mail,
  ScanLine,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const warningSignals = [
  {
    title: "Fake Company",
    icon: AlertTriangle,
    tone: "warning",
  },
  {
    title: "Suspicious Recruiter",
    icon: UserRoundCheck,
    tone: "neutral",
  },
  {
    title: "Payment Request",
    icon: CreditCard,
    tone: "warning",
  },
  {
    title: "Unusual Description",
    icon: FileText,
    tone: "neutral",
  },
  {
    title: "Suspicious Links",
    icon: Link2,
    tone: "warning",
  },
];

export default function AboutHeroVisual() {
  return (
    <div
      className="about-hero-visual relative mx-auto w-full max-w-[650px]"
      aria-label="JobShield AI analyzes job postings, recruiter information, and suspicious scam signals"
    >
      <div className="about-visual-stage relative aspect-[1.08] w-full overflow-hidden">
        {/* Futuristic Background */}
        <div className="about-background-glow pointer-events-none absolute inset-[18%]" />

        <div className="about-grid-background pointer-events-none absolute inset-0" />

        {/* Orbital Rings */}
        <div className="about-orbit about-orbit-outer pointer-events-none absolute" />
        <div className="about-orbit about-orbit-inner pointer-events-none absolute" />

        {/* Top Status */}
        <div className="about-status-group absolute left-1/2 top-[2%] z-30 -translate-x-1/2 text-center">
          <div className="about-status-badge inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
            <span className="about-status-dot h-2 w-2 rounded-full" />

            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.16em] sm:text-xs">
              AI Scan Active
            </span>
          </div>

          <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--text-primary)] opacity-70">
            Analyzing job postings...
          </p>
        </div>

        {/* Left Job Posting Input */}
        <div className="about-input-zone absolute left-[1%] top-[28%] z-20 w-[29%]">
          <div className="about-input-label mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em]">
            <FileText size={12} strokeWidth={1.6} />
            Job Data
          </div>

          <div className="about-job-card about-job-card-back absolute left-2 top-3 w-full rounded-lg border p-3" />

          <div className="about-job-card about-job-card-middle absolute left-1 top-1 w-full rounded-lg border p-3" />

          <div className="about-job-card relative rounded-lg border p-3">
            <div className="mb-3 flex items-center gap-2">
              <div className="about-document-icon flex h-6 w-6 items-center justify-center rounded-md">
                <FileText size={13} strokeWidth={1.7} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold">
                  Remote Job
                </p>

                <p className="text-[8px] opacity-65">Incoming posting</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="about-job-line block w-[90%]" />
              <span className="about-job-line block w-[72%]" />
              <span className="about-job-line block w-[82%]" />
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <span className="about-data-dot h-1.5 w-1.5 rounded-full" />
              <span className="text-[8px] uppercase tracking-[0.08em] opacity-70">
                Data received
              </span>
            </div>
          </div>
        </div>

        {/* Curved Job Data Streams */}
        <svg
          className="about-data-streams pointer-events-none absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 650 600"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="about-data-path"
            d="M150 235 C220 235 235 270 290 300"
          />

          <path
            className="about-data-path"
            d="M150 270 C215 270 235 300 290 320"
          />

          <path
            className="about-data-path"
            d="M150 305 C220 305 240 330 290 340"
          />

          <path
            className="about-data-path about-data-path-soft"
            d="M150 235 C220 235 235 270 290 300"
          />

          <circle className="about-flow-particle flow-one" r="4" />
          <circle className="about-flow-particle flow-two" r="3" />
          <circle className="about-flow-particle flow-three" r="3" />
        </svg>

        {/* Central AI Shield */}
        <div className="about-shield-area absolute left-1/2 top-[51%] z-20 flex h-[58%] w-[43%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="about-shield-aura absolute inset-[-18%] rounded-full" />

          <div className="about-shield-ring absolute inset-[-12%] rounded-full border" />

          <div className="about-shield-core relative flex h-full w-full items-center justify-center">
            <div className="about-shield-surface absolute inset-[8%]" />

            <ShieldCheck
              className="relative z-10 h-full w-full"
              strokeWidth={1.15}
              aria-hidden="true"
            />

            {/* Shield Scanning Beam */}
            <div className="about-shield-scan pointer-events-none absolute left-[20%] right-[20%] z-20">
              <span />
            </div>

            {/* Small Inner AI Core */}
            <div className="about-inner-core absolute bottom-[18%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full border px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full" />
              <span className="text-[8px] font-bold uppercase tracking-[0.13em]">
                AI Core
              </span>
            </div>
          </div>
        </div>

        {/* Neural Network Nodes */}
        <div className="about-neural-node node-one" />
        <div className="about-neural-node node-two" />
        <div className="about-neural-node node-three" />
        <div className="about-neural-node node-four" />
        <div className="about-neural-node node-five" />
        <div className="about-neural-node node-six" />

        <div className="about-neural-line neural-line-one" />
        <div className="about-neural-line neural-line-two" />
        <div className="about-neural-line neural-line-three" />
        <div className="about-neural-line neural-line-four" />
        <div className="about-neural-line neural-line-five" />

        {/* Right Warning Signal Stack */}
        <div className="about-warning-zone absolute right-[1%] top-[24%] z-20 w-[30%]">
          <div className="about-warning-heading mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em]">
            <AlertTriangle size={12} strokeWidth={1.6} />
            Scam Signals
          </div>

          <div className="space-y-2">
            {warningSignals.map((signal, index) => {
              const Icon = signal.icon;

              return (
                <div
                  key={signal.title}
                  className={`about-warning-card warning-card-${index + 1} flex items-center gap-2 rounded-md border px-2 py-2`}
                >
                  <span
                    className={`about-warning-icon ${
                      signal.tone === "warning"
                        ? "about-warning-icon-danger"
                        : "about-warning-icon-neutral"
                    } flex h-6 w-6 shrink-0 items-center justify-center rounded-md`}
                  >
                    <Icon size={12} strokeWidth={1.7} />
                  </span>

                  <span className="min-w-0 truncate text-[9px] font-medium">
                    {signal.title}
                  </span>

                  <span className="about-warning-indicator ml-auto h-1.5 w-1.5 shrink-0 rounded-full" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Warning Connections */}
        <div className="about-warning-connection connection-one" />
        <div className="about-warning-connection connection-two" />
        <div className="about-warning-connection connection-three" />

        {/* Bottom Scanning Panel */}
        <div className="about-scan-panel absolute bottom-[4%] left-1/2 z-30 w-[48%] -translate-x-1/2 rounded-lg border px-3 py-2.5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <ScanLine size={13} strokeWidth={1.7} />

              <span className="text-[9px] font-bold uppercase tracking-[0.13em]">
                Scanning with AI
              </span>
            </div>

            <span className="about-scan-live text-[8px] font-semibold uppercase tracking-[0.1em]">
              Processing
            </span>
          </div>

          <div className="about-progress-track relative h-1 overflow-hidden rounded-full">
            <span className="about-progress-bar absolute inset-y-0 left-0 w-[68%] rounded-full" />
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <Mail size={11} strokeWidth={1.6} />

            <span className="text-[8px] opacity-70">
              Checking recruiter and job signals
            </span>
          </div>
        </div>

        {/* Small Data Particles */}
        <span className="about-particle particle-one" />
        <span className="about-particle particle-two" />
        <span className="about-particle particle-three" />
        <span className="about-particle particle-four" />
        <span className="about-particle particle-five" />
      </div>

      <style jsx>{`
        .about-hero-visual {
          color: var(--text-primary);
        }

        .about-visual-stage {
          isolation: isolate;
        }

        .about-background-glow {
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--primary) 12%, transparent),
            transparent 70%
          );
          filter: blur(34px);
        }

        .about-grid-background {
          opacity: 0.22;
          background-image:
            linear-gradient(
              color-mix(in srgb, var(--primary) 8%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--primary) 8%, transparent) 1px,
              transparent 1px
            );
          background-size: 30px 30px;
          mask-image: radial-gradient(
            ellipse at center,
            black 10%,
            transparent 75%
          );
        }

        .about-orbit {
          left: 50%;
          top: 51%;
          border: 1px solid
            color-mix(in srgb, var(--primary) 28%, var(--border));
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .about-orbit-outer {
          width: 76%;
          height: 76%;
          opacity: 0.75;
          animation: aboutOrbitRotate 36s linear infinite;
        }

        .about-orbit-inner {
          width: 54%;
          height: 54%;
          opacity: 0.6;
        }

        .about-orbit-outer::before,
        .about-orbit-outer::after {
          position: absolute;
          content: "";
          height: 5px;
          width: 5px;
          border-radius: 9999px;
          background: var(--primary);
          box-shadow: 0 0 10px
            color-mix(in srgb, var(--primary) 50%, transparent);
        }

        .about-orbit-outer::before {
          left: 50%;
          top: -3px;
          transform: translateX(-50%);
        }

        .about-orbit-outer::after {
          right: 7%;
          bottom: 19%;
          opacity: 0.5;
        }

        .about-status-group {
          color: var(--text-primary);
        }

        .about-status-badge {
          border-color: color-mix(
            in srgb,
            var(--primary) 35%,
            var(--border)
          );
          background: color-mix(in srgb, var(--surface) 92%, transparent);
          box-shadow: 0 5px 18px
            color-mix(in srgb, var(--text-primary) 4%, transparent);
        }

        .about-status-dot {
          background: var(--primary);
          box-shadow: 0 0 0 4px
            color-mix(in srgb, var(--primary) 12%, transparent);
          animation: aboutStatusPulse 3s ease-in-out infinite;
        }

        .about-input-label,
        .about-warning-heading {
          color: var(--text-primary);
          opacity: 0.8;
        }

        .about-job-card {
          border-color: color-mix(
            in srgb,
            var(--primary) 22%,
            var(--border)
          );
          background: color-mix(in srgb, var(--surface) 94%, transparent);
          box-shadow: 0 8px 24px
            color-mix(in srgb, var(--text-primary) 5%, transparent);
        }

        .about-job-card-back {
          opacity: 0.3;
          transform: translate(-7px, 7px) scale(0.94);
        }

        .about-job-card-middle {
          opacity: 0.55;
          transform: translate(-3px, 3px) scale(0.97);
        }

        .about-document-icon {
          background: color-mix(in srgb, var(--primary) 12%, var(--surface));
          color: var(--primary);
        }

        .about-job-line {
          height: 3px;
          border-radius: 9999px;
          background: color-mix(
            in srgb,
            var(--text-primary) 20%,
            transparent
          );
        }

        .about-data-dot {
          background: var(--primary);
        }

        .about-data-path {
          stroke: color-mix(in srgb, var(--primary) 55%, transparent);
          stroke-width: 1.4;
          stroke-linecap: round;
          stroke-dasharray: 5 8;
          animation: aboutDataFlow 8s linear infinite;
        }

        .about-data-path-soft {
          stroke-width: 5;
          opacity: 0.08;
          filter: blur(3px);
        }

        .about-flow-particle {
          fill: var(--primary);
          opacity: 0.8;
          filter: drop-shadow(
            0 0 5px color-mix(in srgb, var(--primary) 50%, transparent)
          );
        }

        .flow-one {
          animation: aboutFlowOne 6s ease-in-out infinite;
        }

        .flow-two {
          animation: aboutFlowTwo 7s ease-in-out infinite;
        }

        .flow-three {
          animation: aboutFlowThree 8s ease-in-out infinite;
        }

        .about-shield-area {
          color: var(--primary);
        }

        .about-shield-aura {
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--primary) 22%, transparent),
            transparent 70%
          );
          filter: blur(22px);
          animation: aboutShieldGlow 5.5s ease-in-out infinite;
        }

        .about-shield-ring {
          border-color: color-mix(
            in srgb,
            var(--primary) 34%,
            var(--border)
          );
          opacity: 0.75;
        }

        .about-shield-core {
          filter: drop-shadow(
            0 0 15px color-mix(in srgb, var(--primary) 22%, transparent)
          );
          animation: aboutShieldPulse 5.5s ease-in-out infinite;
        }

        .about-shield-surface {
          background: color-mix(
            in srgb,
            var(--surface) 90%,
            var(--text-primary)
          );
          clip-path: polygon(
            50% 0%,
            91% 16%,
            84% 65%,
            50% 100%,
            16% 65%,
            9% 16%
          );
          box-shadow:
            inset 0 0 0 1px
              color-mix(in srgb, var(--primary) 18%, transparent),
            0 12px 30px color-mix(in srgb, var(--text-primary) 5%, transparent);
        }

        .about-shield-scan {
          top: 19%;
          height: 26px;
          overflow: hidden;
          opacity: 0;
          animation: aboutShieldScan 5.5s ease-in-out infinite;
        }

        .about-shield-scan span {
          display: block;
          height: 2px;
          width: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            color-mix(in srgb, var(--primary) 90%, white),
            transparent
          );
          box-shadow:
            0 0 8px color-mix(in srgb, var(--primary) 65%, transparent),
            0 0 20px color-mix(in srgb, var(--primary) 30%, transparent);
        }

        .about-inner-core {
          border-color: color-mix(
            in srgb,
            var(--primary) 34%,
            var(--border)
          );
          background: color-mix(in srgb, var(--surface) 92%, transparent);
          color: var(--text-primary);
          box-shadow: 0 4px 12px
            color-mix(in srgb, var(--text-primary) 5%, transparent);
        }

        .about-inner-core span {
          background: var(--primary);
          box-shadow: 0 0 7px
            color-mix(in srgb, var(--primary) 50%, transparent);
        }

        .about-neural-line {
          position: absolute;
          z-index: 4;
          height: 1px;
          background: color-mix(
            in srgb,
            var(--primary) 25%,
            var(--border)
          );
          opacity: 0.65;
          transform-origin: left center;
          pointer-events: none;
        }

        .neural-line-one {
          left: 29%;
          top: 38%;
          width: 92px;
          transform: rotate(30deg);
        }

        .neural-line-two {
          left: 29%;
          top: 38%;
          width: 82px;
          transform: rotate(142deg);
        }

        .neural-line-three {
          right: 29%;
          top: 36%;
          width: 88px;
          transform: rotate(148deg);
        }

        .neural-line-four {
          right: 28%;
          top: 51%;
          width: 90px;
          transform: rotate(205deg);
        }

        .neural-line-five {
          left: 44%;
          bottom: 27%;
          width: 80px;
          transform: rotate(-25deg);
        }

        .about-neural-node {
          position: absolute;
          z-index: 5;
          height: 6px;
          width: 6px;
          border: 1px solid
            color-mix(in srgb, var(--primary) 60%, var(--border));
          border-radius: 9999px;
          background: color-mix(in srgb, var(--primary) 80%, var(--surface));
          box-shadow: 0 0 8px
            color-mix(in srgb, var(--primary) 30%, transparent);
          animation: aboutNodePulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        .node-one {
          left: 28%;
          top: 38%;
          animation-delay: 0.4s;
        }

        .node-two {
          left: 24%;
          top: 51%;
          animation-delay: 1.4s;
        }

        .node-three {
          left: 35%;
          bottom: 28%;
          animation-delay: 2.2s;
        }

        .node-four {
          right: 29%;
          top: 36%;
          animation-delay: 2.8s;
        }

        .node-five {
          right: 24%;
          top: 51%;
          animation-delay: 3.8s;
        }

        .node-six {
          right: 34%;
          bottom: 29%;
          animation-delay: 4.6s;
        }

        .about-warning-zone {
          color: var(--text-primary);
        }

        .about-warning-card {
          border-color: color-mix(
            in srgb,
            var(--border) 85%,
            var(--primary)
          );
          background: color-mix(in srgb, var(--surface) 95%, transparent);
          box-shadow: 0 5px 15px
            color-mix(in srgb, var(--text-primary) 4%, transparent);
        }

        .about-warning-icon {
          color: var(--primary);
        }

        .about-warning-icon-danger {
          color: var(--warning, #d97706);
          background: color-mix(
            in srgb,
            var(--warning, #d97706) 10%,
            var(--surface)
          );
        }

        .about-warning-icon-neutral {
          background: color-mix(in srgb, var(--primary) 10%, var(--surface));
        }

        .about-warning-indicator {
          background: var(--primary);
          opacity: 0.7;
        }

        .warning-card-1 .about-warning-indicator,
        .warning-card-3 .about-warning-indicator,
        .warning-card-5 .about-warning-indicator {
          background: var(--warning, #d97706);
        }

        .warning-card-1 .about-warning-icon,
        .warning-card-3 .about-warning-icon,
        .warning-card-5 .about-warning-icon {
          animation: aboutWarningPulse 4.5s ease-in-out infinite;
        }

        .warning-card-3 .about-warning-icon {
          animation-delay: 1.5s;
        }

        .warning-card-5 .about-warning-icon {
          animation-delay: 3s;
        }

        .about-warning-connection {
          position: absolute;
          z-index: 3;
          height: 1px;
          width: 8%;
          background: color-mix(
            in srgb,
            var(--primary) 25%,
            var(--border)
          );
          transform-origin: left center;
          pointer-events: none;
        }

        .connection-one {
          right: 30%;
          top: 35%;
          transform: rotate(8deg);
        }

        .connection-two {
          right: 30%;
          top: 50%;
          transform: rotate(-3deg);
        }

        .connection-three {
          right: 30%;
          top: 66%;
          transform: rotate(-17deg);
        }

        .about-scan-panel {
          border-color: color-mix(
            in srgb,
            var(--primary) 28%,
            var(--border)
          );
          background: color-mix(in srgb, var(--surface) 96%, transparent);
          box-shadow: 0 8px 24px
            color-mix(in srgb, var(--text-primary) 6%, transparent);
        }

        .about-scan-panel svg {
          color: var(--primary);
        }

        .about-scan-live {
          color: var(--primary);
        }

        .about-progress-track {
          background: color-mix(
            in srgb,
            var(--text-primary) 12%,
            transparent
          );
        }

        .about-progress-bar {
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--primary) 45%, transparent),
            var(--primary),
            color-mix(in srgb, var(--primary) 45%, transparent)
          );
          animation: aboutProgressMove 5s ease-in-out infinite;
        }

        .about-particle {
          position: absolute;
          z-index: 4;
          height: 3px;
          width: 3px;
          border-radius: 9999px;
          background: var(--primary);
          opacity: 0.4;
          box-shadow: 0 0 8px
            color-mix(in srgb, var(--primary) 50%, transparent);
          animation: aboutParticleMove 8s ease-in-out infinite;
        }

        .particle-one {
          left: 16%;
          top: 20%;
        }

        .particle-two {
          left: 40%;
          top: 15%;
          animation-delay: -2s;
        }

        .particle-three {
          right: 14%;
          top: 19%;
          animation-delay: -4s;
        }

        .particle-four {
          left: 19%;
          bottom: 20%;
          animation-delay: -5s;
        }

        .particle-five {
          right: 18%;
          bottom: 17%;
          animation-delay: -1s;
        }

        @keyframes aboutOrbitRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes aboutStatusPulse {
          0%,
          100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes aboutDataFlow {
          to {
            stroke-dashoffset: -80;
          }
        }

        @keyframes aboutFlowOne {
          0% {
            transform: translate(150px, 235px);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform: translate(290px, 300px);
            opacity: 0;
          }
        }

        @keyframes aboutFlowTwo {
          0% {
            transform: translate(150px, 270px);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform: translate(290px, 320px);
            opacity: 0;
          }
        }

        @keyframes aboutFlowThree {
          0% {
            transform: translate(150px, 305px);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            transform: translate(290px, 340px);
            opacity: 0;
          }
        }

        @keyframes aboutShieldGlow {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.98);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.04);
          }
        }

        @keyframes aboutShieldPulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.018);
          }
        }

        @keyframes aboutShieldScan {
          0%,
          12% {
            top: 19%;
            opacity: 0;
          }

          24% {
            opacity: 1;
          }

          78% {
            opacity: 1;
          }

          90%,
          100% {
            top: 78%;
            opacity: 0;
          }
        }

        @keyframes aboutNodePulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes aboutWarningPulse {
          0%,
          100% {
            opacity: 0.55;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes aboutProgressMove {
          0%,
          100% {
            transform: translateX(-12%);
            opacity: 0.65;
          }

          50% {
            transform: translateX(18%);
            opacity: 1;
          }
        }

        @keyframes aboutParticleMove {
          0%,
          100% {
            opacity: 0.12;
            transform: translate(0, 0);
          }

          50% {
            opacity: 0.5;
            transform: translate(10px, -12px);
          }
        }

        @media (max-width: 767px) {
          .about-visual-stage {
            aspect-ratio: 0.95;
          }

          .about-input-zone {
            left: 0;
            width: 27%;
          }

          .about-warning-zone {
            right: 0;
            width: 28%;
          }

          .about-warning-card {
            gap: 4px;
            padding: 6px;
          }

          .about-warning-icon {
            height: 21px;
            width: 21px;
          }

          .about-warning-card span:nth-child(2) {
            font-size: 8px;
          }

          .about-scan-panel {
            width: 52%;
          }

          .about-neural-line {
            opacity: 0.4;
          }
        }

        @media (max-width: 479px) {
          .about-status-badge {
            padding: 6px 10px;
          }

          .about-status-group p {
            font-size: 8px;
          }

          .about-job-card {
            padding: 8px;
          }

          .about-job-card .text-[10px] {
            font-size: 8px;
          }

          .about-job-card .text-[8px] {
            font-size: 7px;
          }

          .about-warning-card {
            min-height: 27px;
          }

          .about-warning-card span:nth-child(2) {
            display: none;
          }

          .warning-card-4,
          .warning-card-5 {
            display: none;
          }

          .about-warning-heading,
          .about-input-label {
            font-size: 8px;
          }

          .about-scan-panel {
            width: 58%;
            padding: 8px;
          }

          .about-scan-panel .text-[9px] {
            font-size: 8px;
          }

          .about-scan-panel .text-[8px] {
            font-size: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-orbit-outer,
          .about-status-dot,
          .about-data-path,
          .about-flow-particle,
          .about-shield-aura,
          .about-shield-core,
          .about-shield-scan,
          .about-neural-node,
          .about-warning-icon,
          .about-progress-bar,
          .about-particle {
            animation: none;
          }

          .about-shield-scan {
            top: 50%;
            opacity: 0.65;
          }

          .about-progress-bar {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}