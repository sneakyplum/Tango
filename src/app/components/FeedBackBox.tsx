"use client";

import { useState } from "react";
import { sendFeedback } from "../actions";



export default function FeedbackBox() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await sendFeedback(formData);

    if (result.success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 shadow-xl ring-1 ring-white/10 space-y-4">
      <div className="space-y-1 text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          User Feedback
        </span>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Have feedback or feature requests?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Let us know what you think of Tanjey or what tools you want to see built next.
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-center text-sm font-medium text-emerald-400">
          ✓ Thanks for the feedback! Your message was sent directly to our team.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your email (optional, if you'd like a reply)"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us what you think or report a bug..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-400 font-medium">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {status === "loading" ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}