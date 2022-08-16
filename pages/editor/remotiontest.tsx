import { FunctionComponent } from "react";
import { Player } from "@remotion/player";
import Composition from "../remotion/Composition";
import fabric from "fabric";

interface RemotionTestProps {}

const RemotionTest: FunctionComponent<RemotionTestProps> = () => {
  return (
    <section className="grid place-items-center h-screen">
      <div className="border w-fit border-black ">
        <Player
          component={() => (
            <Composition
              vid={vid}
              vidMetaData={{
                bgAudio: bgAudio || "",
                bgAudioLevel: bgAudioLevel || 0.0,
                bgVid: bgVid,
                bgVidAudioLevel: bgVidAudioLevel || 0.1,
              }}
            />
          )}
          durationInFrames={vid.reduce(
            (accumulator, current) => accumulator + current.duration,
            0
          )}
          compositionWidth={404}
          compositionHeight={720}
          fps={30}
          controls
        />
      </div>
    </section>
  );
};

export default RemotionTest;
