import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
              id: userId,
            },
          },
        },
        include: {
          github_repos: true
        }
      });
    }),

  createBid: privateProcedure
    .input(
      z.object({
        userID: z.string(),
        bid_data: z.object({
          milestones: z.array(MilestoneSchema),
          start_date: z.date(),
        }),
        projectId:z.string()
      }),
    )
    .mutation(async ({ ctx: { userId, db }, input }) => {
      const bid_data = input.bid_data;
      try {
        await db.bid.create({
          data : {
            bid_data:bid_data,
            projectId:input.projectId,
            userId:userId
          }
        });
      } catch (error) {
        console.error("Error creating/updating bid:", error);
        throw new Error("Failed to create/update bid");
      }
    }),

  addGithubRepo: privateProcedure
    .input(
      z.object({
        repo: z.string().optional(),
        username: z.string().optional(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db }, input }) => {
      const username = input.username;
      const repo = input.repo;

        // const res = await fetch();

      if (username && repo) {
        const github_repo = await db.githubRepos.findFirst({
          where: {
            projectId: input.projectId,
            username, repo
          },
          select:{
            username:true
          }
        });
        if(!github_repo) {
          await db.githubRepos.create({
            data : {
              projectId: input.projectId,
              username,
              repo,
            }
          });
        } else {
          throw new TRPCError({code: "BAD_REQUEST" ,message: "This repository is already linked."})
        }
      } else {
        throw new TRPCError({code: "BAD_REQUEST", message: "Github URL seems invalid."})
      }
      
    }),
    createProject: privateProcedure
      .input(z.object({
        project_name: z.string(),
        duration: z.number(),
        duration_unit: z.string(),
        description: z.string(),
        timezone: z.string(),
        timeOverlap: z.number(),
        weekdays: z.boolean(),
        weekends: z.boolean(),
        weekdayStartHour: z.number(),
        weekdayEndHour: z.number(),
        weekendStartHour: z.number(),
        weekendEndHour: z.number(),
        workingWeekdays: z.object({
          mon: z.boolean(),
          tue: z.boolean(),
          wed: z.boolean(),
          thu: z.boolean(),
          fri: z.boolean(),
        }),
        workingWeekends: z.object({
          sat: z.boolean(),
          sun: z.boolean()
        }),
        skills: z.array(
          z.object({
            _id: z.string(),
            name: z.string()
          })
        ),
        tools: z.array(
          z.object({
            _id: z.string(),
            name: z.string()
          })
        ),
        countries: z.array(z.string()),
        isIncluding: z.boolean(),
        nda: z.boolean(),
      }))
      .mutation(async ({ ctx: { db, userId }, input }) => {
        const project = await db.project.create({
          data: {
            ...input,
            team_members: {
              connect: [ { id: userId } ]
            }
          }
        })
        return project
      })
});
