import { type Champion } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { CHAMP_IMAGE_URL } from "~/config";

export const ChampionsImage = ({ champions }: { champions: Champion[] }) => {
  return (
    <div className={`mx-auto grid grid-cols-5`}>
      {champions?.map(({ name, key, id }) => {
        return (
          <Link
            href={`/posts/${id}`}
            key={key}
            className="flex flex-col py-5 transition hover:scale-125"
          >
            <p className="text-center text-black dark:text-white">{name}</p>
            <img
              src={CHAMP_IMAGE_URL + key + ".png"}
              className="mx-auto w-1/2"
              alt=""
              width={1280}
              height={1080}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ChampionsImage;
