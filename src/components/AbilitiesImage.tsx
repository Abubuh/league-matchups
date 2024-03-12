import React from "react";
import { ABILITIES_IMAGE_URL } from "~/config";
const AbilitiesImage = ({
  spell,
}: {
  spell: { championId: number; key: string; name: string; cooldown: number };
}) => {
  console.log(spell.key);
  return (
    <section key={spell.key} className="mx-auto w-full text-center">
      <img
        src={`${ABILITIES_IMAGE_URL}${spell.key}.png`}
        width={75}
        height={75}
        alt=""
        className=" mx-auto mb-2 w-8/12 rounded border-[3px] border-amber-500 transition duration-500 hover:-translate-y-2"
      />
      <p>{spell.name}</p>
      <p>{spell.cooldown} secs</p>
    </section>
  );
};

export default AbilitiesImage;
