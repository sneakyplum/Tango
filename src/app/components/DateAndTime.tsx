"use client";

import React, { useEffect, useState } from "react";

interface DateAndTimeProps {
  asanaDueAtTime: string;
}

const DateAndTime = ({ asanaDueAtTime }: DateAndTimeProps) => {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    // 1. Mark as mounted on the client
    setMounted(true);
    setNow(Date.now());

    // 2. Tick every second
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Return a clean fallback until mounted on client (Prevents Hydration Mismatch!)
  if (!mounted || !asanaDueAtTime) {
    return <span className="text-xs text-slate-500 font-mono">Calculating SLA...</span>;
  }

  const dueTimeMs = new Date(asanaDueAtTime).getTime();
  const diffMs = dueTimeMs - now;

  // Render Breached State if SLA passed
  if (diffMs <= 0) {
    const overdueSecs = Math.abs(Math.floor(diffMs / 1000));
    const overdueMins = Math.floor(overdueSecs / 60);
    const overdueHours = Math.floor(overdueMins / 60);

    return (
      <div className="flex flex-col items-start gap-0.5 text-xs font-mono">
        <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-bold border border-red-500/20 animate-pulse">
          BREACHED
        </span>
        <span className="text-red-400/80 text-[11px]">
          Overdue by {overdueHours}h {overdueMins % 60}m {overdueSecs % 60}s
        </span>
      </div>
    );
  }

  // Calculate remaining time
  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = totalSeconds % 60;
  const remainingMins = minutes % 60;

  const isUrgent = diffMs < 15 * 60 * 1000; // Under 15 mins

  return (
    <div className="flex flex-col gap-1 text-xs font-mono">
      <div className={`font-semibold ${isUrgent ? "text-amber-500" : "text-emerald-500"}`}>
        {hours > 0 ? `${hours}h ` : ""}{remainingMins}m {seconds}s remaining
      </div>
      <div className="text-[10px] text-slate-400">
        Due: {new Date(asanaDueAtTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default DateAndTime;