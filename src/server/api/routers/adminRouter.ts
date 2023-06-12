import { z } from "zod";
import { type LoginResStatus } from "~/interfaces/admin.js";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "../../../env.mjs";

const AdminCredentials = z.object({
  user: z.string(),
  password: z.string(),
});

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(AdminCredentials)
    .query(async ({ input, ctx }) => {
      const { user, password } = input;

      if (user !== env.ADMIN_USER || password !== env.ADMIN_PASSWORD) {
        return {
          status: "incorrect credentials" as LoginResStatus,
        };
      }

      const adminSession = await ctx.prisma.adminSession.create({
        data: {
          expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        },
      });

      return {
        status: "success" as LoginResStatus,
        adminSession: adminSession,
      };
    }),

  deleteExpired: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.adminSession.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
      },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.adminSession.findMany();
  }),
});
