import { useParams } from "next/navigation";
import React from "react";
import RoutingButton from "~/components/RoutingButton";
import {
  ABILITIES_IMAGE_URL,
  ITEM_IMAGE_URL,
  POST_CHAMP_IMAGE_URL,
  RUNE_IMAGE_URL,
  SUMMONERS_IMAGE_URL,
} from "~/config";
import { api } from "~/utils/api";

const Page = () => {
  const params = useParams();
  const playingAsKey: string = params?.championName as string;
  const postId: string = params?.postId as string;
  const { isLoading } = api.champion.getByKey.useQuery(
    { key: playingAsKey },
    { enabled: playingAsKey !== undefined },
  );
  const { data: fetchPostData } = api.post.getPostById.useQuery(
    parseInt(postId),
  );
  const postData = fetchPostData?.data;
  const tipParagraph = postData?.playstyle?.split(".");
  return (
    <div className="bg-slate-950 pt-10 ">
      <section className="mx-52 flex justify-end gap-5">
        <RoutingButton
          text="Posts"
          url={`/posts/${postData?.playingWith?.id}`}
        />
        <RoutingButton text="Home" url="/" />
      </section>
      <div className="grid h-full min-h-[100vh] grid-cols-5 justify-center gap-5  px-36 py-12 ">
        <article className="col-span-2 mx-auto w-full ">
          <img
            src={POST_CHAMP_IMAGE_URL + playingAsKey + "_0.jpg"}
            width={380}
            height={560}
            className={
              "pointer-events-none mx-auto mb-6 h-fit max-h-[490px] w-fit rounded  border-2 object-right transition-opacity duration-700" +
              (!isLoading ? " opacity-80" : " opacity-0")
            }
            alt=""
          />
          <p className="text-center text-2xl text-white">Recommended items</p>
          <ul
            className={
              "grid grid-cols-6 py-8 transition-opacity duration-700" +
              (!isLoading ? " opacity-80" : " opacity-0")
            }
          >
            {postData?.items?.map((item) => {
              return (
                <section key={item?.name} className="px-2 text-center ">
                  <img
                    src={ITEM_IMAGE_URL + item?.image}
                    width={75}
                    height={75}
                    alt=""
                    className="mx-auto w-10/12 rounded border-[3px] border-slate-400 transition duration-500 hover:-translate-y-2"
                  />
                  <p className="text-xs text-white">{item?.name}</p>
                </section>
              );
            })}
          </ul>
        </article>
        <article className="grid-rows-7 grid gap-4">
          <p className="row-start-1 self-center text-center text-6xl text-white">
            vs
          </p>
          <div className="flex h-72 flex-col gap-1 overflow-x-auto overscroll-y-auto">
            {tipParagraph ? (
              tipParagraph?.map((tip, index) => {
                return tip.length > 0 ? (
                  <p
                    key={index}
                    className="row-span-2 row-start-2 text-justify text-white"
                  >
                    {tip}.
                  </p>
                ) : (
                  ""
                );
              })
            ) : (
              <></>
            )}
          </div>
          <section className="my-auto h-3/4 text-justify text-white">
            <div className="mx-auto grid w-10/12">
              <p className="col-span-2 mb-3 self-center text-center text-2xl">
                Summoners
              </p>
              <img
                src={`${SUMMONERS_IMAGE_URL}${postData?.mainSummoner?.key}.png`}
                alt="Main Summoner"
                className="mx-auto w-5/12 rounded-md border-2 border-gray-200 "
              />
              <img
                src={`${SUMMONERS_IMAGE_URL}${postData?.secondarySummoner?.key}.png`}
                alt="Secondary summoner"
                className="mx-auto w-5/12 rounded-md border-2 border-gray-200 "
              />
            </div>
          </section>
          <section className="text-justify text-white">
            <p className="text-center">Rune</p>
            <img
              src={`${RUNE_IMAGE_URL}${postData?.rune?.img}`}
              alt="Rune recommended"
              className="mx-auto w-2/5"
            />
          </section>
        </article>
        <article className="col-span-2 col-start-4 mx-auto flex w-full flex-col">
          <img
            src={`${POST_CHAMP_IMAGE_URL}${postData?.playingAgainst?.key}_0.jpg`}
            width={380}
            height={560}
            className={
              " pointer-events-none mx-auto mb-6 h-fit max-h-[490px] w-fit self-center rounded border-2 object-cover  object-center transition-opacity duration-700" +
              (!isLoading ? " opacity-80" : " opacity-0")
            }
            alt=""
          />
          <section>
            <p className="text-center text-2xl text-white">Enemy cooldowns</p>
            <ul
              className={
                "grid h-3/4 grid-cols-4 gap-7 pt-6 transition-opacity duration-700 " +
                (!isLoading ? " opacity-80" : " opacity-0")
              }
            >
              {postData?.abilities?.map((spell) => {
                return (
                  <section
                    key={spell.name}
                    className="mx-auto w-full text-center"
                  >
                    <img
                      src={ABILITIES_IMAGE_URL + spell.key + ".png"}
                      width={75}
                      height={75}
                      alt=""
                      className=" mx-auto mb-2 w-8/12 rounded border-[3px] border-amber-500 transition duration-500 hover:-translate-y-2"
                    />
                    <p className="text-xs text-white">{spell.name}</p>
                    <p className="text-xs text-white">{spell.cooldown} secs</p>
                  </section>
                );
              })}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Page;
