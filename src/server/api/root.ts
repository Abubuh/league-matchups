import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { championRouter } from "./routers/champion";
import { runeRouter } from "./routers/rune";
import { itemRouter } from "./routers/item";
import { summonerRouter } from "./routers/summoner";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  champion: championRouter,
  rune: runeRouter,
  item: itemRouter,
  summoner: summonerRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
