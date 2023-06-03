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
  totalNumberOfTickets: number;
  filteredTickets: Ticket[];
  totalProfits: number;
  setFilteredTicketsList: Dispatch<SetStateAction<Ticket[]>>;
  createTicket: (ticketData: Ticket) => void;
  updateTicket: (ticketToUpdate: Ticket, ticketData: Ticket) => void;
  deleteTicket: (ticketToDelete: Ticket) => void;
  softDeleteTicket: (ticketToDelete: Ticket) => void;
  recoverTicket: (ticketToRecover: Ticket) => void;
  switchTicketPaymentStatus: (ticketToUpdate: Ticket) => void;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const TicketsContext = createContext<TicketsContextType>({
  ticketsList: [],
  totalNumberOfTickets: 0,
  filteredTickets: [],
  totalProfits: 0,
  setFilteredTicketsList: () => false,
  createTicket: () => false,
  updateTicket: () => false,
  deleteTicket: () => false,
  softDeleteTicket: () => false,
  recoverTicket: () => false,
  switchTicketPaymentStatus: () => false,
  limit: 20,
  setLimit: () => false,
  page: 0,
  setPage: () => false,
});

export const useTickets = () => {
  return useContext(TicketsContext);
};

const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(0);

  const [ticketsList, setTicketsList] = useState<DbTicket[]>([]);
  const [totalNumberOfTickets, setTotalNumberOfTickets] = useState<number>(0);
  const [totalProfits, setTotalProfits] = useState<number>(0);

  const [filteredTickets, setFilteredTicketsList] = useState<Ticket[]>(
    ticketsList as Ticket[]
  );

  const ticketsQueryData = api.tickets.getAllLimited.useQuery({ limit, page });
  const profitsQueryData = api.tickets.getTotalProfits.useQuery();
  const numberOfTicketsQueryData =
    api.tickets.getTotalNumberOfTickets.useQuery();

  const ticketsCreateMutation = api.tickets.create.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();
      setFilteredTicketsList(ticketsList);
    },
  });

  const ticketsUpdateMutation = api.tickets.update.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();
    },
  });

  const ticketsDeleteMutation = api.tickets.delete.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();
    },
  });

  const ticketsSoftDeleteMutation = api.tickets.softDelete.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();
    },
  });

  const ticketsRecoverMutation = api.tickets.recover.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();
    },
  });

  useEffect(() => {
    const tickets: unknown = ticketsQueryData.data;

    if (!!!tickets) return;

    setTicketsList(tickets as DbTicket[]);
  }, [ticketsQueryData]);

  useEffect(() => {
    const totalProfits: unknown = profitsQueryData.data;

    if (!!!totalProfits) return;

    setTotalProfits(parseFloat((totalProfits as number).toFixed(2)));
  }, [profitsQueryData]);

  useEffect(() => {
    const totalNumberOfTickets: unknown = numberOfTicketsQueryData.data;

    if (!!!totalNumberOfTickets) return;

    setTotalNumberOfTickets(totalNumberOfTickets as number);
  }, [numberOfTicketsQueryData]);

  const createTicket = (ticketData: Ticket) => {
    ticketsCreateMutation.mutate(ticketData);
  };

  const updateTicket = (ticketToUpdate: Ticket, ticketData: Ticket) => {
    ticketsUpdateMutation.mutate({ ticketToUpdate, ticketData });
  };

  const deleteTicket = (ticketToDelete: Ticket) => {
    ticketsDeleteMutation.mutate({ ticketToDelete });
  };

  const softDeleteTicket = (ticketToDelete: Ticket) => {
    ticketsSoftDeleteMutation.mutate({ ticketToDelete });
  };

  const recoverTicket = (ticketToRecover: Ticket) => {
    ticketsRecoverMutation.mutate({ ticketToRecover });
  };

  const switchTicketPaymentStatus = (ticketToUpdate: Ticket) => {
    ticketsUpdateMutation.mutate({
      ticketToUpdate,
      ticketData: {
        ...ticketToUpdate,
        paymentStatus:
          ticketToUpdate.paymentStatus === "Not Paid" ? "Paid" : "Not Paid",
      },
    });
  };

  const value = {
    ticketsList,
    totalNumberOfTickets,
    filteredTickets,
    totalProfits,
    setFilteredTicketsList,
    createTicket,
    updateTicket,
    switchTicketPaymentStatus,
    deleteTicket,
    softDeleteTicket,
    recoverTicket,
    limit,
    setLimit,
    page,
    setPage,
  };

  return (
    <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>
  );
};

export default TicketsProvider;
