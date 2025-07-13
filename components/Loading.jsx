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
    </>
  );
};

export default Loading;
