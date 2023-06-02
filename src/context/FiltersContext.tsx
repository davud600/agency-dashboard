import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { type Ticket } from "~/interfaces/ticket";
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
  // const { isViewingDeletedTickets, setIsViewingDeletedTickets } =
  //   useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const getFilteredTicketsBySearch = (ticketsList: Ticket[]) => {
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

  const getFilteredTicketsByPaymentStatus = (ticketsList: Ticket[]) => {
    let filteredTicketsList = [...ticketsList];

    if (paymentStatus) {
      filteredTicketsList = filteredTicketsList.filter(
        (item) => item.paymentStatus === paymentStatus
      );
    }

    return filteredTicketsList;
  };

  const filterTickets = (ticketsList: Ticket[]) => {
    setFilteredTicketsList(
      getFilteredTicketsByPaymentStatus(getFilteredTicketsBySearch(ticketsList))
    );
  };

  useEffect(() => {
    if (!!!ticketsList) return;

    filterTickets(ticketsList);
  }, [searchQuery, paymentStatus, ticketsList]);

  const searchFilterContextValue = {
    searchQuery,
    setSearchQuery,
  };

  const paymentStatusFilterContextValue = {
    paymentStatus,
    setPaymentStatus,
  };

  return (
    <SearchFilterContext.Provider value={searchFilterContextValue}>
      <PaymentStatusFilterContext.Provider
        value={paymentStatusFilterContextValue}
      >
        {children}
      </PaymentStatusFilterContext.Provider>
    </SearchFilterContext.Provider>
  );
};

export default FiltersProvider;
