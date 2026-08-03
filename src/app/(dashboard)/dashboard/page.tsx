

import { getAsanaApiData } from "@/app/actions";
import DateAndTime from "@/app/components/DateAndTime";



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

}

export default async function DashboardPage({workspace, gid, due_at, due_on, assignee_status, created_at, modified_at}: AsanaTask) {
  // Fetches data securely on the server on initial load
  const tasks: AsanaTask[] = await getAsanaApiData({

    workspace: workspace,
    gid: gid,

    limit: 50
  });


  return (
    <main style={{ padding: "2rem" }}>
      <h1>My Asana Tasks</h1>
      
      <ul>
        {/* Mapping directly on load */}
        {tasks.map((task) => (
          <li key={task.gid}>
            <div className="flex flex-row gap-2 p-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-300 mb-2">
              <strong>{task.name}</strong>
              {task.due_at && <p>Due at: {new Date(task.due_at).toLocaleString()}</p>}
              {task.due_on && <p>Due on: {new Date(task.due_on).toLocaleString()}</p>}
              {task.assignee_status && <p>Assignee Status: {task.assignee_status}</p>}
              {task.created_at && <p>Created at: {task.created_at}</p>}
              {task.modified_at && <p>Modified at: {task.modified_at}</p>}
              <DateAndTime asanaDueAtTime={new Date(task.due_at as string).toISOString()} />


            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}