
"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AuthVisual() {
  return (
    <section
      className="relative hidden min-h-screen w-1/2 overflow-hidden lg:flex lg:flex-col"
      style={{
        backgroundColor: "var(--surface-secondary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="px-15 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg shadow-[0_0_25px_var(--primary-shadow)]"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <ShieldCheck size={20} />
          </div>

          <span className="text-xl font-semibold">
            JobShield{" "}
            <span style={{ color: "var(--primary)" }}>AI</span>
          </span>
        </Link>
      </div>

      <SecurityAnimation />

      <div className="absolute bottom-12 left-0 w-full px-8 text-center">
        <h2 className="text-2xl font-extrabold">
          Verify jobs.{" "}
          <span style={{ color: "var(--primary)" }}>
            Protect your future.
          </span>
        </h2>

        <p
          className="mx-auto mt-3 max-w-md text-sm font-semibold leading-5"
          style={{ color: "var(--text-secondary)" }}
        >
          Join thousands of professionals securing their careers against
          digital recruitment scams.
        </p>
      </div>
    </section>
  );
}

function SecurityAnimation() {
  return (
    <div className="relative mx-auto my-12 h-80 w-80">
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)" }}
      />

      <motion.div
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-8 rounded-full border"
        style={{ borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)" }}
      />

      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full border"
          style={{
            borderColor: "var(--primary)",
            backgroundColor:
              "color-mix(in srgb, var(--primary) 10%, transparent)",
          }}
        >
          <ShieldCheck size={52} style={{ color: "var(--primary)" }} />
        </div>
      </motion.div>

      <SecurityNode className="left-4 top-10" />
      <SecurityNode className="right-4 top-16" />
      <SecurityNode className="bottom-16 left-2" />
      <SecurityNode className="bottom-12 right-4" />
    </div>
  );
}

function SecurityNode({ className }: { className: string }) {
  return (
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity }}
      className={`absolute h-10 w-10 rounded-full border p-3 ${className}`}
      style={{
        borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{ backgroundColor: "var(--primary)" }}
      />
    </motion.div>
  );
}