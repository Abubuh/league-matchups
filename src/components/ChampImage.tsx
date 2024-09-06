import { type Champion } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { CHAMP_IMAGE_URL } from "~/config";

export const ChampionsImage = ({
  champions,
  dataToDisplay,
}: {
  champions: Champion[];
  dataToDisplay: string;
}) => {
  return (
    <div className="mx-auto grid grid-cols-5">
      {champions?.map(({ name, key, id }) => {
        return (
          <Link
            href={`${
              dataToDisplay === "Posts" ? `/posts/${id}` : `/champInfo/${name}`
            }`}
            key={key}
            className="flex flex-col py-5 transition hover:scale-125"
          >
            <p className="text-center text-black transition delay-200 ease-in-out dark:text-white">
              {name}
            </p>
            <img
              src={CHAMP_IMAGE_URL + key + ".png"}
              className="mx-auto w-1/2 rounded-sm"
              alt={`${name}`}
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
