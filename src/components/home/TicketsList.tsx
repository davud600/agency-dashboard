import { type Ticket } from "~/interfaces/ticket";
import { EditTicketBtn } from "./EditTicketComponents";
import SwitchPaymentStatusBtn from "./SwitchPaymentStatusBtn";

export interface TicketsListProps {
  filteredTickets: Ticket[];
}

export const TicketsList = ({ filteredTickets }: TicketsListProps) => {
  if (!!!filteredTickets) return <></>;

  return (
    <>
      {filteredTickets.map((ticket: Ticket) => (
        <tr
          key={ticket.bookingNum}
          className="border-b bg-white hover:bg-gray-50"
        >
          <th className="px-6 py-4">{ticket.bookingNum.toString()}</th>
          <td
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            {ticket.firstName} {ticket.lastName}
          </td>
          <td className="px-6 py-4">{ticket.phoneNumber}</td>
          <td className="px-6 py-4">{ticket.price}€</td>
          <td
            className="px-6 py-4"
            style={{
              color: ticket.paymentStatus === "Paid" ? "green" : " ",
              fontWeight: ticket.paymentStatus === "Paid" ? 500 : "normal",
            }}
          >
            {ticket.paymentStatus}
          </td>
          <td className="flex gap-8 px-6 py-4">
            <SwitchPaymentStatusBtn ticket={ticket} />
            <EditTicketBtn ticket={ticket} />
          </td>
        </tr>
      ))}
    </>
  );
};
