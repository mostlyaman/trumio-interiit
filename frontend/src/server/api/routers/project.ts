import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getProjects: privateProcedure
  .input(z.object({}).nullish())
  .query(async ({ ctx:{userId,db} }) => {
    return await db.project.findMany()
  }),

  createBid: privateProcedure
  .input(z.object({userID:z.string(),bid_data:z.object({})}).nullish())
  .query(async ({ ctx:{userId,db} }) => {
    return await db.project.findMany()
  }),
});