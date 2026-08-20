export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-indigo-950 text-indigo-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-indigo-800">
          ✉️
        </div>
        <h2 className="text-2xl font-bold text-white">Check Your Inbox</h2>
        <p className="text-sm text-slate-400">
          We sent a verification link to your email address. You must verify your email before connecting your Asana workspace.
        </p>
        <div className="pt-2">
          <a href="/sign-in" className="inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300 underline">
            Return to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}