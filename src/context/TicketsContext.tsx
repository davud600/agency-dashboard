import {
  useContext,
  createContext,
  type ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { Ticket } from "~/interfaces/ticket";

interface TicketsContextType {
  ticketsList: Ticket[];
  filteredTickets: Ticket[];
  setFilteredTicketsList: Dispatch<SetStateAction<Ticket[]>>;
}

export const TicketsContext = createContext<TicketsContextType>({
  ticketsList: [],
  filteredTickets: [],
  setFilteredTicketsList: () => false,
});

export const useTickets = () => {
  return useContext(TicketsContext);
};

const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const ticketsList: Ticket[] = [
    {
      bookingNum: 105,
      firstName: "filon",
      lastName: "fisteku",
      email: "filoni@example.com",
      phoneNumber: "049 419 902",
      paymentStatus: "Not Paid",
      price: 200,
    },
    {
      bookingNum: 63,
      firstName: "Drin",
      lastName: "Marevci",
      email: "drinmarevci@example.com",
      phoneNumber: "044 999 302",
      paymentStatus: "Paid",
      price: 374.99,
    },
    {
      bookingNum: 64,
      firstName: "Sinjorita",
      lastName: "Bllaca",
      email: "sinjokiss@example.com",
      phoneNumber: "045 520 013",
      paymentStatus: "Paid",
      price: 95.99,
    },
    {
      bookingNum: 65,
      firstName: "test",
      lastName: "testimi",
      email: "testim@example.com",
      phoneNumber: "045 520 013",
      paymentStatus: "Not Paid",
      price: 340.99,
    },
    {
      bookingNum: 66,
      firstName: "Arjani",
      lastName: "Idajve",
      email: "lopa@example.com",
      phoneNumber: "045 520 013",
      paymentStatus: "Not Paid",
      price: 3.2,
    },
  ];

  const [filteredTickets, setFilteredTicketsList] = useState<Ticket[]>([
    ...ticketsList,
  ]);

  const value = {
    ticketsList,
    filteredTickets,
    setFilteredTicketsList,
  };

  return (
    <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
  );
};

export default TicketsProvider;
