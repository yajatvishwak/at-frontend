import { FunctionComponent, useState } from "react";
import { Element } from "../_types/Element";

interface TweetImageProps {
  scene: Element;
  deleteObject: (eid: string) => void;
}

const TweetImage: FunctionComponent<TweetImageProps> = ({
  scene,
  deleteObject,
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex gap-2 items-center">
      {loading && <div className="animate-pulse"> gen img, standby... </div>}
      (
      <img
        key={scene.eid}
        onLoad={(e) => {
          setLoading(false);
        }}
        className="rounded-xl object-cover w-30 max-h-12 delay-200 transition-all"
        src={
          scene.element.type === "Tweet"
            ? scene.element.tlink
            : "https://via.placeholder.com/123x345"
        }
        alt=""
      />
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
  );
};

export default TweetImage;
