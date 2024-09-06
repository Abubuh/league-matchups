import { useParams } from "next/navigation";
import React from "react";
import AbilitiesImage from "~/components/AbilitiesImage";
import Navbar from "~/components/Navbar";
import RoutingButton from "~/components/RoutingButton";
import { POST_CHAMP_IMAGE_URL } from "~/config";
import { api } from "~/utils/api";
const Page = () => {
  const params = useParams();
  const championName = params?.championName as string;
  const { data: fetchChampionInfo } = api.champion.getByName.useQuery({
    name: championName,
  });
  const championInfo = fetchChampionInfo?.data;
  const { isLoading } = api.champion.getByKey.useQuery(
    { key: championName },
    { enabled: championName !== undefined },
  );
  return (
    <div className="flex h-[100vh] flex-col justify-center">
      <Navbar>
        <RoutingButton text="Posts" url={`/posts/${championInfo?.id}}`} />
        <RoutingButton text="Home" url="/" />
      </Navbar>
      <article className="col-span-2 mx-auto flex w-[1000px] flex-col justify-center text-center">
        <p className="text-4xl">{championName}</p>
        <img
          src={POST_CHAMP_IMAGE_URL + championInfo?.key + "_0.jpg"}
          width={380}
          height={560}
          className={
            "pointer-events-none mx-auto mb-6 h-fit max-h-[490px] w-fit rounded  border-2 object-right transition-opacity duration-700" +
            (!isLoading ? " opacity-100" : " opacity-0")
          }
          alt=""
        />
        <p className="text-center text-2xl ">Abilities</p>
        <ul
          className={
            "grid grid-cols-4 py-8 transition-opacity duration-700" +
            (!isLoading ? " opacity-100" : " opacity-0")
          }
        >
          {championInfo?.championAbilities.map((ability) => {
            return (
              <li className="mx-auto w-1/2">
                <AbilitiesImage spell={ability} key={ability.key} />
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
};

export default Page;
