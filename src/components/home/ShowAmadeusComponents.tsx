import { type Dispatch, type SetStateAction, useState, useRef } from "react";
import { type Ticket } from "~/interfaces/ticket";
import { useOutsideClickDetector } from "~/utils/outsideClick";

interface ShowAmadeusPortalProps {
  closePortal: Dispatch<SetStateAction<undefined>>;
  ticket: Ticket;
}

const ShowAmadeusPortal = ({ closePortal, ticket }: ShowAmadeusPortalProps) => {
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const portalRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);

  useOutsideClickDetector(portalRef, closePortal);
  useOutsideClickDetector(copyBtnRef, () => setCopiedText(false));

  return (
    <div
      ref={portalRef}
      className="absolute left-[100%] top-1/2 z-20 -ml-[21rem] -mt-[18rem] flex min-h-[36rem] w-[42rem] flex-col rounded-lg border border-gray-300 bg-white p-3 shadow-[0_0_0_1000px_rgba(0,0,0,.3)] md:left-1/2"
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
          Amadeus Code of Ticket - {ticket.bookingNum.toString()}
        </h1>
      </div>
      <div className="mb-2">
        <button
          ref={copyBtnRef}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={() => {
            void navigator.clipboard.writeText(ticket.amadeusCode);
            setCopiedText(true);
          }}
        >
          {copiedText ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-4">
        <div className="w-full whitespace-pre-wrap rounded-sm border border-gray-300 bg-gray-100 p-1 text-start">
          {ticket.amadeusCode}
        </div>
      </div>
    </div>
  );
};

interface ShowAmadeusBtnProps {
  ticket: Ticket;
}

export const ShowAmadeusBtn = ({ ticket }: ShowAmadeusBtnProps) => {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  return (
    <>
      {portalOpen && (
        <ShowAmadeusPortal
          closePortal={() => setPortalOpen(false)}
          ticket={ticket}
        />
      )}

      <button
        onClick={() => setPortalOpen((prevPortalOpen) => !prevPortalOpen)}
        className="flex items-center justify-center font-medium text-blue-600 hover:underline"
      >
        <svg
          className="h-6 w-6 fill-orange-600 transition-all hover:fill-orange-700"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M0 64C0 46.3 14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64zM192 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32zm32 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM127.8 268.6L25.8 347.9C15.3 356.1 0 348.6 0 335.3V176.7c0-13.3 15.3-20.8 25.8-12.6l101.9 79.3c8.2 6.4 8.2 18.9 0 25.3z" />
        </svg>
      </button>
    </>
  );
};
