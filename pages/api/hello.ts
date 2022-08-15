// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";

type Data = {
  name: string;
};

const start = async () => {
  // The composition you want to render
  const compositionId = "HelloWorld";

  // You only have to do this once, you can reuse the bundle.
  const entry = "pages/remotion/index";
  console.log(path.resolve(entry));
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
    // If you have a Webpack override, make sure to add it here
    webpackOverride: (config) => config,
  });

  // Parametrize the video by passing arbitrary props to your component.
  const inputProps = {
    vid: [
      {
        sceneid: "1",
        duration: 60,
        timeline: [
          {
            eid: "IM-a84ba426-e0a2-4ee1-8db8-16ccc26af917",
            element: {
              type: "Image",
              id: "1521ac0a-3bd2-4c56-8d2b-a5b9e8bb5403",
              ilink:
                "https://c8.alamy.com/comp/DA9PEC/india-south-india-asia-karnataka-bangalore-city-downtown-skyline-business-DA9PEC.jpg",
            },
            position: {
              x: 277,
              y: 37,
            },
            scale: {
              height: 300,
              width: 300,
            },
            angle: 0,
            zindex: 0,
          },
          {
            eid: "069ef5f2-331a-448c-bcb5-026e7209be81",
            element: {
              type: "Text",
              id: "c409d8e1-e3d9-4090-bc18-46b2503cbb5e",
              content: "sesfedh",
            },
            position: {
              x: 312,
              y: 104,
            },
            scale: {
              height: 57.76880494952783,
              width: 151.25040703353955,
            },
            angle: 0,
            zindex: 1,
          },
          {
            eid: "JT-9bb04e37-c90d-491a-b064-fde06be7304c",
            element: {
              type: "TTSTweet",
              id: "1553377779810459648",
              tlink: "https://i.imgur.com/KJZsuBR.png",
              audioLink: "https://i.imgur.com/KJZsuBR.png",
            },
            position: {
              x: 111,
              y: 40,
            },
            scale: {
              height: 97.34042553191489,
              width: 300,
            },
            angle: 0,
            zindex: 2,
          },
        ],
      },
    ],
  };

  // Extract all the compositions you have defined in your project
  // from the webpack bundle.
  const comps = await getCompositions(bundleLocation, {
    // You can pass custom input props that you can retrieve using getInputProps()
    // in the composition list. Use this if you want to dynamically set the duration or
    // dimensions of the video.
    inputProps,
  });

  // Select the composition you want to render.
  const composition = comps.find((c) => c.id === compositionId);

  // Ensure the composition exists
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
  }

  const outputLocation = path.resolve(`out/${compositionId}.mp4`);

  console.log("Attempting to render:", outputLocation);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
  });
  console.log("Render done!");
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  start();
  res.status(200).json({ name: "John Doe" });
}
