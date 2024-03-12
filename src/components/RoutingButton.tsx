import Link from "next/link";
import React from "react";

const RoutingButton = ({ text, url }: { text: string; url: string }) => {
  return (
    <Link href={url}>
      <button className="text-md max-w-[150px] rounded-md border-[2.3px] border-black bg-gray-300 px-5 py-1 text-black">
        {text}
      </button>
    </Link>
  );
};

export default RoutingButton;
