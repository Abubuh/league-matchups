import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
        kata: `Sup`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  champions: publicProcedure.query(async ({ ctx }) => {
    const champions = await ctx.db.champion.findMany();
    return {
      champions,
    };
  }),

  apiData: publicProcedure.query(async ({ ctx }) => {
    const champions = await ctx.db.champion.findMany();
    const runes = await ctx.db.rune.findMany();
    const summoners = await ctx.db.summonerSpell.findMany();
    const items = await ctx.db.item.findMany();
    return {
      champions,
      runes,
      summoners,
      items,
    };
  }),

  getIdsByName: publicProcedure
    .input(
      z.object({
        playingWith: z
          .string()
          .min(2)
          .regex(/^(?!\s).+(?<!\s)$/gm),
        playingAgainst: z.string().min(2),
        rune: z.string().min(2),
        mainSummoner: z.string().min(2),
        secondarySummoner: z.string().min(2),
      }),
    )
    .query(async ({ input, ctx }) => {
      const playingWith = await ctx.db.champion.findUnique({
        where: { name: input.playingWith },
      });
      const playingAgainst = await ctx.db.champion.findUnique({
        where: { name: input.playingAgainst },
      });
      const rune = await ctx.db.rune.findUnique({
        where: { name: input.rune },
      });
      const mainSummoner = await ctx.db.summonerSpell.findUnique({
        where: { name: input.mainSummoner },
      });
      const secondarySummoner = await ctx.db.summonerSpell.findUnique({
        where: { name: input.secondarySummoner },
      });
      return {
        playingWith,
        playingAgainst,
        rune,
        mainSummoner,
        secondarySummoner,
      };
    }),

  // fillDb: publicProcedure
  // .query(async ({ ctx }) => {
  //   const champions = await ctx.db.champion.findMany({select: {key: true, id: true}})
  //   const skills = []
  //   for(const champion of champions){
  //     const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${champion.key}.json`)
  //     const data = await res.json() as {data: Record<string, unknown>}
  //     const champRawData = data?.data[champion.key] as {id : string, spells: {id: string, name: string, cooldown: number[]}[]}
  //     skills.push(champRawData)
  //   }
  //   const spells = skills.flatMap((champion) =>
  //   champion.spells.map((spell) => ({
  //     championId: champions.find(c => c.key === champion.id)!.id,
  //     key: spell.id,
  //     name: spell.name,
  //     cooldown: spell.cooldown[0]!
  //   }))
  //   )
  //   await ctx.db.skill.createMany({
  //     data: spells
  //   })
  //   return null
  // })

  // fillDbWithRunes: publicProcedure.query( async ({ ctx }) => {
  //   const runes = []
  //   const res = await fetch("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json")
  //   .then(data => data.json()) as {slots: {runes:  { name: string, key: string, icon: string}[]}[]}[]
  //   for(const runesOnRes of res){
  //     const runesData = runesOnRes?.slots?.[0]?.runes
  //     if(!runesData) continue
  //     for(const rune of runesData){
  //       const runeInfo = {
  //         name: rune.name,
  //         key: rune.key,
  //         img: rune.icon
  //       }
  //       runes.push(runeInfo)
  //     }
  //   }
  //   await ctx.db.rune.createMany({
  //     data: runes
  //   })
  //   return runes
  // })

  /* PENDIENTE CHECAR PA ABAJO */
  // fillDbWithItems: publicProcedure.query(async ({ ctx }) => {
  //   const itemChecker : string[] = []
  //   const res = await fetch("http://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/item.json")
  //   const data = await res.json() as {data: Record<string, unknown>}
  //   const dataConverted = Object.values(data.data) as { name: string, image: {full: string}}[]
  //   const itemsData = dataConverted.map((item) => ({
  //     name: item.name,
  //     image: item.image.full
  //   }))
  //   const items = []
  //   for(const item of itemsData){
  //     if(!itemChecker.includes(item.name)){
  //       itemChecker.push(item.name)
  //       items.push(item)
  //     }
  //   }
  //   await ctx.db.item.createMany({
  //       data: items
  //   })
  //   return items
  // }),

  // fillDbWithSummonerSpell: publicProcedure.query(async ({ ctx }) => {
  //   const res = await fetch("https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/summoner.json")
  //   .then(res => res.json()) as {data: Record<string, unknown>}
  //   const summonersData = Object.values(res.data) as { name: string, id: string }[]
  //   const summoners = summonersData.filter((summoner) => SUMMONERS.includes(summoner.id))
  //   const summoner = summoners.map((summoner) => ({
  //     key: summoner.id,
  //     name: summoner.name
  //   }))
  //   await ctx.db.summonerSpell.createMany({
  //     data: summoner
  //   })
  //   return null
  // })

  createPost: publicProcedure
    .input(
      z.object({
        runeId: z.number().min(1),
        playingWithId: z.number().min(1),
        playingAgainstId: z.number().min(1),
        mainSummonerSpellId: z.number().min(1),
        secondarySummonerSpellId: z.number().min(1),
        playStyle: z.string().max(500),
        itemsId: z.array(z.object({ id: z.number().min(1) })),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const items = input.itemsId.map((itemId) => {
        return {
          item: {
            connect: {
              id: itemId.id,
            },
          },
        };
      });
      const post = await ctx.db.post.create({
        data: {
          runeId: input.runeId,
          playingWithId: input.playingWithId,
          playingAgainstId: input.playingAgainstId,
          playStyle: input.playStyle,
          mainSummonerSpellId: input.mainSummonerSpellId,
          secondarySummonerSpellId: input.secondarySummonerSpellId,
          items: {
            create: items,
          },
        },
      });
      return {
        post: post,
        id: post.id,
      };
    }),

  getDataPostsById: publicProcedure
    .input(z.number().min(1))
    .query(async ({ ctx, input }) => {
      const postsData = await ctx.db.post.findMany({
        where: { playingWithId: input },
      });
      const postData = [];
      for (const post of postsData) {
        const itemData = [];
        const itemsIds = await ctx.db.itemsOnPost.findMany({
          where: { postId: post.id },
        });
        for (const item of itemsIds) {
          const itemRawData = await ctx.db.item.findUnique({
            where: { id: item.itemId },
          });
          itemData.push(itemRawData);
        }
        const entirePostInfo = {
          id: post.id,
          rune: await ctx.db.rune.findUnique({ where: { id: post.runeId } }),
          items: itemData,
          playingWith: await ctx.db.champion.findUnique({
            where: { id: post.playingWithId },
          }),
          playingAgainst: await ctx.db.champion.findUnique({
            where: { id: post.playingAgainstId },
          }),
          mainSummoner: await ctx.db.summonerSpell.findUnique({
            where: { id: post.mainSummonerSpellId },
          }),
          secondarySummoner: await ctx.db.summonerSpell.findUnique({
            where: { id: post.secondarySummonerSpellId },
          }),
        };
        postData.push(entirePostInfo);
      }
      return {
        data: postData,
      };
    }),

  getPostById: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({ where: { id: input } });
      const playingWith = await ctx.db.champion.findUnique({
        where: { id: post?.playingWithId },
      });
      const playingAgainst = await ctx.db.champion.findUnique({
        where: { id: post?.playingAgainstId },
      });
      const abilities = await ctx.db.skill.findMany({
        where: { championId: post?.playingAgainstId },
      });
      const itemsIds = await ctx.db.itemsOnPost.findMany({
        where: { postId: post?.id },
      });
      const items = [];
      for (const itemData of itemsIds) {
        const item = await ctx.db.item.findUnique({
          where: { id: itemData.itemId },
        });
        items.push(item);
      }
      const rune = await ctx.db.rune.findUnique({
        where: { id: post?.runeId },
      });
      const mainSummoner = await ctx.db.summonerSpell.findUnique({
        where: { id: post?.mainSummonerSpellId },
      });
      const secondarySummoner = await ctx.db.summonerSpell.findUnique({
        where: { id: post?.secondarySummonerSpellId },
      });
      const postData = {
        playingWith: playingWith,
        playingAgainst: playingAgainst,
        abilities: abilities,
        items: items,
        playstyle: post?.playStyle,
        rune: rune,
        mainSummoner: mainSummoner,
        secondarySummoner: secondarySummoner,
      };
      return {
        data: postData,
      };
    }),

  getPostsLength: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findMany();
    const postLength = post.length;
    return {
      data: postLength,
    };
  }),

  //fillDbWithSpecificChamp
  //URLS: https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/Hwei.json

  // fillDbWithSpecificChampion: publicProcedure
  // .query(async ({ ctx }) => {
  //   const fetchChampion = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion/Smolder.json`)
  //   const data = await fetchChampion.json() as {data: Record<string, unknown>}
  //   const championRawData = await data.data.Smolder as { name: string, id: string}
  //   const champion = {
  //     name : championRawData.name,
  //     key : championRawData.id
  //   }
  //   await ctx.db.champion.create({
  //     data: champion
  //   })
  //   return championRawData
  // }),

//   fillDbWithSkillsOfSpecificChamp: publicProcedure.query(async ({ ctx }) => {
//       const res = await fetch(
//         `http://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/Hwei.json`,
//       );
//       const data = (await res.json()) as { data: Record<string, unknown> };
//       const champRawData = await data?.data.Hwei as {
//         id: string;
//         spells: { id: string; name: string; cooldown: number[] }[];
//       };
//     const champion = await ctx.db.champion.findUnique({where:{ name: champRawData.id }})
//     const championId = champion!.id
//     const spells = champRawData.spells.map((spell) => {
//       return {
//         key: spell.id,
//         name: spell.name,
//         cooldown: spell.cooldown[0]!,
//         championId: championId
//       }
//     })
//     await ctx.db.skill.createMany({
//       data: spells
//     })
//     return spells;
//   }),

});