import React from "react";
import { SUMMONERS_IMAGE_URL } from "~/config";

const SummonerImage = ({
  summonerKey,
  summonerName,
}: {
  summonerKey: string;
  summonerName: string;
}) => {
  return (
    <img
      src={`${SUMMONERS_IMAGE_URL}${summonerKey}.png`}
      alt={summonerName}
      className="mx-auto w-5/12 rounded-md"
      width={100}
      height={100}
    />
  );
};

export default SummonerImage;
