import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Scene } from "../_types/Scene";

interface SceneListProps {
  addScene: () => void;
  vid: Scene[];
  selectedScene: number;
  setSelectedScene: Dispatch<SetStateAction<number>>;
  removeScene: (sceneid: string) => void;
}

const SceneList: FunctionComponent<SceneListProps> = ({
  addScene,
  vid,
  selectedScene,
  setSelectedScene,
  removeScene,
}) => {
  return (
    <div className="rounded-2xl bg-slate-800 p-4 ">
      <div className="flex justify-between items-center">
        <div className="font-bold opacity-50">Scene</div>
        <div
          onClick={addScene}
          className="rounded-full cursor-pointer px-3 hover:bg-blue-500 transition-all"
        >
          +
        </div>
      </div>
      <div className="flex flex-col gap-4 my-3 max-h-96 overflow-auto">
        {vid.map((scene: Scene, index: number) => {
          return (
            <div
              onClick={() => setSelectedScene(index)}
              key={scene.sceneid}
              className={`flex hover:scale-[99%] transition-all hover:bg-slate-700 p-4 rounded-xl border justify-between items-center cursor-pointer ${
                selectedScene === index ? "border-blue-500 bg-slate-900" : ""
              }`}
            >
              <div>Scene {index + 1}</div>
              <div
                className="cursor-pointer hover:text-red-300 transition-all"
                onClick={() => removeScene(scene.sceneid)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
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
        })}
      </div>
    </div>
  );
};

export default SceneList;
