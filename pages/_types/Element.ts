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
  element: Image | Text | TTSTweet | Tweet;
}
