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
    <div className="w-full gap-4 p-4">
      <div className="flex flex-col gap-4 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Asana Tasks</h1>
          <SignOut />
        </div>

        <div>
          {tasks.length === 0 ? (
            <div className="rounded-md border p-8 text-center text-muted-foreground">
              <p>No tasks found or your Asana session expired.</p>
              <div className="mt-4 flex justify-center">
                <ConnectAsanaCard />
              </div>
            </div>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.gid}>
                  <div className="mb-4 flex items-center justify-between rounded-md border p-4">
                    <div className="flex flex-col gap-1 pl-4">
                      <strong>Task Name: {task.name}</strong>
                      {task.due_at && (
                        <p className="text-sm text-gray-600">
                          Due at: {new Date(task.due_at).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      {task.due_at && (
                        <DateAndTime
                          asanaDueAtTime={new Date(task.due_at).toISOString()}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-center p-2">
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
        </div>
      </div>
    </div>
  );
}