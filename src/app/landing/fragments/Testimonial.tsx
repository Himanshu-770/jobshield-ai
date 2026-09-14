"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer",
    review:
      "JobShield AI helped me notice several red flags in a remote job posting before I shared any personal information.",
  },
  {
    name: "Daniel Carter",
    role: "Product Designer",
    review:
      "The security score makes it really easy to understand whether a job opportunity deserves further investigation.",
  },
  {
    name: "Emily Johnson",
    role: "Marketing Specialist",
    review:
      "I like how quickly I can check a suspicious job posting. It gives me an extra layer of confidence before applying.",
  },
  {
    name: "Michael Anderson",
    role: "Frontend Developer",
    review:
      "The analysis is simple to understand while still showing the important warning signs behind the risk score.",
  },
  {
    name: "Jessica Williams",
    role: "Data Analyst",
    review:
      "JobShield AI gives me peace of mind when applying to jobs from companies I haven't heard of before.",
  },
];

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-[#0D1527] px-6 py-16 sm:py-20">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Trusted by Job Seekers
        </h2>

        <p className="mt-4 text-sm font-medium leading-5 text-gray-500 sm:text-base">
          See how JobShield AI helps people make safer decisions during their
          job search.
        </p>
      </div>

      {/* Moving Testimonials */}
      <div className="relative mt-10 overflow-hidden">
        <motion.div
          className="flex w-max gap-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{
            animationPlayState: "paused",
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              {...testimonial}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  review,
}: {
  name: string;
  role: string;
  review: string;
}) {
  return (
    <article className="w-[300px] shrink-0 rounded-xl border border-white/10 bg-[#111A2E] p-5 sm:w-[350px]">
      {/* Quote */}
      <div className="flex items-center justify-between">
        <Quote size={22} className="text-blue-500" />

        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              className="fill-blue-500 text-blue-500"
            />
          ))}
        </div>
      </div>

      {/* Review */}
      <p className="mt-5 min-h-[90px] text-sm font-medium leading-6 text-gray-400">
        "{review}"
      </p>

      {/* User */}
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-sm font-semibold text-white">{name}</p>

        <p className="mt-1 text-xs text-gray-500">{role}</p>
      </div>
    </article>
  );
}