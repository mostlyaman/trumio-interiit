import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getUser: privateProcedure
    .input(z.object({}).nullish())
    .query(async ({ ctx: { db, userId } }) => {
      const user = await db.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId
        },
        include: {
          bids:true
        }
      });
      // TODO: create user in messaging websocket with messaging_password
      return user
    })
});