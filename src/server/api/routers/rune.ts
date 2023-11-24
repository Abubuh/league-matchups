import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const runeRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const runes = await ctx.db.rune.findMany();
        return {
          runes,
        };
      }),
    getByName: publicProcedure
    .input(z.object({ key: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const rune = await ctx.db.rune.findUnique({
        where: { name: input.key },
      });
      return { rune };
    }),
})