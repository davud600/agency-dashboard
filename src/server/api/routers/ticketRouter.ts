import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ticketRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ticket.findMany();
  }),

  //   addTicket: publicProcedure
  //     .input(
  //       z.object({
  //         bookingNum: z.number(),
  //         firstName: z.string(),
  //         lastName: z.string(),
  //         email: z.string().nullable(),
  //         phoneNumber: z.string(),
  //         price: z.number(),
  //         paymentStatus: z.string(),
  //       })
  //     )
  //     .query(({ input }) => {
  //       return {
  //         ticketData: {
  //           bookingNum: input.bookingNum,
  //           firstName: input.firstName,
  //           lastName: input.lastName,
  //           email: input.email,
  //           phoneNumber: input.phoneNumber,
  //           price: input.price,
  //           paymentStatus: input.paymentStatus,
  //         },
  //       };
  //     }),
});
