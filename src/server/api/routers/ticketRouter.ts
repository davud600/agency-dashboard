import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const TicketObject = z.object({
  bookingNum: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  price: z.number(),
  paymentStatus: z.string(),
  amadeusCode: z.string(),
  pdfFilePath: z.string(),
});

export const ticketRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ticket.findMany();
  }),

  create: publicProcedure
    .input(TicketObject)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.ticket.create({ data: input });
    }),

  update: publicProcedure
    .input(TicketObject)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.ticket.update({
        where: { bookingNum: input.bookingNum },
        data: input,
      });
    }),

  delete: publicProcedure
    .input(TicketObject)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.ticket.delete({
        where: { bookingNum: input.bookingNum },
      });
    }),
});
