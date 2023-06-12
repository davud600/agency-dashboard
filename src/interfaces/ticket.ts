export type TicketPaymentStatus = "Not Paid" | "Paid";

export interface Ticket {
  bookingNum: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  price: number;
  profitPrice: number;
  paymentStatus: TicketPaymentStatus;
  paymentMemo?: string;
  amadeusCode: string;
  pdfFile?: string;
  deleted?: boolean;
}

export interface DbTicket extends Ticket {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}
