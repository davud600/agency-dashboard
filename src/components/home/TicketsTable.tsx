import { useTickets } from "~/context/TicketsContext";
import { TicketsList } from "./TicketsList";

const TicketsTable = () => {
  const { filteredTickets } = useTickets();

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Booking Number
          </th>
          <th scope="col" className="px-6 py-3">
            Full Name
          </th>
          <th scope="col" className="px-6 py-3">
            Phone Number
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <TicketsList filteredTickets={filteredTickets} />
      </tbody>
    </table>
  );
};

export default TicketsTable;
