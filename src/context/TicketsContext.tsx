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
  ticketsList: DbTicket[];
  totalNumberOfTickets: number;
  filteredTickets: DbTicket[];
  totalProfits: number;
  setFilteredTicketsList: Dispatch<SetStateAction<DbTicket[]>>;
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

  const [filteredTickets, setFilteredTicketsList] =
    useState<DbTicket[]>(ticketsList);

  const ticketsQueryData = api.tickets.getAllLimited.useQuery({ limit, page });
  const profitsQueryData = api.tickets.getTotalProfits.useQuery();
  const numberOfTicketsQueryData =
    api.tickets.getTotalNumberOfTickets.useQuery();

  const ticketsCreateMutation = api.tickets.create.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();
      // setFilteredTicketsList(ticketsList);

      if (!!document) {
        const successDialog = document.createElement("div");
        successDialog.style.position = "absolute";
        successDialog.style.top = "5%";
        successDialog.style.left = "40%";
        successDialog.style.padding = "15px";
        successDialog.style.backgroundColor = "green";
        successDialog.style.border = "2px solid black";
        successDialog.style.borderRadius = "15px";
        successDialog.innerHTML = `<span style='color: white; font-size: 15px;'>Ticket added successfully!</span>`;
        document.body.appendChild(successDialog);

        setTimeout(() => {
          successDialog.remove();
        }, 2500);
      }
    },

    onError: async () => {
      if (!!document) {
        const errorDialog = document.createElement("div");
        errorDialog.style.position = "absolute";
        errorDialog.style.top = "5%";
        errorDialog.style.left = "40%";
        errorDialog.style.padding = "15px";
        errorDialog.style.backgroundColor = "red";
        errorDialog.style.border = "2px solid black";
        errorDialog.style.borderRadius = "15px";
        errorDialog.innerHTML = `<span style='color: white; font-size: 15px;'>There was an error while adding the ticket!</span>`;
        document.body.appendChild(errorDialog);

        setTimeout(() => {
          errorDialog.remove();
        }, 2500);
      }
    },
  });

  const ticketsUpdateMutation = api.tickets.update.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();

      if (!!document) {
        const successDialog = document.createElement("div");
        successDialog.style.position = "absolute";
        successDialog.style.top = "5%";
        successDialog.style.left = "40%";
        successDialog.style.padding = "15px";
        successDialog.style.backgroundColor = "green";
        successDialog.style.border = "2px solid black";
        successDialog.style.borderRadius = "15px";
        successDialog.innerHTML = `<span style='color: white; font-size: 15px;'>Ticket updated successfully!</span>`;
        document.body.appendChild(successDialog);

        setTimeout(() => {
          successDialog.remove();
        }, 2500);
      }
    },

    onError: async () => {
      if (!!document) {
        const errorDialog = document.createElement("div");
        errorDialog.style.position = "absolute";
        errorDialog.style.top = "5%";
        errorDialog.style.left = "40%";
        errorDialog.style.padding = "15px";
        errorDialog.style.backgroundColor = "red";
        errorDialog.style.border = "2px solid black";
        errorDialog.style.borderRadius = "15px";
        errorDialog.innerHTML = `<span style='color: white; font-size: 15px;'>There was an error while updating the ticket!</span>`;
        document.body.appendChild(errorDialog);

        setTimeout(() => {
          errorDialog.remove();
        }, 2500);
      }
    },
  });

  const ticketsDeleteMutation = api.tickets.delete.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();

      if (!!document) {
        const successDialog = document.createElement("div");
        successDialog.style.position = "absolute";
        successDialog.style.top = "5%";
        successDialog.style.left = "40%";
        successDialog.style.padding = "15px";
        successDialog.style.backgroundColor = "green";
        successDialog.style.border = "2px solid black";
        successDialog.style.borderRadius = "15px";
        successDialog.innerHTML = `<span style='color: white; font-size: 15px;'>Ticket deleted successfully!</span>`;
        document.body.appendChild(successDialog);

        setTimeout(() => {
          successDialog.remove();
        }, 2500);
      }
    },

    onError: async () => {
      if (!!document) {
        const errorDialog = document.createElement("div");
        errorDialog.style.position = "absolute";
        errorDialog.style.top = "5%";
        errorDialog.style.left = "40%";
        errorDialog.style.padding = "15px";
        errorDialog.style.backgroundColor = "red";
        errorDialog.style.border = "2px solid black";
        errorDialog.style.borderRadius = "15px";
        errorDialog.innerHTML = `<span style='color: white; font-size: 15px;'>There was an error while deleting the ticket!</span>`;
        document.body.appendChild(errorDialog);

        setTimeout(() => {
          errorDialog.remove();
        }, 2500);
      }
    },
  });

  const ticketsSoftDeleteMutation = api.tickets.softDelete.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();

      if (!!document) {
        const successDialog = document.createElement("div");
        successDialog.style.position = "absolute";
        successDialog.style.top = "5%";
        successDialog.style.left = "40%";
        successDialog.style.padding = "15px";
        successDialog.style.backgroundColor = "green";
        successDialog.style.border = "2px solid black";
        successDialog.style.borderRadius = "15px";
        successDialog.innerHTML = `<span style='color: white; font-size: 15px;'>Ticket deleted successfully!</span>`;
        document.body.appendChild(successDialog);

        setTimeout(() => {
          successDialog.remove();
        }, 2500);
      }
    },

    onError: async () => {
      if (!!document) {
        const errorDialog = document.createElement("div");
        errorDialog.style.position = "absolute";
        errorDialog.style.top = "5%";
        errorDialog.style.left = "40%";
        errorDialog.style.padding = "15px";
        errorDialog.style.backgroundColor = "red";
        errorDialog.style.border = "2px solid black";
        errorDialog.style.borderRadius = "15px";
        errorDialog.innerHTML = `<span style='color: white; font-size: 15px;'>There was an error while deleting the ticket!</span>`;
        document.body.appendChild(errorDialog);

        setTimeout(() => {
          errorDialog.remove();
        }, 2500);
      }
    },
  });

  const ticketsRecoverMutation = api.tickets.recover.useMutation({
    onSuccess: async () => {
      await ticketsQueryData.refetch();
      await profitsQueryData.refetch();
      await numberOfTicketsQueryData.refetch();

      if (!!document) {
        const successDialog = document.createElement("div");
        successDialog.style.position = "absolute";
        successDialog.style.top = "5%";
        successDialog.style.left = "40%";
        successDialog.style.padding = "15px";
        successDialog.style.backgroundColor = "green";
        successDialog.style.border = "2px solid black";
        successDialog.style.borderRadius = "15px";
        successDialog.innerHTML = `<span style='color: white; font-size: 15px;'>Ticket recovered successfully!</span>`;
        document.body.appendChild(successDialog);

        setTimeout(() => {
          successDialog.remove();
        }, 2500);
      }
    },

    onError: async () => {
      if (!!document) {
        const errorDialog = document.createElement("div");
        errorDialog.style.position = "absolute";
        errorDialog.style.top = "5%";
        errorDialog.style.left = "40%";
        errorDialog.style.padding = "15px";
        errorDialog.style.backgroundColor = "red";
        errorDialog.style.border = "2px solid black";
        errorDialog.style.borderRadius = "15px";
        errorDialog.innerHTML = `<span style='color: white; font-size: 15px;'>There was an error while recovering the ticket!</span>`;
        document.body.appendChild(errorDialog);

        setTimeout(() => {
          errorDialog.remove();
        }, 2500);
      }
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
    ticketsUpdateMutation.mutate({
      ticketToUpdateBookingNum: ticketToUpdate.bookingNum,
      ticketData,
    });
  };

  const deleteTicket = (ticketToDelete: Ticket) => {
    ticketsDeleteMutation.mutate({
      ticketToDeleteBookingNum: ticketToDelete.bookingNum,
    });
  };

  const softDeleteTicket = (ticketToDelete: Ticket) => {
    ticketsSoftDeleteMutation.mutate({
      ticketToDeleteBookingNum: ticketToDelete.bookingNum,
    });
  };

  const recoverTicket = (ticketToRecover: Ticket) => {
    ticketsRecoverMutation.mutate({
      ticketToRecoverBookingNum: ticketToRecover.bookingNum,
    });
  };

  const switchTicketPaymentStatus = (ticketToUpdate: Ticket) => {
    ticketsUpdateMutation.mutate({
      ticketToUpdateBookingNum: ticketToUpdate.bookingNum,
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
