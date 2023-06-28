import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const TicketObject = z.object({
  bookingNum: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  price: z.number(),
  currency: z.string(),
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
      select: {
        id: true,
        bookingNum: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        price: true,
        currency: true,
        profitPrice: true,
        paymentStatus: true,
        paymentMemo: true,
        amadeusCode: true,
        deleted: true,
        createdAt: true,
        updatedAt: true,
      },
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

  create: publicProcedure
    .input(TicketObject)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.ticket.create({ data: input });
    }),

  update: publicProcedure
    .input(
      z.object({
        ticketToUpdateBookingNum: z.string(),
        ticketData: TicketObject,
      })
    )
    .mutation(
      async ({ input: { ticketToUpdateBookingNum, ticketData }, ctx }) => {
        await ctx.prisma.ticket.update({
          where: { bookingNum: ticketToUpdateBookingNum },
          data: ticketData,
        });
      }
    ),

  delete: publicProcedure
    .input(z.object({ ticketToDeleteBookingNum: z.string() }))
    .mutation(async ({ input: { ticketToDeleteBookingNum }, ctx }) => {
      await ctx.prisma.ticket.delete({
        where: { bookingNum: ticketToDeleteBookingNum },
      });
    }),

  softDelete: publicProcedure
    .input(z.object({ ticketToDeleteBookingNum: z.string() }))
    .mutation(async ({ input: { ticketToDeleteBookingNum }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: { bookingNum: ticketToDeleteBookingNum },
        data: { deleted: true },
      });
    }),

  recover: publicProcedure
    .input(z.object({ ticketToRecoverBookingNum: z.string() }))
    .mutation(async ({ input: { ticketToRecoverBookingNum }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: { bookingNum: ticketToRecoverBookingNum },
        data: { deleted: false },
      });
    }),

  getTotalProfits: publicProcedure.query(async ({ ctx }) => {
    const totalProfitPrice: { totalSum: number }[] = await ctx.prisma
      .$queryRaw`SELECT SUM(profitPrice) AS totalSum FROM Ticket WHERE deleted = false`;

    return totalProfitPrice[0]?.totalSum;
  }),

  getTotalProfitsEUR: publicProcedure.query(async ({ ctx }) => {
    const totalProfitPrice: { totalSum: number }[] = await ctx.prisma
      .$queryRaw`SELECT SUM(profitPrice) AS totalSum FROM Ticket WHERE deleted = false AND currency = 'EUR'`;

    return totalProfitPrice[0]?.totalSum;
  }),
  getTotalProfitsCHF: publicProcedure.query(async ({ ctx }) => {
    const totalProfitPrice: { totalSum: number }[] = await ctx.prisma
      .$queryRaw`SELECT SUM(profitPrice) AS totalSum FROM Ticket WHERE deleted = false AND currency = 'CHF'`;

    return totalProfitPrice[0]?.totalSum;
  }),

  getTotalNumberOfTickets: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.ticket.count({
      where: {
        deleted: false,
      },
    });
  }),
});
