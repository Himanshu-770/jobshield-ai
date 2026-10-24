
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "What is JobShield AI?",
    answer:
      "JobShield AI is an AI-powered security platform that helps job seekers identify suspicious and potentially fraudulent job opportunities before they apply.",
  },
  {
    question: "How does JobShield AI analyze a job?",
    answer:
      "JobShield AI analyzes information such as job descriptions, company details, recruiter information, URLs, and screenshots to identify suspicious patterns and potential scam indicators.",
  },
  {
    question: "What information can I submit for analysis?",
    answer:
      "You can submit job details, job posting URLs, or screenshots of job postings and recruiter messages for analysis.",
  },
  {
    question: "How long does an analysis take?",
    answer:
      "Our analysis is designed to be fast and typically delivers a security assessment within a few seconds.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "We take privacy and security seriously. Information submitted to JobShield AI is processed only as necessary to provide the requested analysis and improve the service.",
  },
  {
    question: "Can JobShield AI guarantee that a job is legitimate?",
    answer:
      "No security system can guarantee that a job is completely legitimate. JobShield AI provides a risk assessment to help you make a more informed decision.",
  },
  {
    question: "Is JobShield AI free to use?",
    answer:
      "JobShield AI is designed to provide accessible job security analysis. Availability of specific features may depend on the current version of the platform.",
  },
  {
    question: "What should I do if a job is flagged as suspicious?",
    answer:
      "Avoid sharing sensitive information or making payments until you independently verify the company, recruiter, and job opportunity.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[var(--background)] px-4 py-24 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-sm font-medium leading-5 text-[var(--text-secondary)] sm:text-base">
            Everything you need to know about protecting yourself from
            suspicious job opportunities.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-[var(--primary)]"
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[var(--border)] px-5 py-4">
                        <motion.p
                          initial={{ y: -5 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xs font-medium leading-5 text-[var(--text-secondary)] sm:text-sm"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
