import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const championRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const champions = await ctx.db.champion.findMany();
    return {
      champions,
    };
  }),

  getByKey: publicProcedure
    .input(z.object({ key: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const champion = await ctx.db.champion.findUnique({
        where: { key: input.key },
        include: { skills: true },
      });
      return { champion };
    }),

  getByName: publicProcedure
  .input(z.object({ key: z.string().min(1) }))
  .query(async ({ ctx, input }) => {
    const champion = await ctx.db.champion.findUnique({
      where: { name: input.key },
    });
    return { champion };
  }),
});