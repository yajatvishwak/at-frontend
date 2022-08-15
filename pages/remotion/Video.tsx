import { FunctionComponent } from "react";
import { Composition, getInputProps } from "remotion";
import MyComp from "./Composition";

interface VideoProps {}

const Video: FunctionComponent<VideoProps> = () => {
  const { vid } = getInputProps();
  const { vidMetaData } = getInputProps();
  return (
    <>
      <Composition
        component={() => <MyComp vid={vid} vidMetaData={vidMetaData} />}
        durationInFrames={300}
        width={404}
        height={720}
        fps={30}
        id="HelloWorld"
      />
    </>
  );
};

export default Video;
