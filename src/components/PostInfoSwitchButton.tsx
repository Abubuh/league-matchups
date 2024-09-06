import { Switch } from "@headlessui/react";
import { useState } from "react";
export default function PostOrInfoSwitchButton({
  handleDataToDisplay,
  dataToDisplay,
}: {
  handleDataToDisplay: any;
  dataToDisplay: string;
}) {
  return (
    <div className="flex w-[54px] flex-col text-center">
      <Switch
        onClick={handleDataToDisplay}
        className={`relative inline-flex
      h-[24px] w-[54px] shrink-0 cursor-pointer rounded-full border border-zinc-600   transition-colors duration-700 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
        dataToDisplay === "Info" ? "bg-gray-100" : "bg-slate-50"
      }`}
      >
        <span
          aria-hidden="true"
          className={`dark:bg-slate-20 inline-block h-[22px] w-[22px]  transform rounded-full bg-slate-500 shadow-lg ring-0 transition-all duration-700 ease-in-out ${
            dataToDisplay === "Info"
              ? "dark:translate-x-[30px]"
              : "translate-x-0"
          }`}
        />
      </Switch>
      {dataToDisplay}
    </div>
  );
}
