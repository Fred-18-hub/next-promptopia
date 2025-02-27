import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <>
      <Image
        src={"/assets/icons/loader.svg"}
        width={30}
        height={30}
        alt="Loader svg"
      />
      <p className="text-2xl z-10">Loading</p>
    </>
  );
};

export default Loading;
