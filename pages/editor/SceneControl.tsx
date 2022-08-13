import { FunctionComponent } from "react";
import { Element } from "../_types/Element";
import { Scene } from "../_types/Scene";

interface SceneControlProps {
  selectedScene: number;
  vid: Scene[];
}

const SceneControl: FunctionComponent<SceneControlProps> = ({
  selectedScene,
  vid,
}) => {
  return (
    <div className=" col-span-3 rounded-2xl bg-slate-800 p-4">
      <div>In this scene</div>
      <div className="grid grid-cols-1 gap-4 my-4 ">
        <div className="p-4 border border-dashed rounded-2xl ">
          <div className="flex gap-4 relative overflow-auto">
            <div
              style={{
                textOrientation: "mixed",
                writingMode: "vertical-rl",
              }}
            >
              {" "}
              Text
            </div>
            {vid[selectedScene].timeline.map((scene: Element) => {
              if (scene.element.type === "Text") {
                return (
                  <div
                    key={scene.eid}
                    className="rounded-xl border px-2 py-1 object-cover max-w-[10em]"
                  >
                    {scene.element.content}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="p-4 border border-dashed rounded-2xl">
          <div className="flex gap-4 relative overflow-auto">
            <div
              style={{
                textOrientation: "mixed",
                writingMode: "vertical-rl",
              }}
            >
              {" "}
              Images
            </div>
            {vid[selectedScene].timeline.map((scene) => {
              if (scene.element.type === "Image") {
                return (
                  <img
                    key={scene.eid}
                    className="rounded-xl object-cover w-30 max-h-12 delay-200 transition-all"
                    src={scene.element.ilink}
                    alt=""
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="p-4 border border-dashed rounded-2xl">
          <div className="flex gap-4 relative overflow-auto">
            <div
              style={{
                textOrientation: "mixed",
                writingMode: "vertical-rl",
              }}
            >
              {" "}
              Sound
            </div>
            {vid[selectedScene].timeline.map((scene) => {
              if (scene.element.type === "Sound") {
                return (
                  <div className=" px-4 py-2 border rounded-xl">
                    Sound Track
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="p-4 border border-dashed rounded-2xl flex flex-col gap-3">
          <div className="flex gap-4 relative overflow-auto">
            <div
              style={{
                textOrientation: "mixed",
                writingMode: "vertical-rl",
              }}
            >
              {" "}
              Tweets
            </div>
            {vid[selectedScene].timeline.map((scene) => {
              if (scene.element.type === "Tweet") {
                return (
                  <img
                    key={scene.eid}
                    className="rounded-xl object-cover w-30 max-h-12 delay-200 transition-all"
                    src={scene.element.tlink}
                    alt=""
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneControl;
