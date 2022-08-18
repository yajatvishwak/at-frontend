import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../../components/_navbar";
import "react-toastify/dist/ReactToastify.css";

interface UploadProps {}

const Upload: FunctionComponent<UploadProps> = () => {
  async function uploadVid(file: File) {
    let caption = prompt("What's the caption of this video?");
    if (caption) {
      //console.log(file);
      let formdata = new FormData();
      formdata.append("file", file);
      //console.log();
      formdata.append(
        "data",
        JSON.stringify({ userid: localStorage.getItem("userid"), caption })
      );
      // formdata.append("userid", localStorage.getItem("userid") || "");
      // formdata.append("caption", caption);
      const id1 = toast.loading("Uploading file...");
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_URL + "custom_video",
        formdata
      );
      toast.update(id1, {
        render: "All is good",
        type: "success",
        isLoading: false,
      });
      toast.dismiss(id1);

      if (data && data.message) {
        window.location.href = "/app/profile";
      }
    } else {
      toast("Caption is Required");
    }
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <section className="min-h-screen h-full bg-slate-800 flex flex-col text-white p-10 font-dm">
        <NavBar />
        <div className="flex flex-col items-center gap-3 my-20 ">
          <div className="text-5xl font-black">Make your own amphitweets</div>
          <div className="text-xl opacity-50 max-w-lg text-center">
            show off the tweet you found to your friends, family and Elon Musk{" "}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 max-w-xl mx-auto">
          <div
            onClick={() => {
              window.location.href = "/editor ";
            }}
            className="flex gap-5 px-16 flex-col hover:bg-slate-700 transition-all cursor-pointer bg-slate-900 p-10 rounded-2xl items-center justify-center"
          >
            <div className="text-[7rem]">✏️</div>
            <div className="font-bold text-center">AmphiTweet Editor</div>
          </div>
          <label
            htmlFor="bro"
            className="flex hover:bg-slate-700 transition-all gap-5 px-16 cursor-pointer flex-col bg-slate-900 p-10 rounded-2xl items-center justify-center"
          >
            <div className="text-[7rem]">📂</div>
            <div className="font-bold text-center">Upload your own videoz</div>
          </label>
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={(e) => {
              if (e.target.files) {
                uploadVid(e.target.files[0]);
              }
            }}
            className="hidden"
            id="bro"
          />
        </div>
      </section>
    </>
  );
};

export default Upload;
