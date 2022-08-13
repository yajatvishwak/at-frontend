import { FunctionComponent, useEffect, useState } from "react";
import { Sequence, Series } from "remotion";
import { Scene } from "../_types/Scene";
import Dannyboi from "./Dannyboi";

interface CompositionProps {}

const Composition: FunctionComponent<CompositionProps> = () => {
  const [vid, setVid] = useState<Scene[]>([
    {
      sceneid: "1",
      duration: 60,
      timeline: [
        {
          eid: "e1",
          element: {
            id: "1553377779810459648",
            type: "Tweet",
            tlink: "https://i.imgur.com/hfp6yI4.png",
          },
          position: { x: 40, y: 50 },
        },
        {
          eid: "e1",
          element: {
            id: "1553377779810459648",
            type: "Tweet",
            tlink: "https://i.imgur.com/hfp6yI4.png",
          },
          position: { x: 600, y: 150 },
        },
      ],
    },
    {
      sceneid: "11",
      duration: 60,
      timeline: [
        {
          eid: "e1",
          element: {
            id: "1553377779810459648",
            type: "Tweet",
            tlink: "https://i.imgur.com/KJZsuBR.png",
          },
          position: { x: 69, y: 105 },
        },
      ],
    },
  ]);

  return (
    <div>
      <Series>
        {vid.map((scene: Scene) => {
          return (
            <Series.Sequence
              durationInFrames={scene.duration}
              key={scene.sceneid}
            >
              <Dannyboi timeline={scene.timeline} />
            </Series.Sequence>
          );
        })}
      </Series>
    </div>
  );
};

export default Composition;
