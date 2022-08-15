import { FunctionComponent, useState } from "react";

interface ScenePropertiesProps {
  bgVid: string;
  bgAudio: string;
  setBgVid: (bgvid: string) => void;
  setBgAudio: (bgvid: string) => void;
  bgVidAudioLevel: number;
  bgAudioLevel: number;
  setbgVidAudioLevel: (x: number) => void;
  setbgAudioLevel: (x: number) => void;
}

const SceneProperties: FunctionComponent<ScenePropertiesProps> = ({
  bgAudio,
  bgVid,
  setBgAudio,
  setBgVid,
  bgVidAudioLevel,
  setbgVidAudioLevel,
  setbgAudioLevel,
  bgAudioLevel,
}) => {
  const [audiolink, setaudiolink] = useState<string>("");
  return (
    <div className=" flex flex-col rounded-2xl bg-slate-800 p-4">
      <div className="font-bold opacity-50">General Settings</div>
      <div className="mt-3">
        <label
          htmlFor="bg-vid"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Background video
        </label>
        <input
          type="text"
          id="bg-vid"
          className="w-full px-3 py-2 rounded-full bg-transparent border focus:outline-blue-500"
          placeholder="Vid link"
          value={bgVid}
          onChange={(e) => {
            setBgVid(e.target.value);
          }}
        />
        <div className="flex gap-2 mt-3">
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
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
          <input
            type="range"
            value={bgVidAudioLevel}
            onChange={(e) => {
              setbgVidAudioLevel(parseInt(e.target.value));
            }}
            className="w-full"
            id=""
          />
        </div>
      </div>
      <div className="mt-3">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Background Music (plays at 10%)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="first_name"
            className="w-full px-3 py-2 rounded-full bg-transparent border focus:outline-blue-500"
            placeholder="Audio link"
            value={audiolink}
            onChange={(e) => {
              setaudiolink(e.target.value);
            }}
          />
          <div
            onClick={() => {
              setBgAudio(audiolink);
            }}
            className="hover:scale-90 cursor-pointer transition-all"
          >
            💾
          </div>
        </div>
        <div className="flex gap-2 mt-3">
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
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
          <input
            value={bgAudioLevel}
            onChange={(e) => {
              setbgAudioLevel(parseInt(e.target.value));
            }}
            type="range"
            className="w-full"
            id=""
          />
        </div>
      </div>
    </div>
  );
};

export default SceneProperties;
