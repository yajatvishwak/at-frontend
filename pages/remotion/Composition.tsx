import { FunctionComponent, useEffect, useState } from "react";
import { Audio, Sequence, Series, Video } from "remotion";
import { Scene } from "../_types/Scene";
import Dannyboi from "./Dannyboi";

interface CompositionProps {
  vid?: Scene[];
  vidMetaData: {
    bgVid: string;
    bgAudio: string;
    bgVidAudioLevel: number;
    bgAudioLevel: number;
  };
}

const Composition: FunctionComponent<CompositionProps> = ({
  vid,
  vidMetaData,
}) => {
  return (
    <div>
      {vidMetaData.bgVid && (
        <Video
          src={vidMetaData.bgVid}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            objectFit: "cover",
            zIndex: -100,
          }}
        />
      )}
      <Series>
        {vid?.map((scene: Scene) => {
          return (
            <Series.Sequence
              durationInFrames={scene.duration}
              key={scene.sceneid}
            >
              <Dannyboi timeline={scene.timeline} />
              {scene.timeline.map((ele) => {
                if (ele.element.type === "TTSTweet") {
                  return <Audio src={ele.element.audiolink}></Audio>;
                }
              })}
            </Series.Sequence>
          );
        })}
      </Series>
      {vidMetaData.bgAudio && (
        <Audio
          src={vidMetaData.bgAudio}
          volume={vidMetaData.bgAudioLevel}
        ></Audio>
      )}
    </div>
  );
};

export default Composition;
