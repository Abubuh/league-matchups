import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { ITEM_IMAGE_URL, POST_CHAMP_IMAGE_URL } from "~/config";
import { api } from "~/utils/api";
const ABILITIES_IMAGE_URL =
  "http://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/";

const Page = () => {
  const params = useParams();
  const playingAsKey: string = params?.championName as string;
  const postId: string = params?.postId as string;
  const { data, isLoading } = api.champion.getByKey.useQuery({ key: playingAsKey }, { enabled: playingAsKey !== undefined});
  const { data: fetchPostData } = api.post.getPostById.useQuery(parseInt(postId))
  const postData = fetchPostData?.data

  return (
    <div className="grid grid-cols-5 h-full justify-center bg-slate-950 px-20 py-12 ">
      <div className="w-full col-span-2 mx-auto">
        <img
          src={POST_CHAMP_IMAGE_URL+playingAsKey+'_0.jpg'}
          width={380}
          height={560}
          className={
            "pointer-events-none mx-auto rounded border-2 object-cover object-right transition-opacity duration-700  mb-6 h-3/5 w-fit" +
            (!isLoading ? " opacity-80" : " opacity-0")
          }
          alt=""
        />
        <p className="text-center text-white text-2xl">Items</p>
        <ul
          className={
            "py-8 transition-opacity duration-700 grid grid-cols-6" +
            (!isLoading ? " opacity-80" : " opacity-0")
          }
        >

            {postData?.items?.map((item) => {
              return (
                <div key={item?.name} className="px-2 text-center ">
                  <img
                    src={ITEM_IMAGE_URL + item?.image}
                    width={75}
                    height={75}
                    alt=""
                    className=" mb-2 rounded border-[3px] border-slate-400 transition duration-500 hover:-translate-y-2"
                  />
                  <p className="text-white text-xs">{item?.name}</p>
                </div>
              );
            })}
          </ul>
      </div>
      <div>
        <p className="text-white">{postData?.playstyle}</p>
      </div>
      <div className="flex flex-col col-span-2 col-start-4 w-10/12 mx-auto">
        <img
          src={`${POST_CHAMP_IMAGE_URL}${postData?.playingAgainst?.key}_0.jpg`}
          width={380}
          height={560}
          className={
            " pointer-events-none mx-auto rounded border-2 object-cover object-center transition-opacity duration-700 mb-6 self-center h-3/5 w-fit" +
            (!isLoading ? " opacity-80" : " opacity-0")
          }
          alt=""
        />
        <div>
        <p className="text-center text-white text-2xl">Abilities</p>
          <ul
            className={
              "grid grid-cols-4 py-8 transition-opacity duration-700" +
              (!isLoading ? " opacity-80" : " opacity-0")
            }
          >
            {postData?.abilities?.map((spell) => {
              return (
                <div key={spell.name} className="text-center w-10/12">
                  <img
                    src={ABILITIES_IMAGE_URL + spell.key + ".png"}
                    width={75}
                    height={75}
                    alt=""
                    className="mx-auto mb-2 rounded border-[3px] border-amber-500 transition duration-500 hover:-translate-y-2"
                  />
                  <p className="text-white text-xs">{spell.name}</p>
                  <p className="text-white text-xs">{spell.cooldown} secs</p>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
