"use client";
import { useState } from 'react';
import { createAsanaCustomTicket } from '../actions';

interface CustomTicketIdProps {
  gid: string;
  workspace: string;
  customTicketId: string;
}

const CustomTicketId = ({ gid, workspace, customTicketId }: CustomTicketIdProps) => {

  const [ticketAmount, setTicketAmount] = useState(customTicketId || '');
  

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        createAsanaCustomTicket({ gid, workspace, CustomTicketId: ticketAmount, });
      }}>
        <div className='flex flex-row h-10 w-full'>
          <button  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 w-full" type="submit">
            Create Custom Ticket
          </button>
          <input type="text" placeholder="Enter Custom Ticket ID" className="border p-2 rounded"  value={ticketAmount} onChange={(e) => {setTicketAmount(e.target.value)}}/>

        </div>
        <p className="text-m text-gray-500 mt-1">Current Custom Ticket ID: <strong className='text-black'>{customTicketId}</strong></p>
      </form>

    </div>
  )
}

export default CustomTicketId