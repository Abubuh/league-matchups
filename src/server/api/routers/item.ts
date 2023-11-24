import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const items = await ctx.db.item.findMany()
        return {
            items
        }
    })
}) 