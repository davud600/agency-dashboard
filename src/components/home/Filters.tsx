import { type ChangeEvent, useRef, useState } from "react";
import {
  useDeletedFilter,
  usePaymentStatusFilter,
  useSearchFilter,
} from "~/context/FiltersContext";
import { useOutsideClickDetector } from "~/utils/outsideClick";
import { AddTicketBtn } from "./AddTicketComponents";
import { useTickets } from "~/context/TicketsContext";
import { DeleteAllTicketsBtn } from "./DeleteAllTicketsBtn";

const PaymentStatusDropdown = () => {
  const { paymentStatus, setPaymentStatus } = usePaymentStatusFilter();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 576 512"
        >
          <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
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
              onClick={() => {
                setPaymentStatus("");
                setDropdownOpen(false);
              }}
            >
              <input
                id="filter-payment-status-0"
                defaultChecked={paymentStatus === ""}
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
              onClick={() => {
                setPaymentStatus("Paid");
                setDropdownOpen(false);
              }}
            >
              <input
                id="filter-payment-status-1"
                defaultChecked={paymentStatus === "Paid"}
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
              onClick={() => {
                setPaymentStatus("Not Paid");
                setDropdownOpen(false);
              }}
            >
              <input
                id="filter-payment-status-2"
                defaultChecked={paymentStatus === "Not Paid"}
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

const SearchFilter = () => {
  const { searchQuery, setSearchQuery } = useSearchFilter();

  return (
    <>
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
    </>
  );
};

const LimitTicketsDropdown = () => {
  const { limit, setLimit, totalNumberOfTickets } = useTickets();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(dropdownRef, () => setDropdownOpen(false));

  return (
    <div ref={dropdownRef}>
      <button
        id="limitTicketsDropdownBtn"
        onClick={() => setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen)}
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
      >
        <svg
          className="mr-2 h-3 w-3 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
        </svg>
        Limit
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
          aria-labelledby="limitTicketsDropdownBtn"
        >
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={() => {
                setLimit(20);
                setDropdownOpen(false);
              }}
            >
              <input
                id="limit-tickets-0"
                defaultChecked={limit === 20}
                type="radio"
                value="Paid"
                name="limit-tickets"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="limit-tickets-0"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                20
              </label>
            </div>
          </li>
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={() => {
                setLimit(40);
                setDropdownOpen(false);
              }}
            >
              <input
                id="limit-tickets-1"
                defaultChecked={limit === 40}
                type="radio"
                value="Paid"
                name="limit-tickets"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="limit-tickets-1"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                40
              </label>
            </div>
          </li>
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={() => {
                setLimit(75);
                setDropdownOpen(false);
              }}
            >
              <input
                id="limit-tickets-2"
                defaultChecked={limit === 75}
                type="radio"
                value="Paid"
                name="limit-tickets"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="limit-tickets-2"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                75
              </label>
            </div>
          </li>
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={() => {
                setLimit(200);
                setDropdownOpen(false);
              }}
            >
              <input
                id="limit-tickets-3"
                defaultChecked={limit === 200}
                type="radio"
                value="Paid"
                name="limit-tickets"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="limit-tickets-3"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                200
              </label>
            </div>
          </li>
          <li>
            <div
              className="flex items-center rounded p-2 hover:bg-gray-100"
              onClick={() => {
                setLimit(totalNumberOfTickets);
                setDropdownOpen(false);
              }}
            >
              <input
                id="limit-tickets-4"
                defaultChecked={limit === totalNumberOfTickets}
                type="radio"
                value="Paid"
                name="limit-tickets"
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="limit-tickets-4"
                className="ml-2 w-full rounded text-sm font-medium text-gray-900"
              >
                All
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Filters = () => {
  const { isViewingDeletedTickets, setIsViewingDeletedTickets } =
    useDeletedFilter();

  return (
    <div className="flex items-center justify-between gap-1 pb-4">
      <div className="flex items-center justify-start gap-1">
        {/* Payment Status Filter */}
        <PaymentStatusDropdown />

        {/* Not technicially a filter in this project's context because it's state is defined in TicketsContext */}
        <LimitTicketsDropdown />

        {/* View Deleted Tickets */}
        {isViewingDeletedTickets ? (
          <button
            onClick={() => setIsViewingDeletedTickets(false)}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            View NOT Deleted Tickets
          </button>
        ) : (
          <button
            onClick={() => setIsViewingDeletedTickets(true)}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            View Deleted Tickets
          </button>
        )}
      </div>

      <div className="flex justify-end gap-1">
        {/* Search Filter */}
        <SearchFilter />

        {/* Add new Ticket button */}
        <AddTicketBtn />

        {/* Delete all tickets button */}
        {isViewingDeletedTickets && <DeleteAllTicketsBtn />}
      </div>
    </div>
  );
};

export default Filters;
