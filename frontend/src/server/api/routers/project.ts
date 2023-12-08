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
    .input(z.object({}))
    .query(async ({ ctx: { db, userId } }) => {
      return await db.project.findMany({
        where: {
          team_members: {
            some: {
              id: userId
            }
          }
        }
      })
    })


});