import React from "react";
import { Composition } from "remotion";
import MyComp from "./Composition";

export const MyVideo = () => {
  return (
    <>
      <Composition
        component={MyComp}
        durationInFrames={120}
        width={404}
        height={720}
        fps={30}
        id="HelloWorld"
      />
    </>
  );
};
