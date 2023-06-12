import { type DbTicket } from "~/interfaces/ticket";
import { DeleteTicketBtn } from "./DeleteTicketComponents";
import { EditTicketBtn } from "./EditTicketComponents";
import { SwitchPaymentStatusBtn } from "./SwitchPaymentStatusComponents";
import { ShowAmadeusBtn } from "./ShowAmadeusComponents";
import { RecoverTicketBtn } from "./RecoverTicketComponents";
import { ShowPdfFileBtn } from "./ShowPdfFileBtn";
import { AddPaymentStatusMemoBtn } from "./AddPaymentStatusMemo";

export interface TicketsListProps {
  filteredTickets: DbTicket[];
}

export const TicketsList = ({ filteredTickets }: TicketsListProps) => {
  if (!!!filteredTickets) return <></>;

  return (
    <>
      {filteredTickets.map((ticket: DbTicket) => (
        <tr
          key={ticket.bookingNum}
          className="border-b bg-white hover:bg-gray-50"
        >
          <th className="p-2">{ticket.bookingNum}</th>
          <td
            scope="row"
            className="whitespace-nowrap p-2 font-medium text-gray-900"
          >
            {ticket.firstName} {ticket.lastName}
          </td>
          <td className="p-2">{ticket.phoneNumber}</td>
          <td className="p-2">{ticket.price}€</td>
          <td className="p-2">{ticket.profitPrice}€</td>
          <td
            className="p-2"
            style={{
              color: ticket.paymentStatus === "Paid" ? "green" : " ",
              fontWeight: ticket.paymentStatus === "Paid" ? 500 : "normal",
            }}
          >
            {ticket.paymentStatus}
          </td>
          <td className="p-2 text-sm text-gray-800">{ticket.paymentMemo}</td>
          <td className="p-2 text-sm text-gray-800">
            {ticket.createdAt.toLocaleString("en-GB")}
          </td>
          <td className="p-2 text-sm text-gray-800">
            {ticket.updatedAt?.toLocaleString("en-GB")}
          </td>
          <td className="flex gap-2 p-2 md:gap-4">
            <SwitchPaymentStatusBtn ticket={ticket} />
            <AddPaymentStatusMemoBtn ticket={ticket} />
            <EditTicketBtn ticket={ticket} />
            <ShowAmadeusBtn ticket={ticket} />
            <ShowPdfFileBtn ticket={ticket} />
            <DeleteTicketBtn ticket={ticket} />
            {ticket.deleted && <RecoverTicketBtn ticket={ticket} />}
          </td>
        </tr>
      ))}
    </>
  );
};
