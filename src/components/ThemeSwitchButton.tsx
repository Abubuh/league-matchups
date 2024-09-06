import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
export default function ThemeSwitchButton() {
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
          h-[24px] w-[54px] shrink-0 cursor-pointer rounded-full border border-zinc-600  bg-slate-50 transition-colors duration-700 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 dark:bg-gray-100"
    >
      <span
        aria-hidden="true"
        className=" dark:bg-slate-20 inline-block h-[22px] w-[22px] translate-x-0 transform rounded-full bg-slate-500 shadow-lg ring-0 transition-all duration-700 ease-in-out dark:translate-x-[30px] "
      />
    </Switch>
  );
}
