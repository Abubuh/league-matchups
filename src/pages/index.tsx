import { useState } from "react";
import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";
import ChampionsImage from "~/components/ChampImage";
import PostOrInfoSwitchButton from "~/components/PostInfoSwitchButton";

export default function Home() {
  const [search, setSearch] = useState("");
  const [dataToDisplay, setDataToDisplay] = useState("Posts");
  const { data } = api.champion.getAll.useQuery();
  const champsFiltered =
    data?.champions?.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  const handleDataToDisplay = () => {
    setDataToDisplay(() => (dataToDisplay === "Posts" ? "Info" : "Posts"));
  };

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
            <h1 className="text-center text-8xl text-black transition delay-200 ease-in-out dark:text-white">
              Select your champ
            </h1>
            <div className="mx-auto flex w-3/5 items-center gap-2">
              <input
                type="text"
                value={search}
                placeholder="Aatrox, Ahri, Zed, Zeri"
                onChange={handleChange}
                className="mx-auto w-full rounded-md border-2 border-slate-900 px-6 py-4 text-xl text-black focus:border-gray-500 focus:outline-none dark:bg-zinc-200"
              />
              <PostOrInfoSwitchButton
                handleDataToDisplay={handleDataToDisplay}
                dataToDisplay={dataToDisplay}
              ></PostOrInfoSwitchButton>
            </div>
          </div>
        </section>
        {champsFiltered?.length > 0 ? (
          <ul className="mb-10 h-[40vh] overflow-y-auto overflow-x-hidden rounded-md border-2 border-gray-300 bg-slate-100 p-4 drop-shadow-xl transition delay-200 ease-in-out dark:border-slate-700 dark:bg-slate-700">
            {
              <ChampionsImage
                champions={champsFiltered}
                dataToDisplay={dataToDisplay}
              ></ChampionsImage>
            }
          </ul>
        ) : (
          <div className="mt-20 w-full text-center text-white">
            <p className="animate-bounce text-5xl text-black">Loading</p>
          </div>
        )}
      </div>
    </div>
  );
}
