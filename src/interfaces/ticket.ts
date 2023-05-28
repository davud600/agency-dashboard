export type TicketPaymentStatus = "Not Paid" | "Paid";

export interface Ticket {
  bookingNum: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  price: number;
  paymentStatus: TicketPaymentStatus;
  amadeusCode: string;
  pdfFilePath: string;
}

export interface DbTicket extends Ticket {
  id: string;
}
