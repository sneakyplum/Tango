import Link from "next/link";
import Image from "next/image";
// import FeedbackBox from "./components/FeedbackBox"; // Import your feedback component

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col">
      {/* 1. Navbar */}
      <header className="w-full max-w-6xl mx-auto h-20 px-4 flex items-center justify-between border-b border-slate-800/80">
        <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-400">
          Tanjey
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800 px-3 py-1 rounded-full">
          Asana Power Tools
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Live Countdowns & Custom Ticket IDs for Asana
        </h1>
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Supercharge your workflow. Give your team precision due-date countdowns and clean, customized ticket IDs right inside your workspace.
        </p>
        <div className="pt-2">
          <Link
            href="/sign-up"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
          >
            Start Free Today
          </Link>
        </div>

        {/* Full Dashboard Screenshot */}
        <div className="w-full pt-8">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl shadow-indigo-500/10 ring-1 ring-white/10">
            <img
              src="/images/full-dashboard.png"
              alt="Tanjey Broad Dashboard Overview"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>
      </main>

      {/* 3. Detailed Feature Breakdown */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20 space-y-24 border-t border-slate-900">
        
        {/* Feature 1: Real-Time Active Countdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Precision Tracking
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Watch tasks count down live in real time
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Stop guessing when work is actually due or relying on static calendar dates. Tanjey transforms standard Asana due dates into active countdown timers so your team knows exactly how much time is left.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-1.5 shadow-xl ring-1 ring-white/10">
            <img
              src="/images/live-countdown.png"
              alt="Live task countdown timers"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Feature 2: Breached & Urgent Deadlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 text-left md:order-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Urgency Highlighting
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Instantly spot overdue and breached tasks
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Never let a missed deadline fall through the cracks. Overdue items are automatically highlighted with clear breached timers, making blocker triage effortless during daily standups.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-1.5 shadow-xl ring-1 ring-white/10 md:order-1">
            <img
              src="/images/overdue-task.png"
              alt="Breached and overdue task indicators"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Feature 3: Custom Ticket IDs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Structured Organization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Assign clean, custom ticket IDs to every task
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Eliminate confusion when referencing tasks across Slack, GitHub, or client emails. Automatically generate structured ticket numbers with custom prefixes for seamless communication.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-1.5 shadow-xl ring-1 ring-white/10">
            <img
              src="/images/custom-ticket.png"
              alt="Custom ticket IDs for Asana tasks"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>

      </section>

      {/* 4. Feedback Section */}
      {/* <section className="w-full max-w-4xl mx-auto px-4 py-8 border-t border-slate-900">
        <FeedbackBox />
      </section> */}

      {/* 5. Footer */}
      <footer className="w-full py-8 text-center text-xs text-slate-600 border-t border-slate-900">
        © {new Date().getFullYear()} Tanjey. All rights reserved.
      </footer>
    </div>
  );
}