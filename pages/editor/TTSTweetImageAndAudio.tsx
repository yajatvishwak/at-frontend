import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Element } from "../../remotion/_types/Element";

interface TTSTweetImageAndAudioProps {
  scene: Element;
  deleteObject: (eid: string) => void;
  setDuration: (val: number) => void;
}

const TTSTweetImageAndAudio: FunctionComponent<TTSTweetImageAndAudioProps> = ({
  scene,
  deleteObject,
  setDuration,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [playingURL, setPlayingURL] = useState<string>();
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | undefined>();

  useEffect(() => {
    if (loading === false) {
      setDuration(Math.round(audioRef.current?.duration || 4));
    }
  }, [loading]);

  useEffect(() => {
    if (playing) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [playing, playingURL]);

  function play(url: string) {
    setPlaying(true);
    setPlayingURL(url);
  }
  function pause() {
    setPlaying(false);
    setPlayingURL("");
  }
  return (
    <>
      {playingURL && (
        <audio
          src={playingURL}
          className="hidden"
          controls
          //@ts-ignore
          ref={audioRef}
        ></audio>
      )}

      <div className="flex gap-2 items-center">
        {loading && <div className="animate-pulse"> gen img, standby... </div>}(
        <div className="relative">
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
          <img
            key={scene.eid}
            onLoad={(e) => {
              setLoading(false);
            }}
            className="rounded-xl object-cover w-30 max-h-12 delay-200 transition-all"
            src={
              scene.element.type === "TTSTweet"
                ? scene.element.tlink
                : "https://via.placeholder.com/123x345"
            }
            alt=""
          />
        </div>
        )
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
    </>
  );
};

export default TTSTweetImageAndAudio;
