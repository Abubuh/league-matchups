import { useState } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import Link from "next/link";
const CHAMP_IMAGE_URL =
  "http://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data } = api.champion.getAll.useQuery();
  const champsFiltered =
    data?.champions?.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
  };

  return (
    <div
      className="bg-slate-950 h-[100vh]">
      <section className="flex h-[50vh] items-center">
        <div className=" flex w-full flex-col">
          <h1 className="mt-32 py-10 text-center text-8xl text-white">
            Select your champ
          </h1>
          <input
            type="text"
            value={search}
            placeholder="Aatrox, Ahri, Zed, Zeri"
            onChange={handleChange}
            className="mx-auto w-5/12 rounded-md border-4 bg-zinc-200 px-6 py-4 text-xl text-black focus:border-neutral-900"
          />
        </div>
      </section>
      {champsFiltered?.length > 0 ? (
          <ul>
            <div className="mx-auto grid w-3/5 grid-cols-5 h-[35vh] overflow-y-scroll overflow-x-hidden">
              {champsFiltered?.map(({ name, key, id }) => {
                return (
                  <Link
                    href={`/post/posts/${id}`}
                    key={key}
                    className="flex flex-col py-5 transition hover:scale-125"
                  >
                    <p className="text-center text-white">{name}</p>
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
          </ul>
      ) : (
        <div className="mt-20 w-full text-center text-white">
          <p className="animate-bounce text-5xl">Loading</p>
        </div>
      )}
      {/* <Image src={kataBackground} className='h-full w-full pointer-events-none ' alt="Kata background" width={1280}/> */}
    </div>
  );
}
