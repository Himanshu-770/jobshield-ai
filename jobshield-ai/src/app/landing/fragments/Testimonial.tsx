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
    <section
      id="testimonial"
      className="w-full overflow-hidden py-16 sm:py-24"
      style={{
        backgroundColor: "var(--surface-secondary)",
        color: "var(--text-primary)",
      }}
    >
      {/* This width matches the PageBoundaries positions */}
      <div
        className="mx-auto w-full"
        style={{
          width: "min(1303px, 100%)",
        }}
      >
        {/* Heading */}
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Trusted by Job Seekers
          </h2>

          <p
            className="mt-4 text-sm font-medium leading-5 sm:text-base"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            See how JobShield AI helps people make safer decisions during
            their job search.
          </p>
        </div>

        {/* Moving Testimonials */}
        <div
          className="testimonial-viewport relative mt-10 w-full overflow-hidden"
          aria-label="Job seeker testimonials"
        >
          <div className="testimonial-track flex w-max gap-4">
            {[...testimonials, ...testimonials].map(
              (testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.name}-${index}`}
                  {...testimonial}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-track {
          animation: testimonial-scroll 40s linear infinite;
          will-change: transform;
        }

        .testimonial-viewport:hover .testimonial-track {
          animation-play-state: paused;
        }

        @keyframes testimonial-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 8px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation-play-state: paused;
            transform: translateX(0);
          }
        }
      `}</style>
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
    <motion.article
      className="
        flex w-[280px] shrink-0 flex-col
        rounded-xl border p-4
        sm:w-[350px] sm:p-5
      "
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
      whileHover={{
        borderColor: "var(--primary)",
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      {/* Quote and Rating */}
      <div className="flex items-center justify-between">
        <Quote
          size={22}
          style={{
            color: "var(--primary)",
          }}
        />

        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              className="fill-current"
              style={{
                color: "var(--primary)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Review */}
      <p
        className="mt-5 min-h-[90px] text-sm font-medium leading-6"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        &quot;{review}&quot;
      </p>

      {/* User */}
      <div
        className="mt-5 border-t pt-4"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <p
          className="text-sm font-semibold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          {name}
        </p>

        <p
          className="mt-1 text-xs"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          {role}
        </p>
      </div>
    </motion.article>
  );
}