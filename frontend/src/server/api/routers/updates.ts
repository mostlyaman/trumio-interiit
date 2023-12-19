import { Turret_Road } from "next/font/google";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";

export const updateRouter = createTRPCRouter({
  getItems: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx: { userId, db }, input }) => {
      return await db.updates.findMany({
        where: {
          projectId: input.projectId,
        }
      })
    }),
  
  // create_minutes: privateProcedure
  //   .input(z.object({ text: z.string() }))
  //   .mutation(async ({ ctx: { userId, db }, input }) => {

  //   })
})