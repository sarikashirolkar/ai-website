"use client";

import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
      });

      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { output: string };
      setResponse(data.output);
    } catch {
      setResponse("Failed to get response from backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <section className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-brand-100 p-2 text-brand-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold">AI Workflow Automate</h1>
        </div>

        <p className="mb-6 text-slate-600">
          Next.js + FastAPI starter, ready for LangChain/LangGraph orchestration and Cloudflare deployment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask your agent..."
            className="min-h-28 w-full rounded-md border border-slate-300 p-3 outline-none ring-brand-500 focus:ring"
          />
          <Button size="lg" disabled={loading}>
            {loading ? "Thinking..." : "Run AI Workflow"}
          </Button>
        </form>

        {response && (
          <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="whitespace-pre-wrap text-sm text-slate-700">{response}</p>
          </div>
        )}
      </section>
    </main>
  );
}
