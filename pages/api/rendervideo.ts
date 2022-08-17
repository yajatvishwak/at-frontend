// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import { Scene } from "../_types/Scene";
import axios from "axios";
// import FormData from "form-data";
import fetch, { FormData, File, fileFrom } from "node-fetch";

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
  // The composition you want to render
  try {
    const compositionId = inputProps.vidMetaData.id;

    // You only have to do this once, you can reuse the bundle.
    const entry = "pages/remotion/index";
    console.log(path.resolve(entry));
    console.log("Creating a Webpack bundle of the video");
    const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
      // If you have a Webpack override, make sure to add it here
      webpackOverride: (config) => config,
    });

    // Parametrize the video by passing arbitrary props to your component.
    //   const inputProps = {
    //     vid: [
    //       {
    //         sceneid: "1",
    //         duration: 20,
    //         timeline: [],
    //       },
    //     ],
    //   };
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
      parallelism: 1,
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
      // send to main server
      // req.body.id.mp4 ==> "file"
      // req.body.caption ===> "caption"
      // req.body.userid ===> "userid"
      //   let fd = new FormData();
      //   console.log(
      //     "THIS ONE LOOOK HEREEE  === ",
      //     path.resolve("out/" + req.body.id + ".mp4")
      //   );
      //   //   fd.append("file", path.resolve(`out/${req.body.id}.mp4`));
      //   fd.append(
      //     "data",
      //     JSON.stringify({
      //       userid: req.body.userid,
      //       caption: req.body.caption,
      //     })
      //   );
      //   console.log("FORMDATA: ", fd);
      const formData = new FormData();
      formData.append("file", path.resolve(`out/${req.body.id}.mp4`));
      formData.append(
        "data",
        JSON.stringify({
          userid: req.body.userid,
          caption: req.body.caption,
        })
      );
      const response = await fetch(
        process.env.NEXT_PUBLIC_URL + "create_video",
        { method: "POST", body: formData }
      );
      console.log(response);
      res.send({ status: "done" });
      //   console.log(data);
    } else {
      res.send({ status: "notdone" });
    }
  }
}
