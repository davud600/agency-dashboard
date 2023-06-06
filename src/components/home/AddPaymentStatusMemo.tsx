import {
  type Dispatch,
  type SetStateAction,
  useRef,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useTickets } from "~/context/TicketsContext";
import { type Ticket } from "~/interfaces/ticket";
import { useOutsideClickDetector } from "~/utils/outsideClick";

interface AddPaymentStatusMemoPortalProps {
  closePortal: Dispatch<SetStateAction<undefined>>;
  ticket: Ticket;
}

const AddPaymentStatusMemoPortal = ({
  closePortal,
  ticket,
}: AddPaymentStatusMemoPortalProps) => {
  const { updateTicket } = useTickets();

  const [paymentMemo, setPaymentMemo] = useState<string>("");

  const portalRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(portalRef, closePortal);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    updateTicket(
      {
        ...ticket,
        bookingNum: Number(ticket.bookingNum),
      },
      {
        ...ticket,
        bookingNum: Number(ticket.bookingNum),
        paymentMemo,
      }
    );
    closePortal(undefined);
  };

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
        <h1 className="text-lg font-medium text-gray-500">
          Are you sure you want to switch payment status of Ticket? -{" "}
          {ticket.bookingNum.toString()}
        </h1>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex h-full w-full flex-col justify-between"
      >
        <div className="w-full">
          <div className="mb-3 flex w-full justify-start gap-2">
            <div className="w-full">
              <label
                htmlFor="paymentMemo"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Payment Memo
              </label>
              <input
                type="text"
                id="paymentMemo"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                value={paymentMemo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPaymentMemo(e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Add Payment Status Memo
        </button>
      </form>
    </div>
  );
};

interface AddPaymentStatusMemoBtnProps {
  ticket: Ticket;
}

export const AddPaymentStatusMemoBtn = ({
  ticket,
}: AddPaymentStatusMemoBtnProps) => {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  return (
    <>
      {portalOpen && (
        <AddPaymentStatusMemoPortal
          closePortal={() => setPortalOpen(false)}
          ticket={ticket}
        />
      )}

      <button
        onClick={() => setPortalOpen((prevPortalOpen) => !prevPortalOpen)}
        className="flex items-center justify-center font-medium text-blue-600 hover:underline"
      >
        <svg
          className="h-7 w-7 fill-yellow-600 transition-all hover:fill-yellow-700"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM224 160c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H288v48c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V272H176c-8.8 0-16-7.2-16-16V224c0-8.8 7.2-16 16-16h48V160z" />
        </svg>
      </button>
    </>
  );
};
