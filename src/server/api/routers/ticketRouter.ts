import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const TicketObject = z.object({
  bookingNum: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  price: z.number(),
  paymentStatus: z.string(),
  paymentMemo: z.string().nullable(),
  amadeusCode: z.string(),
  pdfFilePath: z.string().nullable(),
});

export const ticketRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: publicProcedure
    .input(TicketObject)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.ticket.create({ data: input });
    }),

  update: publicProcedure
    .input(z.object({ ticketToUpdate: TicketObject, ticketData: TicketObject }))
    .mutation(async ({ input: { ticketToUpdate, ticketData }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: { bookingNum: ticketToUpdate.bookingNum },
        data: ticketData,
      });
    }),

  delete: publicProcedure
    .input(z.object({ ticketToDelete: TicketObject }))
    .mutation(async ({ input: { ticketToDelete }, ctx }) => {
      await ctx.prisma.ticket.delete({
        where: { bookingNum: ticketToDelete.bookingNum },
      });
    }),
});
