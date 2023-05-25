import { type NextPage } from "next";
import Head from "next/head";
import { useOutsideClickDetector } from "~/utils/outsideClick";
// import { signIn, signOut, useSession } from "next-auth/react";

// import { api } from "~/utils/api";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

type TicketPaymentStatus = "Not Paid" | "Paid";

interface Ticket {
  bookingNum: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  paymentStatus: TicketPaymentStatus;
  price: number;
}

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

interface TicketsListProps {
  filteredTicketsList: any[];
}

const TicketsList: any = ({ filteredTicketsList }: TicketsListProps) => {
  return filteredTicketsList.map((ticket: any) => (
    <tr key={ticket.bookingNum} className="border-b bg-white hover:bg-gray-50">
      <th className="px-6 py-4">{ticket.bookingNum}</th>
      <td
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        {ticket.firstName} {ticket.lastName}
      </td>
      <td className="px-6 py-4">{ticket.email}</td>
      <td className="px-6 py-4">{ticket.phoneNumber}</td>
      <td className="px-6 py-4">{ticket.price}€</td>
      <td
        className="px-6 py-4"
        style={{
          color: ticket.paymentStatus === "Paid" ? "green" : " ",
          fontWeight: ticket.paymentStatus === "Paid" ? 500 : "normal",
        }}
      >
        {ticket.paymentStatus}
      </td>
      <td className="flex gap-8 px-6 py-4">
        <a
          href="#"
          className="flex items-center justify-center font-medium text-blue-600 hover:underline"
        >
          <svg
            className="h-8 w-8 fill-green-600 transition-all hover:fill-green-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" />
          </svg>
        </a>
        <a
          data-tooltip-target="tooltip-edit"
          data-tooltip-style="light"
          href="#"
          className="flex items-center justify-center font-medium text-blue-600 hover:underline"
        >
          <svg
            className="h-6 w-6 fill-blue-600 transition-all hover:fill-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
          </svg>
        </a>
        <div
          id="tooltip-edit"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 opacity-0 shadow-sm"
        >
          Tooltip content
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </td>
    </tr>
  ));
};

interface PaymentStatusDropdownProps {
  setPaymentStatusFilter: Function;
}

const PaymentStatusDropdown: any = ({
  setPaymentStatusFilter,
}: PaymentStatusDropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef: RefObject<HTMLDivElement> | null = useRef(null);

  useOutsideClickDetector(dropdownRef, () => setDropdownOpen(false));

  return (
    <div ref={dropdownRef}>
      <button
        id="paymentStatusDropdownBtn"
        onClick={() => setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen)}
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
      >
        <svg
          className="mr-2 h-4 w-4 text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          ></path>
        </svg>
          Find
        <svg
          className="ml-2 h-3 w-3"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className="min-h-96 absolute z-10 w-48 divide-y divide-gray-100 rounded-lg bg-white shadow"
        style={{
          display: dropdownOpen ? "block" : "none",
        }}
      >
        <ul
          className="space-y-1 p-3 text-sm text-gray-700"
          aria-labelledby="paymentStatusDropdownBtn"
        >
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={(e: any) => {
                setPaymentStatusFilter(null);
                setDropdownOpen(false);
              }}
            >
              <input
                id="filter-payment-status-0"
                defaultChecked={true}
                type="radio"
                value="Paid"
                name="filter-payment-status"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="filter-payment-status-0"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                All
              </label>
            </div>
          </li>
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={(e: any) => {
                setPaymentStatusFilter("Paid");
                setDropdownOpen(false);
              }}
            >
              <input
                id="filter-payment-status-1"
                defaultChecked={false}
                type="radio"
                value="Paid"
                name="filter-payment-status"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="filter-payment-status-1"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                Paid
              </label>
            </div>
          </li>
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={(e: any) => {
                setPaymentStatusFilter("Not Paid");
                setDropdownOpen(false);
              }}
            >
              <input
                id="filter-payment-status-2"
                defaultChecked={false}
                type="radio"
                value="Not Paid"
                name="filter-payment-status"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="filter-payment-status-2"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                Not Paid
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const data = api.tickets.getAll.useQuery();

  console.log({ data });

  const [filteredTicketsList, setFilteredTicketsList] = useState(ticketsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  const filterTicketsBySearch = (searchQuery: string) => {
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

    setFilteredTicketsList(filteredTicketsList);
  };

  const filterTicketsByPaymentStatus = (paymentStatusFilter: string) => {
    let filteredTicketsList = [...ticketsList];

    if (paymentStatusFilter) {
      filteredTicketsList = filteredTicketsList.filter(
        (item) => item.paymentStatus === paymentStatusFilter
      );
    }

    setFilteredTicketsList(filteredTicketsList);
  };

  useEffect(() => {
    filterTicketsBySearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    filterTicketsByPaymentStatus(paymentStatusFilter);
  }, [paymentStatusFilter]);

  return (
    <>
      <Head>
        <title>Agency Dashboard</title>
        <meta name="description" content="Agency dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-[#6200EE]">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          {/* Filters Container */}
          <div className="flex items-center justify-between pb-4">
            {/* Payment Status Filter */}
            <PaymentStatusDropdown
              setPaymentStatusFilter={setPaymentStatusFilter}
            />

            {/* Search Filter */}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search for items"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>
          </div>

          {/* Tickets Table */}
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
                  E-Mail
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
              <TicketsList filteredTicketsList={filteredTicketsList} />
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Home;
