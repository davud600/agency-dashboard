import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { DbTicket, type Ticket } from "~/interfaces/ticket";
import { useTickets } from "./TicketsContext";

/**
 * Search Filter Context
 */
interface SearchFilterContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const SearchFilterContext = createContext<SearchFilterContextType>({
  searchQuery: "",
  setSearchQuery: () => false,
});

export const useSearchFilter = () => {
  return useContext(SearchFilterContext);
};

/**
 * Deleted Filter Context
 */
interface DeletedFilterContextType {
  isViewingDeletedTickets: boolean;
  setIsViewingDeletedTickets: Dispatch<SetStateAction<boolean>>;
}

export const DeletedFilterContext = createContext<DeletedFilterContextType>({
  isViewingDeletedTickets: false,
  setIsViewingDeletedTickets: () => false,
});

export const useDeletedFilter = () => {
  return useContext(DeletedFilterContext);
};

/**
 * Payment Status Filter Context
 */
interface PaymentStatusFilterContextType {
  paymentStatus: string;
  setPaymentStatus: Dispatch<SetStateAction<string>>;
}

export const PaymentStatusFilterContext =
  createContext<PaymentStatusFilterContextType>({
    paymentStatus: "",
    setPaymentStatus: () => false,
  });

export const usePaymentStatusFilter = () => {
  return useContext(PaymentStatusFilterContext);
};

/**
 * Context Provider
 */
const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const { ticketsList, setFilteredTicketsList } = useTickets();

  const [searchQuery, setSearchQuery] = useState("");
  const [isViewingDeletedTickets, setIsViewingDeletedTickets] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const getFilteredTicketsBySearch = (ticketsList: DbTicket[]) => {
    let filteredTicketsList = [...ticketsList];

    if (searchQuery) {
      filteredTicketsList = filteredTicketsList.filter(
        (item) =>
          item.firstName.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
            -1 ||
          item.lastName.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
            -1 ||
          `${item.firstName} ${item.lastName}`
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) !== -1 ||
          item.bookingNum.toString().indexOf(searchQuery) !== -1
      );
    }

    return filteredTicketsList;
  };

  const getFilteredByDeleteTickets = (ticketsList: DbTicket[]) => {
    let filteredTicketsList = [...ticketsList];

    filteredTicketsList = filteredTicketsList.filter(
      (item) => item.deleted === isViewingDeletedTickets
    );

    return filteredTicketsList;
  };

  const getFilteredTicketsByPaymentStatus = (ticketsList: DbTicket[]) => {
    let filteredTicketsList = [...ticketsList];

    if (paymentStatus) {
      filteredTicketsList = filteredTicketsList.filter(
        (item) => item.paymentStatus === paymentStatus
      );
    }

    return filteredTicketsList;
  };

  const filterTickets = (ticketsList: DbTicket[]) => {
    setFilteredTicketsList(
      getFilteredTicketsByPaymentStatus(
        getFilteredByDeleteTickets(getFilteredTicketsBySearch(ticketsList))
      )
    );
  };

  useEffect(() => {
    if (!!!ticketsList) return;

    filterTickets(ticketsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, paymentStatus, ticketsList, isViewingDeletedTickets]);

  const searchFilterContextValue = {
    searchQuery,
    setSearchQuery,
  };

  const deletedFilterContextValue = {
    isViewingDeletedTickets,
    setIsViewingDeletedTickets,
  };

  const paymentStatusFilterContextValue = {
    paymentStatus,
    setPaymentStatus,
  };

  return (
    <SearchFilterContext.Provider value={searchFilterContextValue}>
      <DeletedFilterContext.Provider value={deletedFilterContextValue}>
        <PaymentStatusFilterContext.Provider
          value={paymentStatusFilterContextValue}
        >
          {children}
        </PaymentStatusFilterContext.Provider>
      </DeletedFilterContext.Provider>
    </SearchFilterContext.Provider>
  );
};

export default FiltersProvider;
