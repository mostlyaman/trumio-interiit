import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const MilestoneSchema = z.object({
  name: z.string().optional(),
  description: z.string(),
  duration: z.number(),
  cost: z.number(),
  deliverables: z.string(),
});

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
    .query(async ({ ctx: { userId, db } }) => {
      return await db.project.findMany();
    }),

  getMyProjects: privateProcedure
    .input(z.object({}).nullish())
    .query(async ({ ctx: { userId, db } }) => {
      return await db.project.findMany({
        where: {
          team_members: {
            some: {
              id: userId
            }
          }
        }
      })
    }),

  createBid: privateProcedure
    .input(
      z
        .object({
          userID: z.string(),
          bid_data: z.object({
            milestones: z.array(MilestoneSchema),
            start_date: z.date(),
          }),
        })
    )
    .mutation(({ ctx: { userId, db }, input }) => {
      const bidData = input.bid_data;
      try {
        console.log(bidData)
        return {}
      } catch (error) {

        console.error('Error creating/updating bid:', error);
        throw new Error('Failed to create/update bid');
      }
    }),
});
