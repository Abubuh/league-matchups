import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import RoutingButton from "~/components/RoutingButton";
import SummonerImage from "~/components/SummonerImage";
import { CHAMP_IMAGE_URL, ITEM_IMAGE_URL, RUNE_IMAGE_URL } from "~/config";
import { api } from "~/utils/api";

const PostsExample = () => {
  const { data: session } = useSession();
  const [championUsedId, setChampionUsed] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const { data: fetchChampName } = api.champion.getNameById.useQuery({
    id: championUsedId,
  });
  const champName = fetchChampName?.data;
  const { data: fetchPostsData } =
    api.post.getDataPostsById.useQuery(championUsedId);
  const postsData = fetchPostsData?.data;
  const filteredPosts = postsData?.filter(
    (post) =>
      searchValue === "" ||
      post?.playingAgainst?.name
        ?.toLowerCase()
        .includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (router.isReady) {
      const paramId: string = router.query.championId! as string;
      setChampionUsed(parseInt(paramId));
    }
  }, [router.isReady, router.query]);

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex h-[100vh] flex-col">
      <Navbar></Navbar>
      <input
        type="text"
        placeholder="Look for matchup"
        className="mt-8 h-10 w-3/12 self-center rounded-md border border-black py-8 text-center text-2xl text-black transition delay-200 ease-in-out"
        onChange={handleSearchValue}
      />
      <table className="mx-20 my-10 border-separate  rounded-xl border-[3px] border-black bg-gray-100 text-black transition delay-200 ease-in-out dark:bg-slate-400">
        <thead>
          <tr className="grid grid-flow-col grid-cols-3">
            <th>Matchup</th>
            <th>Recommended build</th>
            <th>Summs and Runes</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts?.map(
            ({
              rune,
              playingWith,
              playingAgainst,
              items,
              mainSummoner,
              secondarySummoner,
              id,
            }) => {
              return (
                <tr key={id}>
                  <Link href={`/post/${playingWith?.key}/${id}`}>
                    <button className="grid w-full grid-flow-col grid-cols-3 border-t-2 border-black hover:bg-slate-200 dark:hover:bg-slate-500">
                      <div className="my-auto flex justify-center ">
                        <img
                          src={`${CHAMP_IMAGE_URL}${playingWith?.key}.png`}
                          className="max-h-[100px] w-4/12 max-w-[100px] rounded-md p-3"
                          alt=""
                          width={100}
                          height={100}
                        />
                        <p className="self-center text-2xl">vs</p>
                        <img
                          src={`${CHAMP_IMAGE_URL}${playingAgainst?.key}.png`}
                          className="max-h-[100px] w-5/12 max-w-[100px] rounded-md p-3"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className=" self-center">
                        <ul className="justify-left flex gap-2 ">
                          {items?.map((item) => {
                            return (
                              <img
                                key={item?.id}
                                src={`${ITEM_IMAGE_URL}${item?.image}`}
                                className=" max-h-[60px] w-2/12 max-w-[60px] rounded-md"
                                alt=""
                                height={100}
                                width={100}
                              />
                            );
                          })}
                        </ul>
                      </div>
                      <div className="mx-auto grid w-1/2 grid-flow-col grid-cols-2 self-center">
                        <div className="grid gap-2 py-1">
                          <SummonerImage
                            summonerKey={mainSummoner!.key}
                            summonerName={mainSummoner!.name}
                          ></SummonerImage>
                          <SummonerImage
                            summonerKey={secondarySummoner!.key}
                            summonerName={secondarySummoner!.name}
                          ></SummonerImage>
                        </div>
                        <img
                          src={RUNE_IMAGE_URL + rune?.img}
                          alt="Rune"
                          className=" mx-auto my-auto max-h-[100px] w-8/12 max-w-[100px]"
                          height={100}
                          width={100}
                        />
                      </div>
                    </button>
                  </Link>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
      <section className="flex w-full justify-around">
        <RoutingButton url="/" text="Go back" />
        <RoutingButton url={`/champInfo/${champName}`} text="Champ info" />
        {session ? (
          <RoutingButton url={`/new/${championUsedId}`} text="Create post" />
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default PostsExample;
