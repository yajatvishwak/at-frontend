import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import { Scene } from "../../remotion/_types/Scene";
import axios from "axios";

type Data = {
  status: string;
};

const start = async (inputProps: {
  vid: [Scene];
  vidMetaData: {
    bgAudio: string;
    bgAudioLevel: number;
    bgVid: string;
    bgVidAudioLevel: number;
    totalduration: number;
    id: string;
  };
}) => {
  try {
    const compositionId = inputProps.vidMetaData.id;

    const entry = "remotion/index";
    console.log(path.resolve(entry));
    console.log("Creating a Webpack bundle of the video");
    const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
      webpackOverride: (config) => config,
    });
    const comps = await getCompositions(bundleLocation, {
      inputProps,
    });

    // Select the composition you want to render.
    const composition = comps.find((c) => c.id === compositionId);

    // Ensure the composition exists
    if (!composition) {
      throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
    }

    const outputLocation = path.resolve(`public/out/${compositionId}.mp4`);

    console.log("Attempting to render:", outputLocation);
    await renderMedia({
      composition,
      verbose: true,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps,
    });
    console.log("Render done!");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    if (await start({ vid: req.body.vid, vidMetaData: req.body.vidMetaData })) {
      await axios.post(process.env.NEXT_PUBLIC_URL + "create_video", {
        userid: req.body.userid,
        filename: req.body.id + ".mp4",
        caption: req.body.caption,
      });
      res.send({ status: "done" });
      //   console.log(data);
    } else {
      res.send({ status: "notdone" });
    }
  }
}
