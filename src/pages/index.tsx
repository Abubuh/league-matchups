import { useState } from "react";
import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";
import ChampionsImage from "~/components/ChampImage";

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
    <div className="h-fit min-h-[100vh]">
      <Navbar></Navbar>
      <div className="mx-auto flex w-[60%] flex-col gap-8 pt-10">
        <section className="flex items-center">
          <div className=" flex w-full flex-col gap-14">
            <h1 className="text-center text-8xl text-black dark:text-white">
              Select your champ
            </h1>
            <input
              type="text"
              value={search}
              placeholder="Aatrox, Ahri, Zed, Zeri"
              onChange={handleChange}
              className="mx-auto w-6/12 rounded-md border-4 border-slate-950 px-6 py-4 text-xl text-black focus:border-neutral-900 dark:bg-zinc-200"
            />
          </div>
        </section>
        {champsFiltered?.length > 0 ? (
          <ul className="mb-10 h-[40vh] overflow-y-auto overflow-x-hidden rounded-md border-4 border-slate-950 bg-slate-400 p-4 dark:border-slate-950 dark:bg-slate-800">
            {<ChampionsImage champions={champsFiltered}></ChampionsImage>}
          </ul>
        ) : (
          <div className="mt-20 w-full text-center text-white">
            <p className="animate-bounce text-5xl">Loading</p>
          </div>
        )}
      </div>
    </div>
  );
}
