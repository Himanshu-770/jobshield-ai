import Link from "next/link";
import {  ShieldCheck ,Shield} from "lucide-react";
import ShieldAnalyzer from "./ShieldAnalyser";

export default function Hero() {
  return (
    <section className="bg-[#070B14] px-6 py-20 sm:py-24 lg:px-10 lg:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="pl-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/60 px-3 py-1 text-xs uppercase tracking-wide text-blue-400 ">
            <ShieldCheck size={16} />
            <span className="pt-0.5 font-bold">AI-powered job scam detection</span>
          </div>

          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight sm:text-[40px] tracking-tight">
            Don&apos;t fall for fake jobs.
            <span className="block">Verify before you apply.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
            Analyze job postings, recruiter details and screenshots to detect
            potential scams before sharing money or personal information.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              href="/auth/signup"
              className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 text-sm font-semibold hover:bg-blue-400"
            >
            <Shield size={18}/>
              Check a Job
            </Link>

            <Link
              href="#how-it-works"
              className="rounded-md border border-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5"
            >
              How It Works
            </Link>
          </div>
        </div>

        <ShieldAnalyzer />
      </div>
    </section>
  );
}
