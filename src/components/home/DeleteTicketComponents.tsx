import {
  type Dispatch,
  type SetStateAction,
  useRef,
  type FormEvent,
  useState,
} from "react";
import { useTickets } from "~/context/TicketsContext";
import { type Ticket } from "~/interfaces/ticket";
import { useOutsideClickDetector } from "~/utils/outsideClick";

interface DeleteTicketPortalProps {
  closePortal: Dispatch<SetStateAction<undefined>>;
  ticket: Ticket;
}

const DeleteTicketPortal = ({
  closePortal,
  ticket,
}: DeleteTicketPortalProps) => {
  const { deleteTicket } = useTickets();

  const portalRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(portalRef, closePortal);

  const confirmDeleteBtnHandler = () => {
    deleteTicket(ticket);
    closePortal(undefined);
  };

  const cancelDeleteBtnHandler = () => {
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
          Are you sure you want to delete this Ticket? -{" "}
          {ticket.bookingNum.toString()}
        </h1>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-4">
        <button
          onClick={confirmDeleteBtnHandler}
          className="rounded-sm bg-red-600 px-12 py-3 text-lg text-white transition-all hover:bg-red-800"
        >
          Delete
        </button>
        <button
          onClick={cancelDeleteBtnHandler}
          className="rounded-sm bg-gray-600 px-12 py-3 text-lg text-white transition-all hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface DeleteTicketBtnProps {
  ticket: Ticket;
}

export const DeleteTicketBtn = ({ ticket }: DeleteTicketBtnProps) => {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  return (
    <>
      {portalOpen && (
        <DeleteTicketPortal
          closePortal={() => setPortalOpen(false)}
          ticket={{ ...ticket, bookingNum: Number(ticket.bookingNum) }}
        />
      )}

      <button
        onClick={() => setPortalOpen((prevPortalOpen) => !prevPortalOpen)}
        className="flex items-center justify-center font-medium text-blue-600 hover:underline"
      >
        <svg
          className="h-4 w-4 fill-gray-600 transition-all hover:fill-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </button>
    </>
  );
};
