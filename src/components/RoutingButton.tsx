import Link from "next/link";
import React from "react";

const RoutingButton = ({ text, url }: { text: string; url: string }) => {
  return (
    <Link href={url}>
      <button className="text-md max-w-[150px] rounded-md border-[2.3px] border-black bg-gray-200 px-5 py-1 text-black transition delay-300  ease-in-out hover:opacity-75 dark:bg-slate-400">
        {text}
      </button>
    </Link>
  );
};

export default RoutingButton;
