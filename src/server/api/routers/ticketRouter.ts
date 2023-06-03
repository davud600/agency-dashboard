import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const TicketObject = z.object({
  bookingNum: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  price: z.number(),
  profitPrice: z.number(),
  paymentStatus: z.string(),
  paymentMemo: z.string().nullish(),
  amadeusCode: z.string(),
  pdfFile: z.string().nullish(),
  deleted: z.boolean().nullish(),
});

export const ticketRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAllLimited: publicProcedure
    .input(
      z
        .object({
          page: z.number(),
          limit: z.number(),
        })
        .default({
          page: 0,
          limit: 20,
        })
    )
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;

      return await ctx.prisma.ticket.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: page * limit,
      });
    }),

  // getTicketPdfFile: publicProcedure
  //   .input(TicketObject)
  //   .query(({ input, ctx }) => {
  //     return ctx.prisma.ticket.findFirst({
  //       select: {
  //         pdfFile: true,
  //       },
  //       where: {
  //         bookingNum: input.bookingNum,
  //       },
  //     });
  //   }),

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

  softDelete: publicProcedure
    .input(z.object({ ticketToDelete: TicketObject }))
    .mutation(async ({ input: { ticketToDelete }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: { bookingNum: ticketToDelete.bookingNum },
        data: { ...ticketToDelete, deleted: true },
      });
    }),

  recover: publicProcedure
    .input(z.object({ ticketToRecover: TicketObject }))
    .mutation(async ({ input: { ticketToRecover }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: { bookingNum: ticketToRecover.bookingNum },
        data: { ...ticketToRecover, deleted: false },
      });
    }),

  getTotalProfits: publicProcedure.query(async ({ ctx }) => {
    const totalProfitPrice: { totalSum: number }[] = await ctx.prisma
      .$queryRaw`SELECT SUM(profitPrice) AS totalSum FROM Ticket`;

    return totalProfitPrice[0]?.totalSum;
  }),

  getTotalNumberOfTickets: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.ticket.count();
  }),
});
