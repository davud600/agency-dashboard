import { useTickets } from "~/context/TicketsContext";
import { TicketsList } from "./TicketsList";

const TicketsTable = () => {
  const { filteredTickets } = useTickets();

  return (
    <table className="w-full bg-white text-left text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="p-2">
            Booking Number
          </th>
          <th scope="col" className="p-2">
            Full Name
          </th>
          <th scope="col" className="p-2">
            Phone Number
          </th>
          <th scope="col" className="p-2">
            Price
          </th>
          <th scope="col" className="p-2">
            Profit
          </th>
          <th scope="col" className="p-2">
            Payment Status
          </th>
          <th scope="col" className="p-2">
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
