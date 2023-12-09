import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";
import { masterAiRouter } from "./routers/master_ai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  user: userRouter,
  master_ai: masterAiRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
