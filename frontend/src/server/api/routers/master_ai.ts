import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const masterAiRouter = createTRPCRouter({
  getItems: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { userId, db }, input }) => {
      return await db.masterAIChats.findMany({
        where: {
          projectId: input.projectId,
          OR: [
            {
              userId: null,
            },
            {
              userId: userId
            }
          ]
        }
      })
    }),
})