import { getAsanaApiData } from "@/app/actions";
import ConnectAsanaCard from "@/app/components/ConnectAsanaCard";
import CustomTicketId from "@/app/components/CustomTicketId";
import DateAndTime from "@/app/components/DateAndTime";
import SignOut from "@/app/components/SignOut";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";

interface AsanaTask {
  workspace: string;
  gid: string;
  name: string;
  resource_type: string;
  due_at?: string;
  due_on?: string;
  assignee_status?: string;
  created_at?: string;
  modified_at?: string;
  customTicketId: string;
  taskId: string;
}

export default async function DashboardPage() {
  // 1. Check Session & Asana Account FIRST before making any API calls
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  const asanaAccount = userId
    ? await prisma.account.findFirst({
        where: {
          userId: userId,
          providerId: "asana",
        },
      })
    : null;

  // 2. If no connected account (or token revoked), render the empty state immediately
  if (!asanaAccount) {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-16">
        <ConnectAsanaCard />
      </div>
    );
  }

  // 3. Fetch Asana data safely now that we confirmed an account exists
  let tasksData: AsanaTask[] | null = null;

  try {
    tasksData = await getAsanaApiData({
      workspace: "",
      gid: "",
      limit: 50,
    });
  } catch (error) {
    console.error("Failed to fetch Asana tasks:", error);
  }

  // Ensure tasks is strictly an array even if the API returned an error object
  const tasks: AsanaTask[] = Array.isArray(tasksData) ? tasksData : [];

  // Fetch only this user's custom ticket IDs
  const userTickets = userId
    ? await prisma.asanaCustomTicketId.findMany({
        where: { userId },
      })
    : [];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col">
      {/* Navbar with Brand Name */}
      <header className="w-full max-w-6xl mx-auto h-20 px-4 flex items-center justify-between border-b border-slate-800">
        <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-400">
          Tanjey
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 px-3 py-1 rounded-full hidden sm:inline-block">
            Dashboard
          </span>
          <SignOut />
        </div>
      </header>

      {/* Main Centered Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        {/* Section Title Header */}
        <div className="flex items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              My Asana Tasks
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Active deadline countdowns and ticket sync for your workspace.
            </p>
          </div>
        </div>

        {/* Task List / Empty State */}
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 sm:p-12 text-center text-slate-400 shadow-xl flex flex-col items-center">
            <p className="text-base font-medium text-slate-300 mb-4">
              No tasks found or your Asana session expired.
            </p>
            <ConnectAsanaCard />
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.gid}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 shadow-lg hover:border-slate-700 transition-colors">
                  
                  {/* Task Title & Due Date Text */}
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <strong className="text-base font-semibold text-white truncate">
                      {task.name}
                    </strong>
                    {task.due_at && (
                      <p className="text-xs text-slate-400">
                        Due: {new Date(task.due_at).toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Countdown Timer Component */}
                  {task.due_at && (
                    <div className="flex items-center text-sm font-medium">
                      <DateAndTime
                        asanaDueAtTime={new Date(task.due_at).toISOString()}
                      />
                    </div>
                  )}

                  {/* Custom Ticket ID Form / Badge */}
                  <div className="flex items-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                    <CustomTicketId
                      gid={task.gid}
                      workspace={task.workspace}
                      customTicketId={
                        userTickets.find((t) => t.taskId === task.gid)
                          ?.customTicketId || ""
                      }
                    />
                  </div>

                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-slate-600 border-t border-slate-900 mt-auto">
        © {new Date().getFullYear()} Tanjey. All rights reserved.
      </footer>
    </div>
  );
}