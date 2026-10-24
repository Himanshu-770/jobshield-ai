"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, ShieldCheck } from "lucide-react";
import api from "@/lib/api";
import { JobAnalysis } from "@/store/analysisStore";

type Message = { role: "user" | "assistant"; content: string; createdAt?: string };
export default function InvestigationChat({ analysisId, onAnalysis }: { analysisId: string; onAnalysis: (analysis: JobAnalysis) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    api.get(`/job/${encodeURIComponent(analysisId)}/chat`).then(({ data }) => {
      if (active) setMessages(data.messages || []);
    }).catch((err) => { if (active) setError(err?.response?.data?.message || "Could not load this conversation"); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [analysisId]);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, sending]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || sending) return;
    setSending(true); setError(""); setDraft("");
    try {
      const { data } = await api.post(`/job/${encodeURIComponent(analysisId)}/chat`, { message });
      setMessages(data.messages || []);
      if (data.analysis) onAnalysis(data.analysis);
    } catch (err) {
      setDraft(message);
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Could not send your message. Try again.");
    } finally { setSending(false); }
  }

  return <section className="mt-5 overflow-hidden rounded-2xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
    <div className="flex items-start gap-3 border-b p-5 sm:p-6" style={{ borderColor: "var(--border)" }}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ color: "var(--primary)", backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)" }}><MessageCircle size={19} /></span>
      <div><h2 className="font-semibold">Continue your hiring investigation</h2><p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Add what happened at each stage or ask what to check next. New details update the evidence score.</p></div>
      <span className="ml-auto hidden items-center gap-1.5 text-[11px] sm:flex" style={{ color: "var(--text-muted)" }}><ShieldCheck size={14} />Saved to this investigation</span>
    </div>
    <div className="max-h-[440px] min-h-44 space-y-3 overflow-y-auto p-4 sm:p-5">
      {loading ? <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading saved conversation…</p> : null}
      {!loading && !messages.length ? <div className="rounded-xl border border-dashed p-4" style={{ borderColor: "var(--border)" }}><p className="text-sm font-medium">Tell JobShield what happened after you applied.</p><p className="mt-1 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>For example: “They asked me to pay for training before the interview” or “I received a written offer from the company domain.”</p></div> : null}
      {messages.map((message, index) => <div key={`${message.createdAt || index}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><article className="max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%]" style={{ backgroundColor: message.role === "user" ? "color-mix(in srgb, var(--primary) 17%, var(--surface-secondary))" : "var(--surface-secondary)", color: "var(--text-primary)" }}><p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: message.role === "user" ? "var(--primary)" : "var(--text-muted)" }}>{message.role === "user" ? "You" : "JobShield AI"}</p><p className="whitespace-pre-wrap">{message.content}</p></article></div>)}
      {sending ? <p className="text-xs" style={{ color: "var(--text-muted)" }}>JobShield is reviewing the new details…</p> : null}
      <div ref={bottom} />
    </div>
    {error ? <p role="alert" className="px-5 pb-2 text-xs text-red-400">{error}</p> : null}
    <form onSubmit={submit} className="flex items-end gap-2 border-t p-3 sm:p-4" style={{ borderColor: "var(--border)" }}>
      <label className="sr-only" htmlFor="investigation-message">Your message</label>
      <textarea id="investigation-message" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} rows={2} maxLength={4000} placeholder="Share a new experience or ask a follow-up question…" className="min-h-12 flex-1 resize-y rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)]" style={{ backgroundColor: "var(--surface-secondary)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      <button type="submit" disabled={sending || !draft.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}><Send size={17} /></button>
    </form>
    <p className="px-5 pb-4 text-[11px]" style={{ color: "var(--text-muted)" }}>Your conversation remains attached to this report after you sign out. Sign in again to continue.</p>
  </section>;
}
