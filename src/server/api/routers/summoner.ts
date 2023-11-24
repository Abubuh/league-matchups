import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc"

export const summonerRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const summoners = await ctx.db.summonerSpell.findMany()
        return {
            summoners
        }
    }),

    getByName: publicProcedure
    .input(z.object({ key: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const summoner = await ctx.db.summonerSpell.findUnique({
        where: { name: input.key }
      });
      return { summoner };
    }),
}) 