import { type Ticket } from "~/interfaces/ticket";
import { DeleteTicketBtn } from "./DeleteTicketComponents";
import { EditTicketBtn } from "./EditTicketComponents";
import { SwitchPaymentStatusBtn } from "./SwitchPaymentStatusComponents";
import { ShowAmadeusBtn } from "./ShowAmadeusComponents";

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
          <th className="p-2">{ticket.bookingNum.toString()}</th>
          <td
            scope="row"
            className="whitespace-nowrap p-2 font-medium text-gray-900"
          >
            {ticket.firstName} {ticket.lastName}
          </td>
          <td className="p-2">{ticket.phoneNumber}</td>
          <td className="p-2">{ticket.price}€</td>
          <td
            className="p-2"
            style={{
              color: ticket.paymentStatus === "Paid" ? "green" : " ",
              fontWeight: ticket.paymentStatus === "Paid" ? 500 : "normal",
            }}
          >
            {ticket.paymentStatus}{" "}
            {!!ticket.paymentMemo && (
              <span className="text-sm text-gray-800">
                ({ticket.paymentMemo})
              </span>
            )}
          </td>
          <td className="flex gap-2 p-2 md:gap-4">
            <SwitchPaymentStatusBtn ticket={ticket} />
            <EditTicketBtn ticket={ticket} />
            <ShowAmadeusBtn ticket={ticket} />
            <DeleteTicketBtn ticket={ticket} />
          </td>
        </tr>
      ))}
    </>
  );
};
