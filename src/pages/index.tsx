import { useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import { CHAMP_IMAGE_URL } from "~/config";
import LogginButton from "~/components/LoginButton";

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
    <div className="h-fit min-h-[100vh] bg-slate-900">
      <div className="mx-auto flex w-[60%] flex-col gap-8">
        <nav className="mb-32 flex justify-end pt-10">
          <LogginButton></LogginButton>
        </nav>
        {/* <RoutingButton text="Hello" url="login"/> */}
        <section className="flex items-center">
          <div className=" flex w-full flex-col gap-14">
            <h1 className="text-center text-8xl text-white">
              Select your champ
            </h1>
            <input
              type="text"
              value={search}
              placeholder="Aatrox, Ahri, Zed, Zeri"
              onChange={handleChange}
              className="mx-auto w-6/12 rounded-md border-4 border-slate-950 bg-zinc-200 px-6 py-4 text-xl text-black focus:border-neutral-900"
            />
          </div>
        </section>
        {champsFiltered?.length > 0 ? (
          <ul className="mb-10 rounded-md border-4 border-slate-950 bg-slate-800 p-4">
            <div className="mx-auto grid h-[35vh] grid-cols-5 overflow-x-hidden overflow-y-scroll">
              {champsFiltered?.map(({ name, key, id }) => {
                return (
                  <Link
                    href={`/posts/${id}`}
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
      </div>
    </div>
  );
}
