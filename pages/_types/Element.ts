import { Image } from "./Image";
import { Sound } from "./Sound";
import { Text } from "./Text";
import { TTSTweet } from "./TTSTweet";
import { Tweet } from "./Tweet";

export interface Element {
  eid: string;
  position: {
    x: number;
    y: number;
  };
  element: Image | Sound | Text | TTSTweet | Tweet;
}
