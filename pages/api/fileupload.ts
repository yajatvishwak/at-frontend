// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

import FormData from "form-data";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const formData = new FormData();
    formData.append(
      "file",
      path.resolve(`out/4d00dc97-d7ad-4450-b2dd-3d1b88d21674.mp4`)
    );
    formData.append(
      "data",
      JSON.stringify({
        userid: req.body.userid,
        caption: req.body.caption,
      })
    );
    // const response = await fetch(process.env.NEXT_PUBLIC_URL + "create_video", {
    //   method: "POST",
    //   body: formData,
    // });
    const { data } = await axios.post("http://localhost:6969/json", {
      data: "Test",
    });
    console.log(data);
    res.send({ status: "done" });
    //   console.log(data);
  } else {
    res.send({ status: "notdone" });
  }
}
