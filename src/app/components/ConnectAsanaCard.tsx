// components/ConnectAsanaCard.tsx
"use client";

import { authClient } from "@/lib/auth-client"; // or your Better Auth client import

export default function ConnectAsanaCard() {
  const handleConnect = async () => {
    // Better Auth social / generic OAuth trigger for Asana
    await authClient.signIn.social({
      provider: "asana",
      callbackURL: "/dashboard",
    });
  };

  return (
<div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 text-center shadow-xl ">
  
  {/* Icon Badge */}
  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-950/80 border border-indigo-800/80 text-indigo-400">
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  </div>

  {/* Category Pill */}
  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 px-3 py-1 rounded-full mb-3">
    Integration Required
  </span>

  {/* Title & Description */}
  <h2 className="text-2xl font-extrabold tracking-tight text-white">
    Connect your Asana Account
  </h2>
  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
    To view your task countdown timers and sync custom ticket IDs, connect
    your Asana workspace to Tanjey.
  </p>

  {/* Connect Button */}
  <button
    onClick={handleConnect}
    className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-950/50 transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
  >
    Connect Asana
  </button>

</div>
  );
}