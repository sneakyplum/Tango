

import Link from "next/link";
import AsanaOauth from "./components/AsanaOauth";
import HomePageLinks from "./components/HomePageLinks";

export default function Home() {


  return (
    <div>
      {/* <HomePageLinks /> */}
      {/* <AsanaOauth /> */}
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col">
      {/* 1. Navbar with Brand Name */}
      <header className="w-full max-w-6xl mx-auto h-20 px-4 flex items-center justify-between border-b border-slate-800">
        <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-400">
          Tanjey
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800 px-3 py-1 rounded-full">
          Asana Power Tools
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Live Countdowns & Custom Ticket IDs for Asana
        </h1>
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl">
          Supercharge your workflow. Give your team precision due-date countdowns and clean, customized ticket IDs right inside your workspace.
        </p>
        <div className="pt-4">
          <Link href="/sign-up" className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg hover:bg-indigo-500 transition-colors">
            Start Free Today
          </Link>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full py-6 text-center text-xs text-slate-600 border-t border-slate-900">
        © {new Date().getFullYear()} Tanjey. All rights reserved.
      </footer>
    </div>
    </div>
  )
}