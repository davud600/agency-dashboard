export type TicketPaymentStatus = "Not Paid" | "Paid";

export interface Ticket {
  bookingNum: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  paymentStatus: TicketPaymentStatus;
  price: number;
}
