import { getAsanaApiData } from "@/app/actions";
import ConnectAsanaCard from "@/app/components/ConnectAsanaCard";
import CustomTicketId from "@/app/components/CustomTicketId";
import DateAndTime from "@/app/components/DateAndTime";
import SignOut from "@/app/components/SignOut";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

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
      <div className="flex min-h-[80vh] w-full items-center justify-center p-4">
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
<div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      
      {/* Centered Shell: Caps width on desktop so it doesn't stretch infinitely */}
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <header className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Asana Tasks
          </h1>
          <SignOut />
        </header>

        {/* Task List / Empty State */}
        <main>
          {tasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-8 sm:p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 shadow-sm">
              <p className="text-sm sm:text-base font-medium">
                No tasks found or your Asana session expired.
              </p>
              <div className="mt-4 flex justify-center">
                <ConnectAsanaCard />
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li key={task.gid}>
                  {/* 
                    Mobile: flex-col (stacks elements neatly)
                    Tablet/Desktop (sm:): flex-row (places them side-by-side)
                  */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                    
                    {/* Task Title & Due Date Text */}
                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                      <strong className="text-base font-semibold text-slate-900 dark:text-white truncate">
                        {task.name}
                      </strong>
                      {task.due_at && (
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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
                    <div className="flex items-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
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

      </div>
    </div>
  );
}