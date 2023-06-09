import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "../../../env.mjs";

const AdminCredentials = z.object({
  user: z.string(),
  password: z.string(),
});

export const adminRouter = createTRPCRouter({
  login: publicProcedure.input(AdminCredentials).query(async ({ input }) => {
    const { user, password } = input;

    if (user !== env.ADMIN_USER || password !== env.ADMIN_PASSWORD) {
      return {
        status: "incorrect credentials",
      };
    }

    return {
      status: "success",
    };
  }),
});
