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

interface SwitchTicketPaymentStatusPortalProps {
  closePortal: Dispatch<SetStateAction<undefined>>;
  ticket: Ticket;
}

const SwitchTicketPaymentStatusPortal = ({
  closePortal,
  ticket,
}: SwitchTicketPaymentStatusPortalProps) => {
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
        paymentStatus: ticket.paymentStatus === "Paid" ? "Not Paid" : "Paid",
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
          Update Payment Status of Ticket - {ticket.bookingNum.toString()}
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
          Switch Ticket Payment Status to{" "}
          {ticket.paymentStatus === "Paid" ? "Not Paid" : "Paid"}
        </button>
      </form>
    </div>
  );
};

interface SwitchPaymentStatusBtnProps {
  ticket: Ticket;
}

export const SwitchPaymentStatusBtn = ({
  ticket,
}: SwitchPaymentStatusBtnProps) => {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  const svgClassList =
    ticket.paymentStatus === "Paid"
      ? "h-8 w-8 fill-green-600 transition-all hover:fill-green-700"
      : "h-8 w-8 fill-gray-600 transition-all hover:fill-gray-700";

  return (
    <>
      {portalOpen && (
        <SwitchTicketPaymentStatusPortal
          closePortal={() => setPortalOpen(false)}
          ticket={ticket}
        />
      )}

      <button
        onClick={() => setPortalOpen((prevPortalOpen) => !prevPortalOpen)}
        className="flex items-center justify-center font-medium text-blue-600 hover:underline"
      >
        <svg
          className={svgClassList}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" />
        </svg>
      </button>
    </>
  );
};
