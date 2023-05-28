import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { useOutsideClickDetector } from "~/utils/outsideClick";

interface AddTicketPortalProps {
  closePortal: Dispatch<SetStateAction<undefined>>;
}

const AddTicketPortal = ({ closePortal }: AddTicketPortalProps) => {
  const portalRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(portalRef, closePortal);

  return (
    <div
      ref={portalRef}
      className="absolute left-1/2 top-1/2 z-20 -ml-[21rem] -mt-[18rem] flex h-[36rem] w-[42rem] flex-col rounded-lg border border-gray-300 bg-white p-3 shadow-[0_0_0_1000px_rgba(0,0,0,.3)]"
    >
      <div className="flex h-fit w-full justify-start">
        <button
          onClick={() => closePortal(undefined)}
          className="flex items-center justify-center rounded-lg border border-white bg-white p-2 text-lg text-gray-500 transition-all hover:border-gray-200 hover:bg-gray-100"
        >
          <svg
            className="h-4 w-4 fill-neutral-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
      </div>
      <div className="pointer-events-none -mt-6 mb-6 flex w-full items-center justify-center">
        <h1 className="text-lg font-medium text-gray-500">Add Ticket</h1>
      </div>
      <form className="flex h-full w-full flex-col justify-between">
        <div className="w-full">
          <div className="mb-3 flex w-full justify-start gap-2">
            <div className="w-1/3">
              <label
                htmlFor="bookingNum"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Ticket Booking Number
              </label>
              <input
                type="number"
                id="bookingNum"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                placeholder="12345678"
                required
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="paymentStatus"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Select Payment Status
              </label>
              <select
                id="paymentStatus"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500"
              >
                <option className="text-gray-600" value="Not Paid">
                  Payment Status
                </option>
                <option className="text-gray-600" value="Not Paid">
                  Not Paid
                </option>
                <option className="text-gray-600" value="Paid">
                  Paid
                </option>
              </select>
            </div>
          </div>
          <div className="mb-3 flex w-full justify-center gap-2">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Client First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Filan"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Client Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Fisteku"
              />
            </div>
          </div>
          <div className="mb-3 flex w-full justify-center gap-2">
            <div className="w-2/3">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Client Email
              </label>
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Client Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="049 665 876"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="amadeusCode"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Amadeus Code
            </label>
            <textarea
              id="amadeusCode"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label
              className="mb-2 block text-sm font-medium text-gray-600"
              htmlFor="pdfFile"
            >
              Upload pdf
            </label>
            <input
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
              id="pdfFile"
              type="file"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export const AddTicketBtn = () => {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  return (
    <>
      {portalOpen && (
        <AddTicketPortal closePortal={() => setPortalOpen(false)} />
      )}
      <button
        onClick={() => setPortalOpen((prevPortalOpen) => !prevPortalOpen)}
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 transition-all hover:border-green-600 hover:bg-green-600 hover:text-white"
      >
        Add Ticket +
      </button>
    </>
  );
};
