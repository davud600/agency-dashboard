import {
  type Dispatch,
  type SetStateAction,
  useRef,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useTickets } from "~/context/TicketsContext";
import { type TicketPaymentStatus, type Ticket } from "~/interfaces/ticket";
import { useOutsideClickDetector } from "~/utils/outsideClick";

interface EditTicketPortalProps {
  closePortal: Dispatch<SetStateAction<undefined>>;
  ticket: Ticket;
}

const EditTicketPortal = ({ closePortal, ticket }: EditTicketPortalProps) => {
  const { updateTicket } = useTickets();

  // Input state
  const [formData, setFormData] = useState<Ticket>({
    bookingNum: ticket.bookingNum,
    firstName: ticket.firstName,
    lastName: ticket.lastName,
    phoneNumber: ticket.phoneNumber,
    price: ticket.price,
    profitPrice: ticket.profitPrice,
    paymentStatus: ticket.paymentStatus,
    amadeusCode: ticket.amadeusCode,
    pdfFile: ticket.pdfFile,
  });

  const portalRef = useRef<HTMLDivElement>(null);

  useOutsideClickDetector(portalRef, closePortal);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    // Get the selected file from the input
    const fileInput = document.getElementById("pdfFile") as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      if (!!selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
          if (typeof reader.result === "string") {
            const updatedFormData: Ticket = {
              ...formData,
              pdfFile: reader.result,
            };

            updateTicket(
              {
                ...ticket,
              },
              updatedFormData
            );
            closePortal(undefined);
          }
        };
      } else {
        updateTicket(
          {
            ...ticket,
          },
          formData
        );
        closePortal(undefined);
      }
    } else {
      updateTicket(
        {
          ...ticket,
        },
        formData
      );
      closePortal(undefined);
    }
  };

  return (
    <div
      ref={portalRef}
      className="absolute left-[100%] top-1/2 z-20 -ml-[21rem] -mt-[18rem] flex h-[36rem] w-[42rem] flex-col rounded-lg border border-gray-300 bg-white p-3 shadow-[0_0_0_1000px_rgba(0,0,0,.3)] md:left-1/2"
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
          Edit Ticket - {ticket.bookingNum}
        </h1>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex h-full w-full flex-col justify-between"
      >
        <div className="w-full">
          <div className="mb-3 flex w-full justify-start gap-2">
            <div className="w-1/2">
              <label
                htmlFor="bookingNum"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Ticket Booking Number (*)
              </label>
              <input
                type="text"
                id="bookingNum"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Booking Number"
                required
                value={formData.bookingNum}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData((prevFormData) => {
                    return {
                      ...prevFormData,
                      bookingNum: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="paymentStatus"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Select Payment Status
              </label>
              <select
                id="paymentStatus"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => {
                  setFormData((prevFormData) => {
                    return {
                      ...prevFormData,
                      paymentStatus: e.target.value as TicketPaymentStatus,
                    };
                  });
                }}
                value={formData.paymentStatus}
              >
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
                Client First Name (*)
              </label>
              <input
                type="text"
                id="firstName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Filan"
                required
                value={formData.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData((prevFormData) => {
                    return {
                      ...prevFormData,
                      firstName: e.target.value,
                    };
                  })
                }
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Client Last Name (*)
              </label>
              <input
                type="text"
                id="lastName"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Fisteku"
                required
                value={formData.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData((prevFormData) => {
                    return {
                      ...prevFormData,
                      lastName: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
          <div className="mb-3 flex w-full justify-center gap-2">
            <div className="flex w-1/2 justify-center gap-2">
              <div className="w-1/2">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Ticket Price (*)
                </label>
                <input
                  type="number"
                  id="price"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.99€"
                  required
                  value={formData.price}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData((prevFormData) => {
                      return {
                        ...prevFormData,
                        price: parseFloat(e.target.value),
                      };
                    })
                  }
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="profitPrice"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Profit Price (*)
                </label>
                <input
                  type="number"
                  id="profitPrice"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.99€"
                  required
                  value={formData.profitPrice}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData((prevFormData) => {
                      return {
                        ...prevFormData,
                        profitPrice: parseFloat(e.target.value),
                      };
                    })
                  }
                />
              </div>
            </div>
            <div className="w-1/2">
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
                placeholder="0xx xxx xxx"
                value={formData.phoneNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData((prevFormData) => {
                    return {
                      ...prevFormData,
                      phoneNumber: e.target.value,
                    };
                  })
                }
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
              value={formData.amadeusCode}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prevFormData) => {
                  return {
                    ...prevFormData,
                    amadeusCode: e.target.value,
                  };
                })
              }
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
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export const EditTicketBtn = ({ ticket }: { ticket: Ticket }) => {
  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  return (
    <>
      {portalOpen && (
        <EditTicketPortal
          closePortal={() => setPortalOpen(false)}
          ticket={ticket}
        />
      )}

      <button
        onClick={() => setPortalOpen((prevPortalOpen) => !prevPortalOpen)}
        className="flex items-center justify-center font-medium text-blue-600 hover:underline"
      >
        <svg
          className="h-6 w-6 fill-blue-600 transition-all hover:fill-blue-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
        </svg>
      </button>
    </>
  );
};
