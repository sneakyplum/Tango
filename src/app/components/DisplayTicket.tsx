import { createAsanaCustomTicket } from "../actions";

interface YourCustomTicketProps {
  customTicketId: string;
  gid: string;
  workspace: string;

}

const DisplayTicket = async ({ customTicketId, gid, workspace }: YourCustomTicketProps) => {

  const yourTicket: YourCustomTicketProps[] = await createAsanaCustomTicket({
    CustomTicketId: customTicketId,
    gid: gid,
    workspace: workspace
  })

  return (
    <div>
      DisplayTicket: {customTicketId}
      {yourTicket.map((ticket) => (
        <div key={ticket.gid}>
          <p>Custom Ticket ID: {ticket.customTicketId}</p>
        </div>
      ))}
    </div>
  )
}

export default DisplayTicket