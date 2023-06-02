import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import { useTickets } from "~/context/TicketsContext";
import { type Ticket } from "~/interfaces/ticket";
import { useOutsideClickDetector } from "~/utils/outsideClick";

interface RecoverTicketPortalProps {
  closePortal: Dispatch<SetStateAction<undefined>>;
  ticket: Ticket;
}

const RecoverTicketPortal = ({
  closePortal,
  ticket,
}: RecoverTicketPortalProps) => {
  const { recoverTicket } = useTickets();

  const portalRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(portalRef, closePortal);

  const confirmRecoverBtnHandler = () => {
    recoverTicket(ticket);
    closePortal(undefined);
  };

  const cancelRecoverBtnHandler = () => {
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
          Are you sure you want to recover this Ticket? -{" "}
          {ticket.bookingNum.toString()}
        </h1>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-4">
        <button
          onClick={confirmRecoverBtnHandler}
          className="rounded-sm bg-green-600 px-12 py-3 text-lg text-white transition-all hover:bg-green-800"
        >
          Recover
        </button>
        <button
          onClick={cancelRecoverBtnHandler}
          className="rounded-sm bg-gray-600 px-12 py-3 text-lg text-white transition-all hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface RecoverTicketBtnProps {
  ticket: Ticket;
}

export const RecoverTicketBtn = ({ ticket }: RecoverTicketBtnProps) => {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  return (
    <>
      {portalOpen && (
        <RecoverTicketPortal
          closePortal={() => setPortalOpen(false)}
          ticket={{ ...ticket, bookingNum: Number(ticket.bookingNum) }}
        />
      )}

      <button
        onClick={() => setPortalOpen((prevPortalOpen) => !prevPortalOpen)}
        className="flex items-center justify-center font-medium text-blue-600 hover:underline"
      >
        <svg
          className="h-4 w-4 fill-lime-600 transition-all hover:fill-lime-700"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
        </svg>
      </button>
    </>
  );
};
