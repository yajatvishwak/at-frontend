import { FunctionComponent } from "react";
import NavBar from "./_navbar";

interface UploadProps {}

const Upload: FunctionComponent<UploadProps> = () => {
  return (
    <section className="min-h-screen h-full bg-slate-800 flex flex-col text-white p-10 font-dm">
      <NavBar />
      <div className="flex flex-col items-center gap-3 my-20 ">
        <div className="text-5xl font-black">Make your own amphitweets</div>
        <div className="text-xl opacity-50 max-w-lg text-center">
          show off the tweet you found to your friends, family and Elon Musk{" "}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 max-w-xl mx-auto">
        <div className="flex gap-5 px-16 flex-col bg-slate-900 p-10 rounded-2xl items-center justify-center">
          <div className="text-[7rem]">✏️</div>
          <div className="font-bold text-center">AmphiTweet Editor</div>
        </div>
        <div className="flex gap-5 px-16 flex-col bg-slate-900 p-10 rounded-2xl items-center justify-center">
          <div className="text-[7rem]">📂</div>
          <div className="font-bold text-center">Upload your own videoz</div>
        </div>
      </div>
    </section>
  );
};

export default Upload;
