"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link"

export default function AuthVisual() {
  return (
    <section className="relative hidden min-h-screen w-1/2 overflow-hidden bg-[#0D1527] lg:flex lg:flex-col">
      <div className="py-5 px-15"> 
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6] shadow-[0_0_25px_rgba(59,130,246,0.55)]">
            <ShieldCheck size={20} />
          </div>
          <span className="text-xl font-semibold">
            JobShield <span className="text-[#3B82F6]">AI</span>
          </span>
        </Link>
        </div>
      <SecurityAnimation />

      <div className="absolute bottom-12 left-0 w-full px-8 text-center ">
        <h2 className="text-2xl font-extrabold text-white">
          Verify jobs.{" "}
          <span className="text-blue-500">Protect your future.</span>
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-5 text-gray-500">
          Join thousands of professionals securing their careers against
          digital recruitment scams.
        </p>
      </div>
    </section>
  );
}

function SecurityAnimation() {
  return (
    <div className="relative my-12 mx-auto h-80 w-80">
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 rounded-full border border-blue-500/20"
      />

      <motion.div
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-8 rounded-full border border-blue-500/20"
      />

      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-blue-500 bg-blue-500/10">
          <ShieldCheck size={52} className="text-blue-400" />
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
      className={`absolute h-10 w-10 rounded-full border border-blue-500/30 p-3 ${className}`}
    >
      <div className="h-full w-full rounded-full bg-blue-400" />
    </motion.div>
  );
}