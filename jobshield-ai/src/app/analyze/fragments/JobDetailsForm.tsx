"use client";

import { ArrowUpRight, CloudUpload, LockKeyhole } from "lucide-react";
import { useState, type DragEvent, type FormEvent } from "react";

type Props = { activeTab: string; onAnalyze: (data: FormData) => void; loading?: boolean };
export default function JobDetailsForm({ activeTab, onAnalyze, loading = false }: Props) {
  const [selectedScreenshot, setSelectedScreenshot] = useState<File | null>(null);
  const [draggingScreenshot, setDraggingScreenshot] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (activeTab === "Screenshot") {
      form.delete("screenshot");
      if (selectedScreenshot) form.set("screenshot", selectedScreenshot);
    }
    onAnalyze(form);
  };
  if (activeTab === "Job URL") return <form onSubmit={submit} className="rounded-xl border p-4 sm:p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
    <Field label="Job Posting URL" name="url" placeholder="https://example.com/job-posting" type="url" required />
    <FormButton loading={loading} />
  </form>;
  if (activeTab === "Screenshot") return <form onSubmit={submit} className="rounded-xl border p-4 sm:p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
    <label className="text-[14px]" style={{ color: "var(--text-secondary)" }}>Upload Job Screenshot</label>
    <div
      onDragEnter={(event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDraggingScreenshot(true); }}
      onDragOver={(event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDraggingScreenshot(true); }}
      onDragLeave={(event: DragEvent<HTMLDivElement>) => { event.preventDefault(); if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDraggingScreenshot(false); }}
      onDrop={(event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDraggingScreenshot(false);
        const file = event.dataTransfer.files[0];
        if (file) setSelectedScreenshot(file);
      }}
      className={`mt-3 flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed p-5 text-center text-xs transition-colors ${draggingScreenshot ? "ring-2 ring-blue-400" : ""}`}
      style={{ backgroundColor: "var(--surface-secondary)", borderColor: draggingScreenshot ? "var(--primary)" : "var(--border)", color: "var(--text-secondary)" }}
    >
      <CloudUpload size={36} className="mb-2" style={{ color: "var(--text-primary)" }} />
      <span className="text-sm" style={{ color: "var(--text-primary)" }}>{selectedScreenshot ? selectedScreenshot.name : draggingScreenshot ? "Drop screenshot to upload" : "Drag and drop a screenshot here"}</span>
      <span className="mt-1">or choose a file · PNG, JPG or WEBP · max 8 MB</span>
      <label className="mt-3 cursor-pointer rounded-md border px-3 py-2 text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
        Browse files
        <input type="file" name="screenshot" accept="image/png,image/jpeg,image/webp" onChange={(event) => setSelectedScreenshot(event.currentTarget.files?.[0] || null)} className="sr-only" />
      </label>
      {selectedScreenshot && <button type="button" onClick={() => setSelectedScreenshot(null)} className="mt-2 text-xs underline" style={{ color: "var(--text-secondary)" }}>Remove selected image</button>}
    </div>
    <FormButton loading={loading} />
  </form>;
  return <form onSubmit={submit} className="rounded-xl border p-4 sm:p-5" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Job Title" name="jobTitle" placeholder="e.g. Remote Data Entry Specialist" />
      <Field label="Company Name" name="company" placeholder="e.g. Apex Global Tech" />
      <Field label="Recruiter Name" name="recruiterName" placeholder="e.g. Sarah Connor" />
      <Field label="Recruiter Email Address" name="recruiterEmail" placeholder="e.g. recruitment@example.com" type="email" />
    </div>
    <div className="my-4"><Field label="Salary / Compensation" name="salary" placeholder="e.g. ₹25,000/month" /></div>
    <label htmlFor="jobDescription" className="text-[14px]" style={{ color: "var(--text-secondary)" }}>Job Description</label>
    <textarea id="jobDescription" name="jobDescription" rows={5} placeholder="Paste the full job posting text or messages here..." className="mt-2 w-full resize-y rounded-md border p-3 text-sm outline-none focus:border-[var(--primary)]" style={{ backgroundColor: "var(--surface-secondary)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
    <FormButton loading={loading} />
  </form>;
}
function Field({ label, name, placeholder, type = "text", required = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return <div><label htmlFor={name} className="text-[14px]" style={{ color: "var(--text-secondary)" }}>{label}</label><input id={name} name={name} type={type} required={required} placeholder={placeholder} className="mt-2 w-full rounded-md border px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)]" style={{ backgroundColor: "var(--surface-secondary)", borderColor: "var(--border)", color: "var(--text-primary)" }} /></div>;
}
function FormButton({ loading }: { loading: boolean }) {
  return <div className="mt-5 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center"><p className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-secondary)" }}><LockKeyhole size={18} />Your analysis is saved privately to your account.</p><button type="submit" disabled={loading} className="flex items-center justify-center gap-1.5 rounded-md px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>{loading ? "Analyzing…" : "Analyze Job"}<ArrowUpRight size={16} /></button></div>;
}
