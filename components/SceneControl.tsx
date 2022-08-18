import clone from "just-clone";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Element } from "../remotion/_types/Element";
import { Scene } from "../remotion/_types/Scene";
import TTSTweetImageAndAudio from "./TTSTweetImageAndAudio";
import TweetImage from "./TweetImage";

interface SceneControlProps {
  selectedScene: number;
  vid: Scene[];
  deleteObject: (id: string) => void;
  setVid: (vid: Scene[]) => void;
}

const SceneControl: FunctionComponent<SceneControlProps> = ({
  selectedScene,
  vid,
  setVid,
  deleteObject,
}) => {
  const [time, setTime] = useState<number>();
  useEffect(() => {
    if (vid[selectedScene])
      setTime(Math.floor(vid[selectedScene].duration / 30) || 4);
  }, []);
  useEffect(() => {
    if (vid[selectedScene])
      setTime(Math.floor(vid[selectedScene].duration / 30));
  }, [selectedScene, vid[selectedScene]]);
  return (
    <>
      <div className=" col-span-3 rounded-2xl bg-slate-800 p-4">
        <div className="flex justify-between items-center">
          <div className="font-bold opacity-50">In this scene</div>
          <div className=" flex items-center gap-3">
            <div className="text-sm opacity-50">Duration (in seconds)</div>
            <div>
              {vid[selectedScene] ? vid[selectedScene].duration / 30 : ""}s
            </div>
            <input
              type="number"
              className="bg-slate-700 px-3 py-1 rounded-full w-20"
              value={time}
              onChange={(e) => {
                let pvid = clone(vid);
                pvid[selectedScene].duration =
                  (parseInt(e.target.value) || 20) * 30;
                setTime(parseInt(e.target.value));
                setVid(pvid);
              }}
              name=""
              id=""
            />
          </div>
        </div>
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
              {vid[selectedScene] &&
                vid[selectedScene].timeline.map((scene: Element) => {
                  if (scene.element.type === "Text") {
                    return (
                      <div
                        key={scene.eid}
                        className="rounded-xl border px-2 py-1 object-cover max-w-[10em] cursor-pointer flex items-center  gap-2"
                      >
                        <div className="truncate">{scene.element.content}</div>
                        <div
                          className="hover:text-red-500 transition-all"
                          onClick={() => deleteObject(scene.eid)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
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
              {vid[selectedScene] &&
                vid[selectedScene].timeline.map((scene) => {
                  if (scene.element.type === "Image") {
                    return (
                      <div className="flex items-center gap-2">
                        <img
                          key={scene.eid}
                          className="rounded-xl object-cover w-30 max-h-12 delay-200 transition-all"
                          src={scene.element.ilink}
                          alt=""
                        />
                        <div
                          className="hover:text-red-500 transition-all"
                          onClick={() => deleteObject(scene.eid)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
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
              {vid[selectedScene] &&
                vid[selectedScene].timeline.map((scene) => {
                  if (scene.element.type === "Tweet") {
                    return (
                      <TweetImage
                        deleteObject={deleteObject}
                        scene={scene}
                        key={scene.eid}
                      />
                    );
                  }
                  if (scene.element.type === "TTSTweet") {
                    return (
                      <TTSTweetImageAndAudio
                        setDuration={(val: number) => {
                          //console.log("calling duration");
                          const pvid = clone(vid);
                          pvid[selectedScene].duration = val * 30;
                          setVid(pvid);
                        }}
                        deleteObject={deleteObject}
                        scene={scene}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SceneControl;
