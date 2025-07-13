import React, { Suspense } from "react";
import UpdatePrompt from "@components/UpdatePrompt";
import Loading from "@components/Loading";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default Page;
