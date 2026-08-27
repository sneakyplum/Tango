import Link from "next/link";

export default function PrivacyPolicy() {
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

      {/* 2. Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-16 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-900/60 transition-colors"
        >
          ← Back to Tanjey
        </Link>

        <div className="space-y-2 border-b border-slate-800/80 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: August 2026</p>
        </div>

        {/* Content Card Wrapper with Glassmorphic Effect */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 shadow-xl ring-1 ring-white/10 space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">
              1. Information We Collect
            </h2>
            <p>
              When you sign up or connect third-party integration accounts (such as Asana), we collect minimal account information necessary to provide our service, including your email address, profile identifiers, and API authorization tokens.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800/60 pt-6">
            <h2 className="text-lg font-bold text-white tracking-tight">
              2. How We Use Your Data
            </h2>
            <p>
              We use your information strictly to authenticate your account, render countdown timers, display custom ticket IDs, and send essential transactional communications. We do not sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800/60 pt-6">
            <h2 className="text-lg font-bold text-white tracking-tight">
              3. Third-Party Services
            </h2>
            <p>
              Tanjey integrates with Asana via official APIs. By connecting your Asana workspace, you grant Tanjey permission to access task metadata solely to fulfill core application features.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800/60 pt-6">
            <h2 className="text-lg font-bold text-white tracking-tight">
              4. Data Security & Storage
            </h2>
            <p>
              We employ standard security protocols and encrypted database connections to protect user data. However, no internet transmission is 100% secure, and usage is at your own risk.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800/60 pt-6">
            <h2 className="text-lg font-bold text-white tracking-tight">
              5. Contact
            </h2>
            <p>
              If you have questions regarding this Privacy Policy, reach out to us at{" "}
              <a href="mailto:support@tanjey.com" className="text-indigo-400 font-medium hover:underline">
                support@tanjey.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full py-8 text-center text-xs text-slate-500 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto px-4 gap-4">
        <div>© {new Date().getFullYear()} Tanjey. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}