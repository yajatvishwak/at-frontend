import { Element } from "./Element";

export interface Scene {
  sceneid: string;
  duration: number;
  timeline: Element[];
}
