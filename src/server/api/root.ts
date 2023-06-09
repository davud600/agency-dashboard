import { createTRPCRouter } from "~/server/api/trpc";
import { adminRouter } from "./routers/adminRouter";
import { ticketRouter } from "./routers/ticketRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tickets: ticketRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
