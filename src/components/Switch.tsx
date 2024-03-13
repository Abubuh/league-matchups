import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
export default function SwitchButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const handleTheme = () => {
    if (resolvedTheme === "light") setTheme("dark");
    else {
      setTheme("light");
    }
  };

  return (
    <Switch
      onClick={handleTheme}
      className="relative inline-flex
          h-[24px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-50 transition-colors duration-700 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 dark:bg-gray-500"
    >
      <span
        aria-hidden="true"
        className=" inline-block h-[20px] w-[22px] translate-x-0 transform rounded-full bg-gray-500 shadow-lg ring-0 transition-all duration-700 ease-in-out dark:translate-x-7 dark:bg-slate-50 "
      />
    </Switch>
  );
}
