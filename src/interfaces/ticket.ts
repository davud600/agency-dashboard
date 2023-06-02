export type TicketPaymentStatus = "Not Paid" | "Paid";

export interface Ticket {
  bookingNum: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  price: number;
  paymentStatus: TicketPaymentStatus;
  paymentMemo?: string;
  amadeusCode: string;
  pdfFilePath?: string;
  deleted?: boolean;
}

export interface DbTicket extends Ticket {
  id: string;
}
