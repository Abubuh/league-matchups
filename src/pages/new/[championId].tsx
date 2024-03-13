import React from "react";
import { api } from "~/utils/api";
import graySquare from "~/../public/gray.png";
import {
  CHAMP_IMAGE_URL,
  RUNE_IMAGE_URL,
  SUMMONERS_IMAGE_URL,
  ITEM_IMAGE_URL,
} from "~/config";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SubmitHandler,
  useForm,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { ComboBox } from "~/components/Combobox";
import { useRouter } from "next/router";
import RoutingButton from "~/components/RoutingButton";
import { useParams } from "next/navigation";

const schema = z.object({
  runeId: z.number().min(1),
  playingWithId: z.number().min(1),
  playingAgainstId: z.number().min(1),
  mainSummonerId: z.number().min(1),
  secondarySummonerId: z.number().min(1),
  playstyle: z.string().min(4).max(500),
  itemsId: z.array(z.object({ id: z.number().min(1) })),
});

export const ImageComponent = ({
  url,
  imageWidth,
}: {
  url?: string;
  imageWidth: string;
}) => {
  return (
    <img
      alt=""
      src={url ?? graySquare.src}
      className={
        imageWidth == "large"
          ? "mx-auto mb-6 rounded-md"
          : imageWidth === "medium"
          ? "mx-auto mb-6 w-2/6 rounded-md"
          : ` flex max-w-[45px] rounded-md border-2 border-black`
      }
      width={100}
      height={100}
    />
  );
};

export const CreatePost = () => {
  const params = useParams();
  const { mutate } = api.post.createPost.useMutation();
  const { register, handleSubmit, control, watch, getValues, formState } =
    useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
        itemsId: [{ id: 0 }],
      },
    });
  const {
    fields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "itemsId",
  });
  const { errors } = formState;
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (postData) => {
    mutate(
      {
        runeId: postData.runeId,
        mainSummonerSpellId: postData.mainSummonerId,
        secondarySummonerSpellId: postData.secondarySummonerId,
        playingWithId: postData.playingWithId,
        playingAgainstId: postData.playingAgainstId,
        playStyle: postData.playstyle,
        itemsId: postData.itemsId,
      },
      {
        onSuccess: (data) =>
          void router.push(`/post/${champName?.data}/${data?.id}`),
      },
    );
  };

  const { data: apiData } = api.post.apiData.useQuery();
  const currentSelection = watch();
  const { data: champName } = api.champion.getNameById.useQuery({
    id:
      currentSelection?.playingWithId === undefined
        ? 1
        : currentSelection?.playingWithId,
  });
  const values = getValues();

  return (
    <div className="flex max-h-[150vh] min-h-fit flex-col items-center overflow-x-hidden bg-slate-300 py-4 text-xl text-black">
      <section className="flex w-[98vw] max-w-[1280px] justify-end gap-5">
        <RoutingButton
          text="Posts"
          url={`/posts/${params?.championId as string}`}
        />
        <RoutingButton text="Home" url="/" />
      </section>
      <h1 className="py-6 text-3xl">Insert data</h1>
      <form
        onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
        className="flex max-w-[1280px] flex-col self-center"
      >
        <section className="">
          <h2 className="text-center">Select matchup</h2>
          <div className="grid grid-cols-5 items-center pb-5 pt-8 text-center text-black">
            <div className="col-span-2">
              <ImageComponent
                imageWidth="large"
                url={
                  currentSelection.playingWithId
                    ? `${CHAMP_IMAGE_URL}${apiData?.champions?.find(
                        (champion) =>
                          champion.id === currentSelection.playingWithId,
                      )?.key}.png`
                    : undefined
                }
              />
              {apiData?.champions && (
                <>
                  <Controller
                    control={control}
                    name="playingWithId"
                    render={({ field: { onChange, ...rest } }) => (
                      <ComboBox
                        onChange={onChange}
                        items={apiData?.champions}
                        {...rest}
                        optionValue="Champion"
                        inputWidth="large"
                      />
                    )}
                  />
                  {errors.playingWithId?.message ? (
                    <p className="text-red-600">Please select a champion</p>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            <p>vs</p>
            <div className="col-span-2">
              <ImageComponent
                imageWidth="large"
                url={
                  currentSelection.playingAgainstId
                    ? `${CHAMP_IMAGE_URL}${apiData?.champions?.find(
                        (champion) =>
                          champion.id === currentSelection.playingAgainstId,
                      )?.key}.png`
                    : undefined
                }
              />
              {apiData?.champions && (
                <>
                  <Controller
                    control={control}
                    name="playingAgainstId"
                    render={({ field: { onChange, ...rest } }) => (
                      <ComboBox
                        onChange={onChange}
                        items={apiData?.champions}
                        {...rest}
                        optionValue="Champion"
                        inputWidth="large"
                      />
                    )}
                  />
                  {errors.playingAgainstId?.message ? (
                    <p className="text-red-600">Please select a champion</p>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        {/* Second section */}
        <section className="grid grid-cols-5 pb-8">
          <div className="col-span-2 text-center">
            <p className="mb-4">Select rune</p>
            <ImageComponent
              imageWidth="large"
              url={
                currentSelection.runeId
                  ? `${RUNE_IMAGE_URL}${apiData?.runes?.find(
                      (rune) => rune.id === currentSelection.runeId,
                    )?.img}`
                  : undefined
              }
            />
            {apiData?.runes && (
              <>
                <Controller
                  control={control}
                  name="runeId"
                  render={({ field: { onChange, ...rest } }) => (
                    <ComboBox
                      onChange={onChange}
                      items={apiData?.runes}
                      {...rest}
                      optionValue="Rune"
                      inputWidth="large"
                    />
                  )}
                />
                {errors.runeId?.message ? (
                  <p className="text-red-600">Please select a rune</p>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
          <div className="col-span-2 col-start-4 grid grid-cols-2 text-center">
            <p className="col-span-2">Select summoners</p>
            <div className="flex flex-col justify-between pt-4">
              <ImageComponent
                imageWidth="medium"
                url={
                  currentSelection.mainSummonerId
                    ? `${SUMMONERS_IMAGE_URL}${apiData?.summoners?.find(
                        (summoner) =>
                          summoner.id === currentSelection.mainSummonerId,
                      )?.key}.png`
                    : undefined
                }
              />
              {apiData?.summoners && (
                <>
                  <Controller
                    control={control}
                    name="mainSummonerId"
                    render={({ field: { onChange, ...rest } }) => (
                      <ComboBox
                        onChange={onChange}
                        items={apiData?.summoners.filter(
                          (summoner) =>
                            summoner.id !==
                            currentSelection.secondarySummonerId,
                        )}
                        {...rest}
                        optionValue="Summoner"
                        inputWidth="small"
                      />
                    )}
                  />
                  {errors.mainSummonerId?.message ? (
                    <p className="text-red-600">Please select a summoner</p>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col justify-between pt-4">
              <ImageComponent
                imageWidth="medium"
                url={
                  currentSelection.secondarySummonerId
                    ? `${SUMMONERS_IMAGE_URL}${apiData?.summoners?.find(
                        (summoner) =>
                          summoner.id === currentSelection.secondarySummonerId,
                      )?.key}.png`
                    : undefined
                }
              />
              {apiData?.summoners && (
                <>
                  <Controller
                    control={control}
                    name="secondarySummonerId"
                    render={({ field: { onChange, ...rest } }) => (
                      <ComboBox
                        onChange={onChange}
                        items={apiData?.summoners.filter(
                          (summoner) =>
                            summoner.id !== currentSelection.mainSummonerId,
                        )}
                        {...rest}
                        optionValue="Summoner"
                        inputWidth="small"
                      />
                    )}
                  />
                  {errors.secondarySummonerId?.message ? (
                    <p className="text-red-600">Please select a summoner</p>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        {/* Third section- */}
        <div className="mb-4 grid grid-cols-5 text-center">
          <h2 className="col-span-2">Select your item/items</h2>
          <h2 className="col-span-2 col-start-4 ">
            Tips for lane phase <br />
            Separate each tip with a &#34;.&#34;
          </h2>
        </div>

        <section className="grid grid-cols-5 py-6 text-center">
          <div className="col-span-2 h-36 overflow-y-auto">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="mb-2 flex justify-center">
                  <ImageComponent
                    imageWidth="small"
                    url={
                      values.itemsId[index]?.id !== 0
                        ? `${ITEM_IMAGE_URL}${apiData?.items?.find(
                            (item) => item.id === values.itemsId[index]?.id,
                          )?.image}`
                        : undefined
                    }
                  />
                  {apiData?.items && (
                    <div className="my-auto flex">
                      <Controller
                        control={control}
                        name={`itemsId.${index}.id`}
                        render={({ field: { onChange, ...rest } }) => (
                          <ComboBox
                            url={ITEM_IMAGE_URL}
                            onChange={onChange}
                            items={apiData?.items}
                            {...rest}
                            optionValue="Item"
                            inputWidth=""
                          />
                        )}
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="my-auto h-fit rounded-md border border-black p-1 text-sm"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="col-span-2 col-start-4 mb-2 h-36 overflow-x-hidden overflow-y-hidden">
            <textarea
              placeholder="Write a tip"
              maxLength={500}
              {...register(`playstyle`)}
              className=" mx-2 h-full max-h-full w-10/12 rounded-md border-2 border-gray-400 p-2 text-base"
            />
          </div>
          {fields.length < 6 && (
            <button
              type="button"
              className="col-span-2  mx-10 rounded-md border border-black p-1"
              onClick={() => appendItem({ id: 0 })}
            >
              Add item ({6 - fields.length} left)
            </button>
          )}
          {currentSelection.playstyle?.length <= 500 ? (
            <p className="col-span-2 col-start-4">
              {500 - currentSelection.playstyle?.length} characters available
            </p>
          ) : (
            <p className="col-span-2 col-start-4">Limit reached</p>
          )}
        </section>
        <button className="mx-auto mb-20 mt-10 w-1/4 rounded-md border border-black p-5 text-center">
          Submit post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
