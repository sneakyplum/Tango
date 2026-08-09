

import { createAsanaCustomTicket, getAsanaApiData } from "@/app/actions";
import CustomTicketId from "@/app/components/CustomTicketId";
import DateAndTime from "@/app/components/DateAndTime";
import prisma from "@/lib/prisma";



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

export default async function DashboardPage({workspace, gid, due_at, due_on, assignee_status, created_at, modified_at, customTicketId, taskId}: AsanaTask) {
  // Fetches data securely on the server on initial load
  const tasks: AsanaTask[] = await getAsanaApiData({

    workspace: workspace,
    gid: gid,

    limit: 50
  });

  const getTicketAmount = await prisma.asanaCustomTicketId.findMany();


  // const yourTickets: AsanaTask[] = await createAsanaCustomTicket({
  //   workspace: workspace,
  //   CustomTicketId: customTicketId,
  //   gid: gid,
    
  // })



  return (
    <main style={{ padding: "2rem" }}>
      <h1>My Asana Tasks</h1>
      
      <ul>
        {/* Mapping directly on load */}
        {tasks.map((task) => (
          <li key={task.gid}>
            <div className="flex flex-row gap-2 p-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-300 mb-2">
              <div className="flex flex-row gap-2 w-full">
                <div className="flex flex-row">
                  <strong>{task.name}</strong>
                  {task.due_at && <p>Due at: {new Date(task.due_at).toLocaleString()}</p>}
                  {task.due_on && <p>Due on: {new Date(task.due_on).toLocaleString()}</p>}

                </div>
                {/* {task.assignee_status && <p>Assignee Status: {task.assignee_status}</p>}
                {task.created_at && <p>Created at: {task.created_at}</p>}
                {task.modified_at && <p>Modified at: {task.modified_at}</p>} */}
                <div className="flex flex-col gap-1">
                  <DateAndTime asanaDueAtTime={new Date(task.due_at as string).toISOString()} />

                </div>

                <div className="flex flex-col gap-1 justify-end items-end">
                  {task.gid}
                  <CustomTicketId gid={task.gid} workspace={task.workspace} customTicketId={getTicketAmount.find((t) => t.taskId === task.gid)?.customTicketId || ''} />

                </div>

              </div>

            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}