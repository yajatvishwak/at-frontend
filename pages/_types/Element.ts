import { Image } from "./Image";
import { Text } from "./Text";
import { TTSTweet } from "./TTSTweet";
import { Tweet } from "./Tweet";

export interface Element {
  eid: string;
  position: {
    x: number;
    y: number;
  };
  scale: {
    width: number;
    height: number;
  };
  angle: number;
  zindex: number;
  element: Image | Text | TTSTweet | Tweet;
}
