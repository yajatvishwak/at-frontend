import { FunctionComponent } from "react";
import NavBar from "./_navbar";
import VideoCard from "./_videocard";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  return (
    <section className="min-h-screen h-full bg-slate-800 flex flex-col text-white p-10 font-dm">
      <NavBar />
      <div className="flex flex-col items-center gap-3 my-20">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="text-4xl mt-3">@djyojitkool</div>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 flex-1 gap-4 overflow-auto mt-7">
        {/* vid element */}
        <VideoCard allowDelete={true} />
        <VideoCard allowDelete={true} />
        <VideoCard allowDelete={true} />
        <VideoCard allowDelete={true} />
        <VideoCard allowDelete={true} />
      </div>
    </section>
  );
};

export default Profile;
