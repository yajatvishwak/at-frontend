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
          component={() => <Composition />}
          durationInFrames={120}
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
