import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Element } from "../_types/Element";
import { Scene } from "../_types/Scene";

interface SceneControlProps {
  selectedScene: number;
  vid: Scene[];
  deleteObject: (id: string) => void;
}

const SceneControl: FunctionComponent<SceneControlProps> = ({
  selectedScene,
  vid,
  deleteObject,
}) => {
  const [playingURL, setPlayingURL] = useState<string>();
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | undefined>();
  function play(url: string) {
    setPlaying(true);
    setPlayingURL(url);
  }
  function pause() {
    setPlaying(false);
    setPlayingURL("");
  }
  useEffect(() => {
    if (playing) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [playing, playingURL]);

  return (
    <>
      <audio
        src={playingURL}
        className="hidden"
        controls
        //@ts-ignore
        ref={audioRef}
      ></audio>
      <div className=" col-span-3 rounded-2xl bg-slate-800 p-4">
        <div className="font-bold opacity-50">In this scene</div>
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
                      className="rounded-xl border px-2 py-1 object-cover max-w-[10em] cursor-pointer flex items-center  gap-2"
                    >
                      <div>{scene.element.content}</div>
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
              {vid[selectedScene].timeline.map((scene) => {
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
              {vid[selectedScene].timeline.map((scene) => {
                if (scene.element.type === "Tweet") {
                  return (
                    <div className="flex gap-2 items-center">
                      <img
                        key={scene.eid}
                        className="rounded-xl object-cover w-30 max-h-12 delay-200 transition-all"
                        src={scene.element.tlink}
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
                if (scene.element.type === "TTSTweet") {
                  return (
                    <div key={scene.eid} className="flex items-center gap-2">
                      <div className="relative">
                        <img
                          className="rounded-xl object-cover w-30 max-h-12 delay-200 transition-all "
                          src={scene.element.tlink}
                          alt=""
                        />
                        {playing && (
                          <>
                            <div
                              onClick={pause}
                              className="cursor-pointer absolute top-1 right-1"
                            >
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </>
                        )}
                        {!playing && (
                          <div
                            onClick={() => {
                              //@ts-ignore
                              play(scene.element.audiolink);
                            }}
                            className="cursor-pointer absolute top-1 right-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
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
        </div>
      </div>
    </>
  );
};

export default SceneControl;
