import {
  useContext,
  createContext,
  type ReactNode,
  useState,
  type SetStateAction,
  type Dispatch,
  useEffect,
} from "react";
import { type DbTicket, type Ticket } from "~/interfaces/ticket";
import { api } from "~/utils/api";

interface TicketsContextType {
  ticketsList: Ticket[];
  filteredTickets: Ticket[];
  setFilteredTicketsList: Dispatch<SetStateAction<Ticket[]>>;
  createTicket: (ticketData: Ticket) => void;
  updateTicket: (ticketData: Ticket) => void;
  deleteTicket: (ticketData: Ticket) => void;
}

export const TicketsContext = createContext<TicketsContextType>({
  ticketsList: [],
  filteredTickets: [],
  setFilteredTicketsList: () => false,
  createTicket: () => false,
  updateTicket: () => false,
  deleteTicket: () => false,
});

export const useTickets = () => {
  return useContext(TicketsContext);
};

const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const [ticketsList, setTicketsList] = useState<DbTicket[]>([]);

  const [filteredTickets, setFilteredTicketsList] = useState<Ticket[]>(
    ticketsList as Ticket[]
  );

  console.log({ filteredTickets });

  const ticketsQueryData = api.tickets.getAll.useQuery();

  const ticketsCreateMutation = api.tickets.create.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      setFilteredTicketsList(ticketsList);
    },
  });

  const ticketsUpdateMutation = api.tickets.update.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
    },
  });

  const ticketsDeleteMutation = api.tickets.delete.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
    },
  });

  useEffect(() => {
    const tickets: unknown = ticketsQueryData.data;

    setTicketsList(tickets as DbTicket[]);
  }, [ticketsQueryData]);

  const createTicket = (ticketData: Ticket) => {
    ticketsCreateMutation.mutate(ticketData);
  };

  const updateTicket = (ticketData: Ticket) => {
    ticketsUpdateMutation.mutate(ticketData);
  };

  const deleteTicket = (ticketData: Ticket) => {
    ticketsDeleteMutation.mutate(ticketData);
  };

  const value = {
    ticketsList,
    filteredTickets,
    setFilteredTicketsList,
    createTicket,
    updateTicket,
    deleteTicket,
  };

  return (
    <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
  );
};

export default TicketsProvider;
