import { type NextPage } from "next";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";

// import { api } from "~/utils/api";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";

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
    bookingNum: 15,
    firstName: "filonii",
    lastName: "fistekuueuye",
    email: "filoni@example.com",
    phoneNumber: "049 109 502",
    paymentStatus: "Paid",
    price: 198.65,
  },
  {
    bookingNum: 62,
    firstName: "filonsoif",
    lastName: "papapa",
    email: "filonisdf@example.com",
    phoneNumber: "045 520 013",
    paymentStatus: "Not Paid",
    price: 374.99,
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
      <td className="px-6 py-4">{ticket.paymentStatus}</td>
      <td className="px-6 py-4">
        <a href="#" className="font-medium text-blue-600 hover:underline">
          Edit
        </a>
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

  return (
    <div>
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
        Payment Status
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
              onClick={(e: any) => setPaymentStatusFilter(null)}
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
              onClick={(e: any) => setPaymentStatusFilter("Paid")}
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
              onClick={(e: any) => setPaymentStatusFilter("Not Paid")}
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
        <title>Travel Agency</title>
        <meta name="description" content="Travel Agency" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
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

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
