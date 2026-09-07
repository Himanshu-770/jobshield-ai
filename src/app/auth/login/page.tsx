"use client"
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import {useRouter} from "next/navigation";
import AuthVisual from "../fragments/AuthVisual";
import AuthInput from "../fragments/AuthInput";

export default function SignIn() {
  const router = useRouter();
  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    router.push("/dashboard");
  }
  return (
    <main className="flex min-h-screen bg-[#070B14] text-white">
      <AuthVisual />

      <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <ShieldCheck size={17} />
            </div>

            <span className="font-semibold">
              JobShield <span className="text-blue-500">AI</span>
            </span>
          </div>

          <h1 className="text-3xl font-extrabold">Welcome back</h1>

          <p className="mt-2 text-sm font-normal text-gray-500">
            Enter your credentials to access your security dashboard.
          </p>

          <form 
          onSubmit={handleSubmit}
          className="mt-8 space-y-5">
            <AuthInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="you@company.com"
            />

            <AuthInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-500">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="accent-blue-500"
                />
                Remember me
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-blue-500 hover:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2.5 text-sm font-semibold hover:bg-blue-400"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-500 hover:text-blue-400"
            >
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}