import { type Champion } from "@prisma/client";
import Image from "next/image";
import React from "react";
const CHAMP_IMAGE_URL = "http://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/";

export const ChampionsImage = ({ champions }: { champions: Champion[] } ) => {
  
    return (
    <div className={`mx-auto grid grid-cols-5`}>
              {champions?.map(({ name, key }) => {
                return (
                  <a
                    href={key}
                    key={key}
                    className="flex flex-col py-5 transition hover:scale-125"
                  >
                    <p className="text-center text-white">{name}</p>
                    <Image
                      src={CHAMP_IMAGE_URL + key + ".png"}
                      className="mx-auto w-1/2"
                      alt=""
                      width={1280}
                      height={1080}
                    />
                  </a>
                );
              })}
            </div>
 
  );
};

export default ChampionsImage;
