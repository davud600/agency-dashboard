import { type ChangeEvent, useRef, useState } from "react";
import {
  usePaymentStatusFilter,
  useSearchFilter,
} from "~/context/FiltersContext";
import { useOutsideClickDetector } from "~/utils/outsideClick";

const PaymentStatusDropdown = () => {
  const { setPaymentStatus } = usePaymentStatusFilter();

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
              onClick={() => {
                setPaymentStatus("");
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
              onClick={() => {
                setPaymentStatus("Paid");
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
              onClick={() => {
                setPaymentStatus("Not Paid");
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

const Filters = () => {
  return (
    <div className="flex items-center justify-between pb-4">
      {/* Payment Status Filter */}
      <PaymentStatusDropdown />

      {/* Search Filter */}
      <SearchFilter />
    </div>
  );
};

export default Filters;
