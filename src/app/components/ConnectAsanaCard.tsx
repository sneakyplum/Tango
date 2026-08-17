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
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {/* Simple Icon Placeholder */}
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

      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Connect your Asana Account
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        To view your task countdown timers and sync custom ticket IDs, connect
        your Asana workspace to Tanjey.
      </p>

      <button
        onClick={handleConnect}
        className="mt-6 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-2 border-black cursor-pointer bg-gradient-to-r from-purple-500 via-slate-700 to-slate-800 "
      >
        Connect Asana
      </button>
    </div>
  );
}